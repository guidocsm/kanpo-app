import { ROUTES } from '@/shared/constants/routes'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: ROUTES.FEED,
    lazy: async () => ({ Component: (await import('@/views/feed/Feed')).default })
  },
  {
    path: ROUTES.MATCH_DETAIL,
    lazy: async () => ({ Component: (await import('@/views/matchDetail/MatchDetail')).default })
  },
  {
    path: ROUTES.NOT_FOUND,
    lazy: async () => ({ Component: (await import('@/views/notFound/NotFound')).default })
  }
])
