import {configureStore} from '@reduxjs/toolkit';
import taskReducer from "./taskSlice";


const store = configureStore({
    reducer:{
        task:taskReducer,
    },
});

export default store;



// store becomes a Redux Store object with 5 core things inside it:

// store = {
//   dispatch,
//   getState,
//   subscribe,
//   replaceReducer,
//   @@observable
// }
