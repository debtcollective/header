export const imports = {
  'src/appbar/AppBar.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-appbar-app-bar" */ 'src/appbar/AppBar.mdx'),
  'src/menu/Menu.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-menu-menu" */ 'src/menu/Menu.mdx'),
  'src/notifications/Notifications.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-notifications-notifications" */ 'src/notifications/Notifications.mdx'),
  'src/profile/Profile.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-profile-profile" */ 'src/profile/Profile.mdx'),
  'src/session/Session.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-session-session" */ 'src/session/Session.mdx'),
}
