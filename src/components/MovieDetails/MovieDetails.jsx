// import { getPosterFilm } from "../../movie-api";

export default function MovieDetails({
    film: { title, release_date, poster_path, overview, genres, vote_average },
}) {
    const genderSting = genres.map((genre) => genre.name).join(" ");
    const year = release_date.slice(0, 4);
    const score = Math.round(vote_average * 10);

    return (
        <>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={title}
                />
                <div>
                    <h2>
                        {title}({year})
                    </h2>
                    <p>User score: {score}%</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    <p>{genderSting}</p>
                </div>
            </div>
            <hr />
        </>
    );
}
