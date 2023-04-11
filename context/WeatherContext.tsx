import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import axios from 'axios'
import moment from 'moment'
import cities from '@/data/cities.json'
import { CityData } from '@/types/citydata'
import { ForecastData, ListData } from '@/types/forecastdata'

// Type declaration: Values that we pass to provider
export type ProviderValues = {
  weather: ForecastData | null
  fiveDay: ListData[]
  city: string
  setCity: Dispatch<SetStateAction<string>>
}

// Type declaration: Properties of WeatherProvider
type Props = {
  children: React.ReactNode
}

// Initialize context
const WeatherContext = createContext<ProviderValues | null>(null)

// Fetch weather data
const getWeather = async (lat: string, lon: string) => {
  const requestUrl = `${process.env.NEXT_PUBLIC_OPENWEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
  const { data } = await axios.get(requestUrl)

  return data
}

export const WeatherProvider: React.FC<Props> = ({ children }) => {
  // States
  const [city, setCity] = useState<string>('İstanbul')
  const [weather, setWeather] = useState<ForecastData | null>(null)
  const [fiveDay, setFiveday] = useState<ListData[]>([])

  // Update weather data when selected city is changed
  useEffect(() => {
    let selectedCity: CityData | undefined
    let weatherData: ForecastData | null
    let arr: ListData[] = []

    // Find city in data
    cities.map((item: CityData) => {
      if (item.name === city) {
        selectedCity = item
      }
    })

    if (selectedCity) {
      // IIFE for asynchronous fetch operation
      ;(async () => {
        weatherData = await getWeather(
          selectedCity.latitude,
          selectedCity.longitude
        )

        // Extract five day 12pm weather forecast
        weatherData?.list.map((item) => {
          if (moment.unix(item.dt).hours() === 12) {
            arr.push(item)
          }
        })

        // Set five day forecast to its state
        setFiveday([...arr])

        // Update weather
        setWeather(weatherData)
      })()
    }
  }, [city])

  const values = {
    weather,
    fiveDay,
    city,
    setCity,
  }

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  )
}

// Custom hook for weather context
export const useWeather = () => useContext(WeatherContext)
