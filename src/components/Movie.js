import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

const Container = styled.div`
  height: 240px;
  width: 100%;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px, 6px rgba(0, 0, 0, 0.23);
  /* overflow: hidden; */
  margin-bottom: 20px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, movie, isLiked }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE, { variables: { id: +id } });
  return (
    <Container>
      <Link to={`/${id}`}>
        {/* <img src={`${movie.medium_cover_image}`} alt="pic" height="300px"></img> */}
        <Poster bg={`${movie.medium_cover_image}`}></Poster>
        <div>{movie.title.slice(0, 15)}</div>
      </Link>
      {/* <button onClick={isLiked ? null : likeMovie}>
        {isLiked ? "Unlike" : "Like"}
      </button> */}
    </Container>
  );
};

export default Movie;
