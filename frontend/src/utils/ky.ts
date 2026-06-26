import ky from 'ky';

// Falls back to the public PokeAPI so a clean clone builds and runs without a
// local .env; override with REACT_APP_API_URL when needed.
export const request = ky.create({
  prefixUrl: process.env.REACT_APP_API_URL || 'https://pokeapi.co/api/v2/',
});

export default ky;
