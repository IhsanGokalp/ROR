import { useEffect, useState } from "react";
import { fetchDoctors, fetchPatients, createAppointment } from "./api";

export default function AppointmentForm() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDoctors().then(setDoctors);
    fetchPatients().then(setPatients);
  }, []);

  async function submit() {
    setMessage("");
    const res = await createAppointment({
      doctor_id: doctorId,
      patient_id: patientId,
      appointment_time: time,
      status: "scheduled",
    });

    if (res.error || res.appointment_time) {
      setMessage("❌ Booking failed (conflict)");
    } else {
      setMessage("✅ Appointment created");
    }
  }

  return (
    <div>
      <h3>Create Appointment</h3>

      <select onChange={(e) => setDoctorId(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <br />

      <select onChange={(e) => setPatientId(e.target.value)}>
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <br />

      <input type="datetime-local" onChange={(e) => setTime(e.target.value)} />

      <br />

      <button onClick={submit}>Create</button>

      {message && <p>{message}</p>}
    </div>
  );
}
