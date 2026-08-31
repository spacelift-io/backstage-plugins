# Spacelift Frontend Plugin

This frontend plugin for Backstage provides a user interface to view and interact with your Spacelift stacks and runs.

## Installation

1. Install the plugin package in your Backstage frontend app:

   ```bash
   # From your Backstage root directory
   yarn --cwd packages/app add @spacelift-io/backstage-integration-frontend
   ```

2. Register the plugin using either the [new frontend system](#new-frontend-system) or the [legacy frontend system](#legacy-frontend-system), depending on your Backstage app.

### New frontend system

Use this path if your app uses `@backstage/frontend-defaults` / `createApp` and feature discovery (the default for newer Backstage apps).

The plugin ships a `/alpha` entry point that exports a frontend plugin with a page and API extension. On Backstage 1.51+, the page extension also contributes a sidebar nav item (title and icon).

#### Option A — Feature discovery (recommended)

If your `app-config.yaml` enables package discovery (for example `app.packages: all`), installing the dependency is enough. The app discovers `@spacelift-io/backstage-integration-frontend/alpha` automatically. No extra code changes are required.

#### Option B — Manual registration

If feature discovery is disabled, or you prefer explicit installs, import the default export from `/alpha` and pass it to `createApp`:

```tsx
// packages/app/src/App.tsx
import { createApp } from "@backstage/frontend-defaults";
import spaceliftPlugin from "@spacelift-io/backstage-integration-frontend/alpha";

const app = createApp({
  features: [spaceliftPlugin],
});

export default app.createRoot();
```

This registers the `/spacelift` page and the Spacelift sidebar item. You do not need a separate `SidebarItem` in `Root.tsx`.

### Legacy frontend system

Use this path if your app still uses `FlatRoutes` and a hand-built sidebar.

1. Add the plugin to your `packages/app/src/App.tsx`:

   ```tsx
   // packages/app/src/App.tsx
   import { SpaceliftIoPage } from "@spacelift-io/backstage-integration-frontend";

   // ...

   const routes = (
     <FlatRoutes>
       {/* ...other routes */}
       <Route path="/spacelift" element={<SpaceliftIoPage />} />
     </FlatRoutes>
   );
   ```

2. Add the plugin to the sidebar in `packages/app/src/components/Root/Root.tsx`:

   ```tsx
   // packages/app/src/components/Root/Root.tsx
   import SpaceliftIcon from "@material-ui/icons/CloudQueue"; // Example icon, choose an appropriate one

   // ...

   export const Root = ({ children }: PropsWithChildren<{}>) => (
     <SidebarPage>
       <Sidebar>
         {/* ...other sidebar items */}
         <SidebarItem icon={SpaceliftIcon} to="spacelift" text="Spacelift" />
       </Sidebar>
       {/* ... */}
     </SidebarPage>
   );
   ```

## Configuration

This plugin requires the `spacelift.hostUrl` to be configured in your `app-config.yaml` to allow the frontend to make requests to the Spacelift API via the backend plugin.

```yaml
spacelift:
  hostUrl: "<your-subdomain>.app.spacelift.io" # Your Spacelift instance URL (WITHOUT https://)
  readOnly: false # Optional: Set to true to disable trigger functionality (default: false)
```

Make sure to replace `<your-subdomain>` with your actual Spacelift subdomain.

### Read-Only Mode

When `readOnly: true` is set in the configuration:

- The trigger run button will be hidden from the UI
- Users will only be able to view stack information
- This setting should match the backend configuration for consistency

See the [Backend Plugin README](./packages/spacelift-io-backend/README.md) for more details on read-only mode.

### Important Note on Permissions

This frontend plugin relies on the permissions configured for the Spacelift API Key in the backend plugin. It does not implement separate user-level permission checks within the frontend components.

Ensure that your Backstage instance has appropriate general permissions set up to control access to this plugin's pages and functionalities. This is crucial to prevent users from performing actions in Spacelift for which they are not authorized via the configured API key.

## Compatibility

This plugin requires:

- `@backstage/core-components` >= 0.17.1
- `@backstage/core-plugin-api` >= 1.10.6
- `@backstage/plugin-catalog-react` >= 1.17.0

The legacy (`FlatRoutes`) integration is compatible with Backstage 1.17.0 or later.

The `/alpha` new frontend system integration requires `@backstage/frontend-plugin-api` >= 0.17.0 and is supported on Backstage 1.51.0 or later.

## Backend Plugin

This frontend plugin requires the [Spacelift Backend Plugin](https://github.com/spacelift-io/backstage-plugins/blob/main/packages/spacelift-io-backend/README.md) to be installed and configured.

## Spacelift Documentation

For more information about Spacelift, please refer to the [official Spacelift documentation](https://docs.spacelift.io/integrations/external-integrations/backstage).
