class AssetsController < ApplicationController
  protect_from_forgery :except => [:create, :destroy]

  def create
    filename = params[:qqfile]
    File.open("#{Rails.root}/tmp/#{filename}", "wb") do |f|
      f.write(request.raw_post)
    end

    @asset = Asset.new
    @asset.title = params[:title]
    @asset.attach = File.new("#{Rails.root.to_s}/tmp/#{filename}")
    @asset.save
    File.unlink("#{Rails.root}/tmp/#{filename}")

    render :layout => "respond_to_parent"
  end

  def destroy
    @asset = Asset.find(params[:id])
    @asset.destroy
  end
end

