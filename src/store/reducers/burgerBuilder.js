import * as actionTypes from '../actions/actionTypes';

const initialState  = {
  ingredients: null,
  totalPrice: 3,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  turkeyBacon: 0.7
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredName]: state.ingredients[action.ingredName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredName]
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredName]: state.ingredients[action.ingredName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
        return state;
  }
};

export default reducer;