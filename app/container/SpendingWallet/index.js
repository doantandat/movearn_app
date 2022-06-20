import React, { Component, createRef } from 'react';
import { View, Text, Image, SafeAreaView, RefreshControl, ScrollView, StatusBar, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _action from '../../redux/action/ActionHandle';
import { stackNavigator, tabNavigator } from '../../navigation/nameNavigator';
import PoupBottom from "./poupBottom";
import Poup from "./modal";


import * as ApiServices from "./../../service/index";
class Wallet extends Component {
    constructor(props) {
        super(props);
        this.popupBotomRef = new createRef();
        this.popupRef = new createRef();
        this.state = {
            isSpending: true,
            isWallet: false,
            modalVisibles: false,
            refreshing: false,
            data: [
                { id: 1, Name: "MOV", amount: 0 }, { id: 2, Name: "USDT", amount: 0 }, { id: 2, Name: "BUSD", amount: 0 }
            ],


        };
    }
    _onRefresh = () => {
        this.setState(state => {
            return { refreshing: true }
        }, () => {
            this.BalanceUserIdBnb();
            this.BalanceUserId();
            this.setState(state => {
                return { refreshing: false }
            })

        });

    }
    GetRate = () => {
        const { action } = this.props;
        ApiServices.getRate().then(res => {

            if (res.price) {
                action.getRate(res)
            }

        }).catch(err => {

        })

    }

    componentDidMount() {


        this.BalanceUserIdBnb();

        this.GetRate();

        this.props.navigation?.addListener('focus', () => {
            this.setState({
                isSpending: true,
                isWallet: false
            })
        })



        // this.onShowPoup()
    }

    componentWillUnmount() {
        this.setState(state => {
            return {
                isSpending: true,
                isWallet: false
            }
        })

    }
    onShowPoupBottom = () => {
        this.popupBotomRef.Show();
        // setTimeout(() =>
        // {
        //     this.popupBotomRef.toggleBackgroundColor();
        // }, 300);

    }
    onColsePopupBottom = () => {
        this.popupBotomRef.Close();

    }
    onShowPoup = () => {
        this.popupRef.Show();

    }
    onColsePopup = () => {
        this.popupRef.Close();

    }
    BalanceUserIdBnb = () => {

        const { action, user } = this.props;
        ApiServices.userIdBnb({ _id: user._id }).then(res => {   //
            console.log("res", res);
            if (res.code === 200) {
                action.userIdBnb(res.data)
            }

        }).catch(err => {

        })


    }

    BalanceUserId = () => {
        const { action, user } = this.props;
        ApiServices.userId({ _id: user._id }).then(res => {
            if (res.code === 200) {
                action.userId(res.data)
            }

        }).catch(err => {

        })
    }

    checkIsPass = () => {
        const { userIdBnb, navigation } = this.props;
        // if (!userIdBnb.data.isPass) {
        //     navigation.navigate(stackNavigator.WALLET_PASSCODE)
        // }
        // else {

        //     navigation.navigate(stackNavigator.WALLET_HOME)
        // }

        navigation.navigate(stackNavigator.WALLET_PASSCODE)

    }

    renderItem = ({ item, index }) => {
        const { userId } = this.props;

        const balanceUserid = userId.data;

        const dataBalance = [
            {
                name: "MOV", amount: balanceUserid.mer ? (balanceUserid.mer).toLocaleString('en-US', {
                    // style: 'currency',
                    // currency: 'USD',
                }) : "0.00", icon: "ic_location"
            },
            {
                name: "USDT", amount: balanceUserid.usdt ? (balanceUserid.usdt).toLocaleString('en-US', {
                    // style: 'currency',
                    // currency: 'USD',
                }) : "0.00", icon: "ic_coin_t"
            },
            {
                name: "BUSD", amount: balanceUserid.busd ? (balanceUserid.busd).toLocaleString('en-US', {
                    // style: 'currency',
                    // currency: 'USD',
                }) : "0.00", icon: "ic_coin"
            }]

        return <View style={{
            height: 70, flex: 1, alignItems: "center",

        }}>
            <TouchableOpacity activeOpacity={1} style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
                height: 70,
                borderBottomWidth: index == (dataBalance.length - 1) ? 0 : 1,
                borderColor: "#000000",


            }}>
                <Image style={{
                    resizeMode: 'contain', width: 35,
                    height: 35
                }} source={{ uri: item.icon }} />
                <View style={{
                    width: "40%",
                    justifyContent: "flex-start",
                    marginLeft: 10
                }}>
                    <Text
                        style={{
                            fontWeight: '100',
                            fontSize: 20,
                            fontStyle: "italic",
                            fontWeight: "bold"
                        }}>{item.name ? item.name : ""}</Text>
                </View>
                <View style={{

                    height: 30,
                    width: "50%",
                    alignItems: "center",
                    justifyContent: "center"
                }}><Text style={{
                    fontWeight: '100',
                    fontSize: 16,
                    fontStyle: "italic",
                    fontWeight: "bold"
                }} >{(item.amount).toString()}</Text></View>
            </TouchableOpacity>
        </View>
    }
    render() {
        const { navigation, userId, user, getRate } = this.props;
        const { isSpending, isWallet, data } = this.state;
        const balanceUserid = userId.data;
        const totalBalanceUsd = (balanceUserid.mer * rate) + balanceUserid.usdt;
        const totalBalancemer = totalBalanceUsd / rate;
        console.log('isSending', isSpending, isWallet)
        const dataBalance = [
            {
                name: "MOV", amount: balanceUserid.mer ? (balanceUserid.mer).toLocaleString('en-US', {
                    // style: 'currency',
                    // currency: 'USD',
                }) : "0.00", icon: "ic_location"
            },
            {
                name: "USDT", amount: balanceUserid.usdt ? (balanceUserid.usdt).toLocaleString('en-US', {
                    // style: 'currency',
                    // currency: 'USD',
                }) : "0.00", icon: "ic_coin_t"
            },
            {
                name: "BUSD", amount: balanceUserid.busd ? (balanceUserid.busd).toLocaleString('en-US', {
                    // style: 'currency',
                    // currency: 'USD',
                }) : "0.00", icon: "ic_coin"
            }]
        const rate = parseFloat(getRate.data && getRate.data.price);

        console.log(getRate);
        return (

            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "#ffffff"
            }}>

                <View style={{
                    flex: 5
                }}>

                    <View
                        style={{
                            flex: 0.2,
                            marginHorizontal: 20,
                            overflow: 'hidden',
                            flexDirection: "row",

                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20
                        }}>
                        <TouchableOpacity style={{
                            fontStyle: "italic", fontWeight: 'bold',
                            // borderRightWidth: 3,
                            // borderBottomWidth: 3,

                            width: 40,
                            height: 40,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",



                        }} onPress={() => this.props.navigation.goBack()}>
                            <Image style={{
                                width: 40,
                                height: 40, resizeMode: 'contain'
                            }} source={{ uri: 'ic_back' }} />

                        </TouchableOpacity>
                        <View
                            style={{
                                flex: 0.8,
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: "100%"
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderRadius: 30,
                                    backgroundColor: '#D6D6D6',
                                    overflow: 'hidden',
                                    flex: 1,
                                    height: 50,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        flex: 0.5,
                                        height: "100%",
                                        alignItems: 'center',
                                        borderWidth: isSpending ? 1 : 0,
                                        borderRadius: isSpending ? 30 : 0,
                                        overflow: 'hidden'
                                    }}
                                    onPress={() =>
                                        this.setState({
                                            isSpending: true,
                                            isWallet: false,
                                            isBadges: false
                                        }, () => {

                                            this.props.navigation.navigate(
                                                stackNavigator.SPENDING_WALLET
                                            )

                                        })
                                    }>
                                    <View
                                        style={{
                                            height: "100%",
                                            backgroundColor: isSpending
                                                ? 'white'
                                                : '#D6D6D6',
                                            paddingVertical: 4,
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            flexDirection: "row",
                                            paddingHorizontal: 10
                                        }}>
                                        {/* <View style={{

                                            height: 25,
                                            width: 25
                                        }}>

                                        </View> */}
                                        <Text>Spending</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        flex: 0.5,
                                        height: "100%",
                                        alignItems: 'center',
                                        borderWidth: isWallet ? 1 : 0,
                                        borderRadius: isWallet ? 30 : 0,
                                        overflow: 'hidden'
                                    }}
                                    onPress={() =>
                                        this.setState({
                                            isSpending: false,
                                            isWallet: true,
                                            isBadges: false
                                        }, () => {
                                            this.checkIsPass()
                                            // this.onShowPoupBottom()
                                            // this.props.navigation.navigate(
                                            //     stackNavigator.ROFILE_PASS_CODE
                                            // )
                                            // this.props.navigation.navigate(
                                            //     stackNavigator.WALLET_HOME
                                            // )

                                        })
                                    }>
                                    <View
                                        style={{
                                            height: "100%",
                                            backgroundColor: isWallet
                                                ? 'white'
                                                : '#D6D6D6',
                                            paddingVertical: 4,
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            flexDirection: "row",
                                            paddingHorizontal: 10
                                        }}>
                                        {/* <View style={{
                                            backgroundColor: "#000000",
                                            height: 25,
                                            width: 25
                                        }}>
                                        </View> */}
                                        <Text>Wallet</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            width: 20,
                            height: 20,
                            // backgroundColor: "#000000",

                        }}
                            onPress={() => {
                                this.props.navigation.navigate(
                                    stackNavigator.WALLET_SETTINGS
                                )
                            }}
                        >
                            <Image style={{
                                width: 20,
                                height: 20, resizeMode: 'contain'
                            }} source={{ uri: 'ic_settings' }} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        style={{
                            flex: 1,

                        }}>
                        <View style={{

                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                            flex: 1,
                        }}
                        >
                            <Text style={{
                                fontStyle: "italic",
                                fontWeight: "bold",
                                fontSize: 20
                            }}>
                                {/* Spending Account */}

                            </Text>
                            <TouchableOpacity style={{
                                borderRadius: 100,
                                // borderWidth: 1,
                                borderColor: "#000000",
                                height: 30, width: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                // backgroundColor: "#64ffcb"
                            }}
                            // onPress={this.onShowPoup}
                            >
                                {/* <Text style={{
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                    fontSize: 20
                                }}>?</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                            marginVertical: 20,

                        }}
                        >
                            <FlatList style={{
                                marginBottom: 20,
                                borderRadius: 30,
                                borderColor: "#888888",

                                borderWidth: 1,
                                borderBottomWidth: 2,
                                borderRightWidth: 2,


                            }}
                                showsVerticalScrollIndicator={false}
                                data={dataBalance}
                                renderItem={this.renderItem}
                                extraData={dataBalance}
                                keyExtractor={(item, index) => index.toString()}
                                // ItemSeparatorComponent={this.renderSeparator}
                                contentContainerStyle={{
                                    padding: 0
                                }}
                            >

                            </FlatList>

                            <View
                                style={{

                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                {/* <Text style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                fontStyle: "italic"
                            }}>Bace on Solana</Text> */}
                            </View>
                        </View>

                    </ScrollView>
                </View>

                <View
                    style={{
                        justifyContent: "flex-end",

                        // backgroundColor: "red",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            stackNavigator.SWAP
                        )}
                        disabled={this.state.disabledTouch}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 8,
                            paddingHorizontal: 3,
                            borderRadius: 50,
                            borderColor: "#888888",
                            color: '#000000',
                            borderWidth: 1,
                            borderBottomWidth: 2,
                            borderRightWidth: 2,
                            backgroundColor: "#F44369",
                            // opacity: this.state.disabledTouch ? 0.5 : 1,
                            width: "60%",
                            marginVertical: 10
                        }}>
                        <Text style={{
                            fontSize: 20,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            color: "#ffffff"
                        }}>  SWAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            stackNavigator.WALLET_PASSCODE
                        )}
                        disabled={this.state.disabledTouch}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 8,
                            paddingHorizontal: 3,
                            borderRadius: 50,
                            borderColor: "#888888",
                            color: '#000000',
                            borderWidth: 1,
                            borderBottomWidth: 2,
                            borderRightWidth: 2,
                            backgroundColor: "#F44369",
                            // opacity: this.state.disabledTouch ? 0.5 : 1,
                            width: "60%"
                        }}>
                        <Text style={{
                            fontSize: 20,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            color: "#ffffff"
                        }}>  TRANSFER </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        justifyContent: "flex-end",
                        flex: 0.5,

                    }}
                >

                </View>
                <PoupBottom
                    ref={(target) => { this.popupBotomRef = target }}
                    onTouchOutside={this.onColsePopupBottom}
                    title={"Bep20 WALLET"}
                    navigation={navigation}
                    stackNavigator={stackNavigator}
                />

                <Poup
                    ref={(target) => { this.popupRef = target }}
                    onTouchOutside={this.onColsePopup}
                    title={"Spending account"}
                    navigation={navigation}
                    stackNavigator={stackNavigator}
                />
            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

const mapStateToProps = (state) => ({
    isSignIn: state.initReducer.isSignIn,
    screenState: state.initReducer.screenState,
    userId: state.initReducer.userId,
    user: state.initReducer.user,
    getRate: state.initReducer.getRate,
    userIdBnb: state.initReducer.userIdBnb,
});
const mapDispatchToProps = (dispatch) => ({
    action: bindActionCreators(_action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);


