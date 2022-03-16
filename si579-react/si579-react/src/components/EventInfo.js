import "./EventInfo.css"

const EventInfo = (props) => {

    return (<div className='event__info'>
        <h2>{props.title}</h2>

        <div className='event__description'>
            {props.description}
        </div>
    </div>)
}

export default EventInfo;