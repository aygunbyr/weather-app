import { useWeather } from '@/context/WeatherContext'
import DailyForecast from '../DailyForecast'

const WeatherGrid = () => {
  const weather = useWeather()
  const data = weather?.weather

  return (
    <div className="flex flex-col md:flex-row w-100 justify-between bg-gray-200/20 mt-5">
      {weather?.fiveDay.map((item, index) => (
        <DailyForecast key={index} data={item} />
      ))}
    </div>
  )
}

export default WeatherGrid
