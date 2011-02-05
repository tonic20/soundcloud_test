class DropUsers < ActiveRecord::Migration
  def self.up
    drop_table :users
  end

  def self.down
    create_table :users do |t|
      t.string :name
      t.timestamps
    end
  end
end

