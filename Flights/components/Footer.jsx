
import React from 'react';
import { Toolbar } from 'primereact/toolbar';

export default function Footer() {

    const centerContent = (      
        <div>
        <div class="font-italic text-center"><h2 style={{'margin-bottom':'0.3rem' }}>©Flights</h2><div className="text-center"style={{'border-top': 'solid', 'padding-top': '0.6rem'}}>From Loris & Roman</div>
</div>
         </div>      
    );

    return (
        <div className="card">
            <Toolbar center={centerContent} className="bg-gray-900 shadow-2" style={{ 'border-top-left-radius': '3rem', 'border-top-right-radius': '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
        </div>
    );
}
        