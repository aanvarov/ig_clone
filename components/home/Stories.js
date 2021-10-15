import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {USERS} from '../../data/users';
import {firebase, db} from '../../firebase';

const Stories = ({navigation}) => {
  // getting random picture using api
  const getRandomPicture = async () => {
    const response = await fetch('https://picsum.photos/200/300');
    console.log('getRandomPic', response.url);
    return response.url;
  };
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        }),
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  console.log(firebase.auth().currentUser);
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          onPress={async () => {
            // navigation.push('StoryScreen', {
            //   username: story.user,
            //   imageUrl: story.image,
            //   storyImage: await getRandomPicture(),
            // });
          }}>
          <Image
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              bottom: 22,
              right: 4,
              zIndex: 999,
            }}
            source={{
              uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fblue-plus-icon-6.png&f=1&nofb=1',
            }}
          />
          <View style={{alignItems: 'center', marginLeft: 1}}>
            <ImageBackground
              source={
                currentLoggedInUser
                  ? {
                      uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Gx2TFPDQZZybvm7zCLfLugHaFh%26pid%3DApi&f=1',
                    }
                  : require('../../assets/storyBorder4.png')
              }
              resizeMode="cover"
              style={styles.storyImageBorder}>
              <Image
                source={{
                  uri: currentLoggedInUser
                    ? currentLoggedInUser.profilePicture
                    : 'https://instagram.fhrk1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/56352796_2311835385697396_6992972636456222720_n.jpg?_nc_ht=instagram.fhrk1-1.fna.fbcdn.net&_nc_ohc=8X9BcyNbC3sAX_Q8GwJ&edm=ABfd0MgBAAAA&ccb=7-4&oh=fd5c22aa9a1cdfc3a302c2e77946f7a8&oe=61704BA9&_nc_sid=7bff83',
                }}
                style={styles.storyImage}
              />
            </ImageBackground>
            <Text style={styles.storyText}>
              {currentLoggedInUser
                ? currentLoggedInUser.username.length > 11
                  ? currentLoggedInUser.username.slice(0, 10).toLowerCase() +
                    '...'
                  : currentLoggedInUser.username.toLowerCase()
                : ''}
            </Text>
          </View>
        </Pressable>
        {USERS.map((story, index) => (
          <Pressable
            key={index}
            onPress={async () => {
              navigation.push('StoryScreen', {
                username: story.user,
                imageUrl: story.image,
                storyImage: await getRandomPicture(),
              });
            }}>
            <View style={{alignItems: 'center', marginLeft: 1}}>
              <ImageBackground
                source={require('../../assets/storyBorder4.png')}
                resizeMode="cover"
                style={styles.storyImageBorder}>
                <Image source={{uri: story.image}} style={styles.storyImage} />
              </ImageBackground>
              <Text style={styles.storyText}>
                {story.user.length > 11
                  ? story.user.slice(0, 7).toLowerCase() + '...'
                  : story.user.toLowerCase()}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storyImageBorder: {
    width: 72,
    height: 72,
    marginLeft: 12,
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
