import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SavedFlights from 'components/SavedFlights';

export default function UserPage() {


  return (
    <div>
      <Header></Header>
      <br />
   
      <br />
      <br />
      <SavedFlights></SavedFlights>
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
};

//export async function getStaticProps(context) { 
//  return { 
//    props: { secured: true } 
//  } 
//}
