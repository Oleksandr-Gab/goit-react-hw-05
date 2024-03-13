import { useEffect, useState } from "react";
import { fetchMovies } from "../../movie-api";
import { FadeLoader } from "react-spinners";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.error("Oops!Error!Reload!");

export default function HomePage() {
    const [movies, setMoives] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMovies("trending/movie/day");
                setMoives(data);
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
            <h1>Trending Movies</h1>

            {isLoading && <FadeLoader color="#3646d6" />}
            {movies.length > 0 && <MovieList movies={movies} />}
            <Toaster />
        </>
    );
}
