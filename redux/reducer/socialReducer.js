import findFriend from "../../pages/api/socialApi/findFriend";
import {
  FIND_FRIEND_LOADING,
  FIND_FRIEND_SUCCESS,
  FIND_FRIEND_FAILURE,
  GET_STORY_LOADING,
  GET_STORY_SUCCESS,
  GET_STORY_FAILURE,
  POST_STORY_UPLOAD_LOADING,
  POST_STORY_UPLOAD_SUCCESS,
  POST_STORY_UPLOAD_FAILURE,
  PROFILE_UPLOAD_LOADING,
  PROFILE_UPLOAD_SUCCESS,
  PROFILE_UPLOAD_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,
  findFriend: {},
  getStoryPost: {},
  uploadStoryPost: {},
  uploadProfile:{},
};
const socialReducer = (state = initialState, action) => {
  
  switch (action.type) {
  case GET_STORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
        getStoryPost: action.payload,
        error: {},
      };
    case GET_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        getStoryPost: [],
        error: action,
      };
    case POST_STORY_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
        uploadStoryPost: action.payload,
      };
    case POST_STORY_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadStoryPost: action.payload,
        error: {},
      };
    case POST_STORY_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        uploadStoryPost: [],
        error: action,
      };
    case PROFILE_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
        uploadProfile: action.payload,
      };
    case PROFILE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadProfile: action.payload,
        error: {},
      };
    case PROFILE_UPLOAD_FAILURE:
        return {
          ...state,
          loading: false,
          uploadProfile: [],
          error: action,
        };
    
      default:
      return state;
  }
};

export default socialReducer;
