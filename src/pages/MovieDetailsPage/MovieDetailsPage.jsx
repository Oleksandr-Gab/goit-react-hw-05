import { useEffect, useRef, useState } from "react";
import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useParams,
} from "react-router-dom";

import { fetchMovies } from "../../movie-api";

import toast, { Toaster } from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

const notifyErro = () => toast.error("Oops!Error!Reload!");

export default function MovieDetailsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [film, setFilm] = useState(null);

    const location = useLocation();
    const backLinkRef = useRef(location.state ?? "/movies");

    const { movieId } = useParams();
    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const data = await fetchMovies(`movie/${movieId}`);
                setFilm(data);
            } catch (e) {
                notifyErro();
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [movieId]);

    return (
        <>
            <Link to={backLinkRef.current}>Go back</Link>
            {film && <MovieDetails film={film} />}
            {isLoading && <FadeLoader color="#3646d6" />}
            <ul>
                <li>
                    <NavLink to="cast">Cast</NavLink>
                </li>
                <li>
                    <NavLink to="reviews">Reviews</NavLink>
                </li>
            </ul>
            <hr />
            <Outlet />
            <Toaster />
        </>
    );
}
