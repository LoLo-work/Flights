import React, { useState, useEffect } from 'react';
import { CascadeSelect } from 'primereact/cascadeselect';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';

export default function SearchFlight() {
    const [selectedAirportVon, setSelectedAirportVon] = useState(null);
    const [selectedAirportNach, setSelectedAirportNach] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [flight, setFlight] = useState(null);
    const [flightSearched, setFlightSearched] = useState(false);

    useEffect(() => {
        const isValid = selectedAirportVon && selectedAirportNach;
        setIsFormValid(isValid);

        const isvalidflights = flight
        const setFlightSearched = isvalidflights

    }, [selectedAirportVon, selectedAirportNach, flight, flightSearched]);

    const classes = [
        { name: 'First Class', code: 'FIRS' },
        { name: 'Business', code: 'BUIS' },
        { name: 'Premium Economy', code: 'PREM' },
        { name: 'Economy', code: 'ECON' }
    ];

    const load = () => {
        setLoading(true);
        console.log(selectedAirportVon, selectedAirportNach);
        
        //Fetch

        setTimeout(() => {
            setLoading(false);
        }, 3000); // Ändern zu längerem Delay --> Idee: So langes er hört nicht auf zu spinnen, und wir leiten weiter
    };

    const countries = [
        {
            name: 'Australia',
            code: 'AU',
            airports: [
                { aname: 'Sydney Airport', city: 'Sydney', code: 'AU' },
                { aname: 'Melbourne Airport', city: 'Melbourne', code: 'AU' },
                { aname: 'Brisbane Airport', city: 'Brisbane', code: 'AU' }
            ]
        },
        {
            name: 'Canada',
            code: 'CA',
            airports: [
                { aname: 'Toronto Pearson International Airport', city: 'Toronto', code: 'CA' },
                { aname: 'Vancouver International Airport', city: 'Vancouver', code: 'CA' },
                { aname: 'Montreal-Trudeau International Airport', city: 'Montreal', code: 'CA' }
            ]
        },
        {
            name: 'Switzerland',
            code: 'CH',
            airports: [
                { aname: 'Zurich Airport', city: 'Zurich', code: 'CH' },
                { aname: 'Geneva Airport', city: 'Geneva', code: 'CH' },
                { aname: 'Basel Airport', city: 'Basel', code: 'CH' }
            ]
        },
        {
            name: 'United States',
            code: 'US',
            airports: [
                { aname: 'Los Angeles International Airport', city: 'Los Angeles', code: 'US' },
                { aname: 'John F. Kennedy International Airport', city: 'New York', code: 'US' },
                { aname: 'Chicago O\'Hare International Airport', city: 'Chicago', code: 'US' }
            ]
        }
    ];

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                {option.code && <img alt={option.name} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option.code}.svg`} style={{ width: '18px' }} />}
                {option.aname}
                <span>{option.city ? `- ${option.city}` : option.name}</span>
            </div>
        );
    }

    return (
        <div className='m-7'>
            <h2>Flüge suchen</h2>
            <br />
            <div className="card flex flex-column md:flex-row gap-4">

                <div className="p-inputgroup flex-1">
                    <FloatLabel>
                        <CascadeSelect id='von' value={selectedAirportVon} onChange={e => setSelectedAirportVon(e.value)} options={countries}
                            optionLabel="aname" optionGroupLabel="name" optionGroupChildren={['airports']}
                            className="w-full md:w-14rem" breakpoint="767px" itemTemplate={countryOptionTemplate} style={{ minWidth: '14rem' }} />
                        <label for="von">Von:</label>
                    </FloatLabel>
                </div>

                <div className="p-inputgroup flex-1">
                    <FloatLabel>
                        <CascadeSelect id='nach' value={selectedAirportNach} onChange={e => setSelectedAirportNach(e.value)} options={countries}
                            optionLabel="aname" optionGroupLabel="name" optionGroupChildren={['airports']}
                            className="w-full md:w-14rem" breakpoint="767px" itemTemplate={countryOptionTemplate} style={{ minWidth: '14rem' }} />
                        <label for="nach">Nach:</label>
                    </FloatLabel>
                </div>

                <div className="p-inputgroup flex-1">
                    <FloatLabel>
                        <MultiSelect id='class' value={selectedClass} onChange={(e) => setSelectedClass(e.value)} options={classes} optionLabel="name" display="chip"
                            maxSelectedLabels={3} className="w-full md:w-20rem" />
                        <label for="class">Klasse:</label>
                    </FloatLabel>
                </div>

               
            </div>
            <br />
            <div className="flex align-items-center justify-content-center p-5">
            <Button
                    label="Suchen"
                    icon={isFormValid ? "pi pi-check" : "pi pi-times"}
                    disabled={!isFormValid}
                    loading={loading}
                    onClick={load}
                    style={{margin : '1rem'}}
                />
                <Button
                    label="Merken"
                    icon={flightSearched ? "pi pi-save" : "pi pi-times"}
                    disabled={!flightSearched} style={{margin : '1rem'}}
                />
            </div>

            <div>
            {/* Hier können wir die Antwort Mappen
            
            <h2>Ihr Flug:</h2>
            */}


            </div>
        </div>
    );
}
