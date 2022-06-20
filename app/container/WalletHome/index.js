import React, { Component, createRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Animated,
    ImageBackground,
    ScrollView,
    TouchableWithoutFeedback,
    StatusBar,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    Modal,
    RefreshControl
} from 'react-native';

import PoupBottom from './poupBottom';
import Poup from './modal';
import PoupBottomR from './poupBottomR';
import PoupExternal from './poupExternal';

import { stackNavigator, tabNavigator } from '../../navigation/nameNavigator';
import { getSize, location, Colors } from '../../common';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _action from '../../redux/action/ActionHandle';

import * as ApiServices from "./../../service/index";

const TIME_REFRESH_WALLET = 3;

class WalletHome extends Component {
    constructor(props) {
        super(props);
        this.popupBotomRef = new createRef();
        this.popupRef = new createRef();
        this.popupDetailRef = new createRef();
        this.popupBotomRRef = new createRef();
        this.popupExternalRef = new createRef();
        this.timeIntervalRef = new createRef();
        this.state = {
            isSpending: false,
            isWallet: true,
            modalVisibles: false,
            data: [
                { id: 2, Name: "MOV", amount: '8.888', icon: "ic_location" }, { id: 1, Name: "BNB", amount: '8.888', icon: "ic_coin" },
            ],
            data1: [
                { id: 1, Name: "Sneakers", amount: 15 }, { id: 2, Name: "Shoeboxes", amount: 52 }, { id: 2, Name: "Gems", amount: 16 }
            ],
            istop: true,
            viewState: true,
            animationValue: new Animated.Value(60),
            animationOpacity: new Animated.Value(0),
            animationOpacity1: new Animated.Value(1),
            refreshing: false,
            modalVisibles: false,
            modalMER: false,

            data: [
                {
                    dateTime: '15/04/2022 15:30',
                    merValue: 0.5,
                    status: 1,
                    statusName: 'Confirmed'
                },
                {
                    dateTime: '15/04/2022 15:30',
                    merValue: 0.5,
                    status: 2,
                    statusName: 'Pending'
                },
                {
                    dateTime: '15/04/2022 15:30',
                    merValue: 0.5,
                    status: 3,
                    statusName: 'Cancel'
                },
                {
                    dateTime: '15/04/2022 15:30',
                    merValue: 0.5,
                    status: 1,
                    statusName: 'Confirmed'
                },
                {
                    dateTime: '15/04/2022 15:30',
                    merValue: 0.5,
                    status: 1,
                    statusName: 'Confirmed'
                },
                {
                    dateTime: '15/04/2022 15:30',
                    merValue: 0.5,
                    status: 1,
                    statusName: 'Confirmed'
                },
                {
                    dateTime: '15/04/2022 15:30',
                    merValue: 0.5,
                    status: 1,
                    statusName: 'Confirmed'
                }
            ]
        };
    }

    onShowPoup = () => {
        this.popupRef.Show();
    };

    onColsePopup = () => {
        this.popupRef.Close();
    };
    toggleAnimation = (type) => {
        if (type) {
            this.setState(state => {
                return {
                    viewState: false
                }
            }, () => {
                Animated.timing(this.state.animationValue, {
                    toValue: 150,
                    duration: 500,
                    useNativeDriver: false
                }).start();
                Animated.timing(this.state.animationOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false
                }).start();
            })



        } else {

            Animated.timing(this.state.animationValue, {
                toValue: 60,
                duration: 300,
                useNativeDriver: false
            }).start();

            Animated.timing(this.state.animationOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start(() => {
                this.setState(state => {
                    return {
                        viewState: true
                    }
                }, () => {
                    Animated.timing(this.state.animationOpacity1, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: false
                    }).start();
                })
            });

        }


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
    componentDidMount() {
        this.timeIntervalRef = setInterval(() => {
            this.BalanceUserIdBnb()
            this.BalanceUserId()
        }, TIME_REFRESH_WALLET * 1000);
        this.props.navigation.addListener('blur', () => {
            clearInterval(this.timeIntervalRef)
        })
    }

