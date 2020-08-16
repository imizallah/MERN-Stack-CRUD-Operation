import api from './api.js';

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL'
}

// Read all posts from the database
export const fetchAll = () => dispatch => {
  // Get Request to fetch all data from the database
  api.postMessage().fetchAll()
    .then(res => {
      // console.log("What the hell!!!!!!! ", res)
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: res.data 
      })
    })
    .catch(err => console.log("Error:: ", err));
}

// Create new posts 
export const create = (data, onSuccess) => dispatch => {
  api.postMessage().create(data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data 
      })
      onSuccess();
    })
    .catch(err => console.log("Error:: ", err));
}

// Update any post by 'id'
export const update = (id, data, onSuccess) => dispatch => {
  api.postMessage().update(id, data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data 
      })
      onSuccess();
    })
    .catch(err => console.log("Error:::::: ", err));
}

// Delete any post by 'id'. Note that 
export const Delete = (id, onSuccess) => dispatch => {
  api.postMessage().delete(id)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id 
      })
      onSuccess();
    })
    .catch(err => console.log("Error:: ", err));
}