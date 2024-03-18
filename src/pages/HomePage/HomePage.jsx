import { useEffect, useState } from "react";
import { fetchMovies } from "../../movie-api";
import toast, { Toaster } from "react-hot-toast";

import css from "./HomePage.module.css";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const notify = () => toast.error("Oops!Error!Reload!");

export default function HomePage() {
    const [movies, setMoives] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMovies("trending/movie/day");
                setMoives(data.results);
            } catch (e) {
                notify();
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <>
            <h1 className={css.title}>Trending Movies</h1>

            {isLoading && <Loader />}
            {movies.length > 0 && <MovieList movies={movies} />}
            <Toaster />
        </>
    );
}
