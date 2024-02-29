import React, { ReactNode, createContext, useReducer } from 'react';
import { Action, FilterState, State } from './types';
import { cartReducer, filterReducer } from './Reducer';

interface GlobaleStateProps {
    children: ReactNode;
}

const intialState: State = {
    products: [],
    cart: [],
    categories: [],
    count: 0,
}

const intitalFilterState: FilterState = {
    category: 'Categories',
    byRating: 0,
    searchQuery: '',
    sort: '',
}

export const GlobalContext = createContext<
{
    state: State;
    dispatch: React.Dispatch<Action>;
    filterState: FilterState;
    filterDispach: React.Dispatch<Action>;
}
>({ 
    state: intialState,
    dispatch: () => undefined,
    filterState: intitalFilterState,
    filterDispach: () => undefined
});

const GlobalState : React.FC<GlobaleStateProps> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, intialState);
    const [filterState, filterDispach] = useReducer(filterReducer,intitalFilterState);
    // console.log(state);
  return (
    <GlobalContext.Provider value={{state, dispatch, filterState, filterDispach}}>{children}</GlobalContext.Provider>
  )
}

export default GlobalState