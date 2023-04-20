import {
    CREATE_TIPS,
    RETRIEVE_TIPS,
    UPDATE_TIPS,
    MY_TIPS
  } from "./types";
  
  import TIPSDataService from "../services/tips.service";
  
  export const createTIPS = (desc) => async (dispatch) => {
    try {
      const res = await TIPSDataService.postTips(desc);
  
      dispatch({
        type: CREATE_TIPS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveTIPS = () => async (dispatch) => {
    try {
      const res = await TIPSDataService.getAllTips();
      dispatch({
        type: RETRIEVE_TIPS,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateTIPS = (id, data) => async (dispatch) => {
    try {
      const res = await TIPSDataService.updateTips(id, data);
  
      dispatch({
        type: UPDATE_TIPS,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };


  export const userTIPS = () => async (dispatch) => {
    try {
      const res = await TIPSDataService.getMyTips();
      dispatch({
        type: MY_TIPS,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
