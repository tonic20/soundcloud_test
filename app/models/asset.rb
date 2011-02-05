class Asset < ActiveRecord::Base
  attr_accessor :upload_id

  has_attached_file :attach

  default_scope order("created_at desc")

  def url
    attach.url(:original, false)
  end
end

