export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  const { user, fetchUser } = useAuth()
  if (!user.value) await fetchUser()
  // On mémorise la destination pour y revenir après connexion
  if (!user.value) return navigateTo({ path: '/admin/login', query: { redirect: to.fullPath } })
})
