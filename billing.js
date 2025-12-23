const API = "https://dr-a-physiotherapy-backend.onrender.com";

const getToken = () => localStorage.getItem("token");

async function createBill() {
  const res = await fetch(`${API}/bills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      patient: document.getElementById("patientId").value,
      amount: document.getElementById("amount").value,
      description: document.getElementById("desc").value
    })
  });

  const data = await res.json();
  alert(data.message);
}
