class Doctor < ApplicationRecord
  has_many :appointments, dependent: :destroy

  validates :name, presence: true
  validates :specialization, presence: true
end
