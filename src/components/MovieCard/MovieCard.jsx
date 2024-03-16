import css from "./MovieCard.module.css";

export default function MovieCard({ movie: { title, poster_path } }) {
    const defaultImg = `./img/defoltMovie.jpg`;
    const Img = Boolean(poster_path)
        ? `https://image.tmdb.org/t/p/w300/${poster_path}`
        : defaultImg;

    return (
        <>
            <img src={Img} alt={title} />
            <h4 className={css.title}>{title}</h4>
        </>
    );
}
