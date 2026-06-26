import React from 'react';
import { typeColor } from '../../styles/typeColors';
import { capitalize } from '../../lib/pokemon';

interface Props {
  type: string;
  variant?: 'solid' | 'soft';
}

/** Pill that carries a Pokemon type's owned colour. The signature element. */
const TypeChip = ({ type, variant = 'solid' }: Props) => {
  const c = typeColor(type);

  const style = {
    '--chip-solid': c.solid,
    '--chip-soft': c.soft,
    '--chip-on': c.on,
    '--chip-on-soft': `color-mix(in oklch, ${c.solid} 70%, var(--text))`,
  } as React.CSSProperties;

  return (
    <span className={`type-chip type-chip--${variant}`} style={style}>
      <span className="type-chip__dot" aria-hidden />
      {capitalize(type)}
    </span>
  );
};

export default TypeChip;
