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
    console.log("Line 17 RC", savedUserData);
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      console.log("Line 20 RC", userData);
      if (userData?.rounds && userData?.rounds?.length > 0) {
        dispatch({ type: "SET_ROUNDS", payload: userData.rounds });
      }
    }
  }, []);

  useEffect(() => {
    console.log("line 27", state.rounds);
    const userData = {
      ...JSON.parse(localStorage.getItem("user@ss.org")),
      rounds: state.rounds,
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
