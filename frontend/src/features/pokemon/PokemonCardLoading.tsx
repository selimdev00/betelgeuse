import React from 'react';

/** Silhouette of the specimen card. Same dimensions to avoid layout shift. */
const PokemonCardLoading = () => (
  <div className="specimen-skel" aria-hidden>
    <div className="skel skel--art" />
    <div className="skel skel--line" style={{ width: '40%' }} />
    <div className="skel skel--line" style={{ width: '70%', height: 18 }} />
    <div style={{ margin: '14px 0' }}>
      <span className="skel skel--chip" />
      <span className="skel skel--chip" />
    </div>
    <div className="skel skel--line" style={{ width: '100%' }} />
    <div className="skel skel--line" style={{ width: '100%' }} />
    <div className="skel skel--line" style={{ width: '100%', marginBottom: 0 }} />
  </div>
);

export default PokemonCardLoading;
