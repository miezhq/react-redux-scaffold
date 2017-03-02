import React from 'react';
import { Link } from 'react-router-dom';
import * as links from '../../../constants/links';

const HomePage = () => (
  <div>
    <h1>Hello World</h1>
    <Link to={links.LINK_LOREM_IPSUM}>Lorem Ipsum</Link>
  </div>
);

export default HomePage;
