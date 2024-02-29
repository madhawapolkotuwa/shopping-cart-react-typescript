import { Action, FilterState, State } from "./types";

export const cartReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            const updatedProducts = [...state.products, ...action.payload];
            return { ...state, products: updatedProducts };
        case 'FETCH_PRODUCTS_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'PAGE_LOAD':
            return { ...state, count: action.payload }
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter(c => c.id !== action.payload.id) }
        case "CHANGE_CART_QTY":
            return { ...state, cart: state.cart.filter(c => c.id === action.payload.id ? (c.qty = action.payload.qty) : (c.qty)) }
        default:
            return state;
    }
}

export const filterReducer = (state: FilterState, action: Action): FilterState => {

    switch (action.type) {

        case "SORT_BY_PRICE":
            return { ...state, sort: action.payload };
        case "FILTER_BY_CATEGORY":
            return { ...state, category: action.payload };
        case "FILTER_BY_RATING":
            return { ...state, byRating: action.payload };
        case "FILTER_BY_SEARCH":
            return { ...state, searchQuery: action.payload };
        case "CLEAR_FILTERS":
            return { ...state, sort: '', category: 'Categories', byRating: 0 };
        default:
            return state;
    }
}