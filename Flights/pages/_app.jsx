import {PrimeReactProvider, PrimeReactContext} from "primereact/api";
import 'primereact/resources/themes/lara-dark-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'styles/app/_app.css'

export default function App({Component, pageProps}) {
    return (
        <PrimeReactProvider>
            <div>
                <div>
                    <main>
                        <Component {...pageProps} />
                    </main>
                </div>
            </div>
        </PrimeReactProvider>
    )
}