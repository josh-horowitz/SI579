import './EventInstance.css'
import EventStarButton from "./EventStarButton";
import {useState} from "react";

const EventInstance = (props) => {

    const [isStarred, setIsStarred] = useState(false)



    return <div className={`event ${isStarred ? 'starred-event' : 'not-starred-event'}`}>
        {props.children}
        <EventStarButton
            handMeDownSetStarStateFunction={setIsStarred}
            tossedOverIsStarred={isStarred}
        />
    </div>
}

export default EventInstance;