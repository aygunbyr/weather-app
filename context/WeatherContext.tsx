import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import moment from 'moment'

// Cities of Turkey
import cities from '@/data/cities.json'

import { getWeather } from '@/services/Weather'

// Type declarations
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

export const defaultCity = 'İstanbul'
const defaultCityData = cities[33]

// If city was selected before, get city from localStorage then use
const localStorageCity =
  typeof window != 'undefined'
    ? window.localStorage.getItem('weatherapp.city')
    : null

const initialCity = localStorageCity ?? defaultCity

const WeatherContext = createContext<ProviderValues | null>(null)

export const WeatherProvider: React.FC<Props> = ({ children }) => {
  const [city, setCity] = useState<string>(initialCity)
  const [weather, setWeather] = useState<ForecastData | null>(null)
  const [fiveDay, setFiveday] = useState<ListData[]>([])

  useEffect(() => {
    const selectedCity: CityData =
      cities.find((item) => item.name === city) ?? defaultCityData

    ;(async () => {
      const weatherData = await getWeather(
        selectedCity?.latitude!,
        selectedCity?.longitude!
      )

      const noonTemperatures = weatherData?.list.filter(
        (item: ListData) => moment.unix(item.dt).hours() === 12
      )
      setFiveday(noonTemperatures || [])

      setWeather(weatherData)

      localStorage.setItem('weatherapp.city', city)
    })()
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

export const useWeather = () => useContext(WeatherContext)
