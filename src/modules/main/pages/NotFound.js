import React, { PropTypes } from 'react';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const Notfound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

Notfound.propTypes = propTypes;

export default Notfound;
