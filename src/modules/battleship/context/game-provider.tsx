import React, { useEffect, useState } from "react";
import { useUser } from "~/modules/core/hooks/use-user";
import { useBoard } from "../hooks/use-board";
import { socket } from "~/modules/core/socket/socket";
import { GameProviderContext, type GameStatus } from "./game-provider.context";
import { toRemoteBoard } from "../utils";
import type { RemoteCell } from "../models/board";
import {
    WinResultSchema,
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
    winnerGame: "winner-game",
    lossGame: "loss-game",
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

            const { room, players } = parsed.output;

            const table = toRemoteBoard(myBoard.board);

            // Send board.
            socket.emit(events.fillTable, {
                table,
                room,
            });

            // Store game room.
            setRoom(room);
            setStatus("waiting-game-start");

            const isUserTurn =
                players.find((player) => player.name === user)?.your ?? false;

            // Notify turn.
            setStatus(
                isUserTurn ? "waiting-my-attack" : "waiting-enemy-attack",
            );
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

        /** Handles the user victory. */
        const onVictory = (data: unknown) => {
            // Mark as win.
            setRoom(null);
            setStatus("win");

            const parsed = v.safeParse(WinResultSchema, data);
            if (!parsed.success) return;

            // Save socket message.
            setMessage(parsed.output.message);
        };

        /** Handles the user loss. */
        const onLoss = () => {
            setMessage(null);
            setRoom(null);
            setStatus("lose");
        };

        // The events.
        socket.on(events.roomReady, onRoomReady);
        socket.on(events.shotReceived, onShotReceived);
        socket.on(events.shotSend, onShotSent);
        socket.on(events.opponentDisconnected, onVictory);
        socket.on(events.winnerGame, onVictory);
        socket.on(events.lossGame, onLoss);

        return () => {
            socket.off(events.roomReady);
            socket.off(events.shotReceived);
            socket.off(events.shotSend);
            socket.off(events.opponentDisconnected);
            socket.off(events.winnerGame);
            socket.off(events.lossGame);
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

        clear();
    };

    /** Clears the game. */
    const clear = () => {
        setStatus("none");
        setRoom(null);
        setMessage(null);

        // Clears boards.
        myBoard.clearAttacksReceived();
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
                clear,
            }}
        >
            {children}
        </GameProviderContext.Provider>
    );
}
