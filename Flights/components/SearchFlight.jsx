import React, { useState, useEffect } from 'react';
import { CascadeSelect } from 'primereact/cascadeselect';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { ToggleButton } from 'primereact/togglebutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function SearchFlight() {
    const [selectedAirportVon, setSelectedAirportVon] = useState(null);
    const [selectedAirportNach, setSelectedAirportNach] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [flightSearched, setFlightSearched] = useState(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [checked, setChecked] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const isValid = selectedAirportVon && selectedAirportNach && date && time;
        setIsFormValid(isValid);
    }, [selectedAirportVon, selectedAirportNach, date, time]);

    const classes = [
        { name: 'First Class', code: 'FIRS' },
        { name: 'Business', code: 'BUIS' },
        { name: 'Premium Economy', code: 'PREM' },
        { name: 'Economy', code: 'ECON' }
    ];

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setFlightSearched(true); // Flug wurde gesucht, Tabelle anzeigen
            console.log({
                VonAirport: selectedAirportVon.aname,
                NachAirport: selectedAirportNach.aname,
                Date: date,
                Time: time,
                Airline: "Swiss",
                Price: 703
            })
            setProducts([
                {
                    VonAirport: selectedAirportVon.aname,
                    NachAirport: selectedAirportNach.aname,
                    Date: "26.06.2024",
                    StartTime: "10:35",
                    LandeTime: "13:00",
                    Airline: "Swiss",
                    Klasse: selectedClass[0].name,
                    Price: 703
                },{
                    VonAirport: selectedAirportVon.aname,
                    NachAirport: selectedAirportNach.aname,
                    Date: "26.06.2024",
                    StartTime: "11:00",
                    LandeTime: "14:25",
                    Airline: "Swiss",
                    Klasse: selectedClass[0].name,
                    Price: 703
                },{
                    VonAirport: selectedAirportVon.aname,
                    NachAirport: selectedAirportNach.aname,
                    Date: "26.06.2024",
                    StartTime: "12:00",
                    LandeTime: "15:30",
                    Airline: "EasyJet",
                    Klasse: selectedClass[0].name,
                    Price: 500
                }
            ]);
        }, 3000); // Simulierter Ladevorgang
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
                        <label htmlFor="von">Von:</label>
                    </FloatLabel>
                </div>
                <div className="p-inputgroup flex-1">
                    <FloatLabel>
                        <CascadeSelect id='nach' value={selectedAirportNach} onChange={e => setSelectedAirportNach(e.value)} options={countries}
                            optionLabel="aname" optionGroupLabel="name" optionGroupChildren={['airports']}
                            className="w-full md:w-14rem" breakpoint="767px" itemTemplate={countryOptionTemplate} style={{ minWidth: '14rem' }} />
                        <label htmlFor="nach">Nach:</label>
                    </FloatLabel>
                </div>
            </div>
            <br />
            <div className="card flex flex-column md:flex-row gap-4">
                <div className="p-inputgroup flex-1">
                    <FloatLabel>
                        <MultiSelect id='class' value={selectedClass} onChange={(e) => setSelectedClass(e.value)} options={classes} optionLabel="name" display="chip"
                            maxSelectedLabels={3} className="w-full md:w-20rem" />
                        <label htmlFor="class">Klasse:</label>
                    </FloatLabel>
                </div>
                <div className="p-inputgroup flex-1">
                    <FloatLabel>
                        <Calendar id="date" value={date} onChange={(e) => setDate(e.value)} showButtonBar />
                        <label htmlFor="date">Datum</label>
                    </FloatLabel>
                </div>
                <div className="p-inputgroup flex-1">
                    <FloatLabel>
                        <Calendar id='time' value={time} onChange={(e) => setTime(e.value)} timeOnly />
                        <label htmlFor="time">Zeit</label>
                    </FloatLabel>
                    <ToggleButton onLabel="Abfahrt" offLabel="Ankunft" onIcon="pi pi-arrow-left" offIcon="pi pi-arrow-right"
                        checked={checked} onChange={(e) => setChecked(e.value)} className="w-9rem" />
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
                    style={{ margin: '1rem' }}
                />
                <Button
                    label="Merken"
                    icon={flightSearched ? "pi pi-save" : "pi pi-times"}
                    disabled={!flightSearched} style={{ margin: '1rem' }}
                />
            </div>

            {flightSearched && (
                <div>
                    <h2>Ihr Flug:</h2>
                    <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="VonAirport" header="Von"></Column>
                        <Column field="NachAirport" header="Nach"></Column>
                        <Column field="Date" header="Datum"></Column>
                        <Column field="StartTime" header="Abflugszeit"></Column>
                        <Column field="LandeTime" header="Ankunftszeit"></Column>
                        <Column field="Airline" header="Airline"></Column>
                        <Column field="Klasse" header="Klasse"></Column>
                        <Column field="Price" header="Preis"></Column>
                    </DataTable>
                </div>
            )}
        </div>
    );
}
