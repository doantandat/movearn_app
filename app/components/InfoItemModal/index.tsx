import { Button } from '@rneui/base';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getSize } from '../../common';
import * as ApiServices from '../../service';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import * as ACTION_CONST from '../../redux/action/ActionType';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: any;
  isGemItem?: boolean;
  isSneakerItem?: boolean;
  isShoebox?: boolean;
  allowSell?: boolean;
  allowUnSell?: boolean;
  action?: any;
};
export const InfoItemModal = React.memo<Props>(
  ({
    visible,
    setVisible,
    item,
    isGemItem,
    isSneakerItem,
    allowSell,
    isShoebox,
    allowUnSell,
  }) => {
    const [modalQuantity, setModalQuantity] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();

    const sellItem = () => {
      ApiServices.sellItem({
        item_type: item.type,
        quantity,
        price,
      })
        .then(res => {
          setVisible(false);
          setQuantity('');
          setPrice('');
          Toast.showWithGravity(res.message, Toast.LONG, Toast.CENTER);
          if (res.code === 200) {
            reloadData();
          }
        })
        .catch(err => {
          setQuantity('');
          setPrice('');
          Toast.showWithGravity(err.message, Toast.LONG, Toast.CENTER);
        });
    };

    const reloadData = () => {
      ApiServices.getMyBox()
        .then(res => {
          if (res.code === 200) {
            dispatch({
              type: ACTION_CONST.GET_SHOEBOX,
              data: res.data,
            });
          }
        })
        .catch(err => {
          console.log('LoadData', err);
        });
      ApiServices.listSellingItem()
        .then(res => {
          if (res.code === 200) {
            dispatch({
              type: ACTION_CONST.GET_LIST_SELLING_ITEMS,
              data: res.data,
            });
          }
        })
        .catch(err => {
          console.log('LoadData', err);
        });
    };

    const unSellItem = () => {
      ApiServices.unSellItem(item._id)
        .then(res => {
          setVisible(false);
          Toast.showWithGravity(res.message, Toast.LONG, Toast.CENTER);
          if (res.code === 200) {
            reloadData();
          }
        })
        .catch(err => {
          Toast.showWithGravity(err.message, Toast.LONG, Toast.CENTER);
        });
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(!visible)}>
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
                height: 220,
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
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  marginBottom: 10,
                }}>
                Price
              </Text>
              <TextInput
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={text => setPrice(text)}
                value={price}
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
                    setVisible(false);
                    sellItem();
                    // buyItem(item?._id, quantity);
                  }}
                  disabled={quantity.length && price.length ? false : true}
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
          // onPress={() => setVisible(!visible)}
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
                backgroundColor: '#96CFE1',
                paddingVertical: getSize.scale(10),
                borderRadius: 20,
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image
                  style={{
                    height: getSize.Width / 1.8,
                    width: 110,
                    resizeMode: 'contain',
                    marginVertical: getSize.scale(8),
                  }}
                  // source={{
                  //   uri: isGemItem
                  //     ? 'ic_tree_coin'
                  //     : isShoebox
                  //     ? 'ic_git'
                  //     : item?.img, // item?.img
                  // }}
                  source={
                    isGemItem
                      ? require('../../assets/images/gem1.png')
                      : isShoebox
                      ? { uri: 'ic_git' }
                      : { uri: item?.img }
                  }
                />

                <View
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 20,
                    marginVertical: getSize.scale(8),
                    marginRight: getSize.scale(8),
                    paddingVertical: getSize.scale(4),
                    paddingHorizontal: getSize.scale(10),
                    backgroundColor: '#565874',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: getSize.scale(14),
                      textTransform: 'capitalize'
                    }}>
                    {/* {`# ${
                      isGemItem || isShoebox ? item?._id : item?.readableId
                    }`} */}
                     {`${
                      isGemItem || isShoebox ? item?.type?.split('_').join(' ') : `# ${item?.readableId}`
                    }`}
                  </Text>
                </View>
              </View>
              {isSneakerItem && (
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: getSize.scale(8),
                  }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: '#000000',
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
                          textTransform: 'uppercase',
                        }}>
                        {item?.class}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: '#000000',
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
                          color: '#000000',
                          fontWeight: 'bold',
                          fontSize: getSize.scale(13),
                        }}>
                        {item?.quality}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: '#000000',
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
                        {`${item?.energy}`}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: getSize.scale(8),
                }}></View>

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
                  <View style={{ flex: 1 }} />
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
                {isSneakerItem && (
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
                            color: '#000000',
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
                            color: '#000000',
                          }}>
                          {item?.class === 'runner' ? '6-20km' : '1-6km'}
                          {/* {`${constShoe?.SPEED_RANGE[item?.quality].min} - ${
                          constShoe?.SPEED_RANGE[item?.quality].max
                        }`}{' '}
                        km/h */}
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
                            color: '#000000',
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
                            color: '#000000',
                          }}>
                          {`${item?.energy}`}
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
                            color: '#000000',
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
                            color: '#000000',
                          }}>
                          {/* {`${constShoe?.LUCK[item?.quality]}`} */}
                          {item?.attributes?.luck}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {(isGemItem || isShoebox) && (
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
                            color: '#000000',
                          }}>
                          Type
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
                            color: '#000000',
                            textTransform: 'capitalize',
                          }}>
                          {/* {`${constShoe?.LUCK[item?.quality]}`} */}
                          {item?.type?.split('_').join(' ')}
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
                            color: '#000000',
                          }}>
                          Quantity
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
                            color: '#000000',
                            textTransform: 'capitalize',
                          }}>
                          {/* {`${constShoe?.LUCK[item?.quality]}`} */}
                          {item?.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {allowSell && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: getSize.scale(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setTimeout(() => {
                          setModalQuantity(true);
                        }, 100);
                      }}
                      style={{
                        width: 100,
                        opacity: item?.isSelling ? 0.5 : 1,
                        // marginHorizontal: getSize.scale(16),
                        paddingVertical: getSize.scale(6),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: '#888888',
                        borderWidth: 1,
                        borderBottomWidth: 2,
                        borderRightWidth: 2,
                        backgroundColor: '#2EDBDC',
                        // marginRight: 10,
                      }}>
                      <Text
                        style={{
                          fontStyle: 'italic',
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}>
                        Sell
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {allowUnSell && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: getSize.scale(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => unSellItem()}
                      style={{
                        width: 100,
                        opacity: item?.isSelling ? 0.5 : 1,
                        paddingVertical: getSize.scale(6),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: '#888888',
                        borderWidth: 1,
                        borderBottomWidth: 2,
                        borderRightWidth: 2,
                        backgroundColor: '#2EDBDC',
                      }}>
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
                )}
              </View>

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: getSize.scale(16),
              }}>
              <TouchableOpacity onPress={() => setVisible(!visible)}>
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
    );
  },
);

const styles = StyleSheet.create({});
