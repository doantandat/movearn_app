import * as ACTION_CONST from './ActionType';
import { API_CONST, API_FETCH } from '../../api';
import { CONST_STORAGE, storage } from '../../common';

// msgError
const errInfo = 'Vui lòng điền đầy đủ thông tin';
// CheckError

// Function action
// CHANGE
export const changeState = (object) => ({
    type: ACTION_CONST.CHANGE_STATE,
    object
});
export const changeScreenState = (object) => ({
    type: ACTION_CONST.CHANGE_SCREEN_STATE,
    object
});

export const changeAlertState = (object) => ({
    type: ACTION_CONST.CHANGE_ALERT_STATE,
    object
});
// CLEAN
export const cleanAll = () => ({ type: ACTION_CONST.CLEAN_ALL });
export const cleanState = (stateName) => ({
    type: ACTION_CONST.CLEAN_STATE,
    stateName
});

// LOGIN
export const login = (isSignIn) => ({
    type: ACTION_CONST.LOGIN,
    isSignIn
});
// LOGIN
export const SetPassBackup = (SetPassBackup) => ({
    type: ACTION_CONST.SET_PASS_BACKUP,
    SetPassBackup
});

export const filterBackup = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.FILTER_BACKUP,
        data: data
    });
}
// FILTER_MAKET

export const filterMarket = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.MARKET_SUCCESS,
        data: data
    });

}
// export const filterMarket = (market) => ({
//     type: ACTION_CONST.FILTER_MARKET,
//     market
// });

// idSession
export const idSession = (idSession) => ({
    type: ACTION_CONST.ID_SESSION,
    idSession
});

// idSession
export const step = (step) => ({
    type: ACTION_CONST.STEP,
    step
});
// shoeCurenttWear
export const shoeCurrentWear = (shoeCurrentWear) => ({
    type: ACTION_CONST.SET_SHOE_CURRENT_WEAR,
    shoeCurrentWear
});
// setUser
export const setUser = (user) => ({
    type: ACTION_CONST.SET_USER,
    user
});
// IS_STEP_TIMER
export const isStepTimer = (isStepTimer) => ({
    type: ACTION_CONST.IS_STEP_TIMER,
    isStepTimer
});

// Folder AUTH
// resendRegisterCode
export const resend_register_code_failure = (msgError = null) => ({
    type: ACTION_CONST.RESEND_REGISTER_CODE_FAILURE,
    isError: true,
    msgError
});
export const resendRegisterCode = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.RESEND_REGISTER_CODE_SUCCESS,
        data: data
    });
};

// submitCode
export const submit_code_failure = (msgError = null) => ({
    type: ACTION_CONST.SUBMIT_CODE_FAILURE,
    isError: true,
    msgError
});
export const submitCode = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.SUBMIT_CODE_SUCCESS,
        data: data
    });
};

// setPassword
export const set_password_failure = (msgError = null) => ({
    type: ACTION_CONST.SET_PASSWORD_FAILURE,
    isError: true,
    msgError
});
export const setPassword = (data) => async (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.SET_PASSWORD_SUCCESS,
        data: data
    });
};

// postLogin
export const post_login_failure = (msgError = null) => ({
    type: ACTION_CONST.POST_LOGIN_FAILURE,
    isError: true,
    msgError
});
export const postLogin = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.POST_LOGIN_SUCCESS,
        data: data
    });
};

// Folder USER
// getUser
export const get_user_failure = (msgError = null) => ({
    type: ACTION_CONST.USER_INFO_FAILURE,
    isError: true,
    msgError
});
export const getUser = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.USER_INFO_SUCCESS,
        data: data
    });
};

// changeInfo
export const change_info_failure = (msgError = null) => ({
    type: ACTION_CONST.CHANGE_INFO_FAILURE,
    isError: true,
    msgError
});
export const changeInfo = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.CHANGE_INFO
    });
    const body = {
        username: Body.username,
        gender: Body.gender,
        avatar: Body.avatar,
        firstInit: Body.firstInit
    };
    return API_FETCH.apiAuth(API_CONST.API_PUT_CHANGE_INFO, 'PUT', body, {})
        .then((res) =>
        {
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(change_info_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.CHANGE_INFO_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(change_info_failure(err));
            return false;
        });
};

