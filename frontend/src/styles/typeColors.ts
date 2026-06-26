// Type colour lookup. Mirrors the CSS custom properties in tokens.css so chips,
// card glow, and modal ribbon all draw from one source keyed by PokeAPI type name.

export interface TypeColor {
  solid: string;
  soft: string;
  on: string;
}

export const TYPE_NAMES = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
] as const;

export type TypeName = (typeof TYPE_NAMES)[number];

export const TYPE_COLORS: Record<string, TypeColor> = TYPE_NAMES.reduce(
  (acc, name) => {
    acc[name] = {
      solid: `var(--type-${name}-solid)`,
      soft: `var(--type-${name}-soft)`,
      on: `var(--type-${name}-on)`,
    };
    return acc;
  },
  {} as Record<string, TypeColor>,
);

export const typeColor = (name?: string): TypeColor =>
  (name && TYPE_COLORS[name]) || TYPE_COLORS.normal;

export const STAT_COLORS: Record<string, string> = {
  hp: 'var(--stat-hp)',
  attack: 'var(--stat-attack)',
  defense: 'var(--stat-defense)',
  'special-attack': 'var(--stat-special-attack)',
  'special-defense': 'var(--stat-special-defense)',
  speed: 'var(--stat-speed)',
};

export const statColor = (name?: string): string =>
  (name && STAT_COLORS[name]) || 'var(--accent)';

// Short, readable stat labels for the bars.
export const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export const statLabel = (name: string): string =>
  STAT_LABELS[name] || name.replace(/-/g, ' ');
