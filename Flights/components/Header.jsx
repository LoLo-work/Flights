
import React from 'react';
import { Toolbar } from 'primereact/toolbar';

export default function Header() {
    //Add link to homepage!
    const startContent = (
        <React.Fragment>
                <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-home text-2xl"></i>
                </button>
        </React.Fragment>
    );

    const centerContent = (      
        <div>
            <h1 class="font-italic">Flights
            <div className="inline-flex justify-content-center align-items-center text-white w-3rem">
                <i className="pi pi-map-marker text-2xl"></i>
            </div>
            </h1>
         </div>      
    );

    //Add link to Users!
    const endContent = (
        <React.Fragment>
            <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-user text-2xl"></i>
            </button>
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} className="bg-gray-900 shadow-2" style={{ 'border-bottom-left-radius': '3rem', 'border-bottom-right-radius': '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
        </div>
    );
}
        