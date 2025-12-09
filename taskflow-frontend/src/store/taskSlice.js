import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { taskApi } from "../api/https";



export const fetchTask = createAsyncThunk("tasks/fetchTask",  async (_, { rejectWithValue }) =>{

    try{
 const taskResposne = await taskApi.get("/getTask");
        return taskResposne.data;
    }
    catch(err){
      return rejectWithValue(err.response.data); 
    }
})


export const createTask = createAsyncThunk("task/createTask", async (payload,{rejectWithValue})=>{
    try{
        const response = await taskApi.post("/createTask", payload);
        return response.data;
    }
    catch(err){
      return rejectWithValue(err.response.data); 

    }
})


export const updateTask = createAsyncThunk("task/updateTask",async({ id, payload },{rejectWithValue})=>{

    try{
    const res = await taskApi.put(`/updateTasks/${id}`, payload);
    return res.data;
}
catch(err){
    return rejectWithValue(err.response.data);}

})

// DELETE
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await taskApi.delete(`/deleteTasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete task");
    }
  }
);



const taskSlice = createSlice({
    name:"task",
    initialState:{
        task:[],
        loading:false,
        err:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchTask.pending,(state)=>{
            state.loading=true;
            state.err=null;
        })
        builder.addCase(fetchTask.fulfilled,(state,action)=>{
            state.loading=false;
            state.task = action.payload;

        })
        builder.addCase(fetchTask.rejected,(state,action)=>{
            state.loading=false;
            state.err=action.payload;
        })
        builder.addCase(createTask.fulfilled,(state,action)=>{
            state.task.unshift(action.payload);
        })
        builder.addCase(updateTask.fulfilled,(state,action)=>{
         const index = state.task.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.task[index] = action.payload;        })

            builder.addCase(deleteTask.fulfilled,(state,action)=>{
                state.task = state.task.filter((t) =>t.id!==action.payload);
            })

    }
})


export default taskSlice.reducer;