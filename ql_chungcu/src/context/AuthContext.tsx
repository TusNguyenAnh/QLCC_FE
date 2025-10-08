import React, {createContext, useState, useEffect} from "react";
import {Loader2} from "lucide-react";
import {getProfile} from "@/apis/authAPI.ts";
import {findByIdAPI} from "@/apis/orgAPI.ts";

interface AuthContextType {
    user: any | null;
    complex: any | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn?: boolean;
    fetchUser?: () => Promise<void>;
}


type ComponentProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({children}: ComponentProps) {
    const [user, setUser] = useState<any | null>(null);
    const [complex, setComplex] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const profile = await getProfile();
            const org = await findByIdAPI(profile.resident.org_id);
            setUser(profile);
            setComplex(org.complex_id);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <AuthContext.Provider value={{user, loading, setLoading, setUser,fetchUser,complex}}>
            {loading
                ?
                (<div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mr-1"/>Loading...
                </div>)
                : children}
        </AuthContext.Provider>
    );
}
;

