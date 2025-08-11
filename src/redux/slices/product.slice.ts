import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductWithAddons,
  updateProductImage,
} from '../../services/productService';
import { Product, CreateProductWithAddonsDto } from '../../interfaces/product.interface';

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

export const createProductWithAddon = createAsyncThunk(
  'product/createProductWithAddon',
  async ({
    data,
    imageFile,
  }: {
    data: CreateProductWithAddonsDto;
    imageFile: File;
  }) => {
    const response = await createProductWithAddons(data, imageFile);
    return response;
  }
);

export const updateProductImageById = createAsyncThunk(
  'product/updateImage',
  async ({ productId, imageFile }: { productId: number; imageFile: File }, { rejectWithValue }) => {
    try {
      return await updateProductImage(productId, imageFile);
    } catch (error) {
      return rejectWithValue(`Failed to update product image for product ${productId}` + error);
    }
  }
);


export const updateProductByIdWithImage = createAsyncThunk(
  'product/updateProductByIdWithImage',
  async (
    {
      id,
      data,
      image,
    }: {
      id: number;
      data: CreateProductWithAddonsDto;
      image?: File;
    },
  ) => {
    // First update base data
    const updatedProduct = await updateProduct(id, {
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
    });

    // If there's an image, update it
    let finalProduct = updatedProduct;
    if (image) {
      finalProduct = await updateProductImage(id, image);
    }

    return finalProduct;
  }
);

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
    builder
    // Get All Products
    .addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch products';
    })

    // Get Product By ID
    .addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch product';
    })

    // Add Product
    .addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.products.push(action.payload);
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add product';
    })

    // Update Product
    .addCase(updateProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProductById.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    })
    .addCase(updateProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update product';
    })

    // Delete Product
    .addCase(deleteProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProductById.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.products = state.products.filter((p) => p.id !== action.payload);
    })
    .addCase(deleteProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete product';
    })
    // Create Product with Addons
    .addCase(createProductWithAddon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductWithAddon.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // or refetch later
      })
      .addCase(createProductWithAddon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product with addons';
      })

      // Update Product Image
    .addCase(updateProductImageById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProductImageById.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
      if (state.product?.id === action.payload.id) state.product = action.payload;
    })
    .addCase(updateProductImageById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update product image';
    })

    // Update Product By ID with Image
    .addCase(updateProductByIdWithImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProductByIdWithImage.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProduct = action.payload;
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) state.products[index] = updatedProduct;
      if (state.product?.id === updatedProduct.id) state.product = updatedProduct;
    })
    .addCase(updateProductByIdWithImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update product with image';
    })


  }
});

export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
