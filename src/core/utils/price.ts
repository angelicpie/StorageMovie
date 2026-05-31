import {  type PriceInput } from '@/core';

export function calculatePrice(movie: PriceInput): number {
  const releaseDate = movie.air_date ?? movie.release_date;
  
  if (!releaseDate) return 19.99;

  const releaseYear = new Date(releaseDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsOld = currentYear - releaseYear;

  const price = 19.99 - yearsOld;

  return Math.max(price, 4.99);
}