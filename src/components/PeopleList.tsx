import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/actions';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  url: string;
}

type PeopleListProps = object


function PeopleList(): React.FC<PeopleListProps>  {
  const dispatch = useDispatch();
  const [people, setPeople] = useState<Person[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTwo, setLoadingTwo] = useState<boolean>(false);

  const favorites = useSelector((state: any) => state.app.favorites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTwo(true);
        const response = await fetch(`https://swapi.dev/api/people/?search=${searchText}`);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoadingTwo(false);
      }
    };

    if (searchText.trim() !== '') {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people');
        const data = await response.json();
        setPeople(data.results);
      } catch (error) {
        console.error('Error fetching people data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToFavorites = (name: string, url: string) => {
    dispatch(addToFavorites(name, url));
  };

  const handleRemoveFromFavorites = (name: string) => {
    dispatch(removeFromFavorites(name));
  };

  function extractIdFromUrl(url: string): string | null {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
  }

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/peoples">People</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <ul>
        {loadingTwo ? (<div>Loading...</div>) : (searchResults.map((person: Person, index: number) => (
          <li key={index}>
            <Link to={`/peoples/${extractIdFromUrl(person.url)}`}>{person.name}</Link>
          </li>
        )))}
      </ul>

      <h2>People List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person: Person, index: number) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.height}</td>
                <td>{person.mass}</td>
                <td>{person.hair_color}</td>
                <td>
                  {favorites.some((fav: Person) => fav.name === person.name && fav.url === person.url) ? (
                    <button onClick={() => handleRemoveFromFavorites(person.name)}>Remove from Favorites</button>
                  ) : (
                    <button onClick={() => handleAddToFavorites(person.name, person.url)}>Add to Favorites</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PeopleList;
