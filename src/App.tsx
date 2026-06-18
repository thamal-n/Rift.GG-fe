import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import "./styles/index.css";

function App() {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
}

export default App;
