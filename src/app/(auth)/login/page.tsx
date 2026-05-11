'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import {
  LOGIN_CONTINUE_CTA,
  LOGIN_CONTINUE_CTA_LOADING,
  LOGIN_DESCRIPTION,
  LOGIN_DIVIDER_LABEL,
  LOGIN_EMAIL_LABEL,
  LOGIN_EMAIL_PLACEHOLDER,
  LOGIN_ERROR_INVALID_EMAIL,
  LOGIN_GOOGLE_CTA,
  LOGIN_GOOGLE_CTA_LOADING,
  LOGIN_SUCCESS_DESCRIPTION,
  LOGIN_SUCCESS_EYEBROW,
  LOGIN_SUCCESS_HINT,
  LOGIN_SUCCESS_RESEND,
  LOGIN_SUCCESS_TITLE,
  LOGIN_TITLE_DASH,
  LOGIN_TITLE_LEAD,
  LOGIN_TITLE_REST,
  LOGIN_WORDMARK,
} from './constants'
import { isValidEmail, sendMagicLink, signInWithGoogle } from './methods'

import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { MailIcon } from '@/components/icons/MailIcon'
import { SpinnerIcon } from '@/components/icons/SpinnerIcon'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isSendingLink, setIsSendingLink] = useState(false)
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false)
  const [magicLinkError, setMagicLinkError] = useState<string | null>(null)
  const [googleError, setGoogleError] = useState<string | null>(null)
  const [hasSentMagicLink, setHasSentMagicLink] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const handleSubmitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMagicLinkError(null)

    if (!isValidEmail(email)) {
      setMagicLinkError(LOGIN_ERROR_INVALID_EMAIL)
      return
    }

    setIsSendingLink(true)
    const { error } = await sendMagicLink(email)
    setIsSendingLink(false)

    if (error) {
      setMagicLinkError(error)
      return
    }

    setSubmittedEmail(email.trim())
    setHasSentMagicLink(true)
  }

  const handleClickGoogle = async () => {
    setGoogleError(null)
    setIsSigningInGoogle(true)

    const { error } = await signInWithGoogle()

    // En éxito, Supabase redirige el navegador a Google y nunca volvemos aquí,
    // así que solo reseteamos el loading si hubo error.
    if (error) {
      setGoogleError(error)
      setIsSigningInGoogle(false)
    }
  }

  const handleClickResend = () => {
    setHasSentMagicLink(false)
    setSubmittedEmail('')
    setMagicLinkError(null)
    setEmail('')
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center px-6 py-10">
      <header className="mt-2 mb-12">
        <span className="text-3xl font-bold tracking-tight">
          {LOGIN_WORDMARK}
        </span>
      </header>

      <div className="w-full max-w-sm">
        {hasSentMagicLink ? (
          <section>
            <p className="eyebrow text-emerald mb-3">{LOGIN_SUCCESS_EYEBROW}</p>
            <h1 className="text-4xl font-bold leading-[1.05] mb-4">
              {LOGIN_SUCCESS_TITLE}
            </h1>
            <p className="text-text-muted leading-relaxed mb-2">
              {LOGIN_SUCCESS_DESCRIPTION}{' '}
              <span className="text-ink font-medium break-all">
                {submittedEmail}
              </span>
            </p>
            <p className="text-text-muted text-sm mb-8">{LOGIN_SUCCESS_HINT}</p>
            <button
              type="button"
              onClick={handleClickResend}
              className="eyebrow text-text-muted hover:text-ink transition-colors"
            >
              {LOGIN_SUCCESS_RESEND}
            </button>
          </section>
        ) : (
          <>
            <h1 className="text-[2.5rem] font-bold leading-[1.05] mb-4">
              {LOGIN_TITLE_LEAD}{' '}
              <span className="em-italic font-normal">{LOGIN_TITLE_DASH}</span>{' '}
              {LOGIN_TITLE_REST}
            </h1>

            <p className="text-text-muted leading-relaxed mb-8">
              {LOGIN_DESCRIPTION}
            </p>

            <form onSubmit={handleSubmitEmail} noValidate>
              <label
                htmlFor="email"
                className="eyebrow text-text-muted block mb-2"
              >
                {LOGIN_EMAIL_LABEL}
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <MailIcon size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={LOGIN_EMAIL_PLACEHOLDER}
                  disabled={isSendingLink}
                  aria-invalid={magicLinkError !== null}
                  aria-describedby={
                    magicLinkError ? 'magic-link-error' : undefined
                  }
                  className="w-full bg-paper border border-border rounded-xl pl-11 pr-4 py-4 text-ink placeholder:text-disabled focus:outline-none focus:ring-4 focus:ring-emerald/15 focus:border-emerald disabled:opacity-60 transition-shadow"
                />
              </div>

              <button
                type="submit"
                disabled={isSendingLink}
                className="mt-5 w-full bg-ink text-cream rounded-2xl p-2 pl-5 flex items-center justify-between hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="font-medium">
                  {isSendingLink
                    ? LOGIN_CONTINUE_CTA_LOADING
                    : LOGIN_CONTINUE_CTA}
                </span>
                <span className="bg-emerald rounded-xl p-2.5 flex items-center justify-center">
                  {isSendingLink ? (
                    <SpinnerIcon size={18} className="text-cream" />
                  ) : (
                    <ArrowRightIcon size={18} className="text-cream" />
                  )}
                </span>
              </button>

              {magicLinkError && (
                <p
                  id="magic-link-error"
                  role="alert"
                  className="mt-3 text-sm text-error"
                >
                  {magicLinkError}
                </p>
              )}
            </form>

            <div className="my-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="eyebrow text-text-muted">
                {LOGIN_DIVIDER_LABEL}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={handleClickGoogle}
              disabled={isSigningInGoogle}
              aria-describedby={googleError ? 'google-error' : undefined}
              className="w-full bg-paper border border-border rounded-2xl py-4 px-5 text-ink flex items-center gap-3 hover:bg-cream transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSigningInGoogle ? (
                <SpinnerIcon size={20} className="text-text-muted" />
              ) : (
                <GoogleIcon size={20} />
              )}
              <span className="font-medium">
                {isSigningInGoogle ? LOGIN_GOOGLE_CTA_LOADING : LOGIN_GOOGLE_CTA}
              </span>
              <ChevronRightIcon
                size={18}
                className="ml-auto text-text-muted"
              />
            </button>

            {googleError && (
              <p
                id="google-error"
                role="alert"
                className="mt-3 text-sm text-error"
              >
                {googleError}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}
