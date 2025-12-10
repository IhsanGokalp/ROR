class CreatePatients < ActiveRecord::Migration[7.1]
  def change
    create_table :patients do |t|
      t.string :name
      t.string :phone
      t.date :date_of_birth

      t.timestamps
    end
  end
end
