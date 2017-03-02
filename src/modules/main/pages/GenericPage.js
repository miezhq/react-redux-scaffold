import React from 'react';
import { Route, Switch } from 'react-router';
import * as links from '../../../constants/links';
import NotFound from './NotFound';
import HomePage from './HomePage';
import LoremIpsumPage from './LoremIpsumPage';

const GenericPage = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path={links.LINK_HOME} component={HomePage} />
    <Route path={links.LINK_LOREM_IPSUM} component={LoremIpsumPage} />
    <Route component={NotFound} />
  </Switch>
);

export default GenericPage;
