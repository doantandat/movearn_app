import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {Colors, getSize} from '../../../common';
import * as ApiServices from '../../../service';
import {LoadingIndicator, NoData} from '../../../components';
import * as ACTION_CONST from '../../../redux/action/ActionType';
import Video from 'react-native-video';

export default function ItemShoeBoxes({item, index, setOpenVideo, setSneaker}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  // const [sneaker, setSneaker] = useState(null);

  const image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogMFHOw0CKtwUvuJmhgcSi18GmfqlCxUI6g&usqp=CAU';
  const imageSneakers =
    'https://stepn-simulator.xyz/static/simulator/img/sneakers.jpeg';

  const onOpenBox = async () => {
    setLoading(true);
    ApiServices.onOpenBox({item_type: item?.type})
      .then(res => {
        setSneaker(res?.data?.newShoes);
        setLoading(false);
        setOpenVideo(true);
        console.log('resssss', res);
        ApiServices.getMyBox().then(response => {
          if (response.code === 200) {
            dispatch({
              type: ACTION_CONST.GET_SHOEBOX,
              data: response.data,
            });
          }
        });
        ApiServices.shoes().then(response => {
          if (response.code === 200) {
            dispatch({
              type: ACTION_CONST.SHOES_SUCCESS,
              data: response.data,
            });
          }
        });
      })
      .catch(err => {
        setLoading(false);
        Toast.showWithGravity(err.message, Toast.LONG, Toast.CENTER);
      });
  };

  // useEffect(() => {
  //   if (sneaker) {
  //     setTimeout(() => {
  //       setModalInfo(true);
  //     }, 5000);
  //   }
  // }, [sneaker]);

  return (
    <View
      key={index}
      style={{
        width: getSize.Width / 2.09,
        height: getSize.Width / 1.5,
        marginTop: index === 0 || index === 1 ? getSize.scale(16) : 0,
        marginVertical: getSize.scale(4),
      }}>
      <ImageBackground
        source={{uri: 'ic_tabbag_items'}}
        style={{
          width: '100%',
          height: getSize.scale(250),
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
                marginTop: getSize.scale(-16),
              }}>
              <View
                style={{
                  width: '100%',
                }}>
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

            <View style={{flex: 6}}>
              <TouchableOpacity
                disabled
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor: '#565874',
                      paddingHorizontal: getSize.scale(8),
                      paddingVertical: getSize.scale(2),
                      height: 20,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: getSize.scale(2),
                        fontSize: getSize.scale(12),
                      }}>
                      {`# ${item?._id}`}
                    </Text>
                  </View>
                </View>
                <Image
                  source={{uri: 'ic_git'}}
                  style={{
                    flex: 7,
                    width: getSize.scale(105),
                    height: getSize.scale(101),
                    resizeMode: 'contain',
                  }}
                />

                <TouchableOpacity onPress={onOpenBox} style={styles.open}>
                  {loading ? (
                    <LoadingIndicator />
                  ) : (
                    <Text style={styles.openText}>OPEN</Text>
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}} />
          </View>
        </View>
      </ImageBackground>
      {/* <InfoItemModal
        visible={modalInfo}
        setVisible={values => setModalInfo(values)}
        item={sneaker}
        isSneakerItem
      /> */}
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
  open: {
    backgroundColor: '#3EF1F2',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  openText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
