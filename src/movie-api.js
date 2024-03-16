import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const fetchMovies = async (url, query, page) => {
    const response = await axios.request({
        method: "GET",
        url,
        params: {
            include_adult: "false",
            language: "en-US",
            page,
            query,
        },
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODQ3ODBlYjU4YThhMzRmZmFiZmRhZjY4ZGI4NWNjNiIsInN1YiI6IjY1ZWRlODhmNDE0NjVjMDE2M2ExODU0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zu2ttT0de0KckdgovZkwZBTUtPPqX9qEj7HoFHvioBs",
        },
    });
    return response.data;
};
