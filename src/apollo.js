import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      likeMovie: (_, { id }, { cache }) => {
        console.log(id);
        console.log(cache);
        cache.writeData({ id: `Movie:${id}`, data: { isLiked: true } });
      },
    },
  },
});

export default client;
