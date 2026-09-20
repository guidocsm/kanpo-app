export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  currentUser: () => [...AUTH_QUERY_KEYS.all, 'current-user'] as const
}
