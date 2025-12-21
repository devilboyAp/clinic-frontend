const API = "https://dr-a-physiotherapy-backend.onrender.com";

const token = () => localStorage.getItem("token");

// AUTO LOGIN CHECK
if (token()) {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("token", data.token);

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  location.reload();
}

// ADD PATIENT
async function addPatient() {
  const body = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    phone: phone.value,
    condition: condition.value
  };

  const res = await fetch(`${API}/patients/pre`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token()}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  alert(data.message || "Added");
  loadPatients();
}

// LOAD PATIENTS
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
        ${p.age} yrs | ${p.gender}<br/>
        📞 ${p.phone}<br/>
        🩺 ${p.condition}
      </div>
    `;
  });
}
