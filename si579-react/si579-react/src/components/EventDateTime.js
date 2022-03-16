import './EventDateTime.css';
import { DateTime } from 'luxon';

function convert(input) {
    return DateTime.fromFormat(input, 'HH:mm:ss').toLocaleString(DateTime.TIME_SIMPLE);
}

const EventDateTime = (props) => {
    return(<div className='event__datetime'>
        <div className='event__date'>
            {props.dateStart}
        </div>
        <div className='event__start-end'>
            {convert(props.timeStart)}-{convert(props.timeEnd)}
        </div>
    </div>)
}

export default EventDateTime;