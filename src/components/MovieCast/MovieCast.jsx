import { useEffect, useState } from "react";
import { fetchMovies } from "../../movie-api";
import { useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const notifyErro = () => toast.error("Oops!Error!Reload!");

export default function MovieReviews() {
    const [cast, setCast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { movieId } = useParams();

    useEffect(() => {
        const getReview = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMovies(`movie/${movieId}/credits`);
                setCast(data.cast);
            } catch (e) {
                notifyErro();
            } finally {
                setIsLoading(false);
            }
        };
        getReview();
    }, [movieId]);

    const defaultActor = `https://clipart-library.com/2023/img_533545.png`;

    return (
        <>
            {isLoading && <Loader />}
            {cast && (
                <ul className={css.list}>
                    {cast.map(({ id, name, character, profile_path }) => (
                        <li key={id} className={css.item}>
                            <img
                                src={
                                    profile_path !== null
                                        ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                                        : defaultActor
                                }
                                alt={name}
                                width="300"
                            />
                            <div>
                                <p>{name}</p>
                                <p> Character: {character}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <Toaster />
        </>
    );
}
