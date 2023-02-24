import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projectData: [],
};
const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectData(state, action) {
      state.projectData = action.payload;
    },
  },
});

export const { setProjectData } = ProjectSlice.actions;
export default ProjectSlice.reducer;