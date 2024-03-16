import { useEffect, useState } from "react";
import { fetchMovies } from "../../movie-api";
import { useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { FadeLoader } from "react-spinners";

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
                console.log(data.cast);
            } catch (e) {
                notifyErro();
            } finally {
                setIsLoading(false);
            }
        };
        getReview();
    }, [movieId]);

    return (
        <>
            {isLoading && <FadeLoader color="#3646d6" />}
            {cast && (
                <ul>
                    {cast.map(({ id, name, character, profile_path }) => (
                        <li key={id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${profile_path}`}
                                alt={name}
                            />
                            <p>{name}</p>
                            <p> Character: {character}</p>
                        </li>
                    ))}
                </ul>
            )}
            <Toaster />
        </>
    );
}
