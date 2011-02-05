class Asset < ActiveRecord::Base
  has_attached_file :attach

  default_scope order("created_at desc")

  def url
    attach.url(:original, false)
  end
end

