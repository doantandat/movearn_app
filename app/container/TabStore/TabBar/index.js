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
import ItemFilter from './../ItemFilter/index';
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
                class: { Jogging: false, runner: false, Training: false },
                grade: { Common: false, rare: false, Legendary: false }
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
        }, () =>
        {

        });

        return;
    };
    Filter = () =>
    {
        const { filters, } = this.state;
        const { market, marketBackup, action } = this.props;
        // console.log(filters);
        // console.log(market);
        // console.log(marketBackup);
        let martkettmp = market;
        let result = [];
        result = market.data.filter(item =>
        {
            return filters.class[item.class] || filters.grade[item.quality];
        });
        martkettmp.data = result
        action.filterMarket(martkettmp.data)
        // console.log(martkettmp);

    }
    OderBy = () =>
    {
        const { isLowestPrice, isHighestPrice, isLatestPrice, } = this.state;
        const { market, marketBackup, action } = this.props;
        // console.log(filters);
        // console.log(market);
        // console.log(marketBackup);
        let martkettmp = market;
        let result = [];
        result = market.data.sort((a, b) =>
        {
            if (isLowestPrice) {
                return a.price - b.price
            }
            if (isHighestPrice) {
                return b.price - a.price
            }
            if (isLatestPrice) {
                return b.price - a.price
            }
        });
        martkettmp.data = result
        action.filterMarket(martkettmp.data)
        console.log(martkettmp);

    }
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
        }, () =>
        {
            const { marketBackup, action } = this.props;
            console.log(marketBackup);
            action.filterMarket(marketBackup);

            this.setmodalFilter(!this.state.modalFilter)
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

    render()
    {
        const image =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogMFHOw0CKtwUvuJmhgcSi18GmfqlCxUI6g&usqp=CAU';
        const imageSneakers = 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg';
        const {
            isSneakersMini,
            isShoeboxesMini,
            // isGalleryMini,
            // isUpgradeMini,
            isLowestPrice,
            isHighestPrice,
            isLatestPrice,
            modalFilter
        } = this.state;
        const { action, screenState } = this.props;
        const { isSneakers, isGems, isBadges, isShoeBoxes, isPromos } = screenState;

        return (
            <View style={{ flex: 1, marginTop: getSize.scale(8) }}>
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
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', //'rgba(89, 89, 89, 0.3)',
                            height: getSize.scale(38),
                            borderRadius: 20,
                            overflow: 'hidden',

                            borderWidth: 0.35,
                            borderColor: 'rgba(255, 255, 255, 0.6)',
                            elevation: 4,
                            shadowColor: 'rgba(89, 89, 89, 0.3)', // "rgba(52, 52, 52, alpha)", //trong suốt
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 6
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

                            <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    flex: 0.9,
                                    alignItems: 'center',
                                    overflow: 'hidden'
                                    // height: "85%"
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
                            </TouchableOpacity>
                            <TouchableOpacity
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
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    overflow: 'hidden',

                                    height: "85%"
                                }}
                                onPress={() => this._handleTabbar('Badges')}>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: isBadges ? '#F44369' : 'transparent',
                                        paddingVertical: 2,
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // borderWidth: isBadges ? 1 : 0,
                                        borderRadius: isBadges ? 20 : 0,
                                        // borderBottomWidth: isBadges ? 3 : 0,
                                        // borderLeftWidth: isBadges ? 4 : 0
                                        borderRadius: 20,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            color: isBadges ? '#FFFFFF' : '#2C2C2C',
                                        }}>
                                        Badges
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
                        marginTop: Platform.OS === 'android' ? getSize.scale(4) : getSize.scale(24)
                    }}>
                    {isSneakers ? (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: getSize.scale(10)
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    overflow: 'hidden'
                                }}>
                                {this.state.py ? (
                                    <Modal
                                        animationType="none"
                                        transparent={true}
                                        visible={this.state.visible}
                                        onRequestClose={() =>
                                            this.setState({
                                                ...this.state,
                                                visible: false
                                            })
                                        }>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: this.state.py + 4,
                                                left: this.state.px,
                                                marginVertical: this.state.height,
                                                width: this.state.width + getSize.scale(32),
                                                borderRadius: 10,
                                                overflow: 'hidden'
                                            }}>
                                            <View
                                                style={{
                                                    backgroundColor: 'white',
                                                    paddingHorizontal: getSize.scale(16),
                                                    shadowColor: '#000',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2
                                                    },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 4,
                                                    elevation: 5
                                                }}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            visible: false,
                                                            titlePrice: 'Lowest Price',
                                                            isLowestPrice: true,
                                                            isHighestPrice: false,
                                                            isLatestPrice: false
                                                        }, () =>
                                                        {
                                                            this.OderBy()
                                                        })
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        marginVertical: getSize.scale(4)
                                                    }}>
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                isLowestPrice && '#33ff99',
                                                            top: 4,
                                                            height: 5,
                                                            width: 'Lowest Price'.length * 6,
                                                            position: 'absolute'
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            paddingHorizontal: getSize.scale(5)
                                                        }}>
                                                        Lowest Price
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            visible: false,
                                                            titlePrice: 'Highest Price',
                                                            isLowestPrice: false,
                                                            isHighestPrice: true,
                                                            isLatestPrice: false
                                                        }, () =>
                                                        {
                                                            this.OderBy()
                                                        })
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        marginVertical: getSize.scale(4)
                                                    }}>
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                isHighestPrice && '#33ff99',
                                                            top: 4,
                                                            height: 5,
                                                            width: 'Highest Price'.length * 6,
                                                            position: 'absolute'
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            paddingHorizontal: getSize.scale(5)
                                                        }}>
                                                        Highest Price
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            visible: false,
                                                            titlePrice: 'Latest',
                                                            isLowestPrice: false,
                                                            isHighestPrice: false,
                                                            isLatestPrice: true
                                                        }, () =>
                                                        {
                                                            this.OderBy()
                                                        })
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        marginVertical: getSize.scale(4)
                                                    }}>
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                isLatestPrice && '#33ff99',
                                                            top: 4,
                                                            height: 5,
                                                            width: 'Latest'.length * 6,
                                                            position: 'absolute'
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            paddingHorizontal: getSize.scale(5)
                                                        }}>
                                                        Latest
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                ) : null}
                                <TouchableOpacity
                                    ref={(refs) =>
                                    {
                                        this.LowestPrice = refs;
                                    }}
                                    onPress={this.measurePrice}
                                    style={{
                                        flex: 1,
                                        height: 20,
                                        width: '100%',
                                        alignItems: 'center',
                                        overflow: 'hidden'
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            paddingHorizontal: getSize.scale(8)
                                        }}>
                                        <View
                                            style={{
                                                flex: 9,
                                                justifyContent: 'center'
                                            }}>
                                            <Text style={{ fontSize: getSize.scale(12) }}>
                                                {this.state.titlePrice}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: 'flex-start',
                                                justifyContent: 'center'
                                            }}>
                                            <Image
                                                style={{
                                                    marginLeft: getSize.scale(3),
                                                    width: getSize.scale(13),
                                                    height: getSize.scale(13),
                                                    resizeMode: 'contain'
                                                }}
                                                source={{ uri: 'ic_arrow' }}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flex: 1.5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)', //'rgba(89, 89, 89, 0.3)',
                                    height: getSize.scale(28),
                                    borderRadius: 20,
                                    overflow: 'hidden',

                                    marginHorizontal: getSize.scale(16),
                                    borderWidth: 0.35,
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    elevation: 4,
                                    shadowColor: 'rgba(89, 89, 89, 0.3)', // "rgba(52, 52, 52, alpha)", //trong suốt
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 6
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() =>
                                        this.setState({
                                            isSneakersMini: true,
                                            isShoeboxesMini: false
                                        })
                                    }
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        borderRadius: isSneakersMini ? 20 : 0,
                                        overflow: 'hidden',
                                        margin: getSize.scale(3)
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: isSneakersMini
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
                                                color: isSneakersMini ? '#fff' : '#000'
                                            }}>
                                            Buy
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={
                                        () =>
                                            Toast.showWithGravity(
                                                'Coming soon',
                                                Toast.LONG,
                                                Toast.CENTER
                                            )
                                        // this.setState({
                                        //     isSneakersMini: false,
                                        //     isShoeboxesMini: true
                                        // })
                                    }
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        borderRadius: isShoeboxesMini ? 20 : 0,
                                        overflow: 'hidden'
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: isShoeboxesMini
                                                ? '#F44369'
                                                : 'transparent',
                                            paddingVertical: 4,
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: isShoeboxesMini ? '#fff' : '#000'
                                            }}>
                                            Rent
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    // marginHorizontal: getSize.scale(16),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    height: 20
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() =>
                                        // this.props.navigation.dispatch(
                                        //     DrawerActions.openDrawer()
                                        // )
                                        this.setmodalFilter(!modalFilter)
                                    }
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'row'
                                        }}>
                                        <Text style={{ fontSize: getSize.scale(12) }}>Filter</Text>
                                        <View
                                            style={{
                                                fontSize: getSize.scale(12),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'red',
                                                width: getSize.scale(16),
                                                height: getSize.scale(16),
                                                borderRadius: 50,
                                                marginHorizontal: getSize.scale(2)
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: getSize.scale(12),
                                                    color: '#fff',
                                                    fontWeight: 'bold'
                                                }}>
                                                2
                                            </Text>
                                        </View>
                                        <Image
                                            style={{
                                                marginLeft: getSize.scale(5),
                                                width: getSize.scale(20),
                                                height: getSize.scale(20),
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: 'ic_filter' }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: getSize.scale(10)
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    overflow: 'hidden'
                                }}>
                                {this.state.py ? (
                                    <Modal
                                        animationType="none"
                                        transparent={true}
                                        visible={this.state.visible}
                                        onRequestClose={() =>
                                            this.setState({
                                                ...this.state,
                                                visible: false
                                            })
                                        }>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: this.state.py + 4,
                                                left: this.state.px,
                                                marginVertical: this.state.height,
                                                width: this.state.width + getSize.scale(32),
                                                borderRadius: 10,
                                                overflow: 'hidden'
                                            }}>
                                            <View
                                                style={{
                                                    backgroundColor: 'white',
                                                    paddingHorizontal: getSize.scale(16),
                                                    shadowColor: '#000',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2
                                                    },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 4,
                                                    elevation: 5
                                                }}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            visible: false,
                                                            titlePrice: 'Lowest Price',
                                                            isLowestPrice: true,
                                                            isHighestPrice: false,
                                                            isLatestPrice: false
                                                        })
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        marginVertical: getSize.scale(4)
                                                    }}>
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                isLowestPrice && '#33ff99',
                                                            top: 4,
                                                            height: 5,
                                                            width: 'Lowest Price'.length * 6,
                                                            position: 'absolute'
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            paddingHorizontal: getSize.scale(5)
                                                        }}>
                                                        Lowest Price
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            visible: false,
                                                            titlePrice: 'Highest Price',
                                                            isLowestPrice: false,
                                                            isHighestPrice: true,
                                                            isLatestPrice: false
                                                        })
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        marginVertical: getSize.scale(4)
                                                    }}>
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                isHighestPrice && '#33ff99',
                                                            top: 4,
                                                            height: 5,
                                                            width: 'Highest Price'.length * 6,
                                                            position: 'absolute'
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            paddingHorizontal: getSize.scale(5)
                                                        }}>
                                                        Highest Price
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            visible: false,
                                                            titlePrice: 'Latest',
                                                            isLowestPrice: false,
                                                            isHighestPrice: false,
                                                            isLatestPrice: true
                                                        })
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        marginVertical: getSize.scale(4)
                                                    }}>
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                isLatestPrice && '#33ff99',
                                                            top: 4,
                                                            height: 5,
                                                            width: 'Latest'.length * 6,
                                                            position: 'absolute'
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            paddingHorizontal: getSize.scale(5)
                                                        }}>
                                                        Latest
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                ) : null}
                                <TouchableOpacity
                                    ref={(refs) =>
                                    {
                                        this.LowestPrice = refs;
                                    }}
                                    onPress={this.measurePrice}
                                    style={{
                                        flex: 1,
                                        height: 20,
                                        width: '100%',
                                        alignItems: 'center',
                                        overflow: 'hidden'
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            paddingHorizontal: getSize.scale(8)
                                        }}>
                                        <View
                                            style={{
                                                flex: 9,
                                                justifyContent: 'center'
                                            }}>
                                            <Text style={{ fontSize: getSize.scale(12) }}>
                                                {this.state.titlePrice}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: 'flex-start',
                                                justifyContent: 'center'
                                            }}>
                                            <Image
                                                style={{
                                                    marginLeft: getSize.scale(3),
                                                    width: getSize.scale(13),
                                                    height: getSize.scale(13),
                                                    resizeMode: 'contain'
                                                }}
                                                source={{ uri: 'ic_arrow' }}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1.83 }} />

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    height: 20
                                }}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() =>
                                        // this.props.navigation.dispatch(
                                        //     DrawerActions.openDrawer()
                                        // )
                                        this.setmodalFilter(!modalFilter)
                                    }
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'row'
                                        }}>
                                        <Text style={{ fontSize: getSize.scale(12) }}>Filter</Text>
                                        <View
                                            style={{
                                                fontSize: getSize.scale(12),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'red',
                                                width: getSize.scale(16),
                                                height: getSize.scale(16),
                                                borderRadius: 50,
                                                marginHorizontal: getSize.scale(2)
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: getSize.scale(12),
                                                    color: '#fff',
                                                    fontWeight: 'bold'
                                                }}>
                                                2
                                            </Text>
                                        </View>
                                        <Image
                                            style={{
                                                marginLeft: getSize.scale(5),
                                                width: getSize.scale(20),
                                                height: getSize.scale(20),
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: 'ic_filter' }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
                <ItemFilter
                    modalFilter={modalFilter}
                    setmodalFilter={this.setmodalFilter}
                    filters={this.state.filters}
                    SetFilters={this.SetFilters}
                    ClearFilters={this.ClearFilters}
                    Filter={this.Filter}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    initReducer: state.initReducer,
    screenState: state.initReducer.screenState,
    market: state.initReducer.market,
    filterbackup: state.initReducer.filterbackup,
});
const mapDispatchToProps = (dispatch) => ({
    action: bindActionCreators(_action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
