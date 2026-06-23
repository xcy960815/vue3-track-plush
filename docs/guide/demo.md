# Online Demo

The live demo reuses the shipped example cases from this repository instead of maintaining a second set of documentation-only examples.

## Included scenarios

- Basic directive usage for click and browse reporting
- Legacy `track-params` compatibility
- Exposure tracking with custom `threshold`, `duration`, and `once`
- Manual reporting with `clickEvent`, `browseEvent`, and `exposureEvent`

::: tip Debug mode
The embedded playground runs with `debug: true`, so interactions print payload JSON to the browser console and do not call a real analytics endpoint.
:::

<ClientOnly>
  <DocsEmbeddedDemo />
</ClientOnly>
