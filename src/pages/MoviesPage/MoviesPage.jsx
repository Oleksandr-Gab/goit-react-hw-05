import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearchBar from "../../components/MovieSearchBar/MovieSearchBar";
import { FadeLoader } from "react-spinners";
import { fetchMovies } from "../../movie-api";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const notifyInfo = () => toast.error("Nothing was found for your request!");
const notifyErro = () => toast.error("Oops!Error!Reload!");

export default function MoviePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState({});
    const [params, setParams] = useSearchParams();

    const query = params.get("query");

    useEffect(() => {
        if (!query) return;
        async function getMovies() {
            try {
                setIsLoading(true);
                setFilms({});
                const data = await fetchMovies("search/movie", query);
                data.results.length > 0 ? setFilms(data.results) : notifyInfo();
            } catch (e) {
                notifyErro();
            } finally {
                setIsLoading(false);
            }
        }
        getMovies();
    }, [query]);

    const handleSearch = (query) => {
        params.set("query", query);
        setParams(params);
    };

    return (
        <>
            <MovieSearchBar onSearch={handleSearch} />
            {isLoading && <FadeLoader color="#3646d6" />}
            {films.length > 0 && <MovieList movies={films} />}
            <Toaster />
        </>
    );
}
