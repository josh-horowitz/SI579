import './EventStartButton.css'

const EventStarButton = (props) => {
    const { tossedOverIsStarred } = props
    const getStarMessage = () =>{
        if (tossedOverIsStarred){
            return 'U GOT STARRED';
        }else {
            return 'ADD STAR'
        }
    }

    const starButtonHandler = (e) => {
        props.handMeDownSetStarStateFunction((previousValue) => {
            return !previousValue;
        });
    };

    return(
        <button onClick={starButtonHandler} className={tossedOverIsStarred ? 'starred' : ''}>
            ⭐ <div>{getStarMessage()}</div>
        </button>
    )
}

export default EventStarButton;