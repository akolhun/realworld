import { User } from "@/store/types";
import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = {
    authUser: User | null;
    setAuthUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };