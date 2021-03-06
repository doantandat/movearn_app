import * as _state from '../state';
import * as ACTION_CONST from '../action/ActionType';

const initReducer = (state = _state.InitState, action) =>
{
    const upSuccess = {
        isFetching: false,
        isSuccess: true,
        isError: false,
        data: action.data
    };
    const upFailure = {
        isFetching: false,
        isError: true,
        isSuccess: false,
        msgError: action.msgError ?? ''
    };
    const upReset = {
        isFetching: false,
        data: [],
        isSuccess: false,
        isError: false,
        msgError: ''
    };

    switch (action.type) {
        // LOGIN
        case ACTION_CONST.LOGIN:
            return {
                ...state,
                isSignIn: action.isSignIn
            };
        // IS_STEP_TIMER
        case ACTION_CONST.IS_STEP_TIMER:
            return {
                ...state,
                isStepTimer: action.isStepTimer
            };
        // RESEND_REGISTER_CODE
        case ACTION_CONST.RESEND_REGISTER_CODE:
            return {
                ...state,
                resendRegisterCode: { ...state.resendRegisterCode, isFetching: true }
            };
        case ACTION_CONST.RESEND_REGISTER_CODE_SUCCESS:
            return {
                ...state,
                resendRegisterCode: { ...state.resendRegisterCode, ...upSuccess }
            };
        case ACTION_CONST.RESEND_REGISTER_CODE_FAILURE:
            return {
                ...state,
                resendRegisterCode: { ...state.resendRegisterCode, ...upFailure }
            };
        // SUBMIT_CODE
        case ACTION_CONST.SUBMIT_CODE:
            return {
                ...state,
                submitCode: { ...state.submitCode, isFetching: true }
            };
        case ACTION_CONST.SUBMIT_CODE_SUCCESS:
            return {
                ...state,
                submitCode: { ...state.submitCode, ...upSuccess }
            };
        case ACTION_CONST.SUBMIT_CODE_FAILURE:
            return {
                ...state,
                submitCode: { ...state.submitCode, ...upFailure }
            };
        // SET_PASSWORD
        case ACTION_CONST.SET_PASSWORD:
            return {
                ...state,
                setPassword: { ...state.setPassword, isFetching: true }
            };
        case ACTION_CONST.SET_PASSWORD_SUCCESS:
            return {
                ...state,
                setPassword: { ...state.setPassword, ...upSuccess }
            };
        case ACTION_CONST.SET_PASSWORD_FAILURE:
            return {
                ...state,
                setPassword: { ...state.setPassword, ...upFailure }
            };
        // POST_LOGIN
        case ACTION_CONST.POST_LOGIN:
            return {
                ...state,
                postLogin: { ...state.postLogin, isFetching: true }
            };
        case ACTION_CONST.POST_LOGIN_SUCCESS:
            return {
                ...state,
                postLogin: { ...state.postLogin, ...upSuccess }
            };
        case ACTION_CONST.POST_LOGIN_FAILURE:
            return {
                ...state,
                postLogin: { ...state.postLogin, ...upFailure }
            };

        // USER_INFO
        case ACTION_CONST.USER_INFO:
            return {
                ...state,
                getUser: { ...state.getUser, isFetching: true }
            };
        case ACTION_CONST.USER_INFO_SUCCESS:
            return {
                ...state,
                getUser: { ...state.getUser, ...upSuccess }
            };
        case ACTION_CONST.USER_INFO_FAILURE:
            return {
                ...state,
                getUser: { ...state.getUser, ...upFailure }
            };
        // CHANGE_INFO
        case ACTION_CONST.CHANGE_INFO:
            return {
                ...state,
                changeInfo: { ...state.changeInfo, isFetching: true }
            };
        case ACTION_CONST.CHANGE_INFO_SUCCESS:
            return {
                ...state,
                changeInfo: { ...state.changeInfo, ...upSuccess }
            };
        case ACTION_CONST.CHANGE_INFO_FAILURE:
            return {
                ...state,
                changeInfo: { ...state.changeInfo, ...upFailure }
            };
        // CHANGE_PASSWORD
        case ACTION_CONST.CHANGE_PASSWORD:
            return {
                ...state,
                changePassword: { ...state.changePassword, isFetching: true }
            };
        case ACTION_CONST.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePassword: { ...state.changePassword, ...upSuccess }
            };
        case ACTION_CONST.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                changePassword: { ...state.changePassword, ...upFailure }
            };
        // SUBMIT_CHANGE_PASSWORD
        case ACTION_CONST.SUBMIT_CHANGE_PASSWORD:
            return {
                ...state,
                submitChangePassword: { ...state.submitChangePassword, isFetching: true }
            };
        case ACTION_CONST.SUBMIT_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                submitChangePassword: { ...state.submitChangePassword, ...upSuccess }
            };
        case ACTION_CONST.SUBMIT_CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                submitChangePassword: { ...state.submitChangePassword, ...upFailure }
            };

        // MARKET
        case ACTION_CONST.MARKET:
            return {
                ...state,
                market: { ...state.market, isFetching: true }
            };
        case ACTION_CONST.MARKET_SUCCESS:
            return {
                ...state,
                market: { ...state.market, ...upSuccess }
            };
        case ACTION_CONST.MARKET_FAILURE:
            return {
                ...state,
                market: { ...state.market, ...upFailure }
            };
        // GET_SHOES_ID
        case ACTION_CONST.GET_SHOES_ID:
            return {
                ...state,
                getShoesId: { ...state.getShoesId, isFetching: true }
            };
        case ACTION_CONST.GET_SHOES_ID_SUCCESS:
            return {
                ...state,
                getShoesId: { ...state.getShoesId, ...upSuccess }
            };
        case ACTION_CONST.GET_SHOES_ID_FAILURE:
            return {
                ...state,
                getShoesId: { ...state.getShoesId, ...upFailure }
            };
        // PUT_SHOES_ID
        case ACTION_CONST.PUT_SHOES_ID:
            return {
                ...state,
                putShoesId: { ...state.putShoesId, isFetching: true }
            };
        case ACTION_CONST.PUT_SHOES_ID_SUCCESS:
            return {
                ...state,
                putShoesId: { ...state.putShoesId, ...upSuccess }
            };
        case ACTION_CONST.PUT_SHOES_ID_FAILURE:
            return {
                ...state,
                putShoesId: { ...state.putShoesId, ...upFailure }
            };
        // SHOES
        case ACTION_CONST.SHOES:
            return {
                ...state,
                shoes: { ...state.shoes, isFetching: true }
            };
        case ACTION_CONST.SHOES_SUCCESS:
            return {
                ...state,
                shoes: { ...state.shoes, ...upSuccess }
            };
        case ACTION_CONST.SHOES_FAILURE:
            return {
                ...state,
                shoes: { ...state.shoes, ...upFailure }
            };
        // BUY
        case ACTION_CONST.BUY:
            return {
                ...state,
                buy: { ...state.buy, isFetching: true }
            };
        case ACTION_CONST.BUY_SUCCESS:
            return {
                ...state,
                buy: { ...state.buy, ...upSuccess }
            };
        case ACTION_CONST.BUY_FAILURE:
            return {
                ...state,
                buy: { ...state.buy, ...upFailure }
            };
        // PRIVATE_ASSIGN_SHOES
        case ACTION_CONST.PRIVATE_ASSIGN_SHOES:
            return {
                ...state,
                privateAssignShoes: { ...state.privateAssignShoes, isFetching: true }
            };
        case ACTION_CONST.PRIVATE_ASSIGN_SHOES_SUCCESS:
            return {
                ...state,
                privateAssignShoes: { ...state.privateAssignShoes, ...upSuccess }
            };
        case ACTION_CONST.PRIVATE_ASSIGN_SHOES_FAILURE:
            return {
                ...state,
                privateAssignShoes: { ...state.privateAssignShoes, ...upFailure }
            };
        // SHOES_ID_WEAR
        case ACTION_CONST.SHOES_ID_WEAR:
            return {
                ...state,
                shoesIdWear: { ...state.shoesIdWear, isFetching: true }
            };
        case ACTION_CONST.SHOES_ID_WEAR_SUCCESS:
            return {
                ...state,
                shoesIdWear: { ...state.shoesIdWear, ...upSuccess }
            };
        case ACTION_CONST.SHOES_ID_WEAR_FAILURE:
            return {
                ...state,
                shoesIdWear: { ...state.shoesIdWear, ...upFailure }
            };

        // USER_ID
        case ACTION_CONST.USER_ID:
            return {
                ...state,
                userId: { ...state.userId, isFetching: true }
            };
        case ACTION_CONST.USER_ID_SUCCESS:
            return {
                ...state,
                userId: { ...state.userId, ...upSuccess }
            };
        case ACTION_CONST.USER_ID_FAILURE:
            return {
                ...state,
                userId: { ...state.userId, ...upFailure }
            };
        // UPDATE_MONEY
        case ACTION_CONST.UPDATE_MONEY:
            return {
                ...state,
                updateMoney: { ...state.updateMoney, isFetching: true }
            };
        case ACTION_CONST.UPDATE_MONEY_SUCCESS:
            return {
                ...state,
                updateMoney: { ...state.updateMoney, ...upSuccess }
            };
        case ACTION_CONST.UPDATE_MONEY_FAILURE:
            return {
                ...state,
                updateMoney: { ...state.updateMoney, ...upFailure }
            };

        // RUN
        case ACTION_CONST.RUN:
            return {
                ...state,
                run: { ...state.run, isFetching: true }
            };
        case ACTION_CONST.RUN_SUCCESS:
            return {
                ...state,
                run: { ...state.run, ...upSuccess }
            };
        case ACTION_CONST.RUN_FAILURE:
            return {
                ...state,
                run: { ...state.run, ...upFailure }
            };
        // GET_RUNNING_SESSION_ID
        case ACTION_CONST.GET_RUNNING_SESSION_ID:
            return {
                ...state,
                getRunningSessionId: { ...state.getRunningSessionId, isFetching: true }
            };
        case ACTION_CONST.GET_RUNNING_SESSION_ID_SUCCESS:
            return {
                ...state,
                getRunningSessionId: { ...state.getRunningSessionId, ...upSuccess }
            };
        case ACTION_CONST.GET_RUNNING_SESSION_ID_FAILURE:
            return {
                ...state,
                getRunningSessionId: { ...state.getRunningSessionId, ...upFailure }
            };
        // PUT_RUNNING_SESSION_ID
        case ACTION_CONST.PUT_RUNNING_SESSION_ID:
            return {
                ...state,
                putRunningSessionId: { ...state.putRunningSessionId, isFetching: true }
            };
        case ACTION_CONST.PUT_RUNNING_SESSION_ID_SUCCESS:
            return {
                ...state,
                putRunningSessionId: { ...state.putRunningSessionId, ...upSuccess }
            };
        case ACTION_CONST.PUT_RUNNING_SESSION_ID_FAILURE:
            return {
                ...state,
                putRunningSessionId: { ...state.putRunningSessionId, ...upFailure }
            };
        // ======================================================================
        // CHANGE AND CLEAN
        case ACTION_CONST.CHANGE_SCREEN_STATE:
            return {
                ...state,
                screenState: { ...state.screenState, ...action.object }
            };
        case ACTION_CONST.CHANGE_ALERT_STATE:
            return { ...state, message: action.object.message };
        case ACTION_CONST.CHANGE_STATE:
            for (const key in action.object) {
                if (Object.prototype.hasOwnProperty.call(action.object, key)) {
                    return (state = { ...state, [key]: action.object[key] });
                }
            }
            return state;
        case ACTION_CONST.CLEAN_STATE:
            return {
                ...state,
                [action.stateName]: _state.InitState[action.stateName]
            };
        case ACTION_CONST.CLEAN_ALL:
            return _state.InitState;
        default:
            return state;
    }
};

export { initReducer };
