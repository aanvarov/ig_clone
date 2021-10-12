import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {USERS} from '../../data/users';

const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{alignItems: 'center', marginLeft: 1}}>
            <ImageBackground
              source={require('../../assets/storyBorder4.png')}
              resizeMode="cover"
              style={styles.storyImageBorder}>
              <Image source={{uri: story.image}} style={styles.storyImage} />
            </ImageBackground>
            <Text style={styles.storyText}>
              {story.user.length > 11
                ? story.user.slice(0, 10).toLowerCase() + '...'
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storyImageBorder: {
    width: 72,
    height: 72,
    marginLeft: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    // borderWidth: 3,
    // borderColor: '#ff8501',
  },
  storyText: {
    color: 'white',
    marginTop: 3,
  },
});

export default Stories;
