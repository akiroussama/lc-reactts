import './App.css';
import { Container } from './components/Container';
import { Wilder } from './Wilder';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Form } from './Form';
import { IWilder } from './interfaces';
import { ALL_WILDERS } from './gql/getAllWilders';
import { useQuery } from '@apollo/client';

function App(): JSX.Element {
  // Hooks → commencent use...
  // useState + useEffect
  // [monÉtatActuel, mettreÀJourMonÉtat]
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const { loading, error, data } = useQuery(ALL_WILDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Return JSX
  return (
    <div>
      <header>
        <Container>
          <h1>Wilders Book</h1>
          {/* <button onClick={() =>data}>Update</button> */}
        </Container>
      </header>
      <Container>
        <h2>Formulaire de création de Wilder</h2>
        <button onClick={() => setShowForm(!showForm)}>Toggle Form</button>
        {showForm === true && <Form onWilderCreated={() => data} ></Form>}
        <h2>Wilders</h2>
        <section className="card-row">
          {
            data.getAllWilders.map((wilder:any) =>
              <Wilder
                key={wilder._id}
                // donne moi toutes les props de wilder
                //{...wilder} // strictement équivalente aux 3 lignes en dessous
                name={wilder.name}
                city={wilder.city}
                skills={wilder.skills}
                _id={wilder._id}
              />)
          }
        </section>
      </Container>
      <footer>
        <Container>
          <p>&copy; 2022 Wild Code School</p>
        </Container>
      </footer>
    </div>

  );
}

export default App;
