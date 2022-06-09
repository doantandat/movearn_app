import React, { Component } from 'react';
import
{
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Image,
    Modal,
    FlatList,
    ImageBackground
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _action from '../../../redux/action/ActionHandle';
import { stackNavigator, tabNavigator } from '../../../navigation/nameNavigator';
import { Popup } from '../../../components';
import { DrawerActions } from '@react-navigation/native';
import { getSize } from '../../../common';

class TabBar extends Component
{
    constructor(props)
    {
        super(props);
        this.LowestPrice = React.createRef;
        this.state = {
            isSneakersMini: true,
            isShoeboxesMini: false,
            // isGalleryMini: true,
            // isUpgradeMini: false,
            // modalVisibles: false,
            visibles: false,
            isLowestPrice: true,
            isHighestPrice: false,
            isLatestPrice: false,
            titlePrice: 'Lowest Price',
            modalFilter: false,
            filters: {
                class: { Jogging: false, Running: false, Training: false },
                grade: { Common: false, Rare: false, Legendary: false }
            }
        };
    }

    SetFilters = (fil, type) =>
    {
        this.setState((state) =>
        {
            return {
                filters: {
                    ...state.filters,
                    [fil]: { ...state.filters[fil], [type]: !state.filters[fil][type] }
                }
            };
        });

        return;
    };

    ClearFilters = () =>
    {
        this.setState((state) =>
        {
            return {
                filters: {
                    class: { Jogging: false, Running: false, Training: false },
                    grade: { Common: false, Rare: false, Legendary: false }
                }
            };
        });
    };
    setmodalFilter = (modalFilter) =>
    {
        this.setState((state) =>
        {
            return {
                modalFilter: modalFilter
            };
        });
    };
    measurePrice = () =>
    {
        this.LowestPrice.measure(this.logPriceLayout);
    };
    logPriceLayout = (ox, oy, width, height, px, py) =>
    {
        // console.log('ox: ' + ox);
        // console.log('oy: ' + oy);
        // console.log('width: ' + width);
        // console.log('height: ' + height);
        // console.log('px: ' + px);
        // console.log('py: ' + py);
        this.setState({
            ...this.state,
            ox: ox,
            oy: oy,
            width: width,
            height: height,
            px: px,
            py: py,
            visible: !this.state.visible // true
        });
    };

    _handleTabbar = (key) =>
    {
        const { action, screenState } = this.props;
        if (key === 'Sneakers') {
            action.changeScreenState({
                ...screenState,
                isSneakers: true,
                isGems: false,
                isBadges: false,
                isShoeBoxes: false,
                isPromos: false
            });
        }
        if (key === 'Items') {
            // action.changeScreenState({
            //     ...screenState,
            //     isSneakers: false,
            //     isGems: true,
            //     isBadges: false,
            //     isShoeBoxes: false,
            //     isPromos: false
            // });
            Toast.showWithGravity('Coming soon', Toast.LONG, Toast.CENTER);
        }
        if (key === 'ShoeBoxes') {
            action.changeScreenState({
                ...screenState,
                isSneakers: false,
                isGems: false,
                isBadges: false,
                isShoeBoxes: true,
                isPromos: false
            });
            // Toast.showWithGravity('Coming soon', Toast.LONG, Toast.CENTER);
        }
        if (key === 'Promos') {
            // action.changeScreenState({
            //     ...screenState,
            //     isSneakers: false,
            //     isGems: false,
            //     isBadges: false,
            //     isShoeBoxes: false,
            //     isPromos: true
            // });
            Toast.showWithGravity('Coming soon', Toast.LONG, Toast.CENTER);
        }
        if (key === 'Badges') {
            Toast.showWithGravity('Coming soon', Toast.LONG, Toast.CENTER);
        }
    };

    _handleTabbarMini = (key) =>
    {
        const { action, screenState } = this.props;
        if (key === 'isGalleryMini') {
            action.changeScreenState({
                ...screenState,
                isGalleryMini: true,
                isUpgradeMini: false
            });
        }
        if (key === 'isUpgradeMini') {
            // action.changeScreenState({
            //     ...screenState,
            //     isGalleryMini: false,
            //     isUpgradeMini: true
            // });
            Toast.showWithGravity('Coming soon', Toast.LONG, Toast.CENTER);
        }
    };

    render()
    {
        const image =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogMFHOw0CKtwUvuJmhgcSi18GmfqlCxUI6g&usqp=CAU';
        const imageSneakers = 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg';

        const { action, screenState } = this.props;
        const { isSneakers, isGems, isShoeBoxes, isPromos, isGalleryMini, isUpgradeMini } =
            screenState;

        return (
            <View
                style={{
                    flex: 1,
                    marginTop: getSize.scale(8)
                }}>
                <View
                    style={{
                        flex: Platform.OS === 'android' ? 0 : 5,
                        minHeight: Platform.OS === 'android' ? getSize.scale(38) : 0,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: getSize.scale(38),
                            borderRadius: 20,
                            overflow: 'hidden',

                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.6)',
                            elevation: 2,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 0
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 8,
                            overflow: 'hidden'
                        }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: getSize.scale(4),
                                height: '100%'
                            }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    flex: 0.9,
                                    alignItems: 'center',
                                    overflow: 'hidden'
                                }}
                                onPress={() => this._handleTabbar('Sneakers')}>
                                <View
                                    style={{
                                        flex: 0.8,
                                        backgroundColor: isSneakers ? '#F44369' : 'transparent',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: isSneakers ? 20 : 0
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: isSneakers ? '#FFFFFF' : '#2C2C2C'
                                        }}>
                                        Sneakers
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    flex: 0.9,
                                    alignItems: 'center',
                                    overflow: 'hidden'
                                }}
                                onPress={() => this._handleTabbar('ShoeBoxes')}>
                                <View
                                    style={{
                                        flex: 0.8,
                                        backgroundColor: isShoeBoxes ? '#F44369' : 'transparent',
                                        paddingVertical: 2,
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: isShoeBoxes ? 20 : 0
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: isShoeBoxes ? '#FFFFFF' : '#2C2C2C'
                                        }}>
                                        ShoeBoxes
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    flex: 0.9,
                                    alignItems: 'center',
                                    overflow: 'hidden'
                                }}
                                onPress={() => this._handleTabbar('Items')}>
                                <View
                                    style={{
                                        flex: 0.8,
                                        backgroundColor: isGems ? '#F44369' : 'transparent',
                                        paddingVertical: 2,
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: isGems ? 20 : 0
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: isGems ? '#FFFFFF' : '#2C2C2C'
                                        }}>
                                        Items
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    flex: 0.9,
                                    alignItems: 'center',
                                    overflow: 'hidden'
                                }}
                                onPress={() => this._handleTabbar('Promos')}>
                                <View
                                    style={{
                                        flex: 0.8,
                                        backgroundColor: isPromos ? '#F44369' : 'transparent',
                                        paddingVertical: 2,
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: isPromos ? 20 : 0,
                                        borderRadius: 20
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: isPromos ? '#FFFFFF' : '#2C2C2C'
                                        }}>
                                        Promo
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flex: Platform.OS === 'android' ? 0 : 5,
                        minHeight: Platform.OS === 'android' ? getSize.scale(38) : 0,
                        marginTop: Platform.OS === 'android' ? getSize.scale(4) : 0
                    }}>
                    {isSneakers ? (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: getSize.scale(30),
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                    width: '60%',
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    elevation: 2,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 0
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 8,
                                    overflow: 'hidden'
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    // onPress={() =>
                                    //     this.setState({
                                    //         isGalleryMini: true,
                                    //         isUpgradeMini: false
                                    //     })
                                    // }
                                    onPress={() => this._handleTabbarMini('isGalleryMini')}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        borderRadius: isGalleryMini ? 20 : 0,
                                        overflow: 'hidden',
                                        margin: getSize.scale(3)
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: isGalleryMini
                                                ? '#F44369'
                                                : 'transparent',
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: isGalleryMini ? '#fff' : '#000'
                                            }}>
                                            Showroom
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this._handleTabbarMini('isUpgradeMini')}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        borderRadius: isUpgradeMini ? 20 : 0,
                                        overflow: 'hidden',
                                        margin: getSize.scale(3)
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: isUpgradeMini
                                                ? '#F44369'
                                                : 'transparent',
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: isUpgradeMini ? '#fff' : '#000'
                                            }}>
                                            Upgrade
                                        </Text>
                                    </View>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    initReducer: state.initReducer,
    screenState: state.initReducer.screenState
});
const mapDispatchToProps = (dispatch) => ({
    action: bindActionCreators(_action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
