import Thumbnail from "./Thumbnail";

const Row = ({ title, movies }) => {
  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-56 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="flex items-center space-x-0.5 scrollbar-none overflow-x-scroll md:space-x-4 md:p-2">
        {movies.map((movie) => (
          <Thumbnail key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Row;
