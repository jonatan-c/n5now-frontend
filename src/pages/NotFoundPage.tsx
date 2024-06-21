import React from "react";
import { Link } from "react-router-dom";
// import "./_navbar.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="home-link">
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFoundPage;
