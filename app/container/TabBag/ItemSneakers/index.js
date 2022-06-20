import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Modal,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {getSize, Colors} from '../../../common';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {stackNavigator} from '../../../navigation/nameNavigator';
import * as _action from '../../../redux/action/ActionHandle';
import {Button} from '@rneui/base';

export default forwardRef(function ItemSneakers(
  {
    item,
    index,
    price,
    onChangeText,
    putShoe,
    isPutShoe,
    shoesIdWear,
    isshoesIdWear,
    constShoe,
    sellShoe,
    unSellShoe,
  },
  ref,
) {
  const navigation = useNavigation();
  const selector = useSelector(state => ({
    shoes: state.initReducer.shoes,
  }));

  const dispatch = useDispatch();
  const [modalBuy, setmodalBuy] = useState(false);
  const [modalPrice, setModalPrice] = useState(false);
  const [priceTxt, setPriceTxt] = useState('');

  const [modalTransfer, setmodalTransfer] = useState(false);
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    ClosemodalTransfer: () => {
      ClosemodalTransfer();
    },
    ClosemodalmodalBuy: () => {
      ClosemodalmodalBuy();
    },
  }));
  const ClosemodalmodalBuy = () => {
    setmodalBuy(false);
  };
  const ClosemodalTransfer = () => {
    setmodalTransfer(false);
  };
  useEffect(() => {
    return () => {
      if (selector.shoes.isSuccess) {
        setmodalTransfer(false);
        setmodalBuy(false);
        console.log(modalTransfer);
      }
    };
  }, [selector.shoes]);
  const image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogMFHOw0CKtwUvuJmhgcSi18GmfqlCxUI6g&usqp=CAU';
  const imageSneakers =
    'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg';

  return (
    <View
      key={index}
      style={{
        width: getSize.Width / 2.09,
        marginTop: index === 0 || index === 1 ? getSize.scale(16) : 0,
        marginVertical: getSize.scale(32),
      }}>
      <ImageBackground
        source={{uri: 'ic_item_list_bag'}}
        style={{
          width: '100%',
          height: getSize.scale(300),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '70%',
              position: 'relative',
            }}>
            <ImageBackground
              source={{uri: 'ic_head_frame_shoe'}}
              style={{
                width: '100%',
                height: getSize.scale(30),
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: getSize.scale(-12),
              }}>
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: getSize.scale(12),
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      color: '#2C2C2C',
                    }}>
                    {item.class ? item.class : 'none'}
                  </Text>
                  <View
                    style={{
                      marginLeft: getSize.scale(5),
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{uri: 'ic_ray'}}
                      style={{
                        width: getSize.scale(12),
                        height: getSize.scale(12),
                        resizeMode: 'contain',
                      }}
                    />
                    <Image
                      source={{uri: 'ic_ray'}}
                      style={{
                        width: getSize.scale(12),
                        height: getSize.scale(12),
                        resizeMode: 'contain',
                      }}
                    />
                    <Image
                      source={{uri: 'ic_ray'}}
                      style={{
                        width: getSize.scale(12),
                        height: getSize.scale(12),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>

            <View style={{flex: 6}}>
              <TouchableOpacity
                onPress={() => setmodalTransfer(!modalTransfer)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.img && item.img}}
                  style={{
                    flex: 7,
                    width: getSize.scale(136),
                    height: getSize.scale(136),
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor: 'rgba(26, 91, 168, 1)',
                      paddingHorizontal: getSize.scale(8),
                      paddingVertical: getSize.scale(2),
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: getSize.scale(2),
                        fontSize: getSize.scale(12),
                      }}>
                      {`# ${item.readableId && item.readableId}`}
                    </Text>
                  </View>
                </View>

                {[
                  {title: 'Energy', value: item.energy && item.energy},
                  {
                    title: 'Speed',
                    value: `${constShoe.SPEED_RANGE[item.quality].min} - ${
                      constShoe.SPEED_RANGE[item.quality].max
                    } km/h`,
                  },
                  {title: 'Luck', value: `${constShoe.LUCK[item.quality]}`},
                  {title: 'Durability', value: 40},
                ].map((i, index) => (
                  <View
                    key={index}
                    style={{
                      width: '85%',
                      paddingHorizontal: getSize.scale(16),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: getSize.scale(2),
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: 'rgba(44, 44, 44, 1)',
                          fontStyle: 'italic',
                          fontSize: getSize.scale(10),
                        }}>
                        {i.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: getSize.scale(10),
                          fontWeight: 'bold',
                        }}>
                        {i.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </TouchableOpacity>
            </View>

            <View style={{flex: 0.3}} />
          </View>
        </View>
      </ImageBackground>
      {/* Switch popup details */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalBuy}
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
            }}>
            {/* <TouchableOpacity
                        // onPress={() => setmodalBuy(!modalBuy)}
                        style={{
                            height: "100%",
                            width: '100%',
                        }}>

                    </TouchableOpacity> */}
          </View>

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
                          onChangeText('price', itemValue)
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
                    <ActivityIndicator size="large" color="#F44369" />
                  </View>
                )}
                <View
                  style={{
                    // flex: 1,
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // item._id && putShoe(!item.isSelling, item._id)
                      sellShoe(item?._id, priceTxt);
                      setModalPrice(!modalPrice);
                      setmodalBuy(false);
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
                        return setmodalBuy(!modalBuy);
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
        visible={modalTransfer}
        onRequestClose={() => setmodalTransfer(!modalTransfer)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            top: 0,
            position: 'absolute',
            backgroundColor: '#000000bf',
          }}></View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalPrice}
          onRequestClose={() => setModalPrice(!modalPrice)}>
          <View
            style={{
              height: '100%',
              width: '100%',
              top: 0,
              position: 'absolute',
              backgroundColor: '#000000bf',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '80%',
                height: 150,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={text => setPriceTxt(text)}
                value={priceTxt}
                style={{
                  padding: 5,
                  height: 40,
                  borderRadius: 8,
                  borderColor: '#565874',
                  borderWidth: 1,
                  width: '90%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '90%',
                  marginTop: 15,
                }}>
                <Button
                  onPress={() => setModalPrice(!modalPrice)}
                  buttonStyle={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 20,
                    width: 100,
                  }}
                  title="Cancel"
                  titleStyle={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                />
                <Button
                  buttonStyle={{
                    backgroundColor: '#3EF1F2',
                    borderRadius: 20,
                    width: 100,
                  }}
                  onPress={() => {
                    sellShoe(item?._id, priceTxt);
                    setModalPrice(!modalPrice);
                    setmodalBuy(false);
                  }}
                  disabled={priceTxt.length ? false : true}
                  title="Confirm"
                  titleStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
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
                  <ActivityIndicator size="large" color="#F44369" />
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
                  <ActivityIndicator size="large" color="#F44369" />
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
                    width: getSize.Width - getSize.Width * 0.1,
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
                        {`${constShoe.SPEED_RANGE[item.quality].min} - ${
                          constShoe.SPEED_RANGE[item.quality].max
                        }`}{' '}
                        km/h
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
                        {`${constShoe.LUCK[item.quality]}`}
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
                    opacity: item.isWearing || item.isSelling ? 0.5 : 1,
                    borderWidth: 1,
                    borderBottomWidth: 2,
                    borderRightWidth: 2,
                    backgroundColor: '#F44369',
                  }}
                  onPress={() => item._id && shoesIdWear(item._id)}>
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
                    setModalPrice(true);
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
                    unSellShoe(item?._id);
                    setmodalTransfer(false);
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
                onPress={() => setmodalTransfer(!modalTransfer)}>
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: getSize.scale(16),
    marginVertical: getSize.moderateScale(8),
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    resizeMode: 'cover',
    overflow: 'hidden',
    // android
    elevation: 3,
    // ios
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: 'row',
  },
});
