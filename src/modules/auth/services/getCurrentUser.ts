import type { CurrentUser } from '@/modules/auth/types/currentUser'

const CURRENT_USER_MOCK: CurrentUser = {
  firstName: 'Andrés',
  initials: 'AF',
  balanceUsd: 32.4
}

// MOCK: sustituir el cuerpo por la sesión/perfil de Supabase; la firma se mantiene.
export async function getCurrentUser(): Promise<CurrentUser> {
  return CURRENT_USER_MOCK
}
