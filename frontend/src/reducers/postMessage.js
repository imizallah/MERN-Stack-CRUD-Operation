import {ACTION_TYPES} from '../actions/postMessage'

const initialState = {
  list: [] //In Redux Store, 'list' will be stored as: 'pastMessage.list'
} 
//08160304055

//value of 'action' parameter will be same as that of 'Object' passed in side 'dispatch' in 'actions' folder
//'state' we define data to be stored inside 'Redux Store'
export const postMessage = (state=initialState, action) => { 
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
        return {
          ...state,
          list: [...action.payload]
        }
    case ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        // Updating list here
        list: state.list.map(x => x._id == action.payload._id ? action.payload : x)
      } 
      
    case ACTION_TYPES.DELETE:
      return {
        ...state,
        // Updating list here
        list: state.list.filter(x => x._id != action.payload)
      } 

    default:
      return state;
  }
}