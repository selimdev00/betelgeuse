import React from 'react';
import { Link } from 'react-router-dom';

import Default from '../layouts/Default';
import EmptyState from '../components/EmptyState';
import notFoundImage from '../assets/images/404.webp';

const NotFound = () => (
  <Default>
    <div className="container">
      <EmptyState
        image={notFoundImage}
        imageAlt="A confused Pokemon, lost"
        title="This entry isn't in the Pokedex"
        body="The page you were looking for doesn't exist. Head back to the catalogue to keep browsing."
        actions={
          <>
            <Link to="/catalog" className="btn btn--primary">
              Back to catalogue
            </Link>
            <Link to="/" className="btn btn--ghost">
              Home
            </Link>
          </>
        }
      />
    </div>
  </Default>
);

export default NotFound;
