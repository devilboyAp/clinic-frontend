const API = "https://dr-a-physiotherapy-backend.onrender.com";

const getToken = () => localStorage.getItem("token");

/* ================= AUTO LOGIN ================= */
if (getToken()) {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  loadPatients();
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

/* ================= ADD PATIENT ================= */
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
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ name, age, gender, phone, condition })
  });

  const data = await res.json();
  alert(data.message || "Patient added");

  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("condition").value = "";

  loadPatients();
}

/* ================= LOAD PATIENTS ================= */
async function loadPatients() {
  const res = await fetch(`${API}/patients/pre`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
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

        <div style="margin-top:10px;">
          <button onclick="editPatient('${p._id}')">✏ Edit</button>
          <button onclick="deletePatient('${p._id}')" style="background:red;">🗑 Delete</button>
        </div>
      </div>
    `;
  });
}

/* ================= EDIT PATIENT ================= */
async function editPatient(id) {
  const name = prompt("Enter name");
  if (!name) return;

  const res = await fetch(`${API}/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ name })
  });

  const data = await res.json();
  alert(data.message || "Updated");
  loadPatients();
}

/* ================= DELETE PATIENT ================= */
async function deletePatient(id) {
  if (!confirm("Delete this patient?")) return;

  const res = await fetch(`${API}/patients/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  const data = await res.json();
  alert(data.message || "Deleted");
  loadPatients();
}
