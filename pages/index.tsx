import { Categories } from '@/components/Categories';
import { Header } from '@/components/Header';
import { Search } from '@/components/Search';
import {Products } from '@/components/Products'
import * as React from 'react';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCart,
  updateFilter,
  fetchProducts,
  fetchCategories,
} from '../features/storeSlice';

import useFetch from './useFetch';

type product = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
};

type products = {
  products: product[];
  total: number;
  skip: number;
  limit: number;
};


const SearchBar = () => {
  const filter = useSelector((state) => state.store.filter);
  const { data, error, loading } = useSelector(
    (state) => state.store.productstate
  );

  const [search, setSearch] = React.useReducer((state, action) => {
    const text = action.toLowerCase();
    return text;
  }, ''); //useReducer
  if (loading) {
    return <div> loading search bar </div>;
  }

  if (data) {
    const filteredData = data?.products?.filter((e) => {
      if (search) {
        return e.title.toLowerCase().includes(search);
      } else {
        return false;
      }
    });
    return (
      <div>
        <h1> search </h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={'enter search'}
        />
        <div>{filteredData && filteredData.map((y) => <p>{y.title}</p>)}</div>
      </div>
    );
  }
};

const Carts = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.store.cartitems);

  return (
    <div>
      <button onClick={() => dispatch(updateCart({ type: 'clear' }))}>
        clear cart{' '}
      </button>
      cart:
      {cartitems?.map((c) => (
        <div>
          {c.title}
          <button
            onClick={() => dispatch(updateCart({ type: 'delete', payload: c }))}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};





const FilteredProducts = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.store.filter);
  const { data, error, loading } = useSelector(
    (state) => state.store.categorystate
  );
  useEffect(() => {
    dispatch(fetchCategories(filter));
    console.log('filteredproducts');
  }, []);
  if (loading) {
    return <h1> loading category </h1>;
  }
  if (data) {
    return <RenderProducts data={data} />;
  }
};

export default function App() {
  //const [data, error, loading] = useFetch<products>(
  // 'https://dummyjson.com/products'
  //);

  const [cartitems, updateCart] = useState([]);

  const filter = useSelector((state) => state.store.filter);
  const { data, error, loading } = useSelector(
    (state) => state.store.productstate
  );
  const count = useSelector((state) => state.store.value);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories(false));
  }, []);

  const [modalState, toggleModal] = useState(true)
  return (
    <>
      <div className={` w-full h-full z-20 absolute backdrop-blur-lg  justify-center items-center ${modalState ? 'flex' : 'hidden'}`}>
        <div className='w-1/2 rounded-md bg-white flex flex-col shadow-lg p-8 relative text-3xl space-y-2'>
          <h1 className='text-5xl'> Eccomerce clone built in Nextjs</h1>
          <hr />
          <p>Built in nextjs 13</p>
          <p>state manegment: Redux Toolkit</p>
          <p>database: Prisma, fake products</p>
          <button className='rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold absolute right-5 bottom-5' onClick={() => toggleModal(!modalState)}>Exit</button>
        </div>
      </div>
    <div className='font-serif'>
      
      <Search />
      {/*<Carts />
      <SearchBar />*/}
      <Categories />
       <Products />
    </div>
    </>
  );
}
