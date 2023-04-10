import { useEffect } from 'react'
import { useWeather } from '@/context/WeatherContext'

const WeatherGrid = () => {
  const weather = useWeather()
  const data = weather?.weather

  useEffect(() => {
    console.log('Data değişti useeffect çalıştı')
  }, [weather])

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="p-2">
        <div className="text-3xl ">
          {data?.list[0].main?.temp.toFixed(0)} °C
        </div>
        <div className="text-sm">
          Hissedilen : {data?.list[0].main?.feels_like.toFixed(0)} °C
        </div>
      </div>
      <div className="p-2">İkinci kısım</div>
    </div>
  )
}

export default WeatherGrid
