/*
*These are the front end actions to 
*manage a Seller account these frontend actions calls the backend routes and then these 
*actions connect frontend and backend
*/
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
import axios from "axios";
import swal from "sweetalert";

/**
 * This action is implemented to
 * to login a Seller to their account
 */
export const sellerLogin = (nic, password) => async (dispatch) => {
	try {
		dispatch({ type: SELLER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post("/user/seller/login", { nic, password }, config);

		dispatch({ type: SELLER_LOGIN_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Seller Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/seller";
		}, 2000);
		localStorage.setItem("sellerInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: SELLER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

/**
 * This action is implemented to
 * to pass the access permission to the do the other functionalities 
 */
export function authHeader() {
	let seller = JSON.parse(localStorage.getItem("sellerInfo"));

	if (seller && seller.token) {
		return { Authorization: `Bearer ${seller.token}` };
	} else {
		return {};
	}
}

/**
 * This action is implemented to
 * to log out a seller from the account
 */
export const sellerLogout = () => async (dispatch) => {
	localStorage.removeItem("sellerInfo");
	dispatch({ type: SELLER_LOGOUT });
};

/**
*This action is implemented to
*create a new seller account
*/
export const sellerRegister =
	(
		sellerId,
		ownerName,
		dob,
		nic,
		gender,
		telephone,
		companyName,
		companyAddress,
		email,
		password,
		pic,
		suppliyingMaterials
	) =>
	async (dispatch) => {
		try {
			dispatch({ type: SELLER_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post(
				`/user/seller/register`,
				{
					sellerId,
					ownerName,
					dob,
					nic,
					gender,
					telephone,
					companyName,
					companyAddress,
					email,
					password,
					pic,
					suppliyingMaterials,
				},
				config
			);

			dispatch({ type: SELLER_REGISTER_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Seller Registration Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/staff";
			}, 2000);
		} catch (error) {
			dispatch({
				type: SELLER_REGISTER_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			});
		}
	};


    export const sellerViewProfile = (seller) => async (dispatch, getState) => {
        try {
            dispatch({ type: SELLER_VIEW_REQUEST });
    
            const {
                seller_Login: { sellerInfo },
            } = getState();
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sellerInfo.token}`,
                },
            };
    
            const { data } = await axios.get("/user/seller/view", seller, config);
    
            dispatch({ type: SELLER_VIEW_SUCCESS, payload: data });
    
            dispatch({ type: SELLER_LOGIN_SUCCESS, payload: data });
    
            localStorage.setItem("sellerInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: SELLER_VIEW_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };
    
    export const sellerUpdateProfile = (seller) => async (dispatch, getState) => {
        try {
            dispatch({ type: SELLER_UPDATE_REQUEST });
    
            const {
                seller_Login: { sellerInfo },
            } = getState();
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sellerInfo.token}`,
                },
            };
    
            const { data } = await axios.put("/user/seller/edit", seller, config);
    
            dispatch({ type: SELLER_UPDATE_SUCCESS, payload: data });
            swal({
                title: "Success !!!",
                text: "Seller Account Update Successful.",
                icon: "success",
                timer: 2000,
                button: false,
            });
            setTimeout(function () {
                window.location.href = "/seller-view";
            }, 2000);
            dispatch({ type: SELLER_LOGIN_SUCCESS, payload: data });
    
            localStorage.setItem("sellerInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: SELLER_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };
    
    export const sellersList = () => async (dispatch, getState) => {
        try {
            dispatch({
                type: SELLER_LIST_REQUEST,
            });
    
            const {
                admin_Login: { adminInfo },
            } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${adminInfo.token}`,
                },
            };
    
            const { data } = await axios.get(`/user/admin/sellers`, config);
    
            dispatch({
                type: SELLER_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            dispatch({
                type: SELLER_LIST_FAIL,
                payload: message,
            });
        }
    };
    
    
    
    export const sellerDeleteProfile = (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: SELLER_DELETE_REQUEST,
            });
    
            const {
                admin_Login: { adminInfo },
            } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${adminInfo.token}`,
                },
            };
    
            const { data } = await axios.delete(`/user/admin/seller/profile/view/${id}`, config);
    
            dispatch({
                type: SELLER_DELETE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message = "Seller Delete Failed !!!";
            dispatch({
                type: SELLER_DELETE_FAIL,
                payload: message,
            });
        }
    };
    
    export const sellerViewProfileById =
        (id,sellerId,ownerName,dob, nic,gender,telephone,companyName,companyAddress,email,password,pic,suppliyingMaterials) =>
        async (dispatch, getState) => {
            try {
                dispatch({
                    type: SELLER_VIEW_BY_ID_REQUEST,
                });
    
                const {
                    admin_Login: { adminInfo },
                } = getState();
    
                const config = {
                    headers: {
                        Authorization: `Bearer ${adminInfo.token}`,
                    },
                };
    
                const { data } = await axios.get(
                    `/user/admin/seller/profile/view/${id}`,
                    {
                        id,
                        sellerId,
                        ownerName,
                        dob,
                        nic,
                        gender,
                        telephone,
                        companyName,
                        companyAddress,
                        email,
                        password,
                        pic,
                        suppliyingMaterials,
                    },
                    config
                );
    
                dispatch({
                    type: SELLER_VIEW_BY_ID_SUCCESS,
                    payload: data,
                });
            } catch (error) {
                const message = error.response && error.response.data.message ? error.response.data.message : error.message;
                dispatch({
                    type: SELLER_VIEW_BY_ID_FAIL,
                    payload: message,
                });
            }
        };
    
    export const sellerUpdateProfileById =
        (id,sellerId,ownerName,dob, nic,gender,telephone,companyName,companyAddress,email,password,pic,suppliyingMaterials) =>
        async (dispatch, getState) => {
            try {
                dispatch({
                    type: SELLER_UPDATE_BY_ID_REQUEST,
                });
    
                const {
                    admin_Login: { adminInfo },
                } = getState();
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${adminInfo.token}`,
                    },
                };
                const { data } = await axios.put(
                    `/user/admin/seller/profile/edit/${id}`,
                    {
                        sellerId,
                        ownerName,
                        dob,
                        nic,
                        gender,
                        telephone,
                        companyName,
                        companyAddress,
                        email,
                        password,
                        pic,
                        suppliyingMaterials,
                    },
                    config
                );
    
                dispatch({
                    type: SELLER_UPDATE_BY_ID_SUCCESS,
                    payload: data,
                });
                swal({
                    title: "Success !!!",
                    text: "Seller Account Update Successful.",
                    icon: "success",
                    timer: 2000,
                    button: false,
                });
                setTimeout(function () {
                    window.location.href = "/admin-sellers";
                }, 2000);
            } catch (error) {
                const message = "Seller Update Failed !!!";
                dispatch({
                    type: SELLER_UPDATE_BY_ID_FAIL,
                    payload: message,
                });
            }
        };