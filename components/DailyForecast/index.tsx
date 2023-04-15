import moment from 'moment'
import { ListData } from '@/types/forecastdata'

type Props = {
  data: ListData
}

const DailyForecast = (props: Props) => {
  const day = moment.unix(props.data.dt).format('dddd')
  const max = props.data.main.temp_max.toFixed(0)
  const min = props.data.main.temp_min.toFixed(0)
  const icon = props.data.weather[0].icon

  return (
    <div className="min-w-[150px] min-h-[100px] flex justify-center items-center">
      <div className="p-4 w-[250px] lg:w-[200px]">
        <strong>{day}</strong>
        <div className="flex flex-row justify-between text-lg font-bold">
          <p className="text-red-500 mr-4">
            {max}
            <span className="text-black"> °C</span>
          </p>

          {/* <span className="text-blue-500">Min&nbsp;</span> */}
          <p className="text-blue-500">
            {min} <span className="text-black"> °C</span>
          </p>
        </div>
        {/* Icon image from OpenWeatherMap */}
        <div>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} />
        </div>
      </div>
    </div>
  )
}

export default DailyForecast
