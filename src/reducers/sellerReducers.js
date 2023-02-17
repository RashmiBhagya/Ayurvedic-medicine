import {
	SELLER_LOGIN_FAIL,
	SELLER_LOGIN_REQUEST,
	SELLER_LOGIN_SUCCESS,
	SELLER_LOGOUT,
	SELLER_REGISTER_FAIL,
	SELLER_REGISTER_REQUEST,
	SELLER_REGISTER_SUCCESS,
	SELLER_VIEW_FAIL,
	SELLER_VIEW_REQUEST,
	SELLER_VIEW_SUCCESS,
	SELLER_UPDATE_FAIL,
	SELLER_UPDATE_REQUEST,
	SELLER_UPDATE_SUCCESS,
	SELLER_DELETE_FAIL,
	SELLER_DELETE_REQUEST,
	SELLER_DELETE_SUCCESS,
	SELLER_LIST_FAIL,
	SELLER_LIST_REQUEST,
	SELLER_LIST_SUCCESS,
	SELLER_VIEW_BY_ID_FAIL,
	SELLER_VIEW_BY_ID_REQUEST,
	SELLER_VIEW_BY_ID_SUCCESS,
	SELLER_UPDATE_BY_ID_FAIL,
	SELLER_UPDATE_BY_ID_REQUEST,
	SELLER_UPDATE_BY_ID_SUCCESS,
} from "../constants/sellerConstants";

export const sellerLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case SELLER_LOGIN_REQUEST:
			return { loading: true };
		case SELLER_LOGIN_SUCCESS:
			return { loading: false, sellerInfo: action.payload };
		case SELLER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case SELLER_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const sellerRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case SELLER_REGISTER_REQUEST:
			return { loading: true };
		case SELLER_REGISTER_SUCCESS:
			return { loading: false, sellerInfo: action.payload };
		case SELLER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const sellerViewReducer = (state = {}, action) => {
	switch (action.type) {
		case SELLER_VIEW_REQUEST:
			return { loading: true };
		case SELLER_VIEW_SUCCESS:
			return { loading: false, sellerInfo: action.payload };
		case SELLER_VIEW_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const sellerUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case SELLER_UPDATE_REQUEST:
			return { loading: true };
		case SELLER_UPDATE_SUCCESS:
			return { loading: false, sellerInfo: action.payload, success: true };
		case SELLER_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const sellerDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case SELLER_DELETE_REQUEST:
			return { loading: true };
		case SELLER_DELETE_SUCCESS:
			return { loading: false, sellerInfo: action.payload, success: true };
		case SELLER_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const sellerListReducer = (state = { sellers: [] }, action) => {
	switch (action.type) {
		case SELLER_LIST_REQUEST:
			return { loading: true };
		case SELLER_LIST_SUCCESS:
			return { loading: false, sellers: action.payload };
		case SELLER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};



export const sellerViewByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case SELLER_VIEW_BY_ID_REQUEST:
			return { loading: true };
		case SELLER_VIEW_BY_ID_SUCCESS:
			return { loading: false, sellerInfo: action.payload, success: true };
		case SELLER_VIEW_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const sellerUpdateByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case SELLER_UPDATE_BY_ID_REQUEST:
			return { loading: true };
		case SELLER_UPDATE_BY_ID_SUCCESS:
			return { loading: false, sellerInfo: action.payload, success: true };
		case SELLER_UPDATE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
