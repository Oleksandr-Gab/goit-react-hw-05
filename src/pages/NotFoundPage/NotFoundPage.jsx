import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            Oops! The page is not found! <Link to="/">Back to Home Page</Link>
        </div>
    );
}
