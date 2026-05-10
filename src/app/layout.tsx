import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kanpo — Fútbol amateur en Venezuela',
  description:
    'Apúntate a partidos de fútbol pickup en Caracas. Paga en USD por Zelle, Pago Móvil, Binance Pay y más.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} font-display bg-cream text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
