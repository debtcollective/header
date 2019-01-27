export const imports = {
  'src/appbar/AppBar.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-appbar-app-bar" */ 'src/appbar/AppBar.mdx'),
  'src/menu/Menu.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-menu-menu" */ 'src/menu/Menu.mdx'),
}