// changePassword
export const change_password_failure = (msgError = null) => ({
    type: ACTION_CONST.CHANGE_PASSWORD_FAILURE,
    isError: true,
    msgError
});
export const changePassword = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.CHANGE_PASSWORD
    });
    const body = {
        password: Body.password
    };
    return API_FETCH.apiAuth(API_CONST.API_PUT_CHANGE_PASSWORD, 'PUT', body, {})
        .then((res) =>
        {
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(change_password_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.CHANGE_PASSWORD_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(change_password_failure(err));
            return false;
        });
};

// submitChangePassword
export const submit_change_password_failure = (msgError = null) => ({
    type: ACTION_CONST.SUBMIT_CHANGE_PASSWORD_FAILURE,
    isError: true,
    msgError
});
export const submitChangePassword = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.SUBMIT_CHANGE_PASSWORD
    });
    const body = {
        verificationCode: Body.verificationCode
    };
    return API_FETCH.apiAuth(API_CONST.API_POST_SUBMIT_CHANGE_PASSWORD, 'POST', body, {})
        .then((res) =>
        {
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(submit_change_password_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.SUBMIT_CHANGE_PASSWORD_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(submit_change_password_failure(err));
            return false;
        });
};

// Folder SHOES
// market
export const market_failure = (msgError = null) => ({
    type: ACTION_CONST.MARKET_FAILURE,
    isError: true,
    msgError
});
export const market_backup_failure = (msgError = null) => ({
    type: ACTION_CONST.MARKET_BACKUP_FAILURE,
    isError: true,
    msgError
});


export const market = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.MARKET_SUCCESS,
        data: data
    });

};

// getShoesId
export const get_shoes_id_failure = (msgError = null) => ({
    type: ACTION_CONST.GET_SHOES_ID_FAILURE,
    isError: true,
    msgError
});
export const getShoesId = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.GET_SHOES_ID
    });
    const body = '';
    return API_FETCH.apiAuth(`${API_CONST.API_GET_SHOES_ID}/${Body._id}`, 'GET', body, {})
        .then((res) =>
        {
            // console.log("ShoeWeared", res);
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(get_shoes_id_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.GET_SHOES_ID_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(get_shoes_id_failure(err));
            return false;
        });
};

// putShoesId
export const put_shoes_id_failure = (msgError = null) => ({
    type: ACTION_CONST.PUT_SHOES_ID_FAILURE,
    isError: true,
    msgError
});
export const putShoesId = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.PUT_SHOES_ID_SUCCESS,
        data: data
    });
};

// shoes
export const shoes_failure = (msgError = null) => ({
    type: ACTION_CONST.SHOES_FAILURE,
    isError: true,
    msgError
});
export const shoes = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.SHOES_SUCCESS,
        data: data
    });
};

// buy
export const buy_failure = (msgError = null) => ({
    type: ACTION_CONST.BUY_FAILURE,
    isError: true,
    msgError
});
export const buy = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.BUY_SUCCESS,
        data: data
    });
};

// privateAssignShoes
export const private_assign_shoes_failure = (msgError = null) => ({
    type: ACTION_CONST.PRIVATE_ASSIGN_SHOES_FAILURE,
    isError: true,
    msgError
});
export const privateAssignShoes = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.PRIVATE_ASSIGN_SHOES
    });
    const body = {
        owner: Body.owner,
        quality: Body.quality, // có common, rare, legendary
        class: Body.class, // có runner, jogger, trainer
        name: Body.name,
        img: Body.img
    };
    return API_FETCH.apiKey(API_CONST.API_POST_PRIVATE_ASSIGN_SHOES, 'POST', body, {})
        .then((res) =>
        {
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(private_assign_shoes_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.PRIVATE_ASSIGN_SHOES_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(private_assign_shoes_failure(err));
            return false;
        });
};

// shoesDetail
export const shoes_constant_failure = (msgError = null) => ({
    type: ACTION_CONST.SHOES_CONSTANTS_FAILURE,
    isError: true,
    msgError
});
export const shoesConstants = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.SHOES_CONSTANTS
    });
    const body = '';

    return API_FETCH.apiCode(`${API_CONST.API_GET_SHOES_CONSTANTS}/${Body._id}/wear`, 'POST', body, {})
        .then((res) =>
        {
            console.log("res", res)
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(shoes_constant_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.SHOES_CONSTANTS_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(shoes_constant_failure(err));
            return false;
        });
};

// shoesIdWear
export const shoes_id_wear_failure = (msgError = null) => ({
    type: ACTION_CONST.SHOES_ID_WEAR_FAILURE,
    isError: true,
    msgError
});
export const shoesIdWear = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.SHOES_ID_WEAR_SUCCESS,
        data: data
    });
};
// get rate
export const get_rate_failure = (msgError = null) => ({
    type: ACTION_CONST.GET_RATE_FAILURE,
    isError: true,
    msgError
});
export const getRate = (data) => (dispatch) =>
{

    dispatch({
        type: ACTION_CONST.GET_RATE_SUCCESS,
        data: data
    });
};


// get rate
export const get_rate_bnb_failure = (msgError = null) => ({
    type: ACTION_CONST.GET_RATE_BNB_FAILURE,
    isError: true,
    msgError
});
export const getRateBnb = () => (dispatch) =>
{

    dispatch({
        type: ACTION_CONST.GET_RATE_BNB
    });
    const body = '';
    return API_FETCH.apiCode(`${API_CONST.API_GET_RATE_BNB}`, 'GET', body, {})
        .then((res) =>
        {
            // console.log("res ratettttttttttttt");

            // const { code, message, data } = res;
            // if (code !== 200) {
            //     dispatch(get_rate_bnb_failure(message));
            //     return false;
            // }
            dispatch({
                type: ACTION_CONST.GET_RATE_BNB_SUCCESS,
                data: res
            });
            return res;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(get_rate_bnb_failure(err));
            return false;
        });
};
// Swap
export const swap_failure = (msgError = null) => ({
    type: ACTION_CONST.SWAP_FAILURE,
    isError: true,
    msgError
});
export const swap = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.SWAP_SUCCESS,
        data: data
    });
};
// Transfer
export const transfer_failure = (msgError = null) => ({
    type: ACTION_CONST.TRANSFER_FAILURE,
    isError: true,
    msgError
});
export const transfer = (data) => (dispatch) =>
{

    dispatch({
        type: ACTION_CONST.TRANSFER_SUCCESS,
        data: data
    });
};


// Transfer_spending
export const transfer_spending_failure = (msgError = null) => ({
    type: ACTION_CONST.TRANSFER_SPENDING_FAILURE,
    isError: true,
    msgError
});
export const transferSpending = (data) => (dispatch) =>
{

    dispatch({
        type: ACTION_CONST.TRANSFER_SPENDING_SUCCESS,
        data: data
    });
};



// Total km
export const totalkm_failure = (msgError = null) => ({
    type: ACTION_CONST.TOTALKM_FAILURE,
    isError: true,
    msgError
});
export const Totalkm = (Body) => (dispatch) =>
{

    dispatch({
        type: ACTION_CONST.TOTALKM
    });
    const body = '';
    return API_FETCH.apiAuth(`${API_CONST.API_GET_TOTAL_KM}`, 'GET', body, {})
        .then((res) =>
        {


            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(totalkm_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.TOTALKM_SUCCESS,
                data: data
            });
            return res;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(swap(err));
            return false;
        });
};

