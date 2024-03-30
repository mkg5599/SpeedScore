import React, { createContext, useContext, useReducer, useEffect } from "react";
import roundsReducer from "../reducer/roundsReducer";

const RoundsContext = createContext();

export const useRoundsContext = () => useContext(RoundsContext);

const initialState = {
  rounds: [],
};

const RoundsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roundsReducer, initialState);

  useEffect(() => {
    const savedUserData = localStorage.getItem("user@ss.org");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      if (userData?.rounds && userData?.rounds?.length > 0) {
        dispatch({ type: "SET_ROUNDS", payload: userData.rounds });
      }
    }
  }, []);

  useEffect(() => {
    const userData = {
      ...JSON.parse(localStorage.getItem("user@ss.org")),
      rounds: state.rounds,
      roundCount: parseInt(state.rounds?.length) + 1,
    };
    localStorage.setItem("user@ss.org", JSON.stringify(userData));
  }, [state.rounds]);

  return (
    <RoundsContext.Provider value={{ state, dispatch }}>
      {children}
    </RoundsContext.Provider>
  );
};

export default RoundsContextProvider;
