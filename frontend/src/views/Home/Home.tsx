import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Default from '../../layouts/Default';
import { useReveal } from '../../hooks/useReveal';
import { request } from '../../utils/ky';

import heroArt from './images/1.webp';

const FEATURES = [
  {
    no: '01',
    title: 'Browse the catalogue',
    body: 'Page through every species with official artwork and a base-stat preview on each card.',
  },
  {
    no: '02',
    title: 'Search by name',
    body: 'Find any Pokemon as you type, then filter the table down to a single type.',
  },
  {
    no: '03',
    title: 'A type colour system',
    body: 'Each of the eighteen types owns a colour, so matchups read at a glance everywhere.',
  },
  {
    no: '04',
    title: 'Full base stats',
    body: 'Open any entry for HP, attack, defense and speed, plus abilities and measurements.',
  },
];

const Home = () => {
  const [count, setCount] = useState<number>();
  const featuresRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    let active = true;
    request
      .get('pokemon?limit=1')
      .json<{ count: number }>()
      .then((data) => {
        if (active) setCount(data.count);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return (
    <Default>
      <div className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">Pokedex field guide</span>
            <h1 className="hero__title">
              Every Pokemon, <em>one field guide.</em>
            </h1>
            <p className="hero__lead">
              Browse the full roster with official artwork, type matchups and
              base stats, pulled live from PokeAPI. No accounts, no noise, just
              the data.
            </p>
            <div className="hero__cta">
              <Link to="/catalog" className="btn btn--primary">
                Open the catalogue
              </Link>
              <Link to="/search" className="btn btn--ghost">
                Search by name
              </Link>
            </div>
          </div>

          <div className="hero__art">
            <img src={heroArt} alt="A group of Pokemon from the series" />
          </div>
        </section>

        <div className="stat-strip">
          <div className="stat-strip__item">
            <span className="stat-strip__num">
              {count ? count.toLocaleString() : '900'}
              <span>+</span>
            </span>
            <span className="stat-strip__label">Species catalogued</span>
          </div>
          <div className="stat-strip__item">
            <span className="stat-strip__num">18</span>
            <span className="stat-strip__label">Elemental types</span>
          </div>
          <div className="stat-strip__item">
            <span className="stat-strip__num">
              Live<span>.</span>
            </span>
            <span className="stat-strip__label">Sourced from PokeAPI</span>
          </div>
        </div>

        <section>
          <span className="eyebrow">What you can do</span>
          <div className="feature-grid reveal" ref={featuresRef}>
            {FEATURES.map((f) => (
              <article className="feature" key={f.no}>
                <span className="feature__no">{f.no}</span>
                <h2 className="feature__title">{f.title}</h2>
                <p className="feature__body">{f.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Default>
  );
};

export default Home;
