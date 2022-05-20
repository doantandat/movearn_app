import React, { Component } from 'react';
import
{
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
    TouchableWithoutFeedback,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { tabNavigator, stackNavigator } from '../../navigation/nameNavigator';
import * as _action from '../../redux/action/ActionHandle';
import { location, getSize, Colors } from '../../common/';
import Activication from './activication';

import { CONST_STORAGE, storage } from '../../common';
import * as ApiServices from "./../../service/index";
const Stack = createNativeStackNavigator();
class LoginSignup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            verificationcode: '',
            password: '',
            isHiddenBottom: false,
            isAccount: false,
            isCountDown: false,
            count: 3
        };
    }
    onChangeText = (name, itemValue) =>
    {
        this.setState(state =>
        {
            return {
                [name]: itemValue
            }
        })
    }
    RegisterCode = () =>
    {

        const { action } = this.props;
        const { email } = this.state;

        if (email) {
            this.setState(state =>
            {
                return {
                    isCountDown: true
                }
            }, () =>
            {
                ApiServices.resendRegisterCode({ email: email }).then(res =>
                {
                    console.log("res sssssssssssssssss", res);
                    if (res.code === 200) {
                        this.setState(state =>
                        {
                            return {
                                isCountDown: false
                            }
                        })
                        action.resendRegisterCode(res);
                    }
                    if (res.code === 400) {
                        this.setState(state =>
                        {
                            return {
                                isCountDown: false
                            }
                        }, () =>
                        {
                            alert(res.message)
                        })
                    }
                }).catch(err =>
                {
                    console.log(err)
                })
                // action.resendRegisterCode({ email: email });
                // let resendRegisterCode_ = setInterval(() =>
                // {
                //     const { resendRegisterCode } = this.props;
                //     if (!resendRegisterCode.isFetching) {
                //         clearInterval(resendRegisterCode_);
                //         this.setState(state =>
                //         {
                //             return {
                //                 isCountDown: false
                //             }
                //         })
                //     }
                //     if (resendRegisterCode.isSuccess) {
                //         // alert("success")
                //     }
                //     if (resendRegisterCode.isError) {
                //         alert(resendRegisterCode.msgError)
                //     }
                // }, 200);
            })
        }
    }

    SubmitCode = () =>
    {
        const { action } = this.props;
        const { email, verificationcode } = this.state;


        this.setState(state =>
        {
            return {
                isSummitCode: true,
            }
        }, () =>
        {
            action.setUser({
                email: email
            });
            ApiServices.submitCode({
                verificationCode: verificationcode,
                email: email
            }).then(res =>
            {
                if (res.code === 200) {
                    this.setState(state =>
                    {
                        return {
                            isSummitCode: false
                        }
                    }, () =>
                    {
                        const { token } = res.data;
                        storage.setItem(CONST_STORAGE.TOKEN_SET_PASSWORD, token);
                        action.submitCode(res.data)
                        this.props.navigation.navigate(stackNavigator.NEW_PASS);
                    })
                }
                if (res.code === 400) {
                    this.setState(state =>
                    {
                        return {
                            isSummitCode: false
                        }
                    }, () =>
                    {
                        alert(res.message)
                    })
                }
                console.log(res);

            }).catch(err =>
            {
                console.log(err)
            })
            // action.submitCode({
            //     verificationCode: verificationcode,
            //     email: email
            // });

            // let issubmitCode_ = setInterval(() =>
            // {

            //     const { submitCode } = this.props;
            //     if (!submitCode.isFetching) {
            //         clearInterval(issubmitCode_);
            //         this.setState(state =>
            //         {
            //             return {
            //                 isSummitCode: false,
            //             }
            //         });

            //     }

            //     if (submitCode.isSuccess) {

            //         this.props.navigation.navigate(stackNavigator.NEW_PASS);

            //     }
            //     if (submitCode.isError) {

            //         alert(submitCode.msgError)
            //     }
            //     // console.log("submitCode", submitCode.)
            //     // this.props.navigation.navigate(stackNavigator.NEW_PASS);

            // }, 100);
        })
    }

    countDown = () =>
    {
        let { count } = this.state;
        // console.log(count)
        setInterval(() =>
        {
            if (count == 0) {
                clearInterval();
                this.setState(state =>
                {
                    return {
                        isCountDown: false,
                        count: 3
                    }
                })
                return;
            }
            count--;
            this.setState(state =>
            {
                return {
                    count: count
                }
            })
        }, 1000);
    }
    backAction = () =>
    {

        this.props.navigation.goBack()
    };
    componentDidMount()
    {
        // const { submitCode, action } = this.props;

        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount()
    {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }
    SetIsHiddenBottom = (type) =>
    {
        if (!type) {
            setTimeout(() =>
            {
                this.setState(state =>
                {
                    return {
                        isHiddenBottom: type
                    }
                })
            }, 50);
        }
        else {
            this.setState(state =>
            {
                return {
                    isHiddenBottom: type
                }
            })
        }

    }

    SetIsAccount = () =>
    {

        this.setState(state =>
        {
            return {
                isAccount: !state.isAccount
            }
        })


    }


    render()
    {
        const {
            User,
            isHiddenBottom,
            isAccount,
            isCountDown,
            count,
            password,
            email,
            verificationcode,
            isSummitCode
        } = this.state
        const {
            navigation,
            action,
            submitCode,
            resendRegisterCode,
        } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={{
                        width: getSize.Width,
                        height: getSize.Height,
                        position: 'absolute',
                        resizeMode: 'contain',
                        zIndex: -2
                    }}
                    source={{ uri: 'bg_login' }}
                />
                {isSummitCode && <View style={{
                    position: "absolute",
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    top: 0,
                    backgroundColor: "#0000006b",
                    zIndex: 10,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <ActivityIndicator size="large" color="#F44369" />
                </View>}
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <TouchableWithoutFeedback
                        onPress={() =>
                        {
                            Keyboard.dismiss();
                            this.SetIsHiddenBottom(false);
                        }}
                        style={{ flex: 1 }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: getSize.scale(200)
                                }}>
                                <Image
                                    source={{ uri: 'ic_loation_blue' }}
                                    style={{
                                        width: getSize.scale(132),
                                        height: getSize.scale(147)
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    height: !isHiddenBottom ? getSize.scale(100) : getSize.scale(60)
                                }}>
                                <Text
                                    style={{
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        fontSize: getSize.scale(30)
                                    }}>
                                    SIGN UP
                                </Text>
                            </View>

                            <Activication
                                navigation={this.props.navigation}
                                SetIsAccount={this.SetIsAccount}
                                SetIsHiddenBottom={this.SetIsHiddenBottom}
                                isAccount={isAccount}
                                isCountDown={isCountDown}
                                count={count}
                                onChangeText={this.onChangeText}
                                email={email}
                                verificationcode={verificationcode}
                                SubmitCode={this.SubmitCode}
                                resendRegisterCode={resendRegisterCode}
                                RegisterCode={this.RegisterCode}
                            />

                            {!isHiddenBottom && (
                                <View
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: getSize.scale(12),
                                            width: '70%',
                                            textAlign: 'center'
                                        }}>
                                        Registration means that you agree to MOVEARN
                                        <Text
                                            style={{
                                                color: 'red'
                                            }}>
                                            {' '}
                                            User Agreement
                                        </Text>{' '}
                                        &
                                        <Text
                                            style={{
                                                color: 'red'
                                            }}>
                                            {' '}
                                            User Privacy
                                        </Text>
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#ffffff",
        width: '100%',
        height: '100%'
    },
    container1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: '20%',
        left: 0,
        height: 400
    },
    input: {
        height: 50,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: '#000000',
        borderWidth: 2,
        borderBottomWidth: 4,
        borderRightWidth: 4
    },
    sendcodeText: {
        position: 'absolute',
        right: 10,
        top: 25,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#f9b846',
        width: 50,
        lineHeight: 12
    },
    btnWarning: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 3,
        borderRadius: 50,
        borderColor: '#000000',
        color: '#000000',
        borderWidth: 2,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        backgroundColor: '#64ffcb'
        // fontSize: 20
    },
    containerForm: {
        width: '80%',
        backgroundColor: '#ffffff',
        height: 400,
        minHeight: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: '#000000',
        borderWidth: 2,
        borderRightWidth: 4
    },
    borderStyle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'green'
    },
    btn: {
        minWidth: '30%',
        minHeight: 30,
        maxWidth: '45%',
        width: 200,
        // marginHorizontal: 50,
        marginVertical: 8,
        padding: 12,
        justifyContent: 'center',
        alignContent: 'center',

        borderRadius: 5
    }
});
const mapStateToProps = (state) => ({
    isSignIn: state.initReducer.isSignIn,
    resendRegisterCode: state.initReducer.resendRegisterCode,
    submitCode: state.initReducer.submitCode
});
const mapDispatchToProps = (dispatch) => ({
    action: bindActionCreators(_action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup);
