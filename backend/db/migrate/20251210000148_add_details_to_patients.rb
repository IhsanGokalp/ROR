class AddDetailsToPatients < ActiveRecord::Migration[7.1]
  def change
    add_column :patients, :email, :string
  end
end
