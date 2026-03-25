import {
  createApiFactory,
  discoveryApiRef,
  fetchApiRef,
} from "@backstage/core-plugin-api";
import {
  ApiBlueprint,
  createFrontendPlugin,
  createRouteRef,
  PageBlueprint,
} from "@backstage/frontend-plugin-api";

import { SpaceliftApi, spaceliftApiRef } from "./api/SpaceliftApiClient";

const rootRouteRef = createRouteRef();

/**
 * API extension for the Spacelift API.
 *
 * @alpha
 */
const spaceliftApiExtension = ApiBlueprint.make({
  name: "spacelift-api",
  params: defineParams =>
    defineParams(
      createApiFactory({
        api: spaceliftApiRef,
        deps: {
          discoveryApi: discoveryApiRef,
          fetchApi: fetchApiRef,
        },
        factory: ({ discoveryApi, fetchApi }) =>
          new SpaceliftApi(discoveryApi, fetchApi),
      }),
    ),
});

/**
 * Page extension for the Spacelift Stacks page.
 *
 * @alpha
 */
const spaceliftPageExtension = PageBlueprint.make({
  params: {
    path: "/spacelift",
    routeRef: rootRouteRef,
    loader: () => import("./components/Stacks").then((m) => <m.StacksPage />),
  },
});

/**
 * Backstage frontend plugin for Spacelift.
 *
 * @alpha
 */
export default createFrontendPlugin({
  pluginId: "spacelift",
  extensions: [spaceliftApiExtension, spaceliftPageExtension],
  routes: {
    root: rootRouteRef,
  },
});
