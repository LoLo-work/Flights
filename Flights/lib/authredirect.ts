import {NextRouter, useRouter} from "next/router";
import {useSession} from "./session";
import {useEffect} from "react";

interface PageProps {
    secured?: boolean;
}

export function useAuthRedirect(pageProps: PageProps): void {
    const router: NextRouter = useRouter();
    const {session, isLoaded, isSignedIn} = useSession();

    useEffect(():void => {
        if (!router.isReady || !isLoaded) return;
        if (pageProps.secured && !isSignedIn) {
            router.replace(`/auth/login?url=${router.asPath}`, undefined, {shallow: true});
        }

        if (isSignedIn && router.asPath.includes("/auth")) {
            const url:string | string[] | undefined = router.query.url
            // @ts-ignore
            if (url) router.push(url);
            else router.push("/");
        }
    }, [pageProps, router.asPath, router.isReady, isLoaded, isSignedIn, router]);
}