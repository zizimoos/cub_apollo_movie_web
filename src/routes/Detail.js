import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      rating
      medium_cover_image
      description_intro
    }
    suggestions(id: $id) {
      id
      title
      description_intro
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #000;
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55%;
  width: 70%;
  margin-top: 30px;
  color: whitesmoke;
`;
const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 400px;
  width: 30%;
  margin-bottom: 20px;
  margin-right: 20px;
  background-size: cover;
  background-position: center center;
`;
const Context = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  height: 70%;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;
const Subtitle = styled.h4`
  font-size: 20px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 18px;
  line-height: 20px;
`;

const Suggestions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  width: 50%;
  position: relative;
  margin-bottom: 200px;
`;
const SuggestContext = styled.div``;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Column>
        <Poster
          bg={!loading && data.movie && `${data.movie.medium_cover_image}`}
        ></Poster>
        <Context>
          <Title>{loading ? "Loading ..." : data.movie.title}</Title>
          {!loading && (
            <>
              <Subtitle>
                {data?.movie?.language} / {data?.movie?.rating}
              </Subtitle>
              <Description>{data?.movie?.description_intro}</Description>
            </>
          )}
        </Context>
      </Column>

      {!loading && data.suggestions && (
        <div style={{ marginBottom: "50px" }}>Suggestions</div>
      )}
      <Suggestions>
        {" "}
        {!loading &&
          data.suggestions &&
          data.suggestions.map((su) => (
            <SuggestContext>
              <Link to={`/${su.id}`}>
                <img
                  src={`${su.medium_cover_image}`}
                  alt="post"
                  style={{ height: "200px" }}
                />
                <h3 style={{ fontSize: "14px" }}>{su.title.slice(0, 18)}</h3>
              </Link>
            </SuggestContext>
          ))}
      </Suggestions>
    </Container>
  );
};
export default Detail;
