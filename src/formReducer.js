import { types } from "./types";

export const formReducer = (state, action) => {
  switch (type.action) {
    case types.add:
      return [...state, action.payload];
    default:
      return state;
  }
};
