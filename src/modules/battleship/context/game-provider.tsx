import React, { useEffect, useState } from "react";
import { useUser } from "~/modules/core/hooks/use-user";
import { useBoard } from "../hooks/use-board";
import { socket } from "~/modules/core/socket/socket";
import { GameProviderContext, type GameStatus } from "./game-provider.context";
import { toRemoteBoard } from "../utils";
import type { RemoteCell } from "../models/board";
import {
    OpponentDisconnectionSchema,
    RoomReadySchema,
    ShotResultSchema,
} from "../models/events-data";
import * as v from "valibot";

/** The socket events. */
const events = {
    roomReady: "roomReady",
    fillTable: "fillTable",
    shotReceived: "shot-received",
    shotSend: "shot-send",
    opponentDisconnected: "opponentDisconnected",
    joinRoom: "joinRoom",
    shot: "shot",
    cancelRoom: "cancel-room",
};

/**
 * The game state provider.
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
    const user = useUser();
    const myBoard = useBoard({ placeShips: true });
    const enemyBoard = useBoard();
    const [status, setStatus] = useState<GameStatus>("none");
    const [room, setRoom] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // Connection.
    useEffect(() => {
        // Connect to socket.
        socket.connect();

        return () => {
            // Disconnect when home is unmounted.
            socket.disconnect();
        };
    }, []);

    // Game events.
    useEffect(() => {
        /** Handles the room ready event */
        const onRoomReady = (data: unknown) => {
            const parsed = v.safeParse(RoomReadySchema, data);
            if (!parsed.success) return;

            const { room } = parsed.output;

            console.log(room);

            // Send board.
            socket.emit(events.fillTable, {
                table: toRemoteBoard(myBoard.board),
                room,
            });

            // Store game room.
            setRoom(room);
            setStatus("waiting-game-start");
        };

        /** Handles the shot received event. */
        const onShotReceived = (data: unknown) => {
            const parsed = v.safeParse(ShotResultSchema, data);
            if (!parsed.success) return;

            const { x, y, hit } = parsed.output;

            myBoard.onReceiveAttack(x, y);

            // Notify that the user can attack or enemy attacks continue.
            setStatus(hit ? "waiting-enemy-attack" : "waiting-my-attack");
        };

        /** Handles the shot received event. */
        const onShotSent = (data: unknown) => {
            const parsed = v.safeParse(ShotResultSchema, data);
            if (!parsed.success) return;

            const { x, y, hit } = parsed.output;

            enemyBoard.onReceiveAttack(x, y, hit ? "hit" : "miss");

            // Notify that the user can continue the attack or enemy can attack.
            setStatus(hit ? "waiting-my-attack" : "waiting-enemy-attack");
        };

        /** Handles the shot received event. */
        const onOpponentDisconnection = (data: unknown) => {
            // Mark as win.
            setStatus("win");

            const parsed = v.safeParse(OpponentDisconnectionSchema, data);
            if (!parsed.success) return;

            // Save socket message.
            setMessage(parsed.output.message);
        };

        // The events.
        socket.on(events.roomReady, onRoomReady);
        socket.on(events.shotReceived, onShotReceived);
        socket.on(events.shotSend, onShotSent);
        socket.on(events.opponentDisconnected, onOpponentDisconnection);

        return () => {
            socket.off(events.roomReady);
            socket.off(events.shotReceived);
            socket.off(events.shotSend);
            socket.off(events.opponentDisconnected);
        };
    }, [myBoard, enemyBoard, user]);

    /** Handles the game start. */
    const onStartGame = () => {
        if (socket.disconnected) return;

        // Notify join room.
        socket.emit(events.joinRoom, { playerName: user });
        setStatus("searching-game");
    };

    /** Handles the attack to enemy. */
    const onSendAttack = (x: number, y: number) => {
        if (socket.disconnected) return;

        const cell: RemoteCell = {
            x,
            y,
            hit: false,
            miss: false,
            ships: false,
        };

        // Send attack.
        socket.emit(events.shot, { cell, room });
        setStatus("waiting-response");
    };

    /** Leaves the current game. */
    const onLeaveGame = () => {
        if (socket.disconnected) return;

        socket.emit(events.cancelRoom, { playerName: user });
        setStatus("none");

        // Clears the enemy board.
        enemyBoard.clear();
    };

    return (
        <GameProviderContext.Provider
            value={{
                myBoard: myBoard.board,
                enemyBoard: enemyBoard.board,
                status,
                message,
                onStartGame,
                onSendAttack,
                onLeaveGame,
            }}
        >
            {children}
        </GameProviderContext.Provider>
    );
}
