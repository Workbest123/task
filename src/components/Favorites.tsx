import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Favorites(): React.FC  {
  const favorites = useSelector((state: any) => state.app.favorites);

  function extractIdFromUrl(url: string) {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
  }

  return (
    <table>
      <tbody>
        {favorites.map((person: any, index: number) => (
          <tr key={index}>
            <td>
              {person.url && typeof person.url === 'string' ? (
                <Link to={`/peoples/${extractIdFromUrl(person.url)}`}>{person.name}</Link>
              ) : (
                <span>{person.name}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Favorites;
