import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

export default function SavedFlights() {
    const [savedFlights, setSavedFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [flightToDelete, setFlightToDelete] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        const fetchSavedFlights = async () => {
            try {
                const response = await fetch('http://localhost:3001/Saved_Flights?user_id=1');
                const savedFlightsData = await response.json();
                const flightDetailsPromises = savedFlightsData.map(async (savedFlight) => {
                    const flightResponse = await fetch(`http://localhost:3001/Flights/${savedFlight.flight_id}`);
                    const flightData = await flightResponse.json();
                    return { ...savedFlight, flightDetails: flightData };
                });
                const flights = await Promise.all(flightDetailsPromises);
                setSavedFlights(flights);
            } catch (error) {
                console.error('Error fetching saved flights:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedFlights();
    }, []);

    const airportBodyTemplate = (rowData, field) => {
        return `${rowData.flightDetails[field].name} (${rowData.flightDetails[field].city}, ${rowData.flightDetails[field].country})`;
    };

    const priceBodyTemplate = (rowData) => {
        return rowData.flightDetails.Price.toFixed(2);
    };

    const editFlight = (flight) => {
        setSelectedFlight(flight);
        setNewTitle(flight.title);
        setEditDialogVisible(true);
    };

    const saveEditedFlight = async () => {
        const updatedFlight = { ...selectedFlight, title: newTitle };
        try {
            await fetch(`http://localhost:3001/Saved_Flights/${selectedFlight.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFlight),
            });
            const updatedFlights = savedFlights.map((flight) => (flight.id === updatedFlight.id ? updatedFlight : flight));
            setSavedFlights(updatedFlights);
            toast.current.show({ severity: 'success', summary: 'Erfolg', detail: 'Titel wurde aktualisiert', life: 3000 });
            setEditDialogVisible(false);
        } catch (error) {
            console.error('Error updating flight title:', error);
        }
    };

    const deleteFlight = async () => {
        try {
            await fetch(`http://localhost:3001/Saved_Flights/${flightToDelete.id}`, {
                method: 'DELETE',
            });
            const updatedFlights = savedFlights.filter((f) => f.id !== flightToDelete.id);
            setSavedFlights(updatedFlights);
            toast.current.show({ severity: 'success', summary: 'Erfolg', detail: 'Flug wurde gelöscht', life: 3000 });
            setDeleteDialogVisible(false);
        } catch (error) {
            console.error('Error deleting flight:', error);
        }
    };

    const confirmDelete = (flight) => {
        setFlightToDelete(flight);
        setDeleteDialogVisible(true);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editFlight(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDelete(rowData)} />
            </div>
        );
    };

    return (
        <div className='m-7'>
            <h2>Ihre gespeicherten Flüge</h2>
            <Toast ref={toast} />
            <DataTable value={savedFlights} paginator rows={8} dataKey="id" loading={loading} emptyMessage="No saved flights found.">
                <Column field="title" header="Title" style={{ minWidth: '14rem' }} />
                <Column field="departure_Airport.name" header="Departure Airport" body={(rowData) => airportBodyTemplate(rowData, 'departure_Airport')} style={{ minWidth: '12rem' }} />
                <Column field="arrival_Airport.name" header="Arrival Airport" body={(rowData) => airportBodyTemplate(rowData, 'arrival_Airport')} style={{ minWidth: '12rem' }} />
                <Column field="departure_Time" header="Departure Time" body={(rowData) => rowData.flightDetails.departure_Time} style={{ minWidth: '6rem' }} />
                <Column field="arrival_Time" header="Arrival Time" body={(rowData) => rowData.flightDetails.arrival_Time} style={{ minWidth: '6rem' }}  />
                <Column field="Class" header="Class" body={(rowData) => rowData.flightDetails.Class} style={{ minWidth: '11rem' }} />
                <Column field="Price" header="Price" body={priceBodyTemplate} style={{ minWidth: '6rem' }}  />
                <Column field="Airline" header="Airline" body={(rowData) => rowData.flightDetails.Airline} style={{ minWidth: '8rem' }} />
                <Column body={actionBodyTemplate} header="Actions" style={{ minWidth: '7rem' }} />
            </DataTable>
            <Dialog header="Titel bearbeiten" visible={editDialogVisible} onHide={() => setEditDialogVisible(false)}>
                <div className="flex flex-column gap-2">
                    <label htmlFor="newTitle">Neuer Titel</label>
                    <InputText id="newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div className="flex justify-content-end gap-2 mt-4">
                    <Button label="Abbrechen" icon="pi pi-times" className="p-button-text" onClick={() => setEditDialogVisible(false)} />
                    <Button label="Speichern" icon="pi pi-check" className="p-button-primary" onClick={saveEditedFlight} />
                </div>
            </Dialog>
            <Dialog header="Flug löschen" visible={deleteDialogVisible} onHide={() => setDeleteDialogVisible(false)}>
                <p>Möchten Sie diesen Flug wirklich löschen?</p>
                <div className="flex justify-content-end gap-2 mt-4">
                    <Button label="Abbrechen" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialogVisible(false)} />
                    <Button label="Löschen" icon="pi pi-check" className="p-button-danger" onClick={deleteFlight} />
                </div>
            </Dialog>
        </div>
    );
}