import {
    CREATE_TIPS,
    RETRIEVE_TIPS,
    UPDATE_TIPS,
    MY_TIPS
} from "../actions/types";

const initialState = [];

const tipsReducer = (tips = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TIPS:
      return [...tips, payload];

    case RETRIEVE_TIPS:
      return payload;
      case MY_TIPS:
      return payload;

    case UPDATE_TIPS:
      return tips.map((tip) => {
        if (tip.id === payload.id) {
          return {
            ...tip,
            ...payload,
          };
        } else {
          return tip;
        }
      });
    default:
      return tips;
  }
};

export default tipsReducer;
