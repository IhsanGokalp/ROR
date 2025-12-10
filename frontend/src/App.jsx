import { useEffect, useState } from "react";
import {
  fetchDoctors,
  fetchPatients,
  fetchAppointments,
  createAppointment,
} from "./api";

function App() {
  /* ---- Shared data ---- */
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  /* ---- Appointment listing ---- */
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  /* ---- Create appointment ---- */
  const [formDoctor, setFormDoctor] = useState("");
  const [formPatient, setFormPatient] = useState("");
  const [formTime, setFormTime] = useState("");
  const [message, setMessage] = useState("");

  /* ---- Patient view ---- */
  const [patientViewId, setPatientViewId] = useState("");
  const [patientAppointments, setPatientAppointments] = useState([]);

  /* ---- Initial load ---- */
  useEffect(() => {
    fetchDoctors().then(setDoctors);
    fetchPatients().then(setPatients);
  }, []);

  /* ---- Fetch filtered appointments ---- */
  async function loadAppointments() {
    const data = await fetchAppointments({
      doctorId: selectedDoctor,
      date: selectedDate,
    });
    setAppointments(data);
  }

  /* ---- Create appointment ---- */
  async function submitAppointment() {
    setMessage("");

    const res = await createAppointment({
      doctor_id: formDoctor,
      patient_id: formPatient,
      appointment_time: formTime,
      status: "scheduled",
    });

    if (res.error || res.appointment_time) {
      setMessage("❌ Appointment conflict");
    } else {
      setMessage("✅ Appointment created");
      loadAppointments(); // refresh list
    }
  }

  /* ---- Load patient appointments ---- */
  async function loadPatientAppointments() {
    const res = await fetchAppointments({ patientId: patientViewId });
    setPatientAppointments(res);
  }

  return (
    <div style={{ padding: 24, maxWidth: 700 }}>
      <h1>Clinic Appointment System</h1>

      {/* ================================= */}
      {/* 1️⃣ DOCTOR + DATE APPOINTMENT LIST */}
      {/* ================================= */}
      <h2>Appointments</h2>

      <select
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
      >
        <option value="">Select doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name} ({d.specialization})
          </option>
        ))}
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <button onClick={loadAppointments} style={{ marginLeft: 10 }}>
        Load
      </button>

      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            <b>{new Date(a.time).toLocaleString()}</b>
            <br />
            Doctor: {a.doctor.name}
            <br />
            Patient: {a.patient.name}
            <br />
            Status: {a.status}
          </li>
        ))}
      </ul>

      <hr />

      {/* ========================== */}
      {/* 2️⃣ CREATE APPOINTMENT */}
      {/* ========================== */}
      <h2>Create Appointment</h2>

      <select onChange={(e) => setFormDoctor(e.target.value)}>
        <option value="">Select doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setFormPatient(e.target.value)}>
        <option value="">Select patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        onChange={(e) => setFormTime(e.target.value)}
      />

      <button onClick={submitAppointment}>Create</button>

      {message && <p>{message}</p>}

      <hr />

      {/* ========================== */}
      {/* 3️⃣ PATIENT APPOINTMENTS */}
      {/* ========================== */}
      <h2>Patient Appointments</h2>

      <select
        value={patientViewId}
        onChange={(e) => setPatientViewId(e.target.value)}
      >
        <option value="">Select patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <button onClick={loadPatientAppointments} style={{ marginLeft: 10 }}>
        Load
      </button>

      <ul>
        {patientAppointments.map((a) => (
          <li key={a.id}>
            {new Date(a.time).toLocaleString()} – Dr. {a.doctor.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
