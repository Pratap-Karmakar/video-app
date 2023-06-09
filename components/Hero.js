import React, { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";

const Hero = ({ moviePosters }) => {
  const [movie, setMovie] = useState();

  // also needed in the movieDetail page, we are sending this as peops
  const [trailer, setTrailer] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  // The component uses the useEffect hook to fetch movie details and set the trailer URL whenever the moviePosters prop changes. This useEffect will run every time moviePosters changes.

  useEffect(
    () => {
      // Inside the useEffect, a random movie from the moviePosters array is selected using Math.random() and Math.floor(). The selected movie is stored in the mov variable.
      const mov = moviePosters[Math.floor(Math.random() * moviePosters.length)];

      // Then, a fetch request is made to the TMDB API to get more details about the selected movie.
      fetch(
        `https://api.themoviedb.org/3/movie/${mov.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      )
        // The response is converted to JSON using the res.json() method.
        .then((res) => res.json()) 

        // The data from the response is logged to the console.
        .then((data) => {
          console.log(`data::: `, data);

          // The videos property of the data object contains an array of videos associated with the movie. The code searches for a video with the type "Trailer" using the findIndex() method.
          const trailerIndex = data.videos.results.findIndex(
            (element) => element.type === "Trailer"
          );

          // here we are creating the youtube link of the video and every data which is coming from tmdb has a unique key and that key is the exact link for that exact video on youtube

          // If a trailer is found, the YouTube URL for that trailer is created using the unique key of the video. The URL is stored in the trailerURL variable.
          const trailerURL = `https://www.youtube.com/watch?v=${data.videos?.results[trailerIndex]?.key}`;

          // The trailerURL is then set as the value of the trailer state variable using the setTrailer() function.
          setTrailer(trailerURL);
        });
      // The selected movie (mov) is set as the value of the movie state variable using the setMovie() function.
      setMovie(mov);
    },
    // The useEffect dependency array [moviePosters] ensures that the effect runs whenever moviePosters changes.
    [moviePosters]
  );

  console.log(moviePosters);



  return (
    <div>
      {/* we are sending the movie,  showPlayer, setShowPlayer, trailerURL states from useState as props */}
      <MovieDetails
        movie={movie}
        showPlayer={showPlayer}
        setShowPlayer={setShowPlayer}
        trailerURL={trailer}
      />
    </div>
  );
};

export default Hero;
