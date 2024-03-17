import css from "./MovieList.module.css";

import MovieCard from "../MovieCard/MovieCard";

export default function MovieList({ movies }) {
    return (
        <ul className={css.list}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.item}>
                    <MovieCard movie={movie} />
                </li>
            ))}
        </ul>
    );
}
