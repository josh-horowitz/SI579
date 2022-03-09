import './EventsListing.css';
import EventDateTime from "./EventDateTime";

const EventsListing = (props) => {
    console.log('THE PROPS', props);
    return (
        <div className='events'>
            {props.events.map((eventInstance, index) => (
                <div className='event' key={index}>
                    <EventDateTime
                        dateStart={eventInstance.date_start}
                        timeStart={eventInstance.time_start}
                        timeEnd={eventInstance.time_end}
                    />
                    <div className='event__info'>
                        <h2>{eventInstance.event_title}</h2>

                        <div className='event__description'>
                            {eventInstance.description}
                        </div>
                    </div>
                </div>) )}
        </div>
    );
}

export default EventsListing;