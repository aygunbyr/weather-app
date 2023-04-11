import { Inter } from 'next/font/google'
import WeatherForm from '@/components/WeatherForm'
import WeatherGrid from '@/components/WeatherGrid'
import { CloudIcon } from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="font-Montserrat w-auto h-screen bg-gradient-to-r from-blue-200 to-green-200 pt-[10px]">
      <div className="w-auto h-auto lg:w-[1024px] m-auto backdrop-blur-sm bg-white/30 rounded-lg p-2">
        {/* Header */}
        <div className="text-4xl p-2 text-center flex flex-row justify-center">
          Weather&nbsp;
          <CloudIcon width={36} />
        </div>

        {/* Component to select city */}
        <WeatherForm />

        {/* Component to show weather  */}
        <WeatherGrid />
      </div>
    </div>
  )
}
