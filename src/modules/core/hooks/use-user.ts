import { useContext } from "react";
import { UserProviderContext } from "../context/user-provider";

export const useUser = () => {
    const context = useContext(UserProviderContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};
