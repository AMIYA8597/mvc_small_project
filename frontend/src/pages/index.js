import Image from "next/image";
import { Inter } from "next/font/google";
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import BasicCard from "../../components/Card";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import HomePage from "../../components/HomePage";
import BaseLayout from "../../components/BaseLayout";
// import App from "./App.css";
// import App from "./_app.js";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [user, setUser] = useState(null);
      return (

        <BaseLayout>
        <BasicCard/>
        </BaseLayout>
        
      );


}
