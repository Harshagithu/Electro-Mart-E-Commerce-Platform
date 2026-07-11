import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container py-5 text-center">
    <h1 className="display-4">404</h1>
    <p className="text-muted">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn btn-primary">Go Home</Link>
  </div>
);

export default NotFound;
