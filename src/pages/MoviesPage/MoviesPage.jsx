import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearchBar from "../../components/MovieSearchBar/MovieSearchBar";
import { FadeLoader } from "react-spinners";
import { fetchMovies } from "../../movie-api";
import toast, { Toaster } from "react-hot-toast";

const notifyInfo = () => toast.error("Nothing was found for your request!");
const notifyErro = () => toast.error("Oops!Error!Reload!");

export default function MoviePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState({});

    const handleSearch = async (search) => {
        try {
            setIsLoading(true);
            setFilms({});
            const data = await fetchMovies("search/movie", search);
            data.results.length > 0 ? setFilms(data.results) : notifyInfo();
        } catch (e) {
            notifyErro();
        } finally {
            setIsLoading(false);
        }
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
