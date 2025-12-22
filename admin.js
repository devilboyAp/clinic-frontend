const API = "https://dr-a-physiotherapy-backend.onrender.com";

/* ================= TOKEN ================= */
const getToken = () => localStorage.getItem("token");

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

/* ================= CREATE USER ================= */
async function createUser() {
  const token = getToken();
  if (!token) {
    alert("Login as admin first");
    return;
  }

  const body = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    role: document.getElementById("role").value
  };

  const res = await fetch(`${API}/admin/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.message;
}

/* ================= LOAD ALL PATIENTS (ADMIN) ================= */
async function loadAllPatients() {
  const token = getToken();
  if (!token) {
    alert("Login as admin first");
    return;
  }

  const res = await fetch(`${API}/admin/patients`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Access denied");
    return;
  }

  const div = document.getElementById("patients");
  if (!div) return;

  div.innerHTML = "";

  data.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <strong>${p.name}</strong><br/>
        ${p.age || "-"} yrs | ${p.gender || "-"}<br/>
        📞 ${p.phone}<br/>
        ${p.condition || ""}<br/>
        <small>Added by: ${p.createdBy?.name || "-"}</small>
      </div>
    `;
  });
}
