const initialState = {
  favorites: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, { name: action.payload.name, url: action.payload.url }],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter((person) => person.name !== action.payload),
      };
    default:
      return state;
  }
};

export default appReducer;