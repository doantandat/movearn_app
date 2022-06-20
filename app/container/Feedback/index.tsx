import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import React, {memo, useEffect, useState} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {getSize} from '../../common';

const Feedback = memo(() => {
  const navigation = useNavigation();
  const [showType, setShowType] = useState(false);
  const [type, setType] = useState('');
  const [cate, setCate] = useState('');
  const [showCategory, setShowCategory] = useState(false);

  const categories = [
    {
      title: 'Running',
    },
    {
      title: 'Travel',
    },
    {
      title: 'Wallet',
    },
    {
      title: 'DAO proposals',
    },
    {
      title: 'NFT',
    },
    {
      title: 'Marketplace',
    },
    {
      title: 'Earning',
    },
    {
      title: 'Display',
    },
    {
      title: 'Others',
    },
  ];

  const types = [
    {
      title: 'Suggestion',
    },
    {
      title: 'Problem',
    },
    {
      title: 'Others',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          width: getSize.Width,
          height: getSize.scale(100),
          position: 'absolute',
          zIndex: -1,
          top: Platform.OS === 'android' ? getSize.scale(-10) : 0,
        }}
        source={{uri: 'ic_top_bar'}}
      />
      <View
        style={{
          flex: 1,
          marginVertical: Platform.OS === 'android' ? getSize.scale(8) : 0,
        }}>
        {/* HeaderMini */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: getSize.scale(16),
            height: 40,
            // backgroundColor: "red"
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flex: 2, justifyContent: 'center'}}>
            <Image
              style={{
                width: getSize.scale(28),
                height: getSize.scale(28),
                resizeMode: 'contain',
              }}
              source={{uri: 'ic_back'}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 6,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: getSize.scale(18),
                color: '#000',
                fontWeight: 'bold',
              }}>
              FEEDBACK
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowType(false);
            setShowCategory(false);
          }}
          activeOpacity={1}
          style={styles.wrap}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowType(!showType)}
              style={styles.types}>
              <Text style={styles.text}>
                {type.length ? type : 'Select Type'}
              </Text>
              <Image
                style={styles.icon}
                source={require('../../assets/images/dropdown.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowCategory(!showCategory)}
              activeOpacity={0.8}
              style={[styles.types, styles.cate]}>
              <Text style={styles.text}>
                {cate.length ? cate : 'Select Type'}
              </Text>
              <Image
                style={styles.icon}
                source={require('../../assets/images/dropdown.png')}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            multiline
            placeholder="Please include a detailed description of your suggestion or problem so that we can ensure the best experience for you"
            style={styles.input}
          />
          {showType && (
            <View style={[styles.types, styles.listType]}>
              {types.map(e => (
                <Text
                  onPress={() => {
                    setType(e?.title);
                    setShowType(false);
                  }}
                  style={styles.cateTxt}>
                  {e?.title}
                </Text>
              ))}
            </View>
          )}
          {showCategory && (
            <View style={[styles.types, styles.listType, {right: 0}]}>
              {categories.map(e => (
                <Text
                  onPress={() => {
                    setCate(e?.title);
                    setShowCategory(false);
                  }}
                  style={styles.cateTxt}>
                  {e?.title}
                </Text>
              ))}
            </View>
          )}
          <Button
            titleStyle={{fontWeight: 'bold', fontStyle: 'italic'}}
            buttonStyle={styles.submit}
            title={'SUBMIT'}
            activeOpacity={0.8}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,
  },
  types: {
    padding: 16,
    borderColor: '#A79BBF',
    borderWidth: 1,
    borderRadius: 16,
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
  },
  text: {
    color: '#767676',
    fontSize: 12,
  },
  cate: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 16,
    height: 16,
  },
  listType: {
    flexDirection: 'column',
    position: 'absolute',
    width: '50%',
    top: 90,
    zIndex: 999,
  },
  cateTxt: {
    marginBottom: 10,
  },
  input: {
    borderColor: '#A79BBF',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
    marginTop: 10,
    height: 150,
    padding: 16,
    textAlignVertical: 'top',
  },
  submit: {
    height: 50,
    borderRadius: 16,
    marginTop: 30,
    backgroundColor: '#E34567',
  },
});
export default Feedback;
