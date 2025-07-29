import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../services/categoryService';

import { Category } from '../../interfaces/category.interface';

interface CategoryState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  error: null
};

// Async Thunks
export const getAllCategories = createAsyncThunk('category/getAllCategories', async () => {
  const response = await fetchCategories();
  return response;
});

export const getCategoryById = createAsyncThunk('category/getCategoryById', async (id: number) => {
  const response = await fetchCategoryById(id);
  return response;
});

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (categoryData: { name: string; description: string }) => {
    const response = await createCategory(categoryData);
    return response;
  }
);

export const updateCategoryById = createAsyncThunk(
  'category/updateCategoryById',
  async ({ id, categoryData }: { id: number; categoryData: { name: string; description: string } }) => {
    const response = await updateCategory(id, categoryData);
    return response;
  }
);

export const deleteCategoryById = createAsyncThunk('category/deleteCategoryById', async (id: number) => {
  const response = await deleteCategory(id);
  return response.id; 
});

// Slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })

      // Get By ID
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch category';
      })

      // Add
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add category';
      })

      // Update
      .addCase(updateCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update category';
      })

      // Delete
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete category';
      });
  }
});

export default categorySlice.reducer;
