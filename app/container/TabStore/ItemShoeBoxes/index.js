import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Modal,
  Platform,
  TextInput
} from 'react-native';
import {getSize, Colors} from '../../../common';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {stackNavigator} from '../../../navigation/nameNavigator';
import * as _action from '../../../redux/action/ActionHandle';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Button } from '@rneui/base';

export default function ItemShoeBoxes({item, index, buyItem}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalBuy, setmodalBuy] = useState(false);
  const [modalTransfer, setmodalTransfer] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(false);
  const [quantity, setQuantity] = useState('');

  const image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogMFHOw0CKtwUvuJmhgcSi18GmfqlCxUI6g&usqp=CAU';
  const imageSneakers =
    'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg';

  return (
    <View
      key={index}
      style={{
        width: getSize.Width / 2.09,
        height: getSize.Width / 1.5,
        // paddingHorizontal: getSize.scale(8),
        paddingTop: index === 0 || index === 1 ? getSize.scale(8) : 0,
        marginVertical: getSize.scale(4),
        marginBottom: getSize.scale(32),
      }}>
      <ImageBackground
        source={{uri: 'ic_frame_shoe1'}}
        style={{
          width: '100%',
          height: getSize.scale(280),
          flexDirection: 'row',
          alignItems: 'center',
          // paddingHorizontal: 4
        }}>
        <View
          style={{
            flex: 1,
            // borderWidth: 2,
            // borderRadius: 20,
            // overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              // borderWidth: 2,
              borderRadius: 20,
              // overflow: 'hidden',
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
                marginTop: getSize.scale(-10),
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
                    {item.classify}
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
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalQuantity}
              onRequestClose={() => setModalQuantity(false)}>
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
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      marginBottom: 10,
                    }}>
                    Quantity
                  </Text>
                  <TextInput
                    placeholder="Quantity"
                    keyboardType="numeric"
                    onChangeText={text => setQuantity(text)}
                    value={quantity}
                    style={{
                      padding: 5,
                      height: 40,
                      borderRadius: 8,
                      borderColor: '#565874',
                      borderWidth: 1,
                      width: '100%',
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
                      onPress={() => setModalQuantity(!modalQuantity)}
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
                        setModalQuantity(!modalQuantity);
                        buyItem(item?._id, quantity);
                      }}
                      disabled={quantity.length ? false : true}
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
            <View style={{flex: 6}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: 'ic_git'}}
                  style={{
                    flex: 8,
                    width: getSize.scale(98),
                    height: getSize.scale(109),
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
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
                      numberOfLines={1}
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: getSize.scale(2),
                        fontSize: getSize.scale(12),
                      }}>
                      {`# ${item._id}`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1.5, width: '100%'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    marginRight: getSize.scale(8),
                  }}>
                  <Text
                    style={{
                      color: '#2C2C2C',
                      fontWeight: 'bold',
                      fontSize: getSize.scale(12),
                    }}>
                    11.67 BNB
                  </Text>
                </View>
                <View style={{flex: 4}}>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalBuy}
                    onRequestClose={() => setmodalBuy(!modalBuy)}>
                    <View
                      style={{
                        // flex: 1,
                        height: '100%',
                        width: '100%',
                        top: 0,
                        position: 'absolute',
                        backgroundColor: '#0000007f',
                      }}>
                      <TouchableOpacity
                        onPress={() => setmodalBuy(!modalBuy)}
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden',
                        }}>
                        <Image
                          style={{
                            width: getSize.scale(20),
                            height: getSize.scale(20),
                            borderRadius: 50,
                            resizeMode: 'cover',
                          }}
                          source={{uri: 'ic_congrats_sneakers'}}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => setmodalBuy(!modalBuy)}
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
                            // flex: 20,
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
                            elevation: 2,
                          }}>
                          <View
                            style={{
                              // flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                textAlign: 'center',
                              }}>
                              BUY
                            </Text>
                          </View>
                          <View
                            style={{
                              // flex: 6,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                height: getSize.scale(150),
                                width: getSize.scale(150),
                                resizeMode: 'contain',
                              }}
                              source={{
                                uri: 'ic_git', // item.img
                              }}
                            />
                            <View
                              style={{
                                // flex: 3,
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                width: '100%',
                                height: getSize.scale(40),
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
                                  width: '45%',
                                }}>
                                <Text
                                  style={{
                                    color: '#767676',
                                    fontStyle: 'italic',
                                  }}>
                                  ID
                                </Text>
                                <ImageBackground
                                  source={{uri: 'ic_btn_id'}}
                                  style={{
                                    width: '100%',
                                    height: getSize.scale(35),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    // position: "absolute"
                                  }}>
                                  <View
                                    style={{
                                      // width: getSize.scale(15),
                                      // height: getSize.scale(15),
                                      // borderRadius: 50,
                                      // backgroundColor: item.color,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: getSize.scale(15),
                                      }}>
                                      #
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontWeight: 'bold',
                                      fontSize: getSize.scale(15),
                                      marginHorizontal: getSize.scale(4),
                                    }}>
                                    {item.shoesId}
                                  </Text>
                                </ImageBackground>
                              </View>
                              <View
                                style={{
                                  // flexDirection: 'row',
                                  // borderWidth: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  // borderRadius: 20,
                                  // flex: 0.5,
                                  // padding: getSize.scale(2),
                                  // borderColor: item.color,
                                  width: '50%',
                                  // backgroundColor: "red"
                                }}>
                                <Text
                                  style={{
                                    color: '#767676',
                                    fontStyle: 'italic',
                                  }}>
                                  Owner
                                </Text>
                                <View
                                  style={{
                                    // width: getSize.scale(15),
                                    // height: getSize.scale(15),
                                    // borderRadius: 50,
                                    // backgroundColor: item.color,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: getSize.scale(8),
                                  }}>
                                  <Text
                                    style={{
                                      color: '#2C2C2C',
                                      fontWeight: 'bold',
                                      fontSize: getSize.scale(15),
                                    }}>
                                    5pf04xvA...GPoWuY
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>

                          <View
                            style={{
                              // flex: 1
                              justifyContent: 'space-evenly',
                              alignItems: 'center',
                              // backgroundColor: Colors.GREEN,
                              width: '100%',
                              marginTop:
                                Platform.OS === 'android'
                                  ? getSize.scale(28)
                                  : getSize.scale(20),
                              borderRadius: 30,
                              borderWidth: 1,
                              borderBottomWidth: 2,
                              borderRightWidth: 2,
                              borderColor: '#F2F2F2',
                              height: getSize.scale(70),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {/* <Image
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    resizeMode: 'cover',
                                                                    borderRadius: 50
                                                                }}
                                                                source={{
                                                                    uri: image
                                                                }}
                                                            /> */}
                              <Text
                                style={{
                                  fontStyle: 'italic',
                                  fontWeight: '500',
                                  // marginHorizontal: getSize.scale(8)
                                }}>
                                {item.classify}
                              </Text>
                              <Text
                                style={{
                                  fontStyle: 'italic',
                                  fontWeight: 'bold',
                                  marginHorizontal: getSize.scale(8),
                                }}>
                                15
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontStyle: 'italic',
                                fontWeight: '500',
                              }}>
                              Move at{' '}
                              <Text
                                style={{
                                  fontStyle: 'italic',
                                  fontWeight: '500',
                                  color: '#F44369',
                                }}>
                                5 - 20 km/h{' '}
                              </Text>
                              to earn
                            </Text>
                          </View>

                          <View
                            style={{
                              // flex: 3.5,
                              justifyContent: 'space-evenly',
                              // alignItems: 'center',
                              // backgroundColor: Colors.GRAY238,
                              width: '100%',
                              marginTop: getSize.scale(16),
                              // borderRadius: 7,
                              // borderBottomWidth: 1,
                              // borderWidth: 1,
                              // borderRadius: 1,
                              // // borderStyle: "dashed",
                              // paddingBottom: 5,
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // backgroundColor: "red",
                                width: '100%',
                                // paddingHorizontal: getSize.scale(32)
                              }}>
                              <Text
                                style={{
                                  color: Colors.GREY_DARK,
                                  fontStyle: 'italic',
                                }}>
                                Type
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    fontStyle: 'italic',
                                    marginHorizontal: getSize.scale(4),
                                    textTransform: 'capitalize',
                                  }}>
                                  {item?.type?.split('_').join(' ')}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                // flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // backgroundColor: "red",
                                width: '100%',
                                // paddingHorizontal: getSize.scale(32)
                              }}>
                              <Text
                                style={{
                                  color: Colors.GREY_DARK,
                                  fontStyle: 'italic',
                                }}>
                                Quanity
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    fontStyle: 'italic',
                                    marginHorizontal: getSize.scale(4),
                                    textTransform: 'capitalize',
                                  }}>
                                  {item?.quantity}
                                </Text>
                              </View>
                            </View>
                            {/* <View
                              style={{
                                // flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // backgroundColor: "red",
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  color: Colors.GREY_DARK,
                                  fontStyle: 'italic',
                                }}>
                                Level
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    fontStyle: 'italic',
                                  }}>
                                  {item.level}
                                </Text>
                              </View>
                            </View> */}

                            {/* <View
                              style={{
                                // flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // backgroundColor: "red",
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  color: Colors.GREY_DARK,
                                  fontStyle: 'italic',
                                }}>
                                Durability
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    fontStyle: 'italic',
                                  }}>
                                  100/100
                                </Text>
                              </View>
                            </View> */}
                            {/* <View
                              style={{
                                // flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // backgroundColor: "red",
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  color: Colors.GREY_DARK,
                                  fontStyle: 'italic',
                                }}>
                                Shoe mint
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    fontStyle: 'italic',
                                  }}>
                                  {`${item.mint}/7`}
                                </Text>
                              </View>
                            </View> */}
                            <View
                              style={{
                                width: '100%',
                                height: 10,
                                // backgroundColor: "red",
                              }}>
                              <Image
                                source={{uri: 'ic_line'}}
                                style={{
                                  width: '100%',
                                  height: getSize.scale(5),
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            // flex: 2,
                            width: '100%',
                            // height: 120,
                            backgroundColor: '#ffffff',
                            paddingVertical: getSize.scale(16),
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
                            elevation: 2,
                            paddingHorizontal: getSize.scale(16),
                            marginTop: getSize.scale(20),
                          }}>
                          <View
                            style={{
                              // flex: 1,
                              // paddingTop: getSize.scale(8),
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',
                              paddingVertical: getSize.scale(5),
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: Colors.GREY_DARK,
                                  fontStyle: 'italic',
                                  fontWeight: '500',
                                }}>
                                Price
                              </Text>
                            </View>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  // fontStyle: 'italic',
                                  fontWeight: 'bold',
                                  color: '#F44369',
                                  fontSize: getSize.scale(20),
                                }}>
                                {`${item.price} MOV`}
                              </Text>
                            </View>
                          </View>
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
                                onPress={() => setmodalBuy(!modalBuy)}
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
                                    width: '100%',
                                    height: getSize.scale(37),
                                    resizeMode: 'contain',
                                  }}
                                  source={{
                                    uri: 'ic_btn_cancel_by',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                // flex: 1,
                                alignItems: 'flex-end',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setmodalBuy(!modalBuy);
                                  setTimeout(() => {
                                    setModalQuantity(true);
                                  }, 500);
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
                                  // backgroundColor: Colors.GREEN
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
                                <Image
                                  style={{
                                    width: '100%',
                                    height: getSize.scale(37),
                                  }}
                                  source={{
                                    uri: 'ic_btn_confirm_buy',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Modal>
                  <View
                    style={{
                      width: '100%',
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setmodalBuy(!modalBuy)}>
                      <Image
                        style={{
                          width: '100%',
                          height: getSize.scale(24),
                          resizeMode: 'contain',
                        }}
                        source={{uri: 'ic_btn_buy'}}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                                            onPress={() => setmodalBuy(!modalBuy)}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: '#000',
                                                borderRadius: 20,
                                                backgroundColor: '#33FF99',
                                                overflow: 'hidden'
                                            }}>
                                            <View
                                                style={{
                                                    paddingVertical: getSize.scale(4),
                                                    borderRadius: 20,
                                                    borderBottomWidth: 1,
                                                    borderRightWidth: 1,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        fontStyle: 'italic'
                                                    }}>
                                                    BUY
                                                </Text>
                                            </View>
                                        </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      {/* Switch popup when not enough Sol */}
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
            backgroundColor: '#0000007f',
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
                elevation: 2,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: getSize.scale(158),
                    width: getSize.scale(158),
                    resizeMode: 'contain',
                    marginVertical: getSize.scale(16),
                  }}
                  source={{
                    uri: 'ic_git', // item.img
                  }}
                />
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: '#767676',
                        fontStyle: 'italic',
                      }}>
                      ID
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
                        backgroundColor: 'rgba(9, 116, 241, 1)',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: getSize.scale(15),
                        }}>
                        #
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: getSize.scale(14),
                        }}>
                        {item.shoesId}
                      </Text>
                    </View>
                  </View>

                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: '#767676',
                        fontStyle: 'italic',
                      }}>
                      Owner
                    </Text>
                    <View
                      style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
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
                        {`5pf04xvA...GPoWuY`}
                      </Text>
                    </View>
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
                      {`Jogger`}
                    </Text>
                  </View>
                </View>

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
                      {`Common`}
                    </Text>
                  </View>
                </View>

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
                      {`15/15`}
                    </Text>
                  </View>
                </View>
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
                        0.0
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
                        {`12:15:15 | 6 months`}
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
                          color: 'rgba(44, 44, 44, 1)',
                        }}>
                        0.0
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                paddingVertical: getSize.scale(16),
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
                elevation: 2,
                paddingHorizontal: getSize.scale(16),
                marginTop: getSize.scale(20),
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: getSize.scale(5),
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: Colors.GREY_DARK,
                      fontStyle: 'italic',
                      fontWeight: '500',
                    }}>
                    Price
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#F44369',
                      fontSize: getSize.scale(20),
                    }}>
                    {`${item.price} MOV`}
                  </Text>
                </View>

                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() => setmodalTransfer(!modalTransfer)}>
                    <Image
                      style={{
                        width: getSize.scale(119),
                        height: getSize.scale(40),
                        resizeMode: 'contain',
                      }}
                      source={{
                        uri: 'ic_btn_buynow',
                      }}
                    />
                  </TouchableOpacity>
                </View>
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
}

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
