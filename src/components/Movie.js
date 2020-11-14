import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ id, movie }) => {
  return (
    <>
      <Link to={`/${id}`}>
        <div>{id}</div>
        <img src={`${movie.medium_cover_image}`} alt="pic" height="300px"></img>
      </Link>
    </>
  );
};

export default Movie;
