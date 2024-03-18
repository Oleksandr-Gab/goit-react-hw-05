import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearchBar from "../../components/MovieSearchBar/MovieSearchBar";
import { fetchMovies } from "../../movie-api";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const notifyInfo = () => toast.error("Nothing was found for your request!");
const notifyErro = () => toast.error("Oops!Error!Reload!");

export default function MoviePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState([]);
    const [loadBtn, setLoadBtn] = useState(false);
    const [params, setParams] = useSearchParams();

    const pageDefolt = 1;
    const query = params.get("query");
    const page = params.get("page") ?? pageDefolt;

    useEffect(() => {
        if (!query) return;
        async function getMovies() {
            try {
                setLoadBtn(false);
                setFilms({});
                setIsLoading(true);
                const data = await fetchMovies("search/movie", query, page);
                data.results.length > 0 ? setFilms(data.results) : notifyInfo();
                if (data.total_pages > page) {
                    setLoadBtn(true);
                }
            } catch (e) {
                notifyErro();
            } finally {
                setIsLoading(false);
            }
        }
        getMovies();
    }, [query, page]);

    const handleSearch = (newQuery) => {
        if (query === newQuery) return;
        params.set("query", newQuery);
        params.set("page", pageDefolt);
        setParams(params);
    };

    const handleLoadMoreBtn = () => {
        const newPage = +page + 1;
        params.set("page", newPage);
        setParams(params);
    };

    return (
        <div className={css.wrapper}>
            <MovieSearchBar onSearch={handleSearch} />
            {films.length > 0 && <MovieList movies={films} />}
            {loadBtn && !isLoading && (
                <LoadMoreBtn onLoad={handleLoadMoreBtn} />
            )}
            {isLoading && <Loader />}
            <Toaster />
        </div>
    );
}
