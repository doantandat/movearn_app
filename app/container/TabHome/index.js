import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Modal,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {stackNavigator, tabNavigator} from '../../navigation/nameNavigator';
import Tooltip from 'react-native-walkthrough-tooltip';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as _action from '../../redux/action/ActionHandle';

import Head from './../../components/head/index';
import {location, getSize, Colors} from '../../common/';

import * as ApiServices from './../../service/index';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

class TabHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibles: true, // true,
      toolTipStart: false,
      toolTipSneaker: false,
      toolTipProfile: false,
      toolTipSol: false,
      refreshing: false,
      modalBuy: false,
      modalTransfer: false,
      price: '0',
      isPutShoe: false,
      isshoesIdWear: false,
      isShowModalInstruction: true,
    };
  }

  componentDidUpdate(preProp) {
    if (preProp?.shoesIdWear !== this.props.shoesIdWear) {
      this.LoadData();
    }
  }

  shoesIdWear = id => {
    const {action} = this.props;
    this.setState(
      state => {
        return {
          isshoesIdWear: true,
        };
      },
      () => {
        ApiServices.shoesIdWear({_id: id})
          .then(res => {
            if (res.code === 200) {
              action.shoesIdWear(res.data);
              this.LoadData();
              this.setState(
                state => {
                  return {
                    isshoesIdWear: false,
                  };
                },
                () => {
                  this.setmodalBuy(false);
                  this.setmodalTransfer(false);
                },
              );
            }
            if (res.code === 404) {
              alert(res.message);
            }
          })
          .catch(err => {
            alert('Fail!');
            this.setState(state => {
              return {
                isshoesIdWear: false,
              };
            });
          });
      },
    );
  };
  putShoe = (isSelling, id) => {
    const {action} = this.props;
    const {price} = this.state;
    let pr = isSelling ? price : 0;
    this.setState(
      state => {
        return {
          isPutShoe: true,
        };
      },
      () => {
        ApiServices.putShoesId({price: pr, isSelling: isSelling, _id: id})
          .then(res => {
            console.log('putShoe', res);
            if (res.code === 200) {
              action.putShoesId(res.data);
              this.LoadData();
              this.setState(
                state => {
                  return {
                    isPutShoe: false,
                  };
                },
                () => {
                  this.setmodalBuy(false);
                  this.setmodalTransfer(false);
                },
              );
            }
            if (res.code === 404) {
              alert(res.message);
            }
          })
          .catch(err => {
            alert('Fail!');
            this.setState(state => {
              return {
                isPutShoe: false,
              };
            });
          });
      },
    );
  };
  setmodalBuy = type => {
    this.setState(state => {
      return {
        modalBuy: type,
      };
    });
  };
  setmodalTransfer = type => {
    this.setState(state => {
      return {
        modalTransfer: type,
      };
    });
  };

  getIsShowModalInstruction = async () => {
    const isShow = await AsyncStorage.getItem('NOT_SHOW_INSTRUCTION');
    this.setState({isShowModalInstruction: isShow === 'having' ? false : true});
  };

  componentDidMount = () => {
    // Permissions location
    location.requestPermissions();
    this._getCurrentLocation();
    this.getIsShowModalInstruction();
    this.LoadData();
  };
  _onRefresh = () => {
    const {action} = this.props;
    this.setState(
      state => {
        return {refreshing: true};
      },
      () => {
        ApiServices.shoes()
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.setState(
                state => {
                  return {refreshing: false};
                },
                () => {
                  action.shoes(res.data);
                  this.setShoeCurrentWear(res.data, action);
                },
              );
            }
          })
          .catch(err => {});
      },
    );
  };
  LoadData = () => {
    const {action} = this.props;
    ApiServices.getConstShoe()
      .then(res => {
        if (res.code === 200) {
          action.getConstShoe(res.data);
        }
      })
      .catch(err => {});
    ApiServices.shoes()
      .then(res => {
        if (res.code === 200) {
          action.shoes(res.data);
          this.setShoeCurrentWear(res.data, action);
        }
      })
      .catch(err => {});
    ApiServices.market({pageSize: 20, page: 1})
      .then(res => {
        if (res.code === 200) {
          action.market(res.data.shoes);
        }
      })
      .catch(err => {});
  };

  setShoeCurrentWear = (shoes, action) => {
    for (let i = 0; i < shoes.length; i++) {
      const element = shoes[i];
      if (element.isWearing) {
        // shoeResutl = element;

        action.shoeCurrentWear(element);
        // action.getShoesId({ _id: element._id });
        console.log('shoeCurrentWear', element);
      }
    }
  };

  setKeyIsShowModalInstruction = async () => {
    await AsyncStorage.setItem('NOT_SHOW_INSTRUCTION', 'having');
  };

  onChangeText = (name, itemValue) => {
    this.setState(state => {
      return {
        [name]: itemValue,
      };
    });
  };
  _getCurrentLocation = async () => {
    const {action, screenState} = this.props;
    return location
      .getCurrentLocation()
      .then(currentLocation => {
        if (currentLocation) {
          const {longitude, latitude} = currentLocation;
          action.changeScreenState({
            ...screenState,
            currentLocation: {
              longitude: Number(longitude),
              latitude: Number(latitude),
            },
          });
        }
      })
      .catch(err => {
        if (err === 1) {
          return Toast.show('Chưa cấp quyền định vị');
        }
        if (err === 2) {
          return Toast.show('Kết nối mạng không ổn định');
        }
        if (err === 3) {
          return Toast.show('Hết thời gian phản hồi máy chủ');
        }
      });
  };

  render() {
    const {
      navigation,
      screenState,
      getConstShoe,
      action,
      getShoesId,
      userId,
      shoeCurrentWear,
      shoes,
    } = this.props;
    const {
      modalVisible,
      modalTransfer,
      modalBuy,
      price,
      isPutShoe,
      isshoesIdWear,
      isShowModalInstruction,
    } = this.state;
    const balanceUserId = userId.data ? userId.data : {mer: 0, usdt: 0};
    let dataS = shoes.data
      ? shoes.data
          .filter((item, index) => {
            return !item.isWearing;
          })
          .slice(-4)
      : [];
    if (dataS.length < 4) {
      dataS.push({});
    }
    const datashoes = dataS ? dataS : [];
    const constShoe = getConstShoe.data ? getConstShoe.data : [];

    let isWearr = shoeCurrentWear._id ? true : false;
    const ShoeWeared = isWearr ? shoeCurrentWear : getShoesId.data;
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
          source={{uri: 'ic_background'}}
        />

        <View
          style={{
            minHeight: getSize.scale(45),
            marginVertical: getSize.scale(8),
          }}>
          <Head navigation={navigation} />
        </View>

        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={{flex: 1, height: getSize.Height / 1.12}}>
            <View
              style={{
                flex: 1,

                margin: getSize.scale(16),
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Tooltip
                  isVisible={this.state.toolTipSneaker}
                  content={
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: getSize.scale(14),
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}>
                        STEP 3/5
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          padding: getSize.scale(16),
                        }}>
                        <Text
                          style={{
                            marginTop: getSize.scale(18),
                            textAlign: 'center',
                            fontSize: getSize.scale(14),
                          }}>
                          To use the app, you MUST buy or rent an NFT Sneaker
                          from the Marketplace
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'space-evenly',
                          flexDirection: 'row',
                          paddingBottom: getSize.scale(16),
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({toolTipSneaker: false});
                            this.setKeyIsShowModalInstruction();
                          }}
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: getSize.scale(100),
                              height: getSize.scale(40),
                              borderRadius: 20,
                              overflow: 'hidden',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'rgba(89, 89, 89, 0.6)',
                              borderWidth: 1,
                              borderColor: 'rgba(89, 89, 89, 0.1)',
                              elevation: 4,
                              shadowColor: 'rgba(89, 89, 89, 0.3)',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                fontSize: getSize.scale(18),
                              }}>
                              SKIP
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              toolTipSneaker: false,
                              toolTipSol: true,
                            });
                            this.setKeyIsShowModalInstruction();
                          }}
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: getSize.scale(100),
                              height: getSize.scale(40),
                              borderRadius: 20,
                              overflow: 'hidden',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'rgba(244, 67, 105, 1)',
                              borderWidth: 1,
                              borderColor: 'rgba(244, 67, 105, 0.3)',
                              elevation: 4,
                              shadowColor: 'rgba(89, 89, 89, 0.3)', // "rgba(52, 52, 52, alpha)", //trong suốt
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                fontSize: getSize.scale(18),
                              }}>
                              NEXT
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                  placement="bottom">
                  <View
                    style={{
                      width: getSize.Width - getSize.scale(32),
                      height: getSize.Width / 2,
                    }}>
                    {!isWearr && (
                      <ImageBackground
                        style={{
                          flex: 1,
                          resizeMode: 'contain',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          padding: getSize.scale(16),
                        }}
                        source={{uri: 'ic_home_frame'}}>
                        <View
                          style={{
                            flex: 1,
                            marginLeft: getSize.scale(16),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{uri: 'ic_shoe_das'}}
                            style={{
                              width: '60%',
                              height: '60%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      </ImageBackground>
                    )}
                    {isWearr && (
                      <ImageBackground
                        style={{
                          flex: 1,
                          resizeMode: 'contain',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          padding: getSize.scale(16),
                        }}
                        source={{uri: 'ic_home_frame'}}>
                        <View style={{flex: 1}}>
                          <Image
                            style={{
                              width: getSize.scale(176),
                              height: getSize.scale(176),
                              resizeMode: 'contain',
                            }}
                            source={{uri: ShoeWeared.img}}
                          />
                        </View>
                        <View style={{flex: 1, marginLeft: getSize.scale(16)}}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderRadius: 20,
                              marginHorizontal: getSize.scale(16),
                              marginVertical: getSize.scale(8),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#0974F1',
                              borderColor: '#1A5BA8',
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: getSize.scale(16),
                                padding: getSize.scale(4),
                              }}>
                              # {ShoeWeared.readableId}
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderRadius: 20,
                              marginHorizontal: getSize.scale(16),
                              marginVertical: getSize.scale(8),
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              width: '50%',
                              backgroundColor: 'rgba(167, 155, 191, 0.2)',
                              borderColor: '#A79BBF',
                            }}>
                            <View
                              style={{
                                borderRadius: 20,
                                borderWidth: 1,
                                paddingHorizontal: getSize.scale(8),
                                backgroundColor: '#F44369',
                                borderColor: '#F44369',
                                margin: 1,
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontWeight: 'bold',
                                }}>
                                {ShoeWeared.energy}/2
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderRadius: 20,
                              marginHorizontal: getSize.scale(16),
                              marginVertical: getSize.scale(8),
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '30%',
                              borderColor: '#A79BBF',
                            }}>
                            <Text
                              style={{
                                color: '#A79BBF',
                                fontWeight: 'bold',
                              }}>
                              Lv 0
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>
                    )}
                    {isWearr && (
                      <View
                        style={{
                          position: 'absolute',
                          top: getSize.scale(-16),
                          marginHorizontal: getSize.scale(32),
                          borderWidth: 1,
                          borderRadius: 20,
                          borderColor: '#A79BBF',
                          paddingHorizontal: getSize.scale(16),
                          paddingVertical: getSize.scale(4),
                          backgroundColor: Colors.WHITE,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontSize: getSize.scale(14),
                            fontWeight: 'bold',
                          }}>
                          {ShoeWeared.name}
                        </Text>
                        <Image
                          style={{width: 16, height: 16, resizeMode: 'contain'}}
                          source={{uri: 'ic_ray'}}
                        />
                        <Image
                          style={{width: 16, height: 16, resizeMode: 'contain'}}
                          source={{uri: 'ic_ray'}}
                        />
                        <Image
                          style={{width: 16, height: 16, resizeMode: 'contain'}}
                          source={{uri: 'ic_ray'}}
                        />
                      </View>
                    )}
                  </View>
                </Tooltip>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: getSize.scale(16),
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              {datashoes &&
                datashoes.map((item, index) => {
                  if (item.readableId || item.readableId == 0) {
                    return (
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <ImageBackground
                          style={{
                            width: getSize.scale(80),
                            height: getSize.scale(98),
                            borderRadius: getSize.scale(17),
                            resizeMode: 'contain',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          source={{uri: 'ic_chest_slot'}}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setmodalTransfer(item.readableId)
                            }>
                            {/* <Text
                                        style={{
                                            fontSize: getSize.scale(14),
                                            fontWeight: 'bold',
                                            color: '#A79BBF',
                                            padding: getSize.scale(8),
                                            textAlign: 'center'
                                        }}>
                                        None
                                    </Text> */}
                            <Image
                              source={{uri: item.img}}
                              style={{
                                width: getSize.scale(80),
                                height: getSize.scale(80),
                                resizeMode: 'contain',
                              }}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={modalBuy === item.readableId}
                          // onRequestClose={() => setmodalBuy(!modalBuy)}
                        >
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <View
                              style={{
                                flex: 1,
                                height: '100%',
                                width: '100%',
                                top: 0,
                                position: 'absolute',
                                backgroundColor: '#0000007f',
                                // zIndex: 11
                              }}></View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  height: getSize.Height / 1.5,
                                  width: getSize.Width - getSize.scale(45),

                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    // flex: 20,
                                    flex: 0.4,
                                    width: '100%',
                                    paddingHorizontal: getSize.scale(16),
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ffffff',
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    shadowColor: '#000',

                                    shadowOffset: {
                                      width: 0,
                                      height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        // height: 40
                                      }}>
                                      <View
                                        style={{
                                          // flexDirection: '',
                                          // borderWidth: 1,
                                          justifyContent: 'flex-start',
                                          alignItems: 'flex-start',
                                          borderRadius: 20,

                                          // padding: getSize.scale(2),
                                          // borderColor: item.color,
                                          width: '100%',
                                          marginVertical: getSize.scale(20),
                                        }}>
                                        <TextInput
                                          onChangeText={itemValue =>
                                            this.onChangeText(
                                              'price',
                                              itemValue,
                                            )
                                          }
                                          value={price}
                                          style={{
                                            height: 45,
                                            width: '100%',
                                            marginTop: 10,
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            paddingHorizontal: 10,
                                            borderColor: '#000000',
                                            borderWidth: 1,
                                            borderBottomWidth: 3,
                                            borderRightWidth: 3,
                                            color: '#000000',
                                          }}
                                        />
                                      </View>
                                    </View>
                                  </View>

                                  {isPutShoe && (
                                    <View
                                      style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <ActivityIndicator
                                        size="large"
                                        color="#F44369"
                                      />
                                    </View>
                                  )}
                                  <View
                                    style={{
                                      // flex: 1,
                                      alignItems: 'flex-end',
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.putShoe(!item.isSelling, item._id);
                                      }}
                                      style={{
                                        width: getSize.Width / 1.3,
                                        marginHorizontal: getSize.scale(16),
                                        paddingVertical: getSize.scale(6),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      <Image
                                        style={{width: '100%', height: 44}}
                                        source={{uri: 'ic_btn_confirm_long'}}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    // flex: 2,
                                    width: '100%',
                                    // height: 120,
                                    // backgroundColor: "#ffffff",
                                    paddingVertical: 16,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',

                                    paddingHorizontal: getSize.scale(16),
                                    // marginTop: 20
                                  }}>
                                  <View
                                    style={{
                                      // flex: 1.5,
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                    }}>
                                    <View
                                      style={
                                        {
                                          // flex: 1
                                        }
                                      }>
                                      <TouchableOpacity
                                        onPress={() => {
                                          // setmodalTransfer(!modalTransfer);
                                          return this.setmodalBuy(
                                            item.readableId,
                                          );
                                        }}
                                        style={{
                                          width: getSize.Width / 3,
                                          marginHorizontal: getSize.scale(16),
                                          paddingVertical: getSize.scale(6),
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          // borderRadius: 20,
                                          // borderWidth: 1,
                                          // borderBottomWidth: 3,
                                          // borderRightWidth: 3,
                                          // backgroundColor: Colors.WHITE
                                        }}>
                                        <Image
                                          style={{
                                            width: 30,
                                            height: 30,
                                            resizeMode: 'contain',
                                          }}
                                          source={{uri: 'ic_close_red'}}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </Modal>
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={modalTransfer === item.readableId}
                          onRequestClose={() =>
                            this.setmodalTransfer(item.readableId)
                          }>
                          <View
                            style={{
                              height: '100%',
                              width: '100%',
                              top: 0,
                              position: 'absolute',
                              backgroundColor: '#000000bf',
                            }}></View>
                          <TouchableOpacity
                            // onPress={() => setmodalTransfer(!modalTransfer)}
                            activeOpacity={1}
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                justifyContent: 'center',
                                width: getSize.Width - getSize.scale(64),
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
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 4,
                                  elevation: 5,
                                }}>
                                {isPutShoe && (
                                  <View
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      position: 'absolute',
                                      top: 0,
                                      zIndex: 111,
                                      // backgroundColor: "#0000004e"
                                    }}>
                                    <ActivityIndicator
                                      size="large"
                                      color="#F44369"
                                    />
                                  </View>
                                )}
                                {isshoesIdWear && (
                                  <View
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      position: 'absolute',
                                      top: 0,
                                      zIndex: 111,
                                      // backgroundColor: "#0000004e"
                                    }}>
                                    <ActivityIndicator
                                      size="large"
                                      color="#F44369"
                                    />
                                  </View>
                                )}
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    style={{
                                      height: getSize.Width / 1.8,
                                      width:
                                        getSize.Width - getSize.Width * 0.1,
                                      resizeMode: 'contain',
                                      marginVertical: getSize.scale(8),
                                    }}
                                    source={{
                                      uri: item.img, // item.img
                                    }}
                                  />
                                  <View
                                    style={{
                                      justifyContent: 'center',
                                      flexDirection: 'row',
                                    }}>
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderRadius: 20,
                                        marginVertical: getSize.scale(8),
                                        marginRight: getSize.scale(8),
                                        paddingVertical: getSize.scale(4),
                                        paddingHorizontal: getSize.scale(32),
                                        backgroundColor: 'rgba(9, 116, 241, 1)',
                                      }}>
                                      <Text
                                        style={{
                                          color: '#fff',
                                          fontWeight: 'bold',
                                          fontSize: getSize.scale(14),
                                        }}>
                                        {`# ${item.readableId}`}
                                      </Text>
                                    </View>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: getSize.scale(8),
                                  }}>
                                  <View style={{flex: 1}}>
                                    <Text
                                      style={{
                                        color: '#767676',
                                        fontStyle: 'italic',
                                      }}>
                                      Class
                                    </Text>
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderRadius: 20,
                                        marginVertical: getSize.scale(8),
                                        marginRight: getSize.scale(8),
                                        paddingVertical: getSize.scale(4),
                                      }}>
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontWeight: 'bold',
                                          fontSize: getSize.scale(14),
                                        }}>
                                        {item.class}
                                      </Text>
                                    </View>
                                  </View>

                                  <View style={{flex: 1}}>
                                    <Text
                                      style={{
                                        color: '#767676',
                                        fontStyle: 'italic',
                                      }}>
                                      Rarity
                                    </Text>
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderRadius: 20,
                                        marginVertical: getSize.scale(8),
                                        marginRight: getSize.scale(8),
                                        paddingVertical: getSize.scale(4),
                                      }}>
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontWeight: 'bold',
                                          fontSize: getSize.scale(13),
                                        }}>
                                        {item.quality}
                                      </Text>
                                    </View>
                                  </View>

                                  <View style={{flex: 1}}>
                                    <Text
                                      style={{
                                        color: '#767676',
                                        fontStyle: 'italic',
                                      }}>
                                      Energy
                                    </Text>
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderRadius: 20,
                                        marginVertical: getSize.scale(8),
                                        marginRight: getSize.scale(8),
                                        paddingVertical: getSize.scale(4),
                                      }}>
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontWeight: 'bold',
                                          fontSize: getSize.scale(14),
                                        }}>
                                        {`${item.energy}`}
                                      </Text>
                                    </View>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    marginTop: getSize.scale(8),
                                  }}>
                                  {/* <Text
                                    style={{
                                        color: '#767676',
                                        fontStyle: 'italic'
                                    }}>
                                    Item
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderWidth: 0.5,
                                                borderRadius: 20,
                                                marginVertical: getSize.scale(8),
                                                marginRight: getSize.scale(8),
                                                paddingVertical: getSize.scale(4)
                                            }}>
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    fontSize: getSize.scale(12)
                                                }}>
                                                {`Shoelace`}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderWidth: 0.5,
                                                borderRadius: 20,
                                                marginVertical: getSize.scale(8),
                                                marginRight: getSize.scale(8),
                                                paddingVertical: getSize.scale(4)
                                            }}>
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    fontSize: getSize.scale(12)
                                                }}>
                                                {`Led Light`}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderWidth: 0.5,
                                                borderRadius: 20,
                                                marginVertical: getSize.scale(8),
                                                marginRight: getSize.scale(8),
                                                paddingVertical: getSize.scale(4)
                                            }}>
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    fontSize: getSize.scale(12)
                                                }}>
                                                {`Martens`}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderWidth: 0.5,
                                                borderRadius: 20,
                                                marginVertical: getSize.scale(8),
                                                marginRight: getSize.scale(8),
                                                paddingVertical: getSize.scale(4)
                                            }}>
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    fontSize: getSize.scale(12)
                                                }}>
                                                {`Back wire`}
                                            </Text>
                                        </View>
                                    </View>
                                </View> */}
                                </View>

                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: getSize.scale(16),
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View style={{flex: 1}} />
                                    <View
                                      style={{
                                        flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: getSize.scale(18),
                                          fontStyle: 'italic',
                                          fontWeight: 'bold',
                                        }}>
                                        Attributes
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: getSize.scale(12),
                                          fontStyle: 'italic',
                                          fontWeight: 'bold',
                                          color: 'rgba(118, 118, 118, 1)',
                                        }}>
                                        Base
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      height: getSize.scale(96),
                                      padding: getSize.scale(16),
                                      borderRadius: getSize.scale(16),
                                      marginVertical: getSize.scale(8),
                                      borderWidth: 1,
                                      borderColor: 'rgba(217, 215, 222, 1)',
                                      shadowColor: '#000',
                                      shadowOffset: {
                                        width: 0,
                                        height: 0,
                                      },
                                      shadowOpacity: 0.5,
                                      shadowRadius: 9,
                                      elevation: 2,
                                      overflow: 'hidden',
                                    }}>
                                    <View
                                      style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                      }}>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: getSize.scale(12),
                                            fontStyle: 'italic',
                                            color: 'rgba(44, 44, 44, 1)',
                                          }}>
                                          Speed
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: 'flex-end',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: getSize.scale(12),
                                            fontWeight: 'bold',
                                            color: 'rgba(44, 44, 44, 1)',
                                          }}>
                                          {constShoe.SPEED_RANGE &&
                                            `${
                                              constShoe.SPEED_RANGE[
                                                item.quality
                                              ].min
                                            } - ${
                                              constShoe.SPEED_RANGE[
                                                item.quality
                                              ].max
                                            } km/h`}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                      }}>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: getSize.scale(12),
                                            fontStyle: 'italic',
                                            color: 'rgba(44, 44, 44, 1)',
                                          }}>
                                          Durability
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: 'flex-end',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: getSize.scale(12),
                                            fontWeight: 'bold',
                                            color: 'rgba(44, 44, 44, 1)',
                                          }}>
                                          {`${item.energy}`}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                      }}>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: getSize.scale(12),
                                            fontStyle: 'italic',
                                            color: 'rgba(44, 44, 44, 1)',
                                          }}>
                                          Luck
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: 'flex-end',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: getSize.scale(12),
                                            fontWeight: 'bold',
                                            color: 'rgba(244, 67, 105, 1)',
                                          }}>
                                          {constShoe.LUCK &&
                                            `${constShoe.LUCK[item.quality]}`}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    justifyContent: 'center',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <TouchableOpacity
                                    disabled={item.isWearing || item.isSelling}
                                    style={{
                                      width: getSize.Width * 0.7,
                                      opacity: item.isSelling ? 0.5 : 1,
                                      // marginHorizontal: getSize.scale(16),
                                      paddingVertical: getSize.scale(6),
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 20,
                                      borderColor: '#888888',
                                      opacity:
                                        item.isWearing || item.isSelling
                                          ? 0.5
                                          : 1,
                                      borderWidth: 1,
                                      borderBottomWidth: 2,
                                      borderRightWidth: 2,
                                      backgroundColor: '#F44369',
                                    }}
                                    onPress={() => this.shoesIdWear(item._id)}>
                                    {/* <Image
                                        style={{
                                            width: getSize.Width,
                                            height: getSize.scale(45),
                                            resizeMode: 'contain'
                                        }}
                                        source={{
                                            uri: 'ic_btn_confirm_long'
                                        }}
                                    /> */}
                                    <Text
                                      style={{
                                        fontStyle: 'italic',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                      }}>
                                      USE
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: getSize.scale(16),
                                    marginVertical: getSize.scale(10),
                                    // backgroundColor: "red"
                                  }}>
                                  <TouchableOpacity
                                    disabled={item.isSelling ? true : false}
                                    onPress={() => {
                                      this.setmodalBuy(item.readableId);
                                    }}
                                    style={{
                                      width: getSize.Width * 0.3,
                                      opacity: item.isSelling ? 0.5 : 1,
                                      // marginHorizontal: getSize.scale(16),
                                      paddingVertical: getSize.scale(6),
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 20,
                                      borderColor: '#888888',

                                      borderWidth: 1,
                                      borderBottomWidth: 2,
                                      borderRightWidth: 2,
                                      backgroundColor: '#F44369',
                                    }}>
                                    {/* <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontStyle: 'italic',
                                                                        fontWeight: 'bold',
                                                                        color: '#000'
                                                                    }}>
                                                                    CONFIRM
                                                                </Text> */}
                                    {/* <Image style={{ width: "100%", height: 44 }} source={{ uri: "ic_btn_confirm_long" }} /> */}
                                    <Text
                                      style={{
                                        fontStyle: 'italic',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                      }}>
                                      Sell
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    disabled={item.isSelling ? false : true}
                                    onPress={() => {
                                      this.putShoe(!item.isSelling, item._id);
                                    }}
                                    style={{
                                      width: getSize.Width * 0.3,
                                      // marginHorizontal: getSize.scale(16),
                                      opacity: item.isSelling ? 1 : 0.5,
                                      paddingVertical: getSize.scale(6),
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 20,
                                      borderColor: '#888888',

                                      borderWidth: 1,
                                      borderBottomWidth: 2,
                                      borderRightWidth: 2,
                                      backgroundColor: '#F44369',
                                    }}>
                                    {/* <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontStyle: 'italic',
                                                                        fontWeight: 'bold',
                                                                        color: '#000'
                                                                    }}>
                                                                    CONFIRM
                                                                </Text> */}
                                    {/* <Image style={{ width: "100%", height: 44 }} source={{ uri: "ic_btn_confirm_long" }} /> */}
                                    <Text
                                      style={{
                                        fontStyle: 'italic',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                      }}>
                                      UnSell
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginTop: getSize.scale(16),
                                }}>
                                <TouchableOpacity
                                  onPress={() => this.setmodalTransfer('')}>
                                  <Image
                                    style={{
                                      width: getSize.scale(32),
                                      height: getSize.scale(32),
                                      resizeMode: 'contain',
                                    }}
                                    source={{
                                      uri: 'ic_close_red',
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </Modal>
                      </View>
                    );
                  } else {
                    return (
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <ImageBackground
                          style={{
                            width: getSize.scale(80),
                            height: getSize.scale(98),
                            borderRadius: getSize.scale(17),
                            resizeMode: 'contain',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          source={{uri: 'ic_chest_slot'}}>
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontSize: getSize.scale(14),
                                fontWeight: 'bold',
                                color: '#A79BBF',
                                padding: getSize.scale(8),
                                textAlign: 'center',
                              }}>
                              None
                            </Text>
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    );
                  }
                })}
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <View style={{flex: 1, zIndex: 1}}>
                <Tooltip
                  isVisible={this.state.toolTipStart}
                  content={
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: getSize.scale(14),
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}>
                        STEP 2/5
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          padding: getSize.scale(16),
                        }}>
                        <Text
                          style={{
                            marginTop: getSize.scale(18),
                            textAlign: 'center',
                            fontSize: getSize.scale(14),
                          }}>
                          Start walking, jogging or running outdoor and make
                          token earnings
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'space-evenly',
                          flexDirection: 'row',
                          paddingBottom: getSize.scale(16),
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({toolTipStart: false});
                            this.setKeyIsShowModalInstruction();
                          }}
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: getSize.scale(100),
                              height: getSize.scale(40),
                              borderRadius: 20,
                              overflow: 'hidden',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'rgba(89, 89, 89, 0.6)',
                              borderWidth: 1,
                              borderColor: 'rgba(89, 89, 89, 0.1)',
                              elevation: 4,
                              shadowColor: 'rgba(89, 89, 89, 0.3)', // "rgba(52, 52, 52, alpha)", //trong suốt
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                fontSize: getSize.scale(18),
                              }}>
                              SKIP
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              toolTipStart: false,
                              toolTipSneaker: true,
                            });
                            this.setKeyIsShowModalInstruction();
                          }}
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: getSize.scale(100),
                              height: getSize.scale(40),
                              borderRadius: 20,
                              overflow: 'hidden',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'rgba(244, 67, 105, 1)',
                              borderWidth: 1,
                              borderColor: 'rgba(244, 67, 105, 0.3)',
                              elevation: 4,
                              shadowColor: 'rgba(89, 89, 89, 0.3)', // "rgba(52, 52, 52, alpha)", //trong suốt
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                fontSize: getSize.scale(18),
                              }}>
                              NEXT
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                  placement="top">
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    disabled={this.state.toolTipStart}
                    onPress={() => {
                      if (shoeCurrentWear?._id) {
                        ApiServices.getShoesById(shoeCurrentWear?._id)
                          .then(res => {
                            if (res.code === 200) {
                              const shoe = res?.data;
                              if (shoe?.energy > 0) {
                                action.changeScreenState({
                                  ...screenState,
                                  isStateCountDown: true,
                                });
                                navigation.navigate(stackNavigator.COUNT_DOWN);
                              } else {
                                Toast.showWithGravity(
                                  'The energy was exhausted. Please select another shoe',
                                  Toast.LONG,
                                  Toast.CENTER,
                                );
                              }
                            }
                            if (res.code === 404) {
                              alert(res.message);
                            }
                          })
                          .catch(err => {
                            Toast.showWithGravity(
                              err?.message,
                              Toast.LONG,
                              Toast.CENTER,
                            );
                          });
                      } else {
                        Toast.showWithGravity(
                          'Please select one of your shoes',
                          Toast.LONG,
                          Toast.CENTER,
                        );
                      }
                    }}>
                    <Image
                      style={{
                        width: getSize.scale(193),
                        height: getSize.scale(58),
                        resizeMode: 'contain',
                      }}
                      source={{uri: 'ic_btn_start_red'}}
                    />
                  </TouchableOpacity>
                </Tooltip>
              </View>

              <View
                style={{
                  flex: 3,
                  marginTop: getSize.scale(-64),
                  justifyContent: 'space-between',
                  marginHorizontal: getSize.scale(16),
                  flexDirection: 'row',
                  zIndex: -1,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: getSize.scale(34),
                        height: getSize.scale(34),
                        resizeMode: 'contain',
                      }}
                      source={{uri: 'ic_mail'}}
                    />
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginLeft: getSize.scale(4),
                      }}>
                      <Text
                        style={{
                          backgroundColor: '#A79BBF',
                          color: '#fff',
                          fontStyle: 'italic',
                          fontWeight: 'bold',
                          fontSize: getSize.scale(10),
                          padding: getSize.scale(4),
                        }}>
                        Feedback
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: getSize.scale(34),
                        height: getSize.scale(34),
                        resizeMode: 'contain',
                      }}
                      source={{uri: 'ic_cmm'}}
                    />
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginLeft: getSize.scale(4),
                      }}>
                      <Text
                        style={{
                          backgroundColor: '#A79BBF',
                          color: '#fff',
                          fontStyle: 'italic',
                          fontWeight: 'bold',
                          fontSize: getSize.scale(10),
                          padding: getSize.scale(4),
                        }}>
                        FAQ
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: getSize.scale(34),
                        height: getSize.scale(34),
                        resizeMode: 'contain',
                      }}
                      source={{uri: 'ic_question'}}
                    />
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginLeft: getSize.scale(4),
                      }}>
                      <Text
                        style={{
                          backgroundColor: '#A79BBF',
                          color: '#fff',
                          fontStyle: 'italic',
                          fontWeight: 'bold',
                          fontSize: getSize.scale(10),
                          padding: getSize.scale(4),
                        }}>
                        About
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isShowModalInstruction && (
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => this.setState({modalVisible: false})}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(89, 89, 89, 0.6)',
                }}>
                <View
                  style={{
                    width: getSize.Width - getSize.scale(48),
                    height: getSize.Width / 1.5,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: getSize.scale(14),
                        position: 'absolute',
                        top: getSize.scale(8),
                        right: getSize.scale(16),
                      }}>
                      STEP 1/5
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        padding: getSize.scale(32),
                      }}>
                      <Text
                        style={{
                          marginTop: getSize.scale(16),
                          textAlign: 'center',
                          fontSize: getSize.scale(18),
                          fontWeight: 'bold',
                        }}>
                        WELCOME TO MOVEARN
                      </Text>
                      <Text
                        style={{
                          marginTop: getSize.scale(18),
                          textAlign: 'center',
                          fontSize: getSize.scale(14),
                        }}>
                        MOVEARN is a digital platform through which users can
                        generate real-world financial and community values by
                        gamifying personal fitness & traveling experience
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            modalVisible: false,
                            toolTipStart: false,
                          });
                          this.setKeyIsShowModalInstruction();
                        }}
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: getSize.scale(100),
                            height: getSize.scale(40),
                            borderRadius: 20,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(89, 89, 89, 0.6)',
                            borderWidth: 1,
                            borderColor: 'rgba(89, 89, 89, 0.1)',
                            elevation: 4,
                            shadowColor: 'rgba(89, 89, 89, 0.3)',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontStyle: 'italic',
                              fontWeight: 'bold',
                              fontSize: getSize.scale(18),
                            }}>
                            SKIP
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            modalVisible: false,
                            toolTipStart: true,
                          });
                          this.setKeyIsShowModalInstruction();
                        }}
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: getSize.scale(100),
                            height: getSize.scale(40),
                            borderRadius: 20,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(244, 67, 105, 1)',
                            borderWidth: 1,
                            borderColor: 'rgba(244, 67, 105, 0.3)',
                            elevation: 4,
                            shadowColor: 'rgba(89, 89, 89, 0.3)', // "rgba(52, 52, 52, alpha)", //trong suốt
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontStyle: 'italic',
                              fontWeight: 'bold',
                              fontSize: getSize.scale(18),
                            }}>
                            NEXT
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isSignIn: state.initReducer.isSignIn,
  screenState: state.initReducer.screenState,
  getUser: state.initReducer.getUser,
  shoes: state.initReducer.shoes,
  getShoesId: state.initReducer.getShoesId,
  userId: state.initReducer.userId,
  user: state.initReducer.user,
  getConstShoe: state.initReducer.getConstShoe,
  shoeCurrentWear: state.initReducer.shoeCurrentWear,
  putShoesId: state.initReducer.putShoesId,
  shoesIdWear: state.initReducer.shoesIdWear,
});
const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(_action, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
// export default TabHome;
