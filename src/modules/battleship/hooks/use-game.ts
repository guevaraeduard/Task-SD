import { useUser } from "~/modules/core/hooks/use-user";
import { useBoard } from "./use-board";
import { useState } from "react";

type GameStatus =
    | "none"
    | "searching-game"
    | "waiting-enemy-attack"
    | "waiting-my-attack"
    | "win"
    | "lose";

export function useGame() {
    const user = useUser();
    const myBoard = useBoard({ placeShips: true });
    const enemyBoard = useBoard();
    const [status, setStatus] = useState<GameStatus>("none");

    // Handles the game start.
    const onStartGame = () => {
        console.log(`User: ${user}`);
        console.log(myBoard.ships);

        setStatus("searching-game");
    };

    // Handles attack to enemy.
    const onSendAttack = (x: number, y: number) => {
        console.log({ x, y });
    };

    return { myBoard, enemyBoard, status, onStartGame, onSendAttack };
}
