import {
    RECEIVE_MOVIES,
    RECEIVE_MOVIE
  } from '../actions/movie_actions';
  
  const moviesReducer = (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {
      case RECEIVE_MOVIES:
        return action.movies;
      case RECEIVE_MOVIE:
        const newMovie = { [action.movie.id]: action.movie };
        return Object.assign({}, state, newMovie);
      default:
        return state;
    }
  };
  
  export default moviesReducer;
  