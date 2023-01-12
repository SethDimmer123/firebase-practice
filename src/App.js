import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection,addDoc,getDocs,getDoc,doc, query, where } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
signOut,
onAuthStateChanged } from "firebase/auth";

function App() {
  const [user,setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title:"Finish Interview Section",
      description: "do Frontend ",
      uid: user.uid,
    }
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"))
    const posts = docs.map((elem) => ({...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById() {
    const hardcodedId = "MdoOIKI6h4o5Xrm2cTrm"
    const postRef = doc(db, "posts", hardcodedId)
    const postSnap = await getDoc(postRef)
    const post = postSnap.data()
    console.log(post)
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db,"posts"),
      where("uid", "==", "1")
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      setLoading(false)
      console.log(user);
      if(user) {
        setUser(user)
      }
    })
  }, []);

  function register() {
    console.log('register')
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then(({user}) => {
      console.log(user)
      setUser(user)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function logout() {
    signOut(auth);
    setUser({});
  }
  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading...' :user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
    </div>
  );
}

export default App;
