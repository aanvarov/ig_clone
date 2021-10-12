import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-paper';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/like.png',
    likedImageUrl: 'https://img.icons8.com/ios-glyphs/90/fa314a/like.png',
  },
  {
    name: 'Comment',
    imageUrl:
      'https://img.icons8.com/material-outlined/60/ffffff/speech-bubble--v1.png',
  },
  {
    name: 'Share',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/sent.png',
  },
  {
    name: 'Save',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon.png',
  },
];

const Post = ({post}) => {
  return (
    <View style={{marginBottom: 30}}>
      <Divider style={{backgroundColor: '#dbdbdb66', height: 1}} />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({post}) => (
  <View style={styles.postHeaderContainer}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <ImageBackground
        source={require('../../assets/storyBorder4.png')}
        resizeMode="cover"
        style={styles.storyImageBorder}>
        <Image source={{uri: post.profile_picture}} style={styles.storyImage} />
      </ImageBackground>
      <Text style={styles.postHeaderText}>{post.user}</Text>
    </View>
    <Text style={styles.postDots}>...</Text>
  </View>
);

const PostImage = ({post}) => (
  <View style={styles.postImageView}>
    <Image source={{uri: post.imageUrl}} style={styles.postImage} />
  </View>
);

const PostFooter = () => (
  <View style={{flexDirection: 'row'}}>
    <View style={styles.leftFooterIconsContainer}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imgStyle={[styles.footerIcon, styles.shareIcon]}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View style={{flex: 1, alignItems: 'flex-end'}}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
);

const Likes = ({post}) => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color: 'white', fontWeight: '600'}}>
      {post.likes.toLocaleString('en')} likes
    </Text>
  </View>
);

const Caption = ({post}) => (
  <View style={{marginTop: 5}}>
    <Text style={{color: 'white'}}>
      <Text style={{fontWeight: '600'}}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({post}) => (
  <View style={{marginTop: 5}}>
    {!!post.comments.length && (
      <Text style={{color: 'gray'}}>
        View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
);

const Comments = ({post}) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{flexDirection: 'row', marginTop: 4}}>
        <Text style={{color: 'white'}}>
          <Text style={{fontWeight: '600'}}>{comment.user}</Text>
          <Text> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  postImageView: {
    width: '100%',
    height: 450,
  },
  postDots: {
    color: 'white',
    fontWeight: '900',
    transform: [{rotate: '90deg'}],
  },
  postHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
    marginHorizontal: 5,
  },
  postHeaderText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '700',
  },
  storyImageBorder: {
    width: 35,
    height: 35,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  postImage: {
    height: '100%',
    resizeMode: 'cover',
  },
  shareIcon: {
    transform: [{rotate: '320deg'}],
    marginTop: -3,
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});
export default Post;
