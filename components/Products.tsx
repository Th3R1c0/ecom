import { useSelector, useDispatch } from 'react-redux';

import {
    updateCart,
    updateFilter,
    fetchProducts,
    fetchCategories,
  } from '../features/storeSlice';
import { RenderProducts } from './RenderProducts';

export const Products = () => {
    const { data, error, loading } = useSelector(
      (state) => state.store.productstate
    );
    const cartitems = useSelector((state) => state.store.cartitems);
  
    if (loading) {
      return <div> loading </div>;
    }
    if (data) {
      return <RenderProducts data={data} />;
    }
    if (error) {
      return <div> error loading products </div>;
    }
  };