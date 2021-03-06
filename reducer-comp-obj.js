// Redux Reducer

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (
    state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, 
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;          
    }  
};

const visibilityFilter = (
    state = 'SHOW_ALL', 
    action) => {
        switch (action.type) {
            case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
        }
} 

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(
//                 state.todos,
//                 action 
//             ),
//             visibilityFilter: visibilityFilter(
//                 state.visibilityFilter,
//                 action 
//             )
//     };
// };

// above code was reduced to below using combine reducers

const { combineReducers } = Redux;
const todoApp = combineReducers ({
    // todos: todos,
    // visibilityFilter:visibilityFilter
    // can be converted to ES6 Object literal destructing
    todos,
    visibilityFilter
});

/** above pure functions shows the concept of reducer **/
const { createStore } = Redux;
const store = createStore(todoApp); // To create a redux store , 
                                    //pass a reducer in redux store

console.log('Initial state:');
console.log(store.getState());
console.log('-------------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
});

console.log('Current state:');
console.log(store.getState());
console.log('------------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Go shopping'
});

console.log('Current state:');
console.log(store.getState());
console.log('------------------');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});

console.log('Current state:');
console.log(store.getState());
console.log('----------------');
