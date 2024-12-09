import { Confetti } from "~/modules/core/components/confetti";
import { useGame } from "../hooks/use-game";

export function ResultDialog() {
    const { status, message, onLeaveGame } = useGame();

    return (
        <>
            <div className="grid h-full w-full place-items-center bg-slate-900/50 px-4">
                <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-md bg-white p-6">
                    <div className="flex flex-col gap-4 text-center">
                        <h1 className="text-2xl font-bold">
                            {status === "win" ? "¡Felicidades!" : "Lo sentimos"}
                        </h1>

                        <p>
                            {message ??
                                (status === "win"
                                    ? "Has ganado la partida"
                                    : "Has perdido la partida")}
                        </p>
                    </div>

                    <button
                        className="w-full rounded-full bg-blue-400 px-8 py-2 font-medium text-white"
                        onClick={() => onLeaveGame()}
                    >
                        Cerrar
                    </button>
                </div>
            </div>

            {status === "win" ? <Confetti /> : null}
        </>
    );
}
