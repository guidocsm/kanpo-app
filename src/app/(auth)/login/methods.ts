import {
  AUTH_CALLBACK_PATH,
  LOGIN_ERROR_GENERIC,
  POST_LOGIN_REDIRECT,
} from './constants'

import { createClient } from '@/lib/supabase/client'


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (email: string): boolean =>
  EMAIL_REGEX.test(email.trim())

const buildAuthCallbackUrl = (): string => {
  const url = new URL(AUTH_CALLBACK_PATH, window.location.origin)
  url.searchParams.set('next', POST_LOGIN_REDIRECT)
  return url.toString()
}

export const sendMagicLink = async (
  email: string,
): Promise<{ error: string | null }> => {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: buildAuthCallbackUrl() },
  })

  if (error) {
    console.error('[login] sendMagicLink failed', error)
    return { error: LOGIN_ERROR_GENERIC }
  }

  return { error: null }
}

export const signInWithGoogle = async (): Promise<{ error: string | null }> => {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: buildAuthCallbackUrl() },
  })

  if (error) {
    console.error('[login] signInWithGoogle failed', error)
    return { error: LOGIN_ERROR_GENERIC }
  }

  return { error: null }
}
