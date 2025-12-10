class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:show, :update, :destroy]

  # GET /appointments
  def index
    appointments = Appointment.includes(:doctor, :patient)

    # 📅 date filter (örn: ?date=2025-12-10)
    if params[:date].present?
      date = Date.parse(params[:date])
      appointments = appointments.where(
        appointment_time: date.beginning_of_day..date.end_of_day
      )
    end

    # 👨‍⚕️ doctor filter (örn: ?doctor_id=1)
    if params[:doctor_id].present?
      appointments = appointments.where(doctor_id: params[:doctor_id])
    end

    # 🧑 patient filter (örn: ?patient_id=1)
    if params[:patient_id].present?
      appointments = appointments.where(patient_id: params[:patient_id])
    end

    if params[:today] == "true"
      date = Date.today
    end

    render json: appointments.map { |a| serialize(a) }
  end

  # GET /appointments/:id
  def show
    render json: @appointment.as_json(include: [:patient, :doctor])
  end

  # POST /appointments
  def create
    appointment = Appointment.new(appointment_params)
    if appointment.save
      render json: appointment, status: :created
    else
      render json: appointment.errors, status: :unprocessable_entity
    end
  end

  def update
    appointment = Appointment.find(params[:id])
    if appointment.update(appointment_params)
      render json: appointment
    else
      render json: appointment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /appointments/:id
  def destroy
    @appointment.destroy
    head :no_content
  end

  private

  def serialize(a)
    {
      id: a.id,
      time: a.appointment_time,
      status: a.status,
      doctor: {
        id: a.doctor.id,
        name: a.doctor.name,
        specialization: a.doctor.specialization
      },
      patient: {
        id: a.patient.id,
        name: a.patient.name,
        email: a.patient.email
      }
    }
  end

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end

  def appointment_params
    params.require(:appointment).permit(:appointment_time, :status, :patient_id, :doctor_id)
  end
end
