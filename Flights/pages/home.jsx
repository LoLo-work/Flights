import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import SearchFlight from "components/FlightsTable";

export default function HomePage() {
  return (
    <div>
      <Header></Header>
      <div className="m-7 text-center">
        <br />
        <br />
        <h2>Alle Flüge</h2>
        <p>Hier sehen Sie alle Flüge, welche wir als <i>Flights©</i> anbieten</p>
        </div>

        <SearchFlight></SearchFlight>
        <div className="m-7 text-center">

        <br />
        <br />
        <br />
      </div>
      <Footer></Footer>
    </div>
  );
}
