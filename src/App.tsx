import React from "react";
import "./App.css";
import { AreaCard } from "./components/homePage/AreaCard/AreaCard";
import { InformationCard } from "./components/homePage/InformationCard/InformationCard";
function App() {
    return (
        <div>
            <AreaCard width="500px" />
            <InformationCard />
        </div>
    );
}

export default App;
