import { useEffect, useState } from "react";
import { fetchMovies } from "../../movie-api";
import { useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

const notifyErro = () => toast.error("Oops!Error!Reload!");

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadBtn, setLoadBtn] = useState(false);
    const [page, setPage] = useState(1);

    const { movieId } = useParams();

    useEffect(() => {
        const getReview = async () => {
            try {
                setLoadBtn(false);
                setIsLoading(true);
                setReviews([]);
                const data = await fetchMovies(
                    `movie/${movieId}/reviews`,
                    page
                );
                setReviews(data.results);
                if (data.total_pages > page) {
                    setLoadBtn(true);
                }
            } catch (e) {
                notifyErro();
            } finally {
                setIsLoading(false);
            }
        };
        getReview();
    }, [movieId, page]);

    const handleLoadMoreBtn = () => {
        setPage(page + 1);
    };

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
            {loadBtn && !isLoading && (
                <LoadMoreBtn onLoad={handleLoadMoreBtn} />
            )}
            <Toaster />
        </>
    );
}
