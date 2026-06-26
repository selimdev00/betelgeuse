import type { Pokemon } from '../features/pokemon/types';

import whereIsPokemonImage from '../features/images/where-is-pokemon.webp';

/** Best available artwork for a Pokemon, with a graceful fallback. */
export function pokemonArtwork(pokemon?: Pokemon): string {
  const other = pokemon?.sprites?.other;
  return (
    other?.['official-artwork']?.front_default ||
    other?.dream_world?.front_default ||
    other?.home?.front_default ||
    pokemon?.sprites?.front_default ||
    whereIsPokemonImage
  );
}

/** National dex id, from the detail payload or parsed from a list url. */
export function dexId(input?: Pokemon | string): number | undefined {
  if (!input) return undefined;
  if (typeof input !== 'string') return input.id;
  const match = input.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : undefined;
}

/** Zero-padded dex label, e.g. 1 -> "001". */
export function dexLabel(id?: number): string {
  if (!id && id !== 0) return '---';
  return String(id).padStart(3, '0');
}

/** PokeAPI height is in decimetres; present as metres. */
export function formatHeight(height?: number): string {
  if (height == null) return '--';
  return `${(height / 10).toFixed(1)} m`;
}

/** PokeAPI weight is in hectograms; present as kilograms. */
export function formatWeight(weight?: number): string {
  if (weight == null) return '--';
  return `${(weight / 10).toFixed(1)} kg`;
}

export const capitalize = (s: string): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
