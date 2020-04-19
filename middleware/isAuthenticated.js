export default async function({ route, app, redirect }) {
  try {
    const { appState } = await app.$auth0.handleRedirectCallback()
    await app.$router.push(
      (appState && appState.targetUrl) || process.env.AUTH0_CALLBACK_ROUTE
    )
  } catch (e) {
    try {
      await app.$auth0.getTokenSilently()
    } catch (e) {
      const url = await app.$auth0.buildAuthorizeUrl({
        appState: { targetUrl: route.fullPath },
        redirect_uri: window.location.origin + process.env.AUTH0_CALLBACK_ROUTE
      })
      redirect(url)
    }
  }
}
