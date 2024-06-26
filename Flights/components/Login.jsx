import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = username && password;
        setIsFormValid(isValid);
    }, [username, password]);

    const load = () => {
        setLoading(true);
        console.log(username, password);
        
        //Fetch

        setTimeout(() => {
            setLoading(false);
        }, 3000); // Ändern zu längerem Delay --> Idee: So langes er hört nicht auf zu spinnen, und wir leiten weiter
    };

    return (
        <div>
            <div className='m-7'>
                <h2>Login</h2>

                <div className="flex flex-column gap-2">
                    <label htmlFor="username">E-Mail</label>
                    <InputText id="username" aria-describedby="username-help" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <small id="username-help">
                        Geben Sie Ihre E-Mail ein.
                    </small>
                </div>

                <hr />
                <br />

                <div className='flex flex-column gap-2'>
                    <label htmlFor="password">Passwort</label>
                    <Password id="password" toggleMask value={password} onChange={(e) => setPassword(e.target.value)}
                        promptLabel="Wähle ein Passwort" feedback={false} />
                    <small id="password-help">
                        Geben Sie Ihr Passwort ein.
                    </small>
                </div>

                <hr />
                <br />
            </div>

            <div className="flex align-items-center justify-content-center">
                <Button
                    label="Submit"
                    icon={isFormValid ? "pi pi-check" : "pi pi-times"}
                    disabled={!isFormValid}
                    loading={loading}
                    onClick={load}
                />
            </div>
        </div>
    );
}
