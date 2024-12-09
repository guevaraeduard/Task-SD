import { Game } from "~/modules/battleship/components/game";
import { ResultDialog } from "~/modules/battleship/components/result-dialog";
import { useGame } from "~/modules/battleship/hooks/use-game";

export function Home() {
    const { status } = useGame();

    return (
        <div className="relative flex min-h-dvh flex-col">
            <header className="sticky top-0 z-20 border-b bg-white px-6 py-4 text-center">
                <h1 className="text-2xl font-bold">Battleship</h1>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center gap-8 p-6 md:flex-row">
                <Game />
            </main>

            {status === "win" || status === "lose" ? (
                <div className="absolute inset-0 z-50">
                    <ResultDialog />
                </div>
            ) : null}
        </div>
    );
}
