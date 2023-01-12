import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection,addDoc } from 'firebase/firestore';
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
      title:"Land a 400k job",
      description: "Finish Frontend Simplfied",
    }
    addDoc(collection(db, "posts"), post)
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
    </div>
  );
}

export default App;
