const API = "https://dr-a-physiotherapy-backend.onrender.com";

/* ================= TOKEN ================= */
const getToken = () => localStorage.getItem("token");

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
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
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Access denied");
    return;
  }

  const div = document.getElementById("patients");
  div.innerHTML = "";

  data.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <strong>${p.name}</strong><br/>
        ${p.age || "-"} yrs | ${p.gender || "-"}<br/>
        📞 ${p.phone || "-"}<br/>
        ${p.condition || ""}<br/>
        <small>Added by: ${p.createdBy?.name || "-"}</small><br/><br/>

        <button onclick="editPatient('${p._id}')">✏️ Edit</button>
        <button onclick="deletePatient('${p._id}')">❌ Delete</button>
      </div>
    `;
  });
}

/* ================= DELETE PATIENT ================= */
async function deletePatient(id) {
  if (!confirm("Are you sure you want to delete this patient?")) return;

  const token = getToken();

  const res = await fetch(`${API}/patients/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  alert(data.message || "Deleted");

  loadAllPatients();
}

/* ================= EDIT PATIENT ================= */
async function editPatient(id) {
  const name = prompt("Enter name:");
  const age = prompt("Enter age:");
  const gender = prompt("Enter gender:");
  const phone = prompt("Enter phone:");
  const condition = prompt("Enter condition:");

  const token = getToken();

  const res = await fetch(`${API}/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name,
      age,
      gender,
      phone,
      condition
    })
  });

  const data = await res.json();
  alert(data.message || "Updated");

  loadAllPatients();
}
