import React, { useContext } from 'react';
import StarContext from './Context/StarContext';

function Table() {
  const { data } = useContext(StarContext);
  console.log(data);
  return (
    <div>
      <h1>Star Wars</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>

        <tbody>
          { data.map((element) => (
            <tr key={ element.name }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films.map((film) => film.name)}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

// "name": "Tatooine",
// "rotation_period": "23",
// "orbital_period": "304",
// "diameter": "10465",
// "climate": "arid",
// "gravity": "1 standard",
// "terrain": "desert",
// "surface_water": "1",
// "population": "200000",
// films": [
// ],
// "created": "2014-12-09T13:50:49.641000Z",
// "edited": "2014-12-20T20:58:18.411000Z",
// "url":
