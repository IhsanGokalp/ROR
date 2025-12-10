const API_URL = "http://localhost:3000";

export async function fetchDoctors() {
  const res = await fetch(`${API_URL}/doctors`);
  return res.json();
}

export async function fetchAppointments({ doctorId, date }) {
  const params = new URLSearchParams();
  if (doctorId) params.append("doctor_id", doctorId);
  if (date) params.append("date", date);

  const res = await fetch(`${API_URL}/appointments?${params.toString()}`);
  return res.json();
}

export async function fetchPatients() {
  const res = await fetch(`${API_URL}/patients`);
  return res.json();
}

export async function createAppointment(data) {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appointment: data }),
  });
  return res.json();
}
