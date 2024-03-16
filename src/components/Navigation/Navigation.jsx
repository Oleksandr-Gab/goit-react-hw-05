import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { RiHomeHeartFill } from "react-icons/ri";
import { BiSolidCameraMovie } from "react-icons/bi";

import css from "./Navigation.module.css";

export default function Navigation() {
    return (
        <>
            <nav className={css.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => {
                        return clsx(css.link, isActive && css.active);
                    }}
                >
                    <div className={css.linkWrap}>
                        <RiHomeHeartFill /> Home
                    </div>
                </NavLink>
                <NavLink
                    to="/movies"
                    className={({ isActive }) => {
                        return clsx(css.link, isActive && css.active);
                    }}
                >
                    <div className={css.linkWrap}>
                        <BiSolidCameraMovie /> Movies
                    </div>
                </NavLink>
            </nav>
        </>
    );
}
