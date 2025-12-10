class Appointment < ApplicationRecord
  belongs_to :patient
  belongs_to :doctor

  validates :appointment_time, presence: true
  validate :doctor_not_double_booked
  validate :patient_not_double_booked

  private

  def doctor_not_double_booked
    if Appointment
        .where(doctor_id: doctor_id, appointment_time: appointment_time)
        .where.not(id: id)
        .exists?
      errors.add(:appointment_time, "Doctor is not available at this time")
    end
  end

  def patient_not_double_booked
    if Appointment
        .where(patient_id: patient_id, appointment_time: appointment_time)
        .where.not(id: id)
        .exists?
      errors.add(:appointment_time, "Patient already has an appointment at this time")
    end
  end
end
