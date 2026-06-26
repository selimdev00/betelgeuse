import React from 'react';
import { Link } from 'react-router-dom';

import Default from '../../layouts/Default';

import aboutImage from './images/about-image.webp';
import secondAboutImage from './images/about-image-2.webp';

const About = () => (
  <Default>
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">About</span>
        <h1 className="page-head__title">About this field guide</h1>
        <p className="page-head__lead">
          A small, fast reference for the Pokemon roster, built as a clean
          catalogue over the open PokeAPI data set.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-figure">
          <img src={aboutImage} alt="Pokemon illustration" />
          <img src={secondAboutImage} alt="Pokemon illustration" />
        </div>

        <div className="prose">
          <p>
            This app reads everything from PokeAPI, the open Pokemon data API,
            and presents it as a catalogue you can browse, search and filter. It
            stays deliberately simple: no accounts, no tracking, just the
            artwork and the numbers.
          </p>

          <h2>What you can do</h2>
          <p>
            Browse every species, search by name, filter the table by type, and
            open any entry for its base stats, abilities, height and weight. Each
            of the eighteen types carries its own colour, so matchups read at a
            glance on cards, in the table and in the footer legend.
          </p>

          <h2>How it works</h2>
          <p>
            The catalogue loads a page of Pokemon at a time and fetches each
            entry&apos;s details on demand. Type colours and stat bars are
            computed from the same payload, so what you see always matches the
            source. Built with React, Redux Toolkit and Ant Design, themed with
            a custom OKLCH design system.
          </p>

          <Link to="/catalog" className="btn btn--primary">
            Open the catalogue
          </Link>
        </div>
      </div>
    </div>
  </Default>
);

export default About;
