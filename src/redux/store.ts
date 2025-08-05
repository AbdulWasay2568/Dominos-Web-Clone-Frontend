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
orderItemReducer,
addressReducer,
userReducer,
loadingReducer,
favouritesReducer,
} from "./slices"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
        addons: addonsReducer,
        addonOptions: addonOptionsReducer,
        cart: cartReducer,
        cartItem: cartItemReducer,
        order: orderReducer,
        orderItem: orderItemReducer,
        address: addressReducer,
        favourites: favouritesReducer,
        loading: loadingReducer,

        
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;