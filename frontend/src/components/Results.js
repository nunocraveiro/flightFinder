import './Results.css';

const Results = ({flightResults, setFlightResults}) => {
    const backHandler = () => {
        setFlightResults(null);
    }

    const getHours = (dateTime) => dateTime.slice(11, 13);
    const getMinutes = (dateTime) => dateTime.slice(14, 16);
    const getDuration = (arrivalHours, arrivalMinutes, departureHours, departureMinutes) => {
        if (arrivalHours === '00') arrivalHours = 24;
        if (departureHours === '00') departureHours = 24;
        return `${arrivalHours-departureHours} hrs ${arrivalMinutes-departureMinutes} mins`;
    }

    return (
        <div className='results'>
            <span className="material-symbols-outlined backIcon" onClick={backHandler}>arrow_back</span>
            {flightResults.map(flight => 
                <div className='flights'>
                    <h2>Flight {flight.flight_id}</h2>
                    <div className='flight-info'>
                        <p>Departure: {getHours(flight.departureAt)}:{getMinutes(flight.departureAt)}</p>
                        <p>Arrival: {getHours(flight.arrivalAt)}:{getMinutes(flight.arrivalAt)}</p>
                        <p>Duration: {getDuration(getHours(flight.arrivalAt), getMinutes(flight.arrivalAt), getHours(flight.departureAt), getMinutes(flight.departureAt))}</p>
                        <p>Available seats: {flight.availableSeats}</p>
                    </div>
                </div>)}
        </div>
    )
}

export default Results;