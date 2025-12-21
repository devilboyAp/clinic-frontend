const API = "https://dr-a-physiotherapy-backend.onrender.com";

function App() {
  const [token, setToken] = React.useState("");
  const [patients, setPatients] = React.useState([]);

  const [form, setForm] = React.useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    condition: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPatient = async () => {
    const res = await fetch(`${API}/patients/pre`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message || "Patient added");
  };

  const loadPatients = async () => {
    const res = await fetch(`${API}/patients/pre`, {
      headers: {
        "Authorization": token
      }
    });
    const data = await res.json();
    setPatients(data);
  };

  return (
    <div className="container">
      <h2>👨‍⚕️ Patient Management</h2>

      <input
        placeholder="Paste Bearer Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <h3>Add Patient</h3>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="condition" placeholder="Condition" onChange={handleChange} />

      <button onClick={addPatient}>Add Patient</button>
      <button className="secondary" onClick={loadPatients}>Load Patients</button>

      {patients.map(p => (
        <div className="card" key={p._id}>
          <b>{p.name}</b><br/>
          {p.age} yrs | {p.gender}<br/>
          📞 {p.phone}<br/>
          🩺 {p.condition}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);