import createAuth0Client from '@auth0/auth0-spa-js'

export default async function(ctx, inject) {
  const $auth = await createAuth0Client({
    domain: process.env.AUTH0_DOMAIN,
    client_id: process.env.AUTH0_CLIENT_ID,
    useRefreshTokens: true
  })

  inject('auth0', $auth)
  ctx.$auth0 = $auth
}
