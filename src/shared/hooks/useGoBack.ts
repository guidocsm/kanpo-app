import { useLocation, useNavigate } from 'react-router'

import { INITIAL_LOCATION_KEY, ROUTES } from '@/shared/constants/routes'

// Vuelve a la pantalla anterior; si se entró directo por URL (sin historial en la app), va al Feed.
export function useGoBack() {
  const navigate = useNavigate()
  const location = useLocation()

  const hasPreviousEntry = location.key !== INITIAL_LOCATION_KEY

  return function goBack() {
    if (hasPreviousEntry) {
      navigate(-1)
      return
    }
    navigate(ROUTES.FEED, { replace: true })
  }
}
