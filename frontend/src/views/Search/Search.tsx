import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

import Default from '../../layouts/Default';
import PokemonCard from '../../features/pokemon/PokemonCard';
import PokemonCardLoading from '../../features/pokemon/PokemonCardLoading';
import TypeChip from '../../features/pokemon/TypeChip';
import EmptyState from '../../components/EmptyState';

import { request } from '../../utils/ky';
import { TYPE_NAMES } from '../../styles/typeColors';
import whereIsPokemon from '../../features/images/where-is-pokemon.webp';

interface ListEntry {
  name: string;
  url: string;
}

// Self-fetching cards stay performant only in bounded numbers, so the grid is
// capped and the count makes the cap explicit.
const RESULT_CAP = 36;

const Search = () => {
  const [all, setAll] = useState<ListEntry[]>([]);
  const [listStatus, setListStatus] = useState<'loading' | 'idle' | 'failed'>(
    'loading',
  );
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<string | null>(null);
  const [typeMembers, setTypeMembers] = useState<Set<string> | null>(null);
  const [typeLoading, setTypeLoading] = useState(false);

  useEffect(() => {
    let active = true;
    request
      .get('pokemon?limit=100000')
      .json<{ results: ListEntry[] }>()
      .then((data) => {
        if (!active) return;
        setAll(data.results);
        setListStatus('idle');
      })
      .catch(() => active && setListStatus('failed'));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!activeType) {
      setTypeMembers(null);
      return;
    }
    let active = true;
    setTypeLoading(true);
    request
      .get(`type/${activeType}`)
      .json<{ pokemon: { pokemon: ListEntry }[] }>()
      .then((data) => {
        if (!active) return;
        setTypeMembers(new Set(data.pokemon.map((p) => p.pokemon.name)));
      })
      .catch(() => active && setTypeMembers(new Set()))
      .finally(() => active && setTypeLoading(false));
    return () => {
      active = false;
    };
  }, [activeType]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (typeMembers && !typeMembers.has(p.name)) return false;
      return true;
    });
  }, [all, query, typeMembers]);

  const shown = filtered.slice(0, RESULT_CAP);
  const busy = listStatus === 'loading' || typeLoading;

  return (
    <Default>
      <div className="container">
        <div className="page-head">
          <span className="eyebrow">Find a Pokemon</span>
          <h1 className="page-head__title">Search the Pokedex</h1>
          <p className="page-head__lead">
            Type a name to find a species, or pick a type to see what belongs to
            it. Open any result for its full dex entry.
          </p>
        </div>

        <div className="search-toolbar">
          <label className="search-field">
            <SearchOutlined aria-hidden style={{ color: 'var(--text-muted)' }} />
            <input
              type="search"
              placeholder="Search by name, e.g. pikachu"
              aria-label="Search pokemon by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <span className="search-count">
            {busy
              ? 'Loading...'
              : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`}
          </span>
        </div>

        <div
          className="type-filter"
          role="group"
          aria-label="Filter by type"
        >
          {TYPE_NAMES.map((t) => (
            <button
              key={t}
              type="button"
              className="type-filter__btn"
              aria-pressed={activeType === t}
              onClick={() => setActiveType(activeType === t ? null : t)}
            >
              <TypeChip type={t} />
            </button>
          ))}
          {activeType && (
            <button
              type="button"
              className="btn btn--ghost"
              style={{ padding: '4px 12px', fontSize: '0.82rem' }}
              onClick={() => setActiveType(null)}
            >
              <CloseOutlined aria-hidden /> Clear type
            </button>
          )}
        </div>

        {listStatus === 'failed' ? (
          <EmptyState
            title="Couldn't reach the Pokedex"
            body="Something went wrong reaching PokeAPI. Try again in a moment."
          />
        ) : busy ? (
          <div className="pokemon-grid" aria-busy="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <PokemonCardLoading key={i} />
            ))}
          </div>
        ) : shown.length === 0 ? (
          <EmptyState
            image={whereIsPokemon}
            imageAlt="A Pokemon hiding"
            title="No Pokemon match that search"
            body="Try a different name, or clear the type filter."
            actions={
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setQuery('');
                  setActiveType(null);
                }}
              >
                Clear search
              </button>
            }
          />
        ) : (
          <>
            <div className="pokemon-grid">
              {shown.map((p) => (
                <PokemonCard key={p.name} pokemon={p} />
              ))}
            </div>
            {filtered.length > RESULT_CAP && (
              <p
                className="pokedex-meta"
                style={{ justifyContent: 'center', marginTop: 32 }}
              >
                Showing the first {RESULT_CAP} of {filtered.length}. Refine your
                search to narrow it down, or{' '}
                <Link to="/catalog" style={{ color: 'var(--accent)' }}>
                  page through the full catalogue
                </Link>
                .
              </p>
            )}
          </>
        )}
      </div>
    </Default>
  );
};

export default Search;
