import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./page/Register/Register";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
            {/* <Search />
            <ProductCard />
            <Footer /> */}
        </BrowserRouter>
    );
}

export default App;
