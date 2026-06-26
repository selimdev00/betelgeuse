import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import ky from '../../utils/ky';
import PokemonCardLoading from './PokemonCardLoading';
import TypeChip from './TypeChip';
import StatBar from './StatBar';

import type { Pokemon } from './types';
import { typeColor } from '../../styles/typeColors';
import {
  pokemonArtwork,
  dexId,
  dexLabel,
  capitalize,
  formatHeight,
  formatWeight,
} from '../../lib/pokemon';

interface Props {
  /** A catalogue list entry; full detail is fetched by url on mount. */
  pokemon: { name: string; url: string };
}

const PREVIEW_STATS = ['hp', 'attack', 'speed'];

const fetchPokemonWithUrl = (url: string): Promise<Pokemon> =>
  ky.get(url).json();

const PokemonCard = ({ pokemon: listEntry }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

  const load = () => {
    setLoading(true);
    setFailed(false);
    fetchPokemonWithUrl(listEntry.url)
      .then((data) => setPokemon(data))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [listEntry.url]);

  if (loading) return <PokemonCardLoading />;

  if (failed || !pokemon) {
    return (
      <div
        className="specimen-skel"
        style={{ display: 'grid', placeItems: 'center', minHeight: 320 }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
            Couldn&apos;t load this entry.
          </p>
          <button type="button" className="btn btn--ghost" onClick={load}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const primaryType = pokemon.types?.[0]?.type?.name;
  const glow = typeColor(primaryType);
  const id = dexId(pokemon);
  const art = pokemonArtwork(pokemon);

  const cardStyle = {
    '--glow': glow.soft,
    '--glow-soft': glow.soft,
  } as React.CSSProperties;

  const previewStats = PREVIEW_STATS.map((key) =>
    pokemon.stats?.find((s) => s.stat.name === key),
  ).filter(Boolean) as Pokemon['stats'];

  return (
    <>
      <button
        type="button"
        className="specimen"
        style={cardStyle}
        onClick={() => setOpen(true)}
        aria-label={`Open dex entry for ${capitalize(pokemon.name)}, number ${dexLabel(id)}`}
      >
        <span className="specimen__dexno" aria-hidden>
          {dexLabel(id)}
        </span>

        <span className="specimen__art">
          <img src={art} alt="" loading="lazy" />
        </span>

        <span className="specimen__id">No. {dexLabel(id)}</span>
        <span className="specimen__name">{capitalize(pokemon.name)}</span>

        <span className="type-row specimen__types">
          {pokemon.types?.map(({ type }) => (
            <TypeChip key={type.name} type={type.name} />
          ))}
        </span>

        <span className="specimen__stats">
          {previewStats.map((s) => (
            <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
          ))}
        </span>

        <span className="specimen__cue">View dex entry &rarr;</span>
      </button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={`${capitalize(pokemon.name)}  ·  No. ${dexLabel(id)}`}
        width={560}
        bodyStyle={{ paddingTop: 8 }}
      >
        <div
          className="dex-modal__hero"
          style={{ '--glow-soft': glow.soft } as React.CSSProperties}
        >
          <div className="dex-modal__art">
            <img
              src={art}
              alt={`${capitalize(pokemon.name)} official artwork`}
            />
          </div>
          <div className="dex-modal__heading">
            <span className="dex-modal__id">National No. {dexLabel(id)}</span>
            <h2 className="dex-modal__name">{capitalize(pokemon.name)}</h2>
            <span className="type-row">
              {pokemon.types?.map(({ type }) => (
                <TypeChip key={type.name} type={type.name} />
              ))}
            </span>
          </div>
        </div>

        <div className="dex-section">
          <h3 className="dex-section__title">Measurements</h3>
          <div className="measure-grid">
            <div className="measure">
              <div className="measure__k">Height</div>
              <div className="measure__v">{formatHeight(pokemon.height)}</div>
            </div>
            <div className="measure">
              <div className="measure__k">Weight</div>
              <div className="measure__v">{formatWeight(pokemon.weight)}</div>
            </div>
            <div className="measure">
              <div className="measure__k">Base XP</div>
              <div className="measure__v">{pokemon.base_experience ?? '--'}</div>
            </div>
          </div>
        </div>

        {pokemon.abilities?.length > 0 && (
          <div className="dex-section">
            <h3 className="dex-section__title">Abilities</h3>
            <div className="ability-row">
              {pokemon.abilities.map(({ ability }) => (
                <span key={ability.name} className="ability">
                  {ability.name.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {pokemon.stats?.length > 0 && (
          <div className="dex-section">
            <h3 className="dex-section__title">Base stats</h3>
            <div className="dex-stats">
              {pokemon.stats.map((s) => (
                <StatBar
                  key={s.stat.name}
                  name={s.stat.name}
                  value={s.base_stat}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PokemonCard;
