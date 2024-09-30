import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';

const MovieReviews = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie } = trpc.movie.getMovieById.useQuery({id:Number(id)});

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>{movie.name}</h1>
      <p>Released: {new Date(movie.releaseDate).toDateString()}</p>
      <p>Average Rating: {movie.averageRating?.toFixed(2) || 'N/A'}</p>

      <h2 className="mt-4">Reviews</h2>
      <div>
        {movie.reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          movie.reviews.map((review) => (
            <div key={review.id} className="border p-2 rounded my-2">
              <p>
                {review.rating}/10 - {review.reviewText}
              </p>
              <p>{review.reviewer || 'Anonymous'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
