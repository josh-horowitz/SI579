import './App.css';
import EventsListing from "./components/EventsListing";
import { useEffect, useState } from "react";

function App() {
    const [umichEvents, setUmichEvents] = useState([]);

    useEffect(() => {
        fetch('https://events.umich.edu/day/json')
            .then((response) => response.json())
            .then((json) => setUmichEvents(Object.values(json)));
    }, []);

  return (
      <main className="i-am-main">
        <h1>Events at University of Michigan</h1>
        <EventsListing events={umichEvents}/>
      </main>
  );
}

export default App;