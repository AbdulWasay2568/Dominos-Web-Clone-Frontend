import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../services/productService';
import { Product } from '../../interfaces/product.interface';

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null
};

// Async Thunks
export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  const response = await fetchProducts();
  return response;
});

export const getProductById = createAsyncThunk('product/getProductById', async (id: number) => {
  const response = await fetchProductById(id);
  return response;
});

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productData: { name: string; price: number; description: string, categoryId: number }) => {
    const response = await createProduct(productData);
    return response;
  }
);

export const updateProductById = createAsyncThunk(
  'product/updateProductById',
  async ({ id, productData }: { id: number; productData: { name: string; price: number; description: string } }) => {
    const response = await updateProduct(id, productData);
    return response;
  }
);

export const deleteProductById = createAsyncThunk('product/deleteProductById', async (id: number) => {
  const response = await deleteProduct(id);
  return response.id;
});

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.product = null;
    }
  },
  extraReducers: (builder) => {
    // Get All Products
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch products';
    });

    // Get Product By ID
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch product';
    });

    // Add Product
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add product';
    });

    // Update Product
    builder.addCase(updateProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProductById.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(updateProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update product';
    });

    // Delete Product
    builder.addCase(deleteProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProductById.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.products = state.products.filter((p) => p.id !== action.payload);
    });
    builder.addCase(deleteProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete product';
    });
  }
});

export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
