import { Link } from 'react-router';

function NotFoundMessage({ title, text }) {
  return (
    <div className="not-found" role="alert">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">{title}</h1>
      <p className="not-found__text">{text}</p>
      <Link to="/" className="btn btn--primary">
        На головну
      </Link>
    </div>
  );
}

export default NotFoundMessage;
