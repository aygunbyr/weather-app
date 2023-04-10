import { useEffect, useState, SetStateAction, Dispatch } from 'react'
import { useWeather, ProviderValues } from '@/context/WeatherContext'
import cities from '@/data/cities.json'

const WeatherForm = () => {
  const [selected, setSelected] = useState('İstanbul')
  const weather = useWeather()

  useEffect(() => {
    weather?.setCity(selected)
    console.log('selected değişti useeffect çalıştı')
  }, [selected])

  return (
    <div className="p-2">
      <select
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className="bg-gray-200 border-spacing-4 border-2 border-gray-200 form-control"
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
