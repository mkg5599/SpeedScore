const roundsReducer = (state, action) => {
  console.log("Reducer file", state, action);
  switch (action.type) {
    case "SET_ROUNDS":
      return {
        ...state,
        rounds: action.payload,
      };
    case "ADD_ROUND":
      return {
        ...state,
        rounds: [...state.rounds, action.payload],
      };
    case "UPDATE_ROUND":
      return {
        ...state,
        rounds: action.payload,
      };
    case "DELETE_ROUND":
      // Logic to delete a round
      return state;
    default:
      return state;
  }
};

export default roundsReducer;
