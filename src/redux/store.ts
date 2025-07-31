import { configureStore } from "@reduxjs/toolkit";
import
{ authReducer, 
categoryReducer, 
productReducer, 
addonsReducer, 
addonOptionsReducer,
cartReducer,
cartItemReducer,
orderReducer,
orderItemReducer
} from "./slices"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        addons: addonsReducer,
        addonOptions: addonOptionsReducer,
        cart: cartReducer,
        cartItem: cartItemReducer,
        order: orderReducer,
        orderItem: orderItemReducer
        
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;