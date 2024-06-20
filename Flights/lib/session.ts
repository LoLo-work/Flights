import {atom, useAtom} from "jotai";
import {useEffect} from "react";

const STORAGE_KEY = "session"

interface Session {
    user: {} | null;
    token: string | null;
}

const defaultSession: Session = {
    user: null,
    token: null,
}

const sessionAtom = atom<Session>(defaultSession);
const isLoadingAtom = atom<boolean>(true);

export function useSession() {
    const [session, setSession] = useAtom(sessionAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    useEffect(() => {
        const savedSession = localStorage.getItem(STORAGE_KEY);

        if (savedSession) {
            try {
                setSession(JSON.parse(savedSession));
            } catch (e) {
                console.error(e);
            }
        }
        setIsLoading(false);
    }, [setSession, setIsLoading]);

    const signIn = (newSession: Session) => {
        if (!newSession.token || !newSession.user) {
            throw new Error("Token and user must be supplied to signIn()!");
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
        setSession(newSession);
    }

    const signOut = () => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(defaultSession);
    }

    return {
        session,
        isLoaded: !isLoading,
        isSignedIn: session.user !== null && session.token !== null,
        signIn,
        signOut
    }
}