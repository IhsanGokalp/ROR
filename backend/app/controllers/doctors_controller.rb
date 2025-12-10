class DoctorsController < ApplicationController
  def index
    render json: Doctor.all
  end

  def show
    render json: Doctor.find(params[:id])
  end

  def create
    doctor = Doctor.new(doctor_params)
    if doctor.save
      render json: doctor, status: :created
    else
      render json: doctor.errors, status: :unprocessable_entity
    end
  end

  private

  def doctor_params
    params.require(:doctor)
            .permit(:name, :specialization, :office_number)
  end

end
