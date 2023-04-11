import moment from 'moment'
import { ListData } from '@/types/forecastdata'

type Props = {
  data: ListData
}

const DailyForecast = (props: Props) => {
  return (
    <div className="min-w-[150px] min-h-[100px] justify-center items-center">
      <div className="p-4">
        <p>{moment.unix(props.data.dt).format('dddd')}</p>
        <p>
          Max {props.data.main.temp_max.toFixed(0)} | Min{' '}
          {props.data.main.temp_min.toFixed(0)}
        </p>
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
