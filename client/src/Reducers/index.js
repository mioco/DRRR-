const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TALKS': 
      return [...action.talks];
      // return state;
    case 'INIT_TALKS':
      return [...action.talks];
    default:
      return state;
  }
}

export default reducer;