import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Register from 'components/Register'
import Login from 'components/Login'
export default function AuthPage() {



  return (
    <div>
        <Header></Header>
        <br />
        <Login></Login>
        <br />
        <br />
        <br />
        <Register></Register>
        <br />
        <br />
        <Footer></Footer>
    </div>
  );
};
