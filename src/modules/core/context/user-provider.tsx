import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserProviderContext } from "./user-provider.context";

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user] = useState(uuidv4());

    return (
        <UserProviderContext.Provider value={user}>
            {children}
        </UserProviderContext.Provider>
    );
}
