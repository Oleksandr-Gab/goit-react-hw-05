import { Routes, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage/HomePage";
import Navigation from "../Navigation/Navigation";
import MoviePage from "../../pages/MoviesPage/MoviesPage";

function App() {
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviePage />} />
            </Routes>
        </div>
    );
}

export default App;
