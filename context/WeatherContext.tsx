import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import cities from '@/data/cities.json'
import { CityData } from '@/types/citydata'

// Type declaration: Values that we pass to provider
type ProviderValues = {
  weather: {} | null
  setCity: Dispatch<SetStateAction<string>>
}

// Type declaration: Properties of WeatherProvider
type Props = {
  children: React.ReactNode
}

// Initialize context
const WeatherContext = createContext<ProviderValues | null>(null)

export const WeatherProvider: React.FC<Props> = ({ children }) => {
  // States
  const [city, setCity] = useState<string>('İstanbul')
  const [weather, setWeather] = useState<{} | null>(null)

  // Update weather data when selected city change
  useEffect(() => {
    let selectedCity

    // Find city in data
    cities.map((item: CityData) => {
      if (item.name === city) {
        selectedCity = item
      }
    })

    if (selectedCity) {
      // Print to test
      console.log(selectedCity)
    }

    // TODO: Update weather
    setWeather({})
  }, [city])

  return (
    <WeatherContext.Provider value={{ weather, setCity }}>
      {children}
    </WeatherContext.Provider>
  )
}

// Custom hook for weather context
export const useWeather = () => useContext(WeatherContext)
