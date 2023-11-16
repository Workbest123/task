import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/actions';

function PersonDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [persontrue, setPersontrue] = useState(false);

  const favorites = useSelector((state) => state.app.favorites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    sec(person?.name);
  }, [favorites, person]);

  const sec = (username: string) => {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].name === username) {
        setPersontrue(true);
        return; 
      } else {
        setPersontrue(false);
      }
    }
  };

  const handleAddToFavorites = (name: string, url: string) => {
    const lowerCaseName = name.toLowerCase();
    if (!favorites.some((fav: any) => fav.name.toLowerCase() === lowerCaseName)) {
      dispatch(addToFavorites(name, url));
    }
  };

  const handleRemoveFromFavorites = (name: string) => {
    dispatch(removeFromFavorites(name));
  };

  return (
    <div>
      {person ? (
        <>
          <h2>{person.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Height:</td>
                <td>{person.height}</td>
              </tr>
              <tr>
                <td>Mass:</td>
                <td>{person.mass}</td>
              </tr>
              <tr>
                <td>Hair Color:</td>
                <td>{person.hair_color}</td>
              </tr>
            </tbody>
          </table>

          {persontrue ? (
            <button onClick={() => handleRemoveFromFavorites(person.name)}>Remove from Favorites</button>
          ) : (
            <button onClick={() => handleAddToFavorites(person.name, person.url)}>Add to Favorites</button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PersonDetails;
