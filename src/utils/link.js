import Route from 'route-parser';

export function reverse(route, params) {
  const _route = new Route(route);
  return _route.reverse(params);
}
