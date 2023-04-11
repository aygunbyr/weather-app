import { useEffect, useState, SetStateAction, Dispatch } from 'react'
import { useWeather } from '@/context/WeatherContext'
import cities from '@/data/cities.json'

const WeatherForm = () => {
  // State of selected city
  const [selected, setSelected] = useState('İstanbul')
  // Context of weather
  const weather = useWeather()

  // Update weather when user selects a different city
  useEffect(() => {
    weather?.setCity(selected)
  }, [selected])

  return (
    <div className="p-2">
      {/* HTML Select Element to select city */}
      <select
        value={selected}
        // Update selected city state on change
        onChange={(event) => setSelected(event.target.value)}
        className="px-2 py-2 rounded-lg border-2 border-gray-200 font-semibold"
      >
        {/* Add city options from cities.json */}
        {cities.map((item, key) => (
          <option key={key} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default WeatherForm
