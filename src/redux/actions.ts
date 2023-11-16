
export const addToFavorites = (name, url) => {
  return {
    type: 'ADD_TO_FAVORITES',
    payload: { name, url },
  };
};
  
  export const removeFromFavorites = (name) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: name,
  });
  