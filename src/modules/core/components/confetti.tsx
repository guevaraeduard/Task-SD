import { useWindowSize } from "@uidotdev/usehooks";
import ReactConfetti from "react-confetti";

export function Confetti() {
    const { width, height } = useWindowSize();

    return (
        <ReactConfetti
            width={width ?? undefined}
            height={height ?? undefined}
        />
    );
}
