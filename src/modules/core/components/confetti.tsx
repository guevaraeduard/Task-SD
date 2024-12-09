import { useWindowSize } from "@uidotdev/usehooks";
import ReactConfetti from "react-confetti";

export function Confetti() {
    const { width, height } = useWindowSize();

    if (!width || !height) return null;

    return (
        <ReactConfetti
            width={width}
            height={height}
            numberOfPieces={150}
            className="h-full w-full"
        />
    );
}
