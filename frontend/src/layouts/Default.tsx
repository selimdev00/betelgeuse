import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import TypeLegend from '../features/pokemon/TypeLegend';

interface LayoutProps {
  children: React.ReactNode;
}

const NAV = [
  { to: '/catalog', label: 'Catalog' },
  { to: '/search', label: 'Search' },
  { to: '/about', label: 'About' },
];

const Brand = () => (
  <Link to="/" className="brand" aria-label="Pokedex Field Guide, home">
    <span className="brand__mark" aria-hidden />
    <span className="brand__name">
      Pokedex<span>.</span>Field Guide
    </span>
  </Link>
);

const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
  <>
    {NAV.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className="nav__link"
        onClick={onNavigate}
      >
        {item.label}
      </NavLink>
    ))}
  </>
);

const Default = ({ children }: LayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Brand />

          <nav className="nav nav--desktop" aria-label="Primary">
            <NavLinks />
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuOutlined aria-hidden />
          </button>
        </div>
      </header>

      <Drawer
        title="Menu"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={280}
      >
        <nav className="drawer-nav" aria-label="Primary">
          <NavLinks onNavigate={() => setDrawerOpen(false)} />
        </nav>
      </Drawer>

      <main id="main" tabIndex={-1} className="main">
        {children}
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p className="footer-brand__tag">
                A field guide to the Pokemon roster. Every species, with
                artwork, type matchups and base stats, read live from PokeAPI.
              </p>
            </div>

            <div className="footer-links">
              <h4>Explore</h4>
              <Link to="/catalog">Catalog</Link>
              <Link to="/search">Search by name</Link>
              <Link to="/about">About</Link>
              <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
                PokeAPI
              </a>
            </div>
          </div>

          <div className="footer-legend">
            <div className="footer-legend__label">The eighteen types</div>
            <TypeLegend />
          </div>

          <div className="footer-bottom">
            <span>Data by PokeAPI. Artwork (c) Nintendo, Game Freak.</span>
            <span>
              Made by{' '}
              <a
                href="https://github.com/selimdev00"
                target="_blank"
                rel="noreferrer"
              >
                selimdev
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Default;
