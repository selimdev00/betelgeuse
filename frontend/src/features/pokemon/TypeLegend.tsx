import React from 'react';
import TypeChip from './TypeChip';
import { TYPE_NAMES } from '../../styles/typeColors';

/** All 18 types as soft chips. Used as the signature footer legend. */
const TypeLegend = () => (
  <ul
    className="type-row"
    style={{ listStyle: 'none', margin: 0, padding: 0 }}
    aria-label="The eighteen Pokemon types"
  >
    {TYPE_NAMES.map((t) => (
      <li key={t}>
        <TypeChip type={t} variant="soft" />
      </li>
    ))}
  </ul>
);

export default TypeLegend;
