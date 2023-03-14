import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('fetchproducts', async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data;
});

export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async (filter) => {
    if (filter) {
      const res = await fetch(`https://dummyjson.com/products/category/${filter}`);
      console.log(`https://dummyjson.com/products/category/${filter}`)
      const data = await res.json();
      return data;
    }
    const res = await fetch('https://dummyjson.com/products/categories');
    const data = await res.json();
    return data;
  }
);



export const storeReducer = createSlice({
  name: 'store',
  initialState: {
    value: 0,
    productstate: {
      data: [],
      error: false,
      loading: false,
    },
    categorystate: {
      data: [],
      error: false,
      loading: false,
    },
    cartitems: [],
    filter: false,
  },
  reducers: {
    updateCart: (state, action) => {
      if (action.payload.type == 'add') {

        state.cartitems = [...state.cartitems, action.payload.payload];
      } else if (action.payload.type === 'clear') {
        state.cartitems = [];
      } else if (action.payload.type === 'delete') {
        const updatedCart = state.cartitems?.filter(
          (item) => item.id !== action.payload.payload.id
        );
        state.cartitems = updatedCart;
      }
    },
    updateFilter: (state, action) => {
      if (action.payload.type === 'clear') {
        state.filter = [];
      } else if (action.payload.type === 'add') {
        state.filter = [action.payload.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.productstate.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productstate.loading = false;
      state.productstate.data = action.payload;
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.categorystate.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categorystate.loading = false;
      state.categorystate.data = action.payload;
    });

  },
});

// Action creators are generated for each case reducer function
export const { updateCart, updateFilter } = storeReducer.actions;

export default storeReducer.reducer;
