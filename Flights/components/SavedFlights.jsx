import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



export default function SavedFlights() {

    const [products, setProducts] = useState([{
        VonAirport: "Zürich Kloten",
        NachAirport: "Paris Charles de Gaulle Airport",
        Date: "26.06.2024",
        StartTime: "10:35",
        LandeTime: "11:00",
        Airline: "Swiss",
        Klasse: "First Class",
        Price: 815,
        Delete: "Löschen"
  
    },{
      VonAirport: "Zürich Kloten",
      NachAirport: "London Heathrow Airport",
      Date: "07.07.2024",
      StartTime: "10:00",
      LandeTime: "12:00",
      Airline: "Swiss",
      Klasse: "First Class",
      Price: 960,
      Delete: "Löschen"
  }]);
  
    return (
        <div className='m-7'>
          <h2>Ihre Flüge</h2>
          <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="VonAirport" header="Von"></Column>
                        <Column field="NachAirport" header="Nach"></Column>
                        <Column field="Date" header="Datum"></Column>
                        <Column field="StartTime" header="Abflugszeit"></Column>
                        <Column field="LandeTime" header="Ankunftszeit"></Column>
                        <Column field="Airline" header="Airline"></Column>
                        <Column field="Klasse" header="Klasse"></Column>
                        <Column field="Price" header="Preis"></Column>
                        <Column field="Delete" header="Entfernen"></Column>
          </DataTable>
        </div>
    );
}
