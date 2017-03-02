import React from 'react';
import { Link } from 'react-router-dom';
import * as links from '../../../constants/links';

const LoremIpsumPage = () => (
  <div>
    <h1>Lorem Ipsum</h1>
    <p>Sed sit amet cursus nunc. Curabitur a lectus sit amet magna semper pellentesque ac
      vitae arcu. Maecenas at tristique dolor. Cras nec tincidunt tortor, sit amet ultrices arcu.
      Duis nec leo nulla. In est leo, venenatis at tortor eu, blandit auctor metus. Fusce sed odio
      pellentesque, ullamcorper nunc vitae, imperdiet nunc. Sed congue interdum nisi eu elementum.
      Curabitur eget dui eget felis tristique ullamcorper eu vel eros. Fusce pellentesque cursus
      tortor vel consectetur. Nam porttitor consectetur libero ac accumsan.
    </p>
    <Link to={links.LINK_HOME}>Home</Link>
  </div>
);

export default LoremIpsumPage;