    onShowPoupBottomR = () => {
        this.popupBotomRRef.Show();

    }
    onColsePopupBottomR = () => {
        this.popupBotomRRef.Close();

    }
    onShowPoupBottom = () => {
        this.popupBotomRef.Show();

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
    onShowPoupDetail = () => {
        this.popupDetailRef.Show();

    }

    onColsePopupDetail = () => {
        this.popupDetailRef.Close();

    }
    onShowPoupExternal = () => {
        this.popupExternalRef.Show();

    }
    onColsePopupExternal = () => {
        this.popupExternalRef.Close();

    }
    render() {

        const { navigation, userId, user, getRate, getRateBnb, userIdBnb } = this.props;

        const { modalMER, isSpending, isWallet, data, data1, istop, viewState
        } = this.state;
        const rate = parseFloat(getRate.data.price);
        // console.log('getRateBnb issss ', getRateBnb);
        // const rateBnb = parseFloat(getRateBnb.data.price);
        const _id = userIdBnb.data.address ? userIdBnb.data.address : "";
        // console.log("userIdBnb", userIdBnb)
        const address = _id.length < 15 ? _id : _id.substring(0, 6) + "..." + _id.substring(_id.length - 6, _id.length);

        const balanceUseridBNB = userIdBnb.data ? userIdBnb.data : {};
        console.log('balanceUseridBNB ', balanceUseridBNB);
        // console.log(rateBnb, rate);
        const rateBnb = balanceUseridBNB.priceBnb;
        const totalBalanceUsd = (balanceUseridBNB.mer * rate) + (balanceUseridBNB.bnb * rateBnb) + (balanceUseridBNB.busd);
        const totalBalancemer = totalBalanceUsd / rate;
        const dataBalance = [
            {
                name: "MOVS", amount: balanceUseridBNB.mer ? Number(balanceUseridBNB.mer).toFixed(2) : "0", icon: "ic_location"
            },
            {
                name: "BNB", amount: balanceUseridBNB.bnb ? Number(balanceUseridBNB.bnb).toFixed(6) : "0", icon: "ic_coin_b"
            }
            ,
            {
                name: "BUSD", amount: balanceUseridBNB.busd ? Number(balanceUseridBNB.busd).toFixed(2) : "0", icon: "ic_coin"
            }]

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ImageBackground
                    style={{
                        width: getSize.Width,
                        height: getSize.scale(100),
                        position: 'absolute',
                        resizeMode: 'cover',
                        zIndex: -1,
                        top: Platform.OS === 'android' ? getSize.scale(-10) : 0
                    }}
                    source={{ uri: 'ic_top_bar' }}
                />
                <View
                    style={{
                        width: getSize.Width,
                        height: getSize.scale(430),
                        backgroundColor: 'rgba(247, 245, 248, 1)',

                        borderBottomLeftRadius: getSize.scale(32),
                        borderBottomRightRadius: getSize.scale(32),
                        zIndex: -2,
                        position: 'absolute',
                        top: Platform.OS === 'android' ? getSize.scale(-32) : 0
                    }}
                />
                <View
                    style={{
                        flex: 1 / 2,
                        marginVertical: Platform.OS === 'android' ? getSize.scale(8) : 0
                    }}>
                    {/* HeaderMini */}
                    <View
                        style={{
                            flex: 1,
                            minHeight: Platform.OS === 'ios' ? 0 : getSize.scale(30),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: getSize.scale(16),
                            // backgroundColor: "red"
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(stackNavigator.SPENDING_WALLET)}
                            style={{ flex: 2, justifyContent: 'center' }}>
                            <Image
                                style={{
                                    width: getSize.scale(28),
                                    height: getSize.scale(28),
                                    resizeMode: 'contain'
                                }}
                                source={{ uri: 'ic_back' }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                flex: 6,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                            <Text
                                style={{
                                    fontSize: getSize.scale(18),
                                    color: '#000',
                                    fontWeight: 'bold'
                                }}>
                                {'WALLET'}
                            </Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate(stackNavigator.WALLET_SETTINGS);
                                }}>
                                <Image
                                    style={{
                                        width: getSize.scale(20),
                                        height: getSize.scale(20),
                                        resizeMode: 'contain'
                                    }}
                                    source={{ uri: 'ic_settings' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    style={{

                        // backgroundColor: "red"

                    }}>
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                flex: 1.5,
                                paddingHorizontal: getSize.scale(24),
                                alignItems: 'center',

                            }}>
                            <Text
                                style={{
                                    fontSize: getSize.scale(14),
                                    color: 'rgba(118, 118, 118, 1)',
                                    fontStyle: 'italic'
                                }}>
                                Total balance
                            </Text>
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}>
                                <Text
                                    style={{
                                        fontSize: getSize.scale(32),
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                        color: 'rgba(244, 67, 105, 1)',
                                        marginVertical: getSize.scale(8)
                                    }}>
                                    $ {totalBalanceUsd ? Number(totalBalanceUsd).toFixed(2) : "0"}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: getSize.scale(18),
                                        fontStyle: 'italic',
                                        color: 'rgba(44, 44, 44, 1)',
                                        textAlign: 'center'
                                    }}>
                                    MOV:  {totalBalancemer ? Number(totalBalancemer).toFixed(2) : "0"}
                                </Text>
                            </View>
                            <View
                                style={{
                                    borderRadius: getSize.scale(100),
                                    paddingHorizontal: getSize.scale(24),
                                    paddingVertical: getSize.scale(8),
                                    backgroundColor: 'rgba(167, 155, 191, 1)',
                                    marginVertical: getSize.scale(16)
                                }}>
                                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                                    {address}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'flex-start'
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(stackNavigator.RECVICE)}>
                                        <Image
                                            style={{
                                                width: getSize.scale(74),
                                                height: getSize.scale(74),
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: 'ic_btn_recvice' }}
                                        />
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontStyle: 'italic',
                                                fontSize: getSize.scale(14),
                                                textAlign: 'center',
                                                marginTop: getSize.scale(8)
                                            }}>
                                            Receive
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(stackNavigator.TRANSFER)}>
                                        <Image
                                            style={{
                                                width: getSize.scale(74),
                                                height: getSize.scale(74),
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: 'ic_btn_transfer' }}
                                        />
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontStyle: 'italic',
                                                fontSize: getSize.scale(14),
                                                textAlign: 'center',
                                                marginTop: getSize.scale(8)
                                            }}>
                                            Transfer
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'flex-end'
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(stackNavigator.SWAP)}>
                                        <Image
                                            style={{
                                                width: getSize.scale(74),
                                                height: getSize.scale(74),
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: 'ic_btn_trade' }}
                                        />
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontStyle: 'italic',
                                                fontSize: getSize.scale(14),
                                                textAlign: 'center',
                                                marginTop: getSize.scale(8)
                                            }}>
                                            Trade
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 2, marginHorizontal: getSize.scale(16), marginTop: getSize.scale(60) }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: getSize.scale(16)
                                        }}>
                                        Wallet Account
                                    </Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={this.onShowPoup}>
                                        <Image
                                            style={{
                                                height: getSize.scale(20),
                                                width: getSize.scale(20),
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: 'ic_question_grey' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {dataBalance && dataBalance.map((item, index) => {
                                return <View
                                    style={{
                                        justifyContent: 'space-between',
                                        marginTop: getSize.scale(8)
                                    }}>
                                    <ImageBackground
                                        source={{ uri: 'ic_frame_coin' }}
                                        style={{
                                            width: getSize.Width - getSize.scale(32),
                                            height: getSize.scale(70.5)
                                        }}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginHorizontal: getSize.scale(16)
                                            }}
                                        // onPress={
                                        //     () => this.setState({ ...this.state, modalMER: true })
                                        // }
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                <Image
                                                    style={{
                                                        resizeMode: 'contain',
                                                        width: getSize.scale(32),
                                                        height: getSize.scale(32)
                                                    }}
                                                    source={{ uri: item.icon }}
                                                />
                                                <Text
                                                    style={{
                                                        fontSize: getSize.scale(14),
                                                        fontWeight: 'bold',
                                                        marginLeft: getSize.scale(8)
                                                    }}>
                                                    {item.name ? item.name : ""}
                                                </Text>
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: getSize.scale(24),
                                                    fontWeight: 'bold'
                                                }}>
                                                {(item.amount).toString()}
                                            </Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            })}


                            {/* <View
                                style={{
                                    justifyContent: 'space-between',
                                    marginTop: getSize.scale(8)
                                }}>
                                <ImageBackground
                                    source={{ uri: 'ic_frame_coin' }}
                                    style={{
                                        width: getSize.Width - getSize.scale(32),
                                        height: getSize.scale(70.5)
                                    }}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginHorizontal: getSize.scale(16)
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                            <Image
                                                style={{
                                                    resizeMode: 'contain',
                                                    width: getSize.scale(32),
                                                    height: getSize.scale(32)
                                                }}
                                                source={{ uri: 'ic_coin' }}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: getSize.scale(14),
                                                    fontWeight: 'bold',
                                                    marginLeft: getSize.scale(8)
                                                }}>
                                                {'BNB'}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: getSize.scale(24),
                                                fontWeight: 'bold'
                                            }}>
                                            {'8.888'}
                                        </Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View> */}

                            {/* <View
                                style={{
                                    marginTop: getSize.scale(32),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: getSize.scale(16)
                                    }}>
                                    NFT Assets
                                </Text>
                            </View>
                            <ImageBackground
                                source={{ uri: 'ic_frame_coin_small' }}
                                style={{
                                    width: getSize.Width - getSize.scale(32),
                                    height: getSize.scale(37),
                                    marginTop: getSize.scale(8)
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginHorizontal: getSize.scale(16)
                                    }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ fontSize: getSize.scale(14) }}>
                                            {'Sneakers'}
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: getSize.scale(14), fontWeight: 'bold' }}>
                                        {'15'}
                                    </Text>
                                </TouchableOpacity>
                            </ImageBackground>

                            <ImageBackground
                                source={{ uri: 'ic_frame_coin_small' }}
                                style={{
                                    width: getSize.Width - getSize.scale(32),
                                    height: getSize.scale(37),
                                    marginTop: getSize.scale(4)
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginHorizontal: getSize.scale(16)
                                    }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ fontSize: getSize.scale(14) }}>
                                            {'Shoeboxes'}
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: getSize.scale(14), fontWeight: 'bold' }}>
                                        {'52'}
                                    </Text>
                                </TouchableOpacity>
                            </ImageBackground>

                            <ImageBackground
                                source={{ uri: 'ic_frame_coin_small' }}
                                style={{
                                    width: getSize.Width - getSize.scale(32),
                                    height: getSize.scale(37),
                                    marginTop: getSize.scale(4)
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginHorizontal: getSize.scale(16)
                                    }}>
                                    <View style={{ justifyContent: 'flex-start' }}>
                                        <Text style={{ fontSize: getSize.scale(14) }}>{'Items'}</Text>
                                    </View>
                                    <Text style={{ fontSize: getSize.scale(14), fontWeight: 'bold' }}>
                                        {'16'}
                                    </Text>
                                </TouchableOpacity>
                            </ImageBackground> */}
                        </View>
                    </View>
                </ScrollView>
                {/* Modal MER */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalMER}
                    onRequestClose={() => setmodalMER(!modalMER)}>
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            top: 0,
                            position: 'absolute',
                            backgroundColor: '#0000007f'
                        }}></View>
                    <TouchableOpacity
                        // onPress={() => setmodalMER(!modalMER)}
                        activeOpacity={1}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                width: getSize.Width - getSize.scale(64)
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    paddingHorizontal: getSize.scale(16),
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ffffff',
                                    paddingVertical: getSize.scale(10),
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5
                                }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            fontSize: getSize.scale(14),
                                            color: 'rgba(44, 44, 44, 1)',
                                            fontWeight: 'bold',
                                            marginTop: getSize.scale(16)
                                        }}>
                                        MOV
                                    </Text>
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                        <Image
                                            style={{
                                                resizeMode: 'contain',
                                                width: getSize.scale(32),
                                                height: getSize.scale(32),
                                                marginHorizontal: getSize.scale(8)
                                            }}
                                            source={{ uri: 'ic_location' }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: getSize.scale(32),
                                                fontWeight: 'bold',
                                                fontStyle: 'italic',
                                                color: 'rgba(244, 67, 105, 1)',
                                                marginVertical: getSize.scale(16)
                                            }}>
                                            158.5
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'flex-start'
                                            }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigation.navigate(stackNavigator.RECVICE)
                                                }>
                                                <Image
                                                    style={{
                                                        width: getSize.scale(74),
                                                        height: getSize.scale(74),
                                                        resizeMode: 'contain'
                                                    }}
                                                    source={{ uri: 'ic_btn_recvice' }}
                                                />
                                                <Text
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontStyle: 'italic',
                                                        fontSize: getSize.scale(14),
                                                        textAlign: 'center',
                                                        marginTop: getSize.scale(8)
                                                    }}>
                                                    Receive
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigation.navigate(stackNavigator.TRANSFER)
                                                }>
                                                <Image
                                                    style={{
                                                        width: getSize.scale(74),
                                                        height: getSize.scale(74),
                                                        resizeMode: 'contain'
                                                    }}
                                                    source={{ uri: 'ic_btn_transfer' }}
                                                />
                                                <Text
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontStyle: 'italic',
                                                        fontSize: getSize.scale(14),
                                                        textAlign: 'center',
                                                        marginTop: getSize.scale(8)
                                                    }}>
                                                    Transfer
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'flex-end'
                                            }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigation.navigate(stackNavigator.SWAP)
                                                }>
                                                <Image
                                                    style={{
                                                        width: getSize.scale(74),
                                                        height: getSize.scale(74),
                                                        resizeMode: 'contain'
                                                    }}
                                                    source={{ uri: 'ic_btn_trade' }}
                                                />
                                                <Text
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontStyle: 'italic',
                                                        fontSize: getSize.scale(14),
                                                        textAlign: 'center',
                                                        marginTop: getSize.scale(8)
                                                    }}>
                                                    Trade
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Text
                                        style={{
                                            fontSize: getSize.scale(14),
                                            color: 'rgba(44, 44, 44, 1)',
                                            fontWeight: 'bold',
                                            marginVertical: getSize.scale(16)
                                        }}>
                                        Transaction records
                                    </Text>
                                    <View style={{ height: getSize.Width / 1.5 }}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item, index) => index}
                                            data={data}
                                            renderItem={({ item, index }) => (
                                                <View style={{ flex: 1 }}>
                                                    <View
                                                        style={{
                                                            width: getSize.Width - getSize.scale(96)
                                                        }}>
                                                        <TouchableOpacity
                                                            activeOpacity={1}
                                                            style={{
                                                                flex: 1,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between'
                                                            }}>
                                                            <View
                                                                style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'flex-start'
                                                                }}>
                                                                <Image
                                                                    style={{
                                                                        width: getSize.scale(16),
                                                                        height: getSize.scale(50),
                                                                        resizeMode: 'contain'
                                                                    }}
                                                                    source={{
                                                                        uri: 'ic_wallet_line_trans'
                                                                    }}
                                                                />
                                                                <View
                                                                    style={{
                                                                        justifyContent:
                                                                            'space-evenly'
                                                                    }}>
                                                                    <Text
                                                                        style={{
                                                                            flex: 1,
                                                                            fontSize:
                                                                                getSize.scale(12),
                                                                            fontStyle: 'italic'
                                                                        }}>
                                                                        {item.dateTime}
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            flex: 1,
                                                                            fontSize:
                                                                                getSize.scale(14),
                                                                            fontWeight: 'bold',
                                                                            fontStyle: 'italic',
                                                                            color:
                                                                                item.status === 1
                                                                                    ? 'rgba(36, 158, 26, 1)'
                                                                                    : item.status ===
                                                                                        2
                                                                                        ? 'rgba(240, 137, 17, 1)'
                                                                                        : 'rgba(218, 33, 21, 1)'
                                                                        }}>
                                                                        {item.statusName}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <Text
                                                                style={{
                                                                    fontSize: getSize.scale(14)
                                                                }}>
                                                                {`${item.merValue} MOV`}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                        // refreshControl={<RefreshControl onRefresh={this.handleReload} refreshing={false} />}
                                        // ListEmptyComponent={this.renderEmptyList()}
                                        // ListFooterComponent={this.renderFooter()}
                                        // onEndReached={this.handleLoadMore}
                                        // onEndReachedThreshold={0.2}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: getSize.scale(16)
                                }}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setState({
                                            ...this.state,
                                            modalMER: !this.state.modalMER
                                        })
                                    }>
                                    <Image
                                        style={{
                                            width: getSize.scale(32),
                                            height: getSize.scale(32),
                                            resizeMode: 'contain'
                                        }}
                                        source={{
                                            uri: 'ic_close_red'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                {/* Popup */}
                <Poup
                    ref={(target) => {
                        this.popupRef = target;
                    }}
                    onTouchOutside={this.onColsePopup}
                    title={'Bep20 WALLET'}
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
        marginTop: StatusBar.currentHeight || 0
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    title: {
        fontSize: 32
    }
});


const mapStateToProps = (state) => ({
    isSignIn: state.initReducer.isSignIn,
    screenState: state.initReducer.screenState,
    userId: state.initReducer.userId,
    user: state.initReducer.user,
    getRate: state.initReducer.getRate,
    getRateBnb: state.initReducer.getRateBnb,
    userIdBnb: state.initReducer.userIdBnb,
});
const mapDispatchToProps = (dispatch) => ({
    action: bindActionCreators(_action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(WalletHome);
