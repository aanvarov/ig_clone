import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBr8Z86Er_WrSQRpKnbMXw7g_k7O43RZjo',
  authDomain: 'rn-ig-clone-4e152.firebaseapp.com',
  projectId: 'rn-ig-clone-4e152',
  storageBucket: 'rn-ig-clone-4e152.appspot.com',
  messagingSenderId: '790365346884',
  appId: '1:790365346884:web:f0c3aa63246665308cb011',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export {firebase, db};
