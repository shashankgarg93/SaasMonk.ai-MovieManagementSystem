import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';

const MovieReviews = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, isLoading } = trpc.movie.getMovieById.useQuery({id:Number(id)});
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold">{movie.name}</h1>
      <p className="text-xl text-blue-600">{movie.averageRating?.toFixed(2) || 'No reviews yet'} / 10</p>

      {/* Display all reviews */}
      <div className="mt-8">
        {movie.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          movie.reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-4 rounded-md mb-4 shadow">
              <p className="text-lg">{review.reviewText}</p>
              <p className="text-sm text-gray-500">By {review.reviewer || 'Anonymous'}</p>
              <p className="text-blue-600">{review.rating}/10</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
