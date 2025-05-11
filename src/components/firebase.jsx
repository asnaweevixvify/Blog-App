import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBxU7cEzml5BZvvTXrrzM_f0LaamymvZaI",
    authDomain: "blog-app-13796.firebaseapp.com",
    projectId: "blog-app-13796",
    storageBucket: "blog-app-13796.firebasestorage.app",
    messagingSenderId: "169025062784",
    appId: "1:169025062784:web:59a7c18240aaf6f89be365",
    measurementId: "G-N1QS6JPVNQ"
  };
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)