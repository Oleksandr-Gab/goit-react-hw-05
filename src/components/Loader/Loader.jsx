import { FadeLoader } from "react-spinners";

import css from "./Loader.module.css";

export default function Loader() {
    return (
        <div className={css.wrapper}>
            <FadeLoader color="#3646d6" />
        </div>
    );
}
