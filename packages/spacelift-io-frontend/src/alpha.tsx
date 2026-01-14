import {
  createFrontendPlugin,
  PageBlueprint,
  ApiBlueprint,
} from '@backstage/frontend-plugin-api';
import {
  createApiFactory,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { SpaceliftApi, spaceliftApiRef } from './api/SpaceliftApiClient';
import { rootRouteRef } from './routes';

/**
 * API extension for the Spacelift API.
 *
 * @alpha
 */
const spaceliftApiExtension = ApiBlueprint.make({
  name: 'spacelift-api',
  params: {
    factory: createApiFactory({
      api: spaceliftApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new SpaceliftApi(discoveryApi, fetchApi),
    }),
  },
});

/**
 * Page extension for the Spacelift Stacks page.
 *
 * @alpha
 */
const spaceliftPageExtension = PageBlueprint.make({
  params: {
    defaultPath: '/spacelift',
    routeRef: rootRouteRef,
    loader: () => import('./components/Stacks').then(m => <m.StacksPage />),
  },
});

/**
 * Backstage frontend plugin for Spacelift.
 *
 * @alpha
 */
export default createFrontendPlugin({
  id: 'spacelift',
  extensions: [spaceliftApiExtension, spaceliftPageExtension],
  routes: {
    root: rootRouteRef,
  },
});

