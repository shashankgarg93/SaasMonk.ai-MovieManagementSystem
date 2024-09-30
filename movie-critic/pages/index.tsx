import { trpc } from "../utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";

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
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">MOVIECRITIC</h1>
        <div>
          <button 
            className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => router.push("/add-movie")}
          >
            Add new movie
          </button>
          <button 
            className="bg-purple-500 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/add-review")}
          >
            Add new review
          </button>
        </div>
      </header>

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
            <div>
              <h3 className="text-lg font-bold text-gray-800">{movie.name}</h3>
              <p className="text-sm text-gray-600">Released: {new Date(movie.releaseDate).toDateString()}</p>
              <p className="text-sm text-gray-600 mt-2">Rating: {movie.averageRating?.toFixed(2) ?? "No ratings yet"}/10</p>
            </div>
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
}
