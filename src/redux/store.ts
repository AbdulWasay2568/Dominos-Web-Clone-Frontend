import { configureStore } from "@reduxjs/toolkit";
import
{ authReducer, 
categoryReducer, 
productReducer, 
addonsReducer, 
addonOptionsReducer,
cartReducer
} from "./slices"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        addons: addonsReducer,
        addonOptions: addonOptionsReducer,
        cart: cartReducer
        
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;