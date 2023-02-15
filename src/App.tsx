import React from "react";
import "./App.css";
import Footer from "./components/pageLayout/footer/footer";
import Search from "./components/seach/search";
import ProductCard from "./components/productCard/productCard";
function App() {
    return (
        <div>
            <Search />
            <ProductCard />
            <Footer />
        </div>
    );
}

export default App;
