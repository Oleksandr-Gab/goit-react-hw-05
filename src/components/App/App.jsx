import { Routes, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage/HomePage";
import Navigation from "../Navigation/Navigation";
import MoviePage from "../../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

function App() {
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                    <Route path="cast" element={<MovieCast />} />
                    <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
