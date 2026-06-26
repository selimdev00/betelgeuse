import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectPokemon, fetchPokemonsAsync, setLimit } from './pokemonSlice';
import PokemonCard from './PokemonCard';
import PokemonCardLoading from './PokemonCardLoading';
import EmptyState from '../../components/EmptyState';

const PokemonCatalog = () => {
  const { pokemons, status, count, limit } = useAppSelector(selectPokemon);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // Page comes from the URL every render, so back/forward stays in sync.
  const parsed = Number(params.page);
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

  useEffect(() => {
    // Normalise an invalid page in the URL to /catalog/1.
    if (params.page && (!Number.isFinite(parsed) || parsed < 1)) {
      navigate('/catalog/1', { replace: true });
      return;
    }
    dispatch(fetchPokemonsAsync({ limit, offset: (page - 1) * limit }));
  }, [dispatch, navigate, params.page, parsed, page, limit]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const handlePageChange = (nextPage: number, pageSize: number) => {
    if (pageSize !== limit) dispatch(setLimit(pageSize));
    navigate(`/catalog/${nextPage}`);
    scrollToTop();
  };

  if (status === 'loading') {
    return (
      <div className="pokemon-grid" aria-busy="true">
        {Array.from({ length: limit }).map((_, i) => (
          <PokemonCardLoading key={i} />
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <EmptyState
        title="Couldn't reach the Pokedex"
        body="Something went wrong reaching PokeAPI. Check your connection and try again."
        actions={
          <button
            type="button"
            className="btn btn--primary"
            onClick={() =>
              dispatch(
                fetchPokemonsAsync({ limit, offset: (page - 1) * limit }),
              )
            }
          >
            Try again
          </button>
        }
      />
    );
  }

  return (
    <>
      <p className="pokedex-meta">
        <strong>{count}</strong>
        <span>species catalogued. Open any card for full base stats.</span>
      </p>

      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '48px 0 8px' }}>
        <Pagination
          total={count}
          showSizeChanger
          current={page}
          pageSize={limit}
          showTotal={(total) => `${total} species`}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PokemonCatalog;
