import { ROUTES } from '@/shared/constants/routes'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: ROUTES.FEED,
    lazy: async () => ({ Component: (await import('@/views/Feed')).default })
  }
])
