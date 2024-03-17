import { Link, useLocation } from "react-router-dom";
import css from "./MovieCard.module.css";

export default function MovieCard({ movie: { id, title, poster_path } }) {
    const location = useLocation();

    const defaultImg = `https://upload.wikimedia.org/wikipedia/commons/5/5f/P_Movie.svg`;
    const Img = Boolean(poster_path)
        ? `https://image.tmdb.org/t/p/w300/${poster_path}`
        : defaultImg;

    return (
        <>
            <Link to={`/movies/${id}`} state={location}>
                <img src={Img} alt={title} />
                <h4 className={css.title}>{title}</h4>
            </Link>
        </>
    );
}
