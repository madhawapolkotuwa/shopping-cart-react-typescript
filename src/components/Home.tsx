import React, { useContext, useEffect, useState } from 'react';
import Filter from './Filter';
import './styles.css';
import { GlobalContext } from '../context/Context';
import SingleProduct from './SingleProduct';
import { Button } from 'react-bootstrap';
import { Product } from '../context/types';

const Home: React.FC = () => {

  const { state: { products, count }, dispatch, filterState: { category, byRating, searchQuery, sort } } = useContext(GlobalContext);

  const [disableButton, setDisableButton] = useState(false);
  const [pageCount, setPageCount] = useState<any>(null);


  const fetchProductsFromApi = async () => {
    try {
      const data = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`).then(res => res.json());
      if (data) {
        // console.log(data.products as Product[]);
        dispatch({ type: 'FETCH_PRODUCTS', payload: data.products as Product[] });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCategoriesFromApi = async () => {
    try {
      const data = await fetch('https://dummyjson.com/products/categories').then(res => res.json());
      if (data) {
        //console.log(data);
        dispatch({ type: 'FETCH_PRODUCTS_CATEGORIES', payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLoadMore = () => {
    dispatch({ type: 'PAGE_LOAD', payload: (count + 1) });
  }

  useEffect(() => {
    if (pageCount !== null) { // remove the page reload fetch
      fetchProductsFromApi();
      setPageCount(count);
    } else {
      if (products.length === 0)
        fetchProductsFromApi(); // initial fetch
      fetchCategoriesFromApi();
      setPageCount(count);
    }
  }, [count]);


  const filteredProducts = (): Product[] => {

    let filteredProducts = products;
    console.log(filteredProducts);
    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) =>
        sort === 'lowToHigh' ? (a.price - b.price) : (b.price - a.price)
      );
    }

    if(byRating){
      filteredProducts = filteredProducts.filter(product => Math.round(product.rating) >= byRating);
    }

    if(category !== 'Categories' && category){
      filteredProducts = filteredProducts.filter(product => product.category === category );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || prod.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts;
  }


  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true);
  }, [products]);

  return (
    <div className='home'>
      <Filter />
      <div className='productContainer'>
        {
          filteredProducts().map(prodItem =>
            <SingleProduct key={prodItem.id} prodItem={prodItem} />
          )
        }
      </div>
      <div className='load-more'>
        <Button disabled={disableButton} onClick={() => handleLoadMore()}>Load more</Button>
        {
          disableButton ? <p>You have reached to 100 products...</p> : null
        }
      </div>
    </div>
  )
}

export default Home