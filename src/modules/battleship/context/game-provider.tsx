import React, { useEffect, useState } from "react";
import { useUser } from "~/modules/core/hooks/use-user";
import { useBoard } from "../hooks/use-board";
import { socket } from "~/modules/core/socket/socket";
import { GameProviderContext, type GameStatus } from "./game-provider.context";

/**
 * The game state provider.
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
    const user = useUser();
    const myBoard = useBoard({ placeShips: true });
    const enemyBoard = useBoard();
    const [status, setStatus] = useState<GameStatus>("none");
    const [room, setRoom] = useState<string | null>(null);

    useEffect(() => {
        // Connect to socket.
        socket.connect();

        socket.on("roomReady", async (data) => {
            const room = data.room;
            if (typeof room !== "string") return;

            // Store game room.
            setRoom(room);
            setStatus("waiting-response");
        });

        return () => {
            // Disconnect when home is unmounted.
            socket.disconnect();
        };
    }, []);

    /** Handles the game start. */
    const onStartGame = () => {
        if (socket.disconnected) return;

        setStatus("searching-game");

        // Notify join room.
        socket.emit("joinRoom", { playerName: user });
    };

    /** Handles the attack to enemy. */
    const onSendAttack = (x: number, y: number) => {
        if (socket.disconnected) return;

        console.log({ x, y });

        setStatus("waiting-response");
    };

    /** Leaves the current game. */
    const onLeaveGame = () => {
        if (socket.disconnected) return;

        if (room) console.log(`Leaving room: ${room}`);

        socket.emit("cancel-room", { playerName: user });
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
                onStartGame,
                onSendAttack,
                onLeaveGame,
            }}
        >
            {children}
        </GameProviderContext.Provider>
    );
}
