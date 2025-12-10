class AddUniqueIndexToAppointments < ActiveRecord::Migration[7.1]
  def change
  add_index :appointments,
            [:doctor_id, :appointment_time],
            unique: true
  end

end
