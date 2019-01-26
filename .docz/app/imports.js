export const imports = {
  'src/app/App.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-app-app" */ 'src/app/App.mdx'),
}
