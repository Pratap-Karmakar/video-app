import Login from "@/components/Login";
import MovieDetails from "@/components/MovieDetails";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

const MovieDetailPage = ({ movie }) => {
  const { data: session } = useSession();
  const [showPlayer, setShowPlayer] = useState(false);

  if (!session) return <Login />;

  //   The code finds the index of the movie trailer in the videos array of the movie prop. It uses the findIndex method to find the first element in the array that has a type property equal to "Trailer". The index is stored in the trailerIndex variable.
  const trailerIndex = movie.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  //   The trailerURL variable is created using the trailerIndex to access the key property of the trailer from the videos array. It constructs a YouTube URL by appending the key to the base URL.
  const trailerURL = `https://www.youtube.com/watch?v=${movie.videos?.results[trailerIndex]?.key}`;

  return (
    <div>
      <MovieDetails
        movie={movie}
        showPlayer={showPlayer}
        setShowPlayer={setShowPlayer}
        trailerURL={trailerURL}
      />
    </div>
  );
};

// The getServerSideProps function is an asynchronous server-side data fetching function provided by Next.js. It runs on the server side before rendering the component. It takes a context object as an argument, which contains information about the current request.
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;

  //   A request is made to the Movie Database API to fetch movie details using the fetch function.
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
  )
    //   The response from the API is converted to JSON using the response.json() method, and the result is assigned to the request variable.
    .then((response) => response.json());

  // The getServerSideProps function returns an object with a props property. The props object includes the session and movie data, which will be passed as props to the MovieDetailPage component.
  return {
    props: {
      session,
      movie: request,
    },
  };
}

export default MovieDetailPage;
