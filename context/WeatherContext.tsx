// Context, hooks and types from React library
import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

// Axios library for fetching weather data
import axios from 'axios'

// Moment library for formatting epoch time
import moment from 'moment'

// Cities of Turkey, mock json data
import cities from '@/data/cities.json'

// Type declaration of CityData
import { CityData } from '@/types/citydata'

// Type declarations ForecastData, ListData
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

// Default city value
export const defaultCity = 'İstanbul'

// If city was selected before, get city from localStorage then use
let initialCity: string
const localStorageCity =
  typeof window != 'undefined'
    ? window.localStorage.getItem('weatherapp.city')
    : null
localStorageCity
  ? (initialCity = localStorageCity)
  : (initialCity = defaultCity)

// Initialize context
const WeatherContext = createContext<ProviderValues | null>(null)

// Fetch weather data
const getWeather = async (lat: string, lon: string) => {
  const requestUrl = `${process.env.NEXT_PUBLIC_OPENWEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
  const { data } = await axios.get(requestUrl)

  return data
}

export const WeatherProvider: React.FC<Props> = ({ children }) => {
  // State of selected city
  const [city, setCity] = useState<string>(initialCity)

  // State of weather data
  const [weather, setWeather] = useState<ForecastData | null>(null)

  // State of five day 12pm weather conditions
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

        // Update localStorage
        localStorage.setItem('weatherapp.city', city)
      })()
    }
  }, [city])

  // Values that we pass to provider
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
