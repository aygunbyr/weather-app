import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="font-Montserrat w-auto h-screen bg-gradient-to-r from-blue-200 to-gray-200 pt-[10px]">
      <div className="w-auto h-auto lg:w-[768px] m-auto">
        <div className="text-2xl p-2 text-center">Hava Durumu</div>
        <div className="bg-red-500 p-2">Şehir Seçimi</div>
        <div className="grid lg:grid-cols-2 gap-5 bg-red-500 p-2">
          <div className="bg-blue-500 p-1">Birinci kısım</div>
          <div className="bg-blue-500 p-1">İkinci kısım</div>
        </div>
      </div>
    </div>
  )
}
