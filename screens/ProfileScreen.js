import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import Header from '../components/profile/Header';
import {firebase, db} from '../firebase';
import BottomTabs, {bottomTabIcons} from '../components/home/BottomTabs';

const ProfileScreen = ({navigation}) => {
  const [profilePic, setProfilePic] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWeZj1SB4KzSbjx_oKlZpyrOLlEL9K9DW0JA&usqp=CAU',
  );
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [numOfPosts, setNumOfPosts] = useState(0);
  const [posts, setPosts] = useState([]);

  const setUserData = () => {
    db.collection('users')
      .doc(firebase.auth().currentUser.email)
      .onSnapshot(snapshot => setUserName(snapshot.get('username')));
    setUserEmail(firebase.auth().currentUser.email);
    db.collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .get()
      .then(snap => {
        setNumOfPosts(snap.size);
        console.log({...snap});
      });
  };

  const getUserPosts = () => {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
      });
    return unsubscribe;
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserProfilePic = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setProfilePic(doc.data().profile_picture);
        }),
      );
    return unsubscribe;
  };

  React.useEffect(() => {
    getUserProfilePic();
    setUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} username={userName} />
      <View style={styles.profilePicContainer}>
        <Image style={styles.profilePic} source={{uri: profilePic}} />
      </View>
      <View>
        <Text style={[styles.username]}>{userName}</Text>
        <Text style={[styles.email]}>{userEmail}</Text>
        <Text style={[styles.email]}>Total Posts: {numOfPosts}</Text>
      </View>
      <View>
        {posts.map((item, index) => (
          <Image
            source={{uri: item.imageUrl}}
            style={{height: 100, width: 100, margin: 2}}
          />
        ))}
      </View>
      <BottomTabs
        navigation={navigation}
        icons={bottomTabIcons}
        screen="Profile"
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  profilePicContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  username: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },
  email: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
  btn: {
    width: 110,
    marginTop: 40,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
