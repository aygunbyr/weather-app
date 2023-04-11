import moment from 'moment'
import { ListData } from '@/types/forecastdata'

type Props = {
  data: ListData
}

const DailyForecast = (props: Props) => {
  return (
    <div className="min-w-[150px] min-h-[100px] justify-center items-center">
      <div className="p-4">
        {/* Day of the week (Sunday, Monday etc.) */}
        <strong>{moment.unix(props.data.dt).format('dddd')}</strong>
        {/* Daily minimum and maximum temperatures */}
        <div className="flex flex-row text-lg font-bold">
          {/* <span className="text-red-500">Max&nbsp;</span> */}
          <p className="text-red-500 mr-4">
            {props.data.main.temp_max.toFixed(0)}
            <span className="text-black"> °C</span>
          </p>

          {/* <span className="text-blue-500">Min&nbsp;</span> */}
          <p className="text-blue-500">
            {props.data.main.temp_min.toFixed(0)}{' '}
            <span className="text-black"> °C</span>
          </p>
        </div>
        {/* Icon image from OpenWeatherMap */}
        <div>
          <img
            src={`http://openweathermap.org/img/w/${props.data.weather[0].icon}.png`}
          />
        </div>
      </div>
    </div>
  )
}

export default DailyForecast
