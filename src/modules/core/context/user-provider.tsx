import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UserProviderContext = createContext("");

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user] = useState(uuidv4());

    return (
        <UserProviderContext.Provider value={user}>
            {children}
        </UserProviderContext.Provider>
    );
}
