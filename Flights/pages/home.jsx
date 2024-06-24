import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SearchFlight from 'components/SearchFlight';

export default function HomePage() {



  return (
    <div>
        <Header></Header>
        <br />
        <br />
        <SearchFlight></SearchFlight>
        <br />
        <br />
        <br />
        <Footer></Footer>
    </div>
  );
};
