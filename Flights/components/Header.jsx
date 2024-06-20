import React from 'react';

export default function Header() {
    

  return (
    <div class="w-full flex flex-row bg-primary justify-content-center">
        
        <h1 class="font-italic">Flights<i className="pi pi-map-marker" style={{ color: 'slateblue' }}></i></h1>
        <div>
            <i className="pi pi-user" style={{ color: 'slateblue' }}></i>
        </div>
    </div>
  );
};

