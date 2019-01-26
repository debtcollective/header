export const imports = {
  'src/App.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-app" */ 'src/App.mdx'),
}
