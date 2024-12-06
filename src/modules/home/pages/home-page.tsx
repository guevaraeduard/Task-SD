import { Grid } from "~/modules/battleship/components/grid";
import { useBoard } from "~/modules/battleship/hooks/use-board";

export function Home() {
    const myBoard = useBoard({ placeShips: true });
    const enemyBoard = useBoard();

    return (
        <div className="relative flex min-h-dvh flex-col">
            <header className="sticky top-0 z-10 border-b bg-white px-6 py-4">
                <h1 className="text-2xl font-bold">Battleship</h1>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center gap-8 p-6 md:flex-row">
                <Grid type="player" board={myBoard.board} />

                <Grid
                    type="enemy"
                    board={enemyBoard.board}
                    onHit={enemyBoard.onReceiveAttack}
                />
            </main>
        </div>
    );
}
