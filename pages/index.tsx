import { Inter } from 'next/font/google'
import WeatherForm from '@/components/WeatherForm'
import WeatherGrid from '@/components/WeatherGrid'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="font-Montserrat w-auto h-screen bg-gradient-to-r from-blue-200 to-green-200 pt-[10px]">
      <div className="w-auto h-auto md:w-[768px] m-auto backdrop-blur-sm bg-white/30 rounded-lg p-2">
        <div className="text-3xl p-2 text-center">Hava Durumu</div>
        <WeatherForm />
        <WeatherGrid />
      </div>
    </div>
  )
}
