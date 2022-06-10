const StateDefault = {
    isFetching: false,
    data: [],
    isSuccess: false,
    isError: false,
    msgError: ''
};

const StateGetList = {
    isFetching: false,
    data: [],
    pageSize: 20,
    page: 1,
    isSuccess: false,
    isFull: false,
    isError: false,
    msgError: '',
    isReload: false,
    isSearch: false
};

const StateReport = {
    isFetching: false,
    data: {},
    isSuccess: false,
    isError: false,
    msgError: ''
};

export const InitState = {
    isSignIn: false,
    isSignUp: false,
    isStepTimer: 0,
    screenState: {
        // ScreenState
        isStepStart: false,
        isStepPause: false,
        dataLocation: [],
        distance: '0,00',
        speed: 0,
        currentLocation: {
            latitude: 0,
            longitude: 0
        },
        steps: 0,
        totalKm: 0,
        isSneakers: true,
        isGems: false,
        isBadges: false,
        isSneakersMini: true,
        isShoeboxesMini: false,
        isGalleryMini: true,
        isUpgradeMini: false,
        isEfficiency: true,
        isLuck: false,
        isComfort: false,
        isResilience: false,
        // screen run
        isScreenCongrats: false,
        isScreenShare: false,
        isStateCountDown: false
    },
    resendRegisterCode: { ...StateDefault },
    submitCode: { ...StateDefault },
    setPassword: { ...StateDefault },
    postLogin: { ...StateDefault },

    getUser: { ...StateDefault },
    changeInfo: { ...StateDefault },
    changePassword: { ...StateDefault },
    submitChangePassword: { ...StateDefault },

    market: { ...StateDefault },
    filterBackup: [],
    getShoesId: { ...StateDefault },
    putShoesId: { ...StateDefault },
    shoes: { ...StateDefault },
    buy: { ...StateDefault },
    privateAssignShoes: { ...StateDefault },
    shoesIdWear: { ...StateDefault },

    userId: { ...StateDefault },
    updateMoney: { ...StateDefault },

    run: { ...StateDefault },
    getRunningSessionId: { ...StateDefault },
    putRunningSessionId: { ...StateDefault },
    getRate: { ...StateDefault },
    getRateBnb: { ...StateDefault },
    userIdBnb: { ...StateDefault },
    swap: { ...StateDefault },
    transfer: { ...StateDefault },
    transferSpending: { ...StateDefault },
    getConstShoe: { ...StateDefault },
    user: { ...StateDefault },
    shoeCurrentWear: { ...StateDefault },
    step: { ...StateDefault },
    idSession: "",
    passBackup: '',
    passCodeWallet: { ...StateDefault },
    Totalkm: { ...StateDefault },
    listBox: { ...StateDefault },
};
