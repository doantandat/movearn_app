import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _action from '../../redux/action/ActionHandle';
import {stackNavigator, tabNavigator} from '../../navigation/nameNavigator';
import {Popup, NoData, Header} from '../../components';
import {getSize, Colors} from '../../common';
import TabBar from './TabBar';
import ItemSneakers from './ItemSneakers';
import ItemGems from './ItemGems';
import ItemShoeBoxes from './ItemShoeBoxes';
import ItemPromos from './ItemPromos';

import Head from './../../components/head/index';
const dataSneakers = [
  {
    shoesId: 316942392,
    classify: 'Runner',
    mint: 1,
    level: 1,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: '#33ff99',
  },
  {
    shoesId: 316942392,
    classify: 'Jogger',
    mint: 2,
    level: 2,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'grey',
  },
  {
    shoesId: 316942392,
    classify: 'Walker',
    mint: 0,
    level: 3,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'blue',
  },
  {
    shoesId: 316942392,
    classify: 'Runner',
    mint: 1,
    level: 4,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'orange',
  },
  {
    shoesId: 316942392,
    classify: 'Jogger',
    mint: 2,
    level: 5,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: '#33ff99',
  },
  {
    shoesId: 316942392,
    classify: 'Runner',
    mint: 1,
    level: 4,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'orange',
  },
  {
    shoesId: 316942392,
    classify: 'Jogger',
    mint: 2,
    level: 5,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: '#33ff99',
  },
  {
    shoesId: 316942392,
    classify: 'Runner',
    mint: 1,
    level: 4,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'orange',
  },
  {
    shoesId: 316942392,
    classify: 'Jogger',
    mint: 2,
    level: 5,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: '#33ff99',
  },
];

const dataPromos = [
  {
    gemsId: 316942392,
    mint: 1,
    level: 1,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: '#33ff99',
  },
  {
    gemsId: 316942392,
    mint: 2,
    level: 2,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'grey',
  },
  {
    gemsId: 316942392,
    mint: 2,
    level: 3,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'blue',
  },
  {
    gemsId: 316942392,
    mint: 1,
    level: 4,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'orange',
  },
  {
    gemsId: 316942392,
    mint: 2,
    level: 5,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: '#33ff99',
  },
  {
    gemsId: 316942392,
    mint: 2,
    level: 2,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'grey',
  },
  {
    gemsId: 316942392,
    mint: 2,
    level: 3,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'blue',
  },
  {
    gemsId: 316942392,
    mint: 1,
    level: 4,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: 'orange',
  },
  {
    gemsId: 316942392,
    mint: 2,
    level: 5,
    sol: 10000,
    img: 'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg',
    color: '#33ff99',
  },
];

import * as ApiServices from './../../service/index';
class TabStore extends Component {
  constructor(props) {
    super(props);
    this.LowestPrice = React.createRef;
    this.state = {
      modalVisibles: false,
      marketBackup: [],
      refreshing: false,
    };
  }

