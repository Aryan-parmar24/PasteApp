import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  pastes:localStorage.getItem("pastes") 
  ? JSON.parse(localStorage.getItem("pastes")) 
  : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste=action.payload;
      //check already exist vadu check krvuuu
      const existingPaste = state.pastes.find(p => p._id === paste._id);
      if(existingPaste){
        toast("Paste already exists");
        return;
      }

      //push in state storage
      state.pastes.push(paste);
      //store  in local storage
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      //after storing data in local storage need to make one toast
      toast("Paste created successfully..");
    },
    updatePaste: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((p)=>p._id===paste._id);

      if(index >= 0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast("Paste updated successfully..");
      }
    },
    resetAllPaste : (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
      toast("All pastes cleared");
    },
    removeFromPaste: (state, action) => {  
      const pasteId=action.payload;
      const index=state.pastes.findIndex((p)=>p._id===pasteId);

      if(index >= 0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast("Paste Deleted successfully..");
      }
     },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updatePaste, resetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer