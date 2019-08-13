import {
  GET_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER,
  MEMBERS_LOADING
} from './types';
import axios from 'axios';

export const getMembers = () => dispatch => {
  dispatch(setMemberLoading());
  axios.get('/api/members').then(res =>
    dispatch({
      type: GET_MEMBERS,
      payload: res.data
    })
  );
};

export const addMember = member => dispatch => {
  console.log(member);
  axios.post('/api/members', member).then(res =>
    dispatch({
      type: ADD_MEMBER,
      payload: res.data
    })
  );
};

export const deleteMember = id => dispatch => {
  console.log(id);
  axios.delete(`/api/members/${id}`).then(res =>
    dispatch({
      type: DELETE_MEMBER,
      payload: id
    })
  );
};

export const updateMember = (id, updatedMember) => dispatch => {
  console.log(id);
  console.log(updatedMember);
  axios
    .put(`/api/members/${id}`, updatedMember, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res =>
      dispatch({
        type: UPDATE_MEMBER,
        payload: res.data
      })
    );
};

export const setMemberLoading = () => {
  return {
    type: MEMBERS_LOADING
  };
};
