class AddDetailsToDoctors < ActiveRecord::Migration[7.1]
  def change
    add_column :doctors, :specialization, :string
    add_column :doctors, :office_number, :string
  end
end
