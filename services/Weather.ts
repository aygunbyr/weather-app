import axios from "axios"

export const getWeather = async (lat: string, lon: string) => {
  const requestUrl = `${process.env.NEXT_PUBLIC_OPENWEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
  const { data } = await axios.get(requestUrl)

  return data
}