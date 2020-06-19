import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const PERSON = gql`
  {
    person(id: 1) {
      id
      name
      homeworld {
        id
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(PERSON);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div>
      Name is {data.person.name}, and planet is {data.person.homeworld.name}
    </div>
  );
  //   return <div>React is Rendering</div>;
}

export default App;
