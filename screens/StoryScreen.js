import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';

const StoryScreen = ({navigation, route}) => {
  const [barNumber, setBarNumber] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
    setInterval(() => {
      setBarNumber(barNumber + 1);
    }, 2500);
  }, [barNumber, navigation]);
  console.log(route.params.username);
  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar progress={barNumber} color="#ffffff" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-glyphs/90/000000/back.png',
            }}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <Image
          source={{uri: route.params.imageUrl}}
          style={{width: 40, height: 40, borderRadius: 50, marginLeft: 15}}
        />
        <Text style={{fontWeight: '600', marginLeft: 10}}>
          {route.params.username}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: route.params.storyImage,
          }}
          style={{height: '100%', width: '100%', resizeMode: 'cover'}}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          style={styles.textInput}
          placeholder="Send message"
          placeholderTextColor="white"
        />
        <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} />
      </View>
    </SafeAreaView>
  );
};

const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image
      style={imgStyle}
      source={{
        uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/sent.png',
      }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    position: 'absolute',
    top: 50,
    right: 0,
    left: 0,
    zIndex: 100,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    borderRadius: 25,
    padding: 10,
    paddingLeft: 15,
  },
  shareIcon: {
    transform: [{rotate: '320deg'}],
    marginTop: -10,
    marginHorizontal: 10,
  },
  footerIcon: {
    width: 28,
    height: 28,
  },
});

export default StoryScreen;