  measureLowestPrice = () => {
    this.LowestPrice.measure(this.logLowestPriceLayout);
  };
  logLowestPriceLayout = (ox, oy, width, height, px, py) => {
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
      visible: !this.state.visible, // true
    });
  };

  // FlatList
  _renderItem = ({item, index}) => {
    const {screenState, getConstShoe} = this.props;
    const constShoe = getConstShoe.data ? getConstShoe.data : [];
    const {isSneakers, isGems, isShoeBoxes, isPromos} = screenState;
    if (isSneakers) {
      return (
        <ItemSneakers
          item={item}
          index={index}
          buyShoe={this.buyShoe}
          isbuyShoe={this.state.isbuyShoe}
          constShoe={constShoe}
        />
      );
    }
    if (isGems) {
      return <ItemGems item={item} index={index} />;
    }
    if (isShoeBoxes) {
      return <ItemShoeBoxes buyItem={this.buyItem} item={item} index={index} />;
    }
    if (isPromos) {
      return <ItemPromos item={item} index={index} />;
    }
    return null;
  };

  renderFooter = () => {
    const {isFetching} = this.props;
    if (isFetching) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={Colors.BLUE}
            size="large"
            style={{paddingVertical: 20}}
          />
        </View>
      );
    }
  };

  renderEmptyList = () => {
    const {isFetching, isFull} = this.props;
    if (!isFetching && !isFull) {
      return <NoData />;
    }
  };
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {action} = this.props;
    ApiServices.market({pageSize: 20, page: 1})
      .then(res => {
        if (res.code === 200) {
          action.market(res.data.shoes);
          this.setState(
            state => {
              return {
                marketBackup: res.data.shoes,
                refreshing: false,
              };
            },
            () => {
              console.log('this.state.marketBackup', this.state.marketBackup);
            },
          );
        }
      })
      .catch(err => {});
    ApiServices.getShopBox({pageSize: 100, page: 1})
      .then(res => {
        if (res.code === 200) {
          this.setState(state => {
            return {
              refreshing: false,
            };
          });
          console.log('resBox', res);
          action.getListMarketBox(res?.data?.items ?? []);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  buyItem = (id, quantity) => {
    const { action } = this.props;
    ApiServices.buyItem({ sellingId: id, quantity }).then(res => {
      if (res.code === 200) {
        ApiServices.getMyBox()
          .then(res => {
            if (res.code === 200) {
              action.getMyListBox(res.data);
            }
          })
          .catch(err => {
            console.log('LoadData', err);
          });
        alert(res.message);
        this.loadData();
      }
      if (res.code !== 200) {
        alert(res.message);
      }
    });
  };

  buyShoe = id => {
    const {action} = this.props;

    this.setState(
      state => {
        return {
          isbuyShoe: true,
        };
      },
      () => {
        ApiServices.buy({shoesId: id})
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              alert(res.message);
              action.buy(res.data);
              this.loadData();
              this.setState(state => {
                return {
                  isbuyShoe: false,
                };
              });
            }
            if (res.code !== 200) {
              this.setState(state => {
                return {
                  isbuyShoe: false,
                };
              });
              alert(res.message);
            }
          })
          .catch(err => {});
      },
    );
  };
  onRefresh = () => {
    const {screenState} = this.props;
    const {
      isSneakers,
      isGems,
      isSneakersMini,
      isShoeboxesMini,
      isGalleryMini,
      isUpgradeMini,
      isShowroom,
      isUpgrade,
    } = screenState;
    this.setState(
      state => {
        return {
          refreshing: true,
        };
      },
      () => {
        this.loadData();
      },
    );
  };
  render() {
    const {navigation, screenState, action, market, filterBackup, listBox} = this.props;
    const {isSneakers, isGems, isBadges, isShoeBoxes, isPromos} = screenState;

    const image =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogMFHOw0CKtwUvuJmhgcSi18GmfqlCxUI6g&usqp=CAU';
    const imageSneakers =
      'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg';
    const dataSneakers = market && market.data ? market.data : [];
    const dataBoxes = listBox && listBox.data ? listBox.data : [];

    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          style={{
            width: getSize.Width,
            height: getSize.Height,
            position: 'absolute',
            resizeMode: 'contain',
            zIndex: -2,
          }}
          source={{uri: 'ic_background_shoping'}}
        />

        <View
          style={{
            flex: Platform.OS === 'android' ? 0 : 1,
            minHeight: Platform.OS === 'android' ? getSize.scale(48) : 0,
            marginVertical: Platform.OS === 'android' ? getSize.scale(8) : 0,
          }}>
          <Head navigation={navigation} />
        </View>

        <View
          style={{
            flex: Platform.OS === 'android' ? 0 : 2 / 1.78,
            minHeight: Platform.OS === 'android' ? getSize.scale(90) : 0,
            marginHorizontal: getSize.scale(16),
          }}>
          <TabBar
            navigation={navigation}
            marketBackup={this.state.marketBackup}
          />
        </View>

        <View
          style={{
            flex: 8,
            paddingHorizontal: getSize.scale(8),
            marginBottom: getSize.scale(50),
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            keyExtractor={(item, index) => index}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            data={
              isSneakers
                ? dataSneakers
                : isGems
                ? dataSneakers
                : isShoeBoxes
                ? dataBoxes
                : isPromos
                ? dataPromos
                : null
            }
            renderItem={this._renderItem}
            // refreshControl={<RefreshControl onRefresh={this.handleReload} refreshing={false} />}
            // ListEmptyComponent={this.renderEmptyList()}
            // ListFooterComponent={this.renderFooter()}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.2}
          />
        </View>

        {/* <View
                    style={{
                        flex: 8,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View
                        style={{
                            flex: 6,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text>Hello! TabStore</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                height: 40,
                                width: 200,
                                backgroundColor: 'violet',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 16
                            }}>
                            <Text>Back Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                            style={{
                                height: 40,
                                width: 200,
                                backgroundColor: 'violet',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 16
                            }}>
                            <Text>Filter</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flex: 4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Popup modalVisibles={this.state.modalVisibles} title="Popup Mua giày" />
                        <Popup modalVisibles={this.state.modalVisibles} title="Popup Xác nhận mua giày" />
                    </View>
                </View> */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  initReducer: state.initReducer,
  screenState: state.initReducer.screenState,
  market: state.initReducer.market,
  filterBackup: state.initReducer.filterBackup,
  buy: state.initReducer.buy,
  getConstShoe: state.initReducer.getConstShoe,
  listBox: state.initReducer.listBox
});
const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(_action, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabStore);
