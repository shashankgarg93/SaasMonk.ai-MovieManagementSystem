import { trpc } from "../utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

interface Movie {
    id: number;
    name: string;
    releaseDate: string; // or Date depending on how you handle dates
    averageRating?: number | null; // Since it's optional and can be null if no ratings
  }
  const MovieCard = ({ movie }: { movie: Movie }) => {
    return (
    <Link href={`/movies/${movie.id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer">
        <h2 className="text-xl font-semibold">{movie.name}</h2>
        <p className="text-gray-600">Released on: {movie.releaseDate}</p>
        <p className="text-yellow-500">Rating: {movie.averageRating || 'No reviews yet'}</p>
      </div>
    </Link>
  );
};

export default function HomePage() {
  const router = useRouter();
  const { data: movies } = trpc.movie.getMovies.useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = movies?.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Top Bar */}


      {/* Search Bar */}
      <div className="flex justify-center my-8">
        <input
          className="border p-2 w-full max-w-md rounded-md shadow-sm"
          type="text"
          placeholder="Search for your favourite movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies?.map((movie) => (
          <div
            key={movie.id}
            className="bg-purple-100 p-4 border rounded-lg shadow-md flex flex-col justify-between"
          >
            <MovieCard movie={ movie}/>
            <div className="flex justify-end mt-4">
              <button
                className="bg-yellow-400 text-white px-2 py-1 rounded-md mr-2"
                onClick={() => router.push(`/edit-movie/${movie.id}`)}
              >
                ✏️
              </button>
              <button
                className="bg-red-400 text-white px-2 py-1 rounded-md"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function handleDeleteMovie(id: number) {
  // Implement movie delete logic, ensure associated reviews are deleted
  if(id){
    trpc.movie.deleteMovie.useMutation().mutate(id);
  }
}
