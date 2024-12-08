import { GameProvider } from "./battleship/context/game-provider";
import { UserProvider } from "./core/context/user-provider";
import { Home } from "./home/pages/home-page";

export function App() {
    return (
        <UserProvider>
            <GameProvider>
                <Home />
            </GameProvider>
        </UserProvider>
    );
}
