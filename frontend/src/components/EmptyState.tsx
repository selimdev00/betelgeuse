import React from 'react';

interface Action {
  label: string;
  onClick?: () => void;
  to?: string;
  href?: string;
  variant?: 'primary' | 'ghost';
}

interface Props {
  image?: string;
  imageAlt?: string;
  title: string;
  body?: string;
  actions?: React.ReactNode;
}

/** Shared empty / error / not-found surface in the field-guide voice. */
const EmptyState = ({ image, imageAlt = '', title, body, actions }: Props) => (
  <div className="state">
    {image && <img className="state__img" src={image} alt={imageAlt} />}
    <h2 className="state__title">{title}</h2>
    {body && <p className="state__body">{body}</p>}
    {actions && <div className="state__actions">{actions}</div>}
  </div>
);

export type { Action };
export default EmptyState;
