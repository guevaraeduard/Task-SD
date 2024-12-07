import { Game } from "~/modules/battleship/components/game";
import { UserProvider } from "~/modules/core/context/user-provider";

export function Home() {
    return (
        <UserProvider>
            <div className="relative flex min-h-dvh flex-col">
                <header className="sticky top-0 z-10 border-b bg-white px-6 py-4 text-center">
                    <h1 className="text-2xl font-bold">Battleship</h1>
                </header>

                <main className="flex flex-1 flex-col items-center justify-center gap-8 p-6 md:flex-row">
                    <Game />
                </main>
            </div>
        </UserProvider>
    );
}
