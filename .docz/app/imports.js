export const imports = {
  'src/appbar/AppBar.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-appbar-app-bar" */ 'src/appbar/AppBar.mdx'),
}
