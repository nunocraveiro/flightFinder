import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Results from './components/Results';
import { useState } from 'react';

function App() {
  const [flightResults, setFlightResults] = useState(null);

  return (
    <div className="App">
      <Header />
      {flightResults ? <Results flightResults={flightResults} setFlightResults={setFlightResults} /> : <Form setFlightResults={setFlightResults} />}
    </div>
  );
}

export default App;
