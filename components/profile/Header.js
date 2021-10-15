import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native';
import {firebase} from '../../firebase';

const Header = ({navigation, username}) => {
  const handleSignOut = () => {
    try {
      firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{position: 'absolute', left: 10}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          style={{width: 30, height: 30}}
          source={{
            uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png',
          }}
        />
      </TouchableOpacity>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
        {username}
      </Text>
      <Pressable
        onPress={() => {
          handleSignOut();
        }}
        style={{position: 'absolute', right: 10}}>
        <Text style={{color: 'white'}}>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
