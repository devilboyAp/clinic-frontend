const API = "https://dr-a-physiotherapy-backend.onrender.com/admin/create-user";

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

async function createUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login as admin first");
    return;
  }

  const body = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  };

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Something went wrong");
    return;
  }

  document.getElementById("msg").innerText = data.message;
}
