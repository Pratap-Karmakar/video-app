import { baseUrl } from "@/utils/constant";
import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

// if we import the react-player like this then there is show a dehydration erro every time when er reload the page
// import ReactPlayer from "react-player";

// to avoid the dehydration error we need to import the react-player like this
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

// this movie the the initial state which is in the Hero component
const MovieDetails = ({ movie, setShowPlayer, trailerURL, showPlayer }) => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-col space-y-2 py-16 md:space-x-4 h-[100vh] justify-center lg:pb-12">
          <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
            {/* the baseUrl is coming from the constant file which is in the utils folder */}
            {/* if we have backdrop_path then it will be shown othewise it will shown the poster_path image */}
            <Image
              fill
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              className="object-fill md:object-fill"
              alt="movie poster"
            />
          </div>

          <h1 className="text-2xl ml-4 md:ml-0 font-bold md:text-4xl lg:text-6xl text-white">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="max-w-xs text-xs md:max-w-lg md:text-md lg:max-w-2xl text-gray-200 lg:text-xl ml-4 md:ml-0">
            {movie?.overview}
          </p>

          <div className="flex space-x-3 ml-4 md:ml-0">
            <button
              className="bannerButton bg-white text-black"
              onClick={() => setShowPlayer(true)}
            >
              <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
              Play
            </button>
            <button className="bannerButton bg-gray-500">
              <IoInformationCircle className="h-5 w-5 md:h-8 md:w-8" />
              More Info
            </button>
          </div>
        </div>

        {/* to play the video */}
        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
            showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
          }`}
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">Play Trailer</span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={() => setShowPlayer(false)}
            >
              <AiOutlineClose className="h-5" />
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={trailerURL}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
