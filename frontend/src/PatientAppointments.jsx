import { useEffect, useState } from "react";

export default function PatientAppointments() {
  const [patientId, setPatientId] = useState("");
  const [appointments, setAppointments] = useState([]);

  async function load() {
    const res = await fetch(
      `http://localhost:3000/appointments?patient_id=${patientId}`
    );
    setAppointments(await res.json());
  }

  return (
    <div>
      <h3>Patient Appointments</h3>

      <input
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <button onClick={load}>Load</button>

      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            {new Date(a.time).toLocaleString()} — Dr. {a.doctor.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
