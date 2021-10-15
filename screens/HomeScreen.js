import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import BottomTabs, {bottomTabIcons} from '../components/home/BottomTabs';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import Stories from '../components/home/Stories';
import {POSTS} from '../data/posts';
import {db} from '../firebase';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(post => ({id: post.id, ...post.data()})));
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories navigation={navigation} />
      <ScrollView>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTabs
        navigation={navigation}
        icons={bottomTabIcons}
        screen="Home"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default HomeScreen;
