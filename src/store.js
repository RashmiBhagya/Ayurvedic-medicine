import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	adminLoginReducer,
	adminRegisterReducer,
	adminViewReducer,
	adminUpdateReducer,
} from "./reducers/adminReducers";

import {
	customerLoginReducer,
	customerRegisterReducer,
	customerViewReducer,
	customerUpdateReducer,
	customerListReducer,
	customerViewByIdReducer,
	customerUpdateByIdReducer,
	customerDeleteReducer,
} from "./reducers/customerReducers";

import {
	sellerLoginReducer,
	sellerRegisterReducer,
	sellerViewReducer,
	sellerUpdateReducer,
	sellerListReducer,
	sellerViewByIdReducer,
	sellerUpdateByIdReducer,
    sellerDeleteReducer,
} from "./reducers/sellerReducers";


const reducer = combineReducers({
	admin_Login: adminLoginReducer,
	adminRegistration: adminRegisterReducer,
	adminView: adminViewReducer,
	adminUpdate: adminUpdateReducer,
	customer_Login: customerLoginReducer,
	customerRegistration: customerRegisterReducer,
	customerView: customerViewReducer,
	customerUpdate: customerUpdateReducer,
	customerList: customerListReducer,
	customerDelete: customerDeleteReducer,
	customerViewById: customerViewByIdReducer,
	customerUpdateById: customerUpdateByIdReducer,
	seller_Login: sellerLoginReducer,
	sellerRegistration: sellerRegisterReducer,
	sellerView: sellerViewReducer,
	SellerUpdate: sellerUpdateReducer,
	SellerList: sellerListReducer,
	SellerDelete: sellerDeleteReducer,
	SellerViewById: sellerViewByIdReducer,
	SellerUpdateById: sellerUpdateByIdReducer,
	
});

const adminInfoFromStorage = localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null;

const sellerInfoFromStorage = localStorage.getItem("sellerInfo")
	? JSON.parse(localStorage.getItem("sellerInfo"))
	: null;

const customerInfoFromStorage = localStorage.getItem("customerInfo")
	? JSON.parse(localStorage.getItem("customerInfo"))
	: null;

const initialState = {
	admin_Login: { adminInfo: adminInfoFromStorage },
	seller_Login: { sellerInfo: sellerInfoFromStorage },
	customer_Login: { customerInfo: customerInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
