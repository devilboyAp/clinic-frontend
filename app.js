const API = "https://dr-a-physiotherapy-backend.onrender.com";

const getToken = () => localStorage.getItem("token");

/* ================= AUTO LOGIN ================= */
if (getToken()) {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

/* ================= LOGIN ================= */
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  location.reload();
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("token");
  location.reload();
}

/* ================= ADD PATIENT (FINAL FIX) ================= */
async function addPatient() {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const condition = document.getElementById("condition").value.trim();

  if (!name || !phone) {
    alert("Name and phone are required");
    return;
  }

  const res = await fetch(`${API}/patients/pre`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token()}`
    },
    body: JSON.stringify({ name, age, gender, phone, condition })
  });

  const data = await res.json();
  alert(data.message || "Patient added");

  loadPatients();
}
/* ================= LOAD PATIENTS ================= */
async function loadPatients() {
  const res = await fetch(`${API}/patients/pre`, {
    headers: {
      "Authorization": `Bearer ${token()}`
    }
  });

  const patients = await res.json();
  const div = document.getElementById("patients");
  div.innerHTML = "";

  patients.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <strong>${p.name}</strong><br/>
        ${p.age || "-"} yrs | ${p.gender || "-"}<br/>
        📞 ${p.phone}<br/>
        ${p.condition || ""}
      </div>
    `;
  });
}
