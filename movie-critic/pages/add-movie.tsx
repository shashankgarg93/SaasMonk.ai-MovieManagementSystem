import { useState } from "react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

export default function AddMoviePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const createMovie = trpc.movie.addMovie.useMutation({
    onSuccess: () => {
      router.push("/"); // Redirect to home after adding movie
    },
  });

  const handleCreateMovie = () => {
    if (name && releaseDate) {
      createMovie.mutate({
        name,
        releaseDate,
      });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Add new movie</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded-md mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Release date"
          className="w-full p-2 border rounded-md mb-4"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md w-full"
          onClick={handleCreateMovie}
        >
          Create movie
        </button>
      </div>
    </div>
  );
}
