import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getSize } from '../../common';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: any;
  isGemItem?: boolean;
  isSneakerItem?: boolean;
};
export const InfoItemModal = React.memo<Props>(
  ({ visible, setVisible, item, isGemItem, isSneakerItem }) => {
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
                  source={{
                    uri: isGemItem ? 'ic_tree_coin' : item?.img, // item?.img
                  }}
                  source={
                    isGemItem
                      ? require('../../assets/images/gem1.png')
                      : { uri: item?.img }
                  }
                />
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // backgroundColor: "red"
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
                      backgroundColor: '#565874',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: getSize.scale(14),
                      }}>
                      {`# ${isGemItem ? item?._id : item?.readableId}`}
                    </Text>
                  </View>
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
                {isGemItem && (
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
