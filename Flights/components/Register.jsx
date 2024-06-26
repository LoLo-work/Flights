import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

export default function Register() {
    const [selectedGender, setSelectedGender] = useState(null);
    const genders = [
        { nameEn: 'Male', nameDe: 'Mann', code: 'M' },
        { nameEn: 'Female', nameDe: 'Frau', code: 'F' }
    ];
    const [username, setUsername] = useState('');
    const [date, setDate] = useState(null);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');


    useEffect(() => {
        const isValid = username && date && selectedGender && password && firstname && lastname;
        setIsFormValid(isValid);
    }, [username, date, selectedGender, password, firstname, lastname]);

    const load = () => {
        setLoading(true);
        console.log(username, date, selectedGender.code, password);
        
        //Fetch

        setTimeout(() => {
            setLoading(false);
        }, 3000); // Ändern zu längerem Delay --> Idee: So langes er hört nicht auf zu spinnen, und wir leiten weiter
    };

    return (
        <div>
            <div className='m-7'>
                <h2>Registrieren</h2>
                
                <div className="flex flex-column gap-2">
                    <label htmlFor="firstname">Vorname</label>
                    <InputText id="firstname" aria-describedby="firstname-help" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <small id="firstname-help">
                        Geben Sie ihren Vornamen ein.
                    </small>
                </div>

                <hr />
                <br />
                <div className="flex flex-column gap-2">
                    <label htmlFor="lastname">Name</label>
                    <InputText id="lastname" aria-describedby="lastname-help" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <small id="lastname-help">
                        Geben Sie ihren Namen ein.
                    </small>
                </div>

                <hr />
                <br />
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">E-Mail</label>
                    <InputText id="username" aria-describedby="username-help" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <small id="username-help">
                        Geben Sie ihre E-Mail ein.
                    </small>
                </div>

                <hr />
                <br />
                <div className='flex flex-column gap-2'>
                    <label htmlFor="date">Geburtsdatum</label>
                    <Calendar id="date" value={date} onChange={(e) => setDate(e.value)} showButtonBar />
                    <small id="date-help">
                        Geben Sie Ihr Geburtsdatum ein.
                    </small>
                </div>

                <hr />
                <br />

                <div className='flex flex-column gap-2'>
                    <label htmlFor="gender">Geschlecht</label>
                    <Dropdown id="gender" value={selectedGender} onChange={(e) => setSelectedGender(e.value)} options={genders} optionLabel="nameEn"
                        placeholder="Wähle dein Geschlecht" className="w-full md:w-14rem" />
                    <small id="gender-help">
                        Wählen Sie Ihr Geschlecht aus.
                    </small>
                </div>

                <hr />
                <br />

                <div className='flex flex-column gap-2'>
                    <label htmlFor="password">Passwort</label>
                    <Password id="password" toggleMask value={password} onChange={(e) => setPassword(e.target.value)}
                        promptLabel="Wähle ein Passwort" weakLabel="Einfaches Passwort" mediumLabel="Gutes Passwort" strongLabel="Starkes Passwort" />
                    <small id="password-help">
                        Wählen Sie Ihr Passwort.
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
