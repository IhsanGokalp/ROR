class PatientsController < ApplicationController
  def index
    render json: Patient.all
  end

  def show
    render json: Patient.find(params[:id])
  end

  def create
    patient = Patient.create!(patient_params)
    render json: patient, status: :created
  end

  private

  def patient_params
    params.require(:patient)
          .permit(:name, :phone, :email, :date_of_birth)
  end

end
