import React from "react";
import "./App.css";
import Footer from "./components/pageLayout/footer/footer";
import Search from "./components/seach/search";
import ProductCard from "./components/productCard/productCard";
import { Navbar } from "./components/pageLayout/navbar/navbar";
import { InformationCard } from "./components/informationCard/informationCard";
function App() {
    return (
        <div>
            <InformationCard flexDir="row-reverse" />
        </div>
    );
}

export default App;
