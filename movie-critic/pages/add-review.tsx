import { useState } from "react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

export default function AddReviewPage() {
  const router = useRouter();
  const { data: movies } = trpc.movie.getMovies.useQuery();
  const [movieId, setMovieId] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const createReview = trpc.review.addReview.useMutation({
    onSuccess: () => {
      router.push("/"); // Redirect to home after adding review
    },
  });

  const handleCreateReview = () => {
    if (movieId && rating) {
      createReview.mutate({
        movieId: Number(movieId),
        reviewerName,
        rating: Number(rating),
        reviewText: ""
      });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Add new review</h2>
        <select
          className="w-full p-2 border rounded-md mb-4"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        >
          <option value="" disabled>Select a movie</option>
          {movies?.map((movie) => (
            <option key={movie.id} value={movie.id}>{movie.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Your name"
          className="w-full p-2 border rounded-md mb-4"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating out of 10"
          className="w-full p-2 border rounded-md mb-4"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min={1}
          max={10}
        />
        <textarea
          placeholder="Review comments"
          className="w-full p-2 border rounded-md mb-4"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md w-full"
          onClick={handleCreateReview}
        >
          Add review
        </button>
      </div>
    </div>
  );
}
