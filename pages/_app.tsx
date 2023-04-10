import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WeatherProvider } from '@/context/WeatherContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WeatherProvider>
      <Component {...pageProps} />
    </WeatherProvider>
  )
}