// getConstShoe
export const get_const_shoe_failure = (msgError = null) => ({
    type: ACTION_CONST.GET_CONST_SHOE_FAILURE,
    isError: true,
    msgError
});
export const getConstShoe = (data) => (dispatch) =>
{

    dispatch({
        type: ACTION_CONST.GET_CONST_SHOE_SUCCESS,
        data: data
    });
};
// Folder BALANCE
// BALANCE BNB
export const user_id_bnb_failure = (msgError = null) => ({
    type: ACTION_CONST.USER_ID_BNB_FAILURE,
    isError: true,
    msgError
});
export const userIdBnb = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.USER_ID_BNB_SUCCESS,
        data: data
    });
};
// BALANCE BNB
export const pass_code_wallet_failure = (msgError = null) => ({
    type: ACTION_CONST.PASS_CODE_WALLET_FAILURE,
    isError: true,
    msgError
});
export const passCodeWallet = (Body) => (dispatch) =>
{
    // console.log(`${API_CONST.API_GET_USER_ID_BNB}/${Body._id}`)
    dispatch({
        type: ACTION_CONST.PASS_CODE_WALLET
    });
    const body = '';
    return API_FETCH.apiCode(`${API_CONST.API_PASS_CODE_WALLET}?userId=${Body._id}&pass=${Body.pass}`, 'GET', body, {})
        .then((res) =>
        {
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(pass_code_wallet_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.PASS_CODE_WALLET_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(pass_code_wallet_failure(err));
            return false;
        });
};
// userId
export const user_id_failure = (msgError = null) => ({
    type: ACTION_CONST.USER_ID_FAILURE,
    isError: true,
    msgError
});
export const userId = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.USER_ID_SUCCESS,
        data: data
    });
};

// updateMoney
export const update_money_failure = (msgError = null) => ({
    type: ACTION_CONST.UPDATE_MONEY_FAILURE,
    isError: true,
    msgError
});
export const updateMoney = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.UPDATE_MONEY
    });
    const body = {
        user_id: Body.user_id,
        amount: Body.amount,
        symbol: Body.symbol
    };
    return API_FETCH.apiKey(API_CONST.API_POST_UPDATE_MONEY, 'POST', body, {})
        .then((res) =>
        {
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(update_money_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.UPDATE_MONEY_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(update_money_failure(err));
            return false;
        });
};

// Folder RUN
// run
export const run_failure = (msgError = null) => ({
    type: ACTION_CONST.RUN_FAILURE,
    isError: true,
    msgError
});
export const run = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.RUN
    });
    const body = {
        shoesId: Body.shoesId
    };
    return API_FETCH.apiAuth(API_CONST.API_POST_RUN, 'POST', body, {})
        .then((res) =>
        {
            console.log(`iss run`, res);
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(run_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.RUN_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(run_failure(err));
            return false;
        });
};

// getRunningSessionId
export const get_running_session_id_failure = (msgError = null) => ({
    type: ACTION_CONST.GET_RUNNING_SESSION_ID_FAILURE,
    isError: true,
    msgError
});
export const getRunningSessionId = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.GET_RUNNING_SESSION_ID
    });
    const body = '';
    return API_FETCH.apiAuth(`${API_CONST.API_GET_RUNNING_SESSION_ID}/${Body._id}`, 'GET', body, {})
        .then((res) =>
        {
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(get_running_session_id_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.GET_RUNNING_SESSION_ID_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(get_running_session_id_failure(err));
            return false;
        });
};

// putRunningSessionId
export const put_running_session_id_failure = (msgError = null) => ({
    type: ACTION_CONST.PUT_RUNNING_SESSION_ID_FAILURE,
    isError: true,
    msgError
});
export const putRunningSessionId = (Body) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.PUT_RUNNING_SESSION_ID
    });
    const body = {
        distance: Body.distance, // đây là số km vừa chạy thêm đc
        status: Body.status // nếu đây là "ended" thì sẽ là kết thúc chạy
    };
    return API_FETCH.apiAuth(`${API_CONST.API_PUT_RUNNING_SESSION_ID}/${Body._id}`, 'PUT', body, {})
        .then((res) =>
        {
            console.log("   ", res)
            // if (res == undefined) return;
            const { code, message, data } = res;
            if (code !== 200) {
                dispatch(put_running_session_id_failure(message));
                return false;
            }
            dispatch({
                type: ACTION_CONST.PUT_RUNNING_SESSION_ID_SUCCESS,
                data: data
            });
            return data;
        })
        .catch((err) =>
        {
            console.log('err', err);
            dispatch(put_running_session_id_failure(err));
            return false;
        });
};


// list my box

export const getMyListBox = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.GET_SHOEBOX,
        data: data
    });
};

// get list market box

export const getListMarketBox = (data) => (dispatch) =>
{
    dispatch({
        type: ACTION_CONST.GET_BOX_MARKET,
        data: data
    });

};