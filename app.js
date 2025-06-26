// Głosowanie
function vote() {
  const shirtId = document.getElementById("shirtId").value;
  if (!shirtId) {
    document.getElementById("message").innerText = "Podaj ID koszulki!";
    return;
  }

  // Zapisz głos w Firestore
  db.collection("votes").add({
    shirtId: shirtId,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    ip: "anonymous" // W prawdziwej wersji dodaj zabezpieczenie IP
  }).then(() => {
    document.getElementById("message").innerText = "Dziękujemy za głos!";
  }).catch((error) => {
    document.getElementById("message").innerText = "Błąd: " + error.message;
  });
}

// Pokaż ranking na żywo
db.collection("votes").onSnapshot((snapshot) => {
  const votes = {};
  snapshot.forEach((doc) => {
    const id = doc.data().shirtId;
    votes[id] = (votes[id] || 0) + 1;
  });

  // Sortuj od najwyższego
  const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  
  // Wyświetl ranking
  let html = "";
  sorted.forEach(([id, count]) => {
    html += `<div class="user">Koszulka ${id}: ${count} głosów</div>`;
  });
  document.getElementById("ranking").innerHTML = html || "Brak głosów.";
});