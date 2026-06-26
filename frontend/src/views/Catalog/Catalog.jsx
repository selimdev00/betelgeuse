import React from 'react';

import PokemonCatalog from '../../features/pokemon/PokemonCatalog';
import Default from '../../layouts/Default';

const Catalog = () => (
  <Default>
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">The roster</span>
        <h1 className="page-head__title">Pokemon catalogue</h1>
        <p className="page-head__lead">
          Page through every species. Each card shows artwork, types and a stat
          preview. Open one for its full base stats, abilities and measurements.
        </p>
      </div>

      <PokemonCatalog />
    </div>
  </Default>
);

export default Catalog;
