// import uuid from 'uuid';
import {
  GET_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER,
  MEMBERS_LOADING
} from '../actions/types';

const initialState = {
  members: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        members: action.payload,
        loading: false
      };

    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter(member => member._id !== action.payload)
      };
    case ADD_MEMBER:
      return {
        ...state,
        members: [...state.members, action.payload] // if action.payload not first new member added to bottom of list until refresh browser
      };
    case UPDATE_MEMBER:
      //   console.log(state.members);
      //   console.log(action.payload);

      state.members.map(member => {
        if (member._id === action.payload._id) {
          member.name = action.payload.name;
          member.role = action.payload.role;
          return {
            ...state,
            members: [...state.members, action.payload]
          };
        } else return state;
      });

    //   break;

    case MEMBERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
