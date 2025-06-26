const firebaseConfig = {
    apiKey: "AIzaSyBjDezqhV03KtAN5XPFTFEFVBbXfxfTeck",
    authDomain: "tiktok-voting-a5170.firebaseapp.com",
    projectId: "tiktok-voting-a5170",
    storageBucket: "tiktok-voting-a5170.firebasestorage.app",
    messagingSenderId: "50968375516",
    appId: "1:50968375516:web:1aab0987a9ab7cda468419",
    measurementId: "G-19J50C2V3K"
  };

// Inicjalizacja Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();