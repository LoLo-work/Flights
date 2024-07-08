import React, { useRef, useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

export default function FlightsTable() {
    const [flights, setFlights] = useState([]);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'departure_Airport.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'arrival_Airport.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'Airline': { value: null, matchMode: FilterMatchMode.IN },
        'Class': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [title, setTitle] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/Flights')
            .then((response) => response.json())
            .then((data) => {
                setFlights(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const isValid = selectedProduct && title;
        setIsFormValid(isValid);
    }, [selectedProduct, title]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <FloatLabel>
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} />
                        <label><i className="pi pi-search" /> Suchen</label>
                    </FloatLabel>
                </span>
            </div>
        );
    };

    const airportBodyTemplate = (rowData, field) => {
        return `${rowData[field].name} (${rowData[field].city}, ${rowData[field].country})`;
    };

    const priceBodyTemplate = (rowData) => {
        return rowData.Price.toFixed(2);
    };

    const airlineItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{option.name}</span>
            </div>
        );
    };

    const onAirlineFilterChange = (e) => {
        let _filters = { ...filters };
        _filters['Airline'].value = e.value.map(option => option.name);
        setFilters(_filters);
        setSelectedAirlines(e.value);
    };

    const saveFlight = () => {
        console.log('Selected Flight: ', selectedProduct, '\nTitel: ', title);

        fetch('http://localhost:3001/Saved_Flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                title: title,
                flight_id: selectedProduct.id,
            }),
        })
        .then(response => {
            if (response.ok) {
                console.log("Flight saved successfully");
            } else {
                console.error("Failed to save the flight");
            }
        })
        .catch(error => console.error("Error:", error));
    };

    const header = renderHeader();

    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const buttonEl = useRef(null);

    const handleAccept = () => {
        saveFlight();
        accept();
    };

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Ja', detail: 'Flug wurde gespeichert', life: 4000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Nein', detail: 'Flug wurde nicht gespeichert', life: 4000 });
    };

    return (
        <div className="card m-7">
            <DataTable value={flights} paginator rows={8} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                globalFilterFields={['departure_Airport.name', 'arrival_Airport.name', 'Airline', 'Class']} header={header} emptyMessage="No flights found."
                selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)}>
                <Column selectionMode="single" headerStyle={{ minWidth: '2rem' }}></Column>
                <Column field="departure_Airport.name" header="Departure Airport" body={(rowData) => airportBodyTemplate(rowData, 'departure_Airport')} filter filterPlaceholder="Suche" style={{ minWidth: '14rem' }} />
                <Column field="arrival_Airport.name" header="Arrival Airport" body={(rowData) => airportBodyTemplate(rowData, 'arrival_Airport')} filter filterPlaceholder="Suche" style={{ minWidth: '14rem' }} />
                <Column field="departure_Time" header="Departure Time" style={{ minWidth: '8rem' }} sortable />
                <Column field="arrival_Time" header="Arrival Time" style={{ minWidth: '8rem' }} sortable />
                <Column field="Class" header="Class" filter filterPlaceholder="Suche" style={{ minWidth: '13rem' }} />
                <Column field="Price" header="Price" body={priceBodyTemplate} style={{ minWidth: '7rem' }} sortable />
                <Column field="Airline" header="Airline" filter filterElement={
                    <MultiSelect value={selectedAirlines} options={flights.map(flight => flight.Airline).filter((value, index, self) => self.indexOf(value) === index).map(airline => ({ name: airline }))} itemTemplate={airlineItemTemplate} onChange={onAirlineFilterChange} optionLabel="name" placeholder="Airline aussuchen" className="p-column-filter" style={{ minWidth: '9rem' }} />
                } />
            </DataTable>
            <br />
            <br />
            <hr />
            <br />
            {selectedProduct && (
                <div>
                    <Toast ref={toast} />
                    <h2 className='text-center'>Flug speichern</h2>
                    <br />
                    <div className="flex justify-content-center gap-4">
                        <div className="flex flex-column gap-2">
                            <FloatLabel>
                                <InputText id="title" aria-describedby="username-help" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <label htmlFor="title">Titel</label>
                            </FloatLabel>
                            <small id="title-help">
                                Geben Sie den Titel dieses Fluges ein.
                            </small>
                        </div>
                        <div>
                            <Button label="Flug speichern" icon="pi pi-check" ref={buttonEl} onClick={() => setVisible(true)} disabled={!isFormValid} className="p-button-raised p-button-primary" />
                        </div>
                        <div>
                        <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)} 
                            message="Sind Sie sicher, dass Sie diesen Flug speichern möchten?" icon="pi pi-exclamation-triangle" accept={handleAccept} reject={reject} />
                        </div>
                    </div>
                </div>
            ) || (
                <div>
                    <h2 className='text-center'>Flug speichern</h2>
                    <p className='text-center'>Sie haben keinen Flug ausgewählt.</p>
                    <br />
                    <div className="flex justify-content-center gap-4">
                        <div className="flex flex-column gap-2">
                            <FloatLabel>
                                <InputText id="title" aria-describedby="username-help" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <label htmlFor="title">Titel</label>
                            </FloatLabel>
                            <small id="title-help">
                                Geben Sie dem Flug einen Titel.
                            </small>
                        </div>
                        <div className="flex flex-column gap-2">
                            <Button label="Flug speichern" id='save' onClick={saveFlight} disabled={!isFormValid} className="p-button-raised p-button-primary" />
                            <small id="save-help" className='text-red-500'>
                                Wählen Sie einen Flug aus.
                            </small>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
