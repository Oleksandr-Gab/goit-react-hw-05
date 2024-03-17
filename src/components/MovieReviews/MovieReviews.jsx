import { useEffect, useState } from "react";
import { fetchMovies } from "../../movie-api";
import { useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";

const notifyErro = () => toast.error("Oops!Error!Reload!");

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { movieId } = useParams();

    useEffect(() => {
        const getReview = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMovies(`movie/${movieId}/reviews`);
                setReviews(data.results);
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
            {isLoading && <Loader />}
            {reviews.length > 0 && (
                <ul>
                    {reviews.map(({ id, author, content }) => (
                        <li key={id}>
                            <h3>{author}</h3>
                            <p>{content}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
            {reviews.length == 0 && (
                <p>We dont have any reviews for this movie</p>
            )}
            <Toaster />
        </>
    );
}
