import { INCREMENT, DECREMENT } from './actions';
// Initial state of the app
const initialState = {
count: 0,
};
// Reducer function to handle actions and modify the state
const counterReducer = (state = initialState, action) => {
switch (action.type) {
case INCREMENT:
return { ...state, count: state.count + 1 };
case DECREMENT:
return { ...state, count: state.count - 1 };
default:
return state;
}
};
export default counterReducer;