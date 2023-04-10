import { useEffect, useState, SetStateAction, Dispatch } from 'react'
import { useWeather, ProviderValues } from '@/context/WeatherContext'
import cities from '@/data/cities.json'

const WeatherForm = () => {
  const [selected, setSelected] = useState('İstanbul')
  const weather = useWeather()

  useEffect(() => {
    weather?.setCity(selected)
  }, [selected])

  return (
    <div className="p-2">
      <select
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className="px-2 py-2 rounded-lg border-2 border-gray-200 font-semibold"
      >
        {cities.map((item, key) => (
          <option
            key={key}
            selected={item.name === weather?.city}
            value={item.name}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default WeatherForm
