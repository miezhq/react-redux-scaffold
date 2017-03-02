import React from 'react';
import { Link } from 'react-router-dom';
import { reverse } from '../utils/link';

export default class Formatter {
  static link(value, item, route) {
    const url = reverse(route, item);
    return <Link to={url}>{value}</Link>;
  }
}
