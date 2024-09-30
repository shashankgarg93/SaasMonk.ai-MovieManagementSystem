import { initTRPC } from '@trpc/server';
import { prisma } from './context';
import { z } from "zod";

const t = initTRPC.create();

export const movieRouter = t.router({
  getMovies: t.procedure.query(async () => {
    return await prisma.movie.findMany({
      include: {
        reviews: true,
      },
    });
  }),
  getMovieById: t.procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.movie.findUnique({
        where: { id: input.id },
        include: { reviews: true },
      });
    }),
  addMovie: t.procedure
    .input(
      z.object({
        name: z.string(),
        releaseDate: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.movie.create({
        data: {
          name: input.name,
          releaseDate: new Date(input.releaseDate),
        },
      });
    }),
  editMovie: t.procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        releaseDate: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.movie.update({
        where: { id: input.id },
        data: {
          name: input.name,
          releaseDate: new Date(input.releaseDate),
        },
      });
    }),
  deleteMovie: t.procedure
    .input(z.number())
    .mutation(async ({ input }) => {
      await prisma.review.deleteMany({ where: { movieId: input } });
      return await prisma.movie.delete({ where: { id: input } });
    }),
});

export const reviewRouter = t.router({
  getReviewsByMovieId: t.procedure
    .input(
      z.object({
        movieId: z.number(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.review.findMany({
        where: { movieId: input.movieId },
      });
    }),
  addReview: t.procedure
    .input(
      z.object({
        movieId: z.number(),
        reviewerName: z.string().optional(),
        rating: z.number().max(10),
        reviewText: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const review = await prisma.review.create({
        data: {
          movieId: input.movieId,
          reviewer: input.reviewerName,
          rating: input.rating,
          reviewText: input.reviewText,
        },
      });

      // Update movie average rating
      const reviews = await prisma.review.findMany({
        where: { movieId: input.movieId },
      });
      const averageRating =
        reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

      await prisma.movie.update({
        where: { id: input.movieId },
        data: { averageRating },
      });

      return review;
    }),
});

export const appRouter = t.router({
  movie: movieRouter,
  review: reviewRouter,
});

export type AppRouter = typeof appRouter;
