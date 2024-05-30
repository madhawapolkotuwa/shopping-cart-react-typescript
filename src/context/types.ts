
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface State {
    products: Product[];
    cart: any[] ;
    categories: Category[];
    count: number;
}

export interface Category
{
    name: string;
    slug: string;
    url: string;
}

export interface FilterState {
    category: string;
    byRating: number;
    searchQuery: string;
    sort: string;
}

export interface Action {
    type: string;
    payload: any;
}

