import { useContext } from "react";
import { GameProviderContext } from "../context/game-provider.context";

export const useGame = () => {
    const context = useContext(GameProviderContext);

    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return context;
};
