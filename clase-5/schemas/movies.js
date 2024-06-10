import z from "zod";

const currentYear = new Date().getFullYear();

const genresList = [
  "Action",
  "Adventure",
  "Crime",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Thriller",
  "Sci-Fi",
];

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z
    .number({
      invalid_type_error: "Movie year must be a number",
      required_error: "Movie year is required",
    })
    .int()
    .min(1895)
    .max(currentYear),
  director: z.string({
    invalid_type_error: "Movie director must be a string",
    required_error: "Movie director is required",
  }),
  duration: z.number({
    invalid_type_error: "Movie duration must be a number",
  }),
  poster: z.string().url({ message: "Poster must be a valid URL" }),
  genre: z.array(z.enum(genresList), {
    required_error: "Movie genre is required.",
    invalid_type_error: "Movie genre must be an array of enum Genre",
  }),
  rate: z.number().min(0).max(10).nullish(),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
