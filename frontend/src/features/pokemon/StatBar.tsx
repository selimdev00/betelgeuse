import React from 'react';
import { statColor, statLabel } from '../../styles/typeColors';

interface Props {
  name: string;
  value: number;
  /** Most base stats sit well under this; bars scale against it and cap at 100%. */
  max?: number;
}

const StatBar = ({ name, value, max = 160 }: Props) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const style = { '--stat-color': statColor(name) } as React.CSSProperties;

  return (
    <div className="stat-bar" style={style}>
      <span className="stat-bar__label">{statLabel(name)}</span>
      <span
        className="stat-bar__track"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={statLabel(name)}
      >
        <span className="stat-bar__fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="stat-bar__value">{value}</span>
    </div>
  );
};

export default StatBar;
