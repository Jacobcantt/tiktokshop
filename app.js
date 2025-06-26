// Głosowanie (app.js)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, onSnapshot } from 'firebase/firestore';

const firebaseConfig = { /* Twoje dane z Firebase */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Zapisz głos
document.getElementById('voteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = new URLSearchParams(window.location.search).get('user');
  await addDoc(collection(db, 'votes'), { 
    user: user,
    ip: await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip),
    date: new Date()
  });
  alert('Dziękujemy za głos!');
});

// Ranking na żywo
const q = query(collection(db, 'votes'));
onSnapshot(q, (snapshot) => {
  const votes = {};
  snapshot.forEach(doc => votes[doc.data().user] = (votes[doc.data().user] || 0) + 1);
  
  const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  document.getElementById('ranking').innerHTML = sorted.map(([user, count]) => 
    `<li>${user}: ${count} głosów</li>`
  ).join('');
});
