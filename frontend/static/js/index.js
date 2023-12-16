import { Dashboard, Posts, Settings } from './views/index.js';

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    { path: '/settings', view: Settings },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => ({
    route,
    isMatch: location.pathname === route.path,
  }));

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  const defaultView = routes[0];

  if (!match) {
    match = { route: defaultView, isMatch: true };
  }

  const view = await match.route.view();

  document.querySelector('#root').innerHTML = view;
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    const hasDataLink = event.target.matches('[data-link]');

    if (!hasDataLink) return;

    event.preventDefault();
    navigateTo(event.target.href);
  });

  router();
});
