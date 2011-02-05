class AssetsController < ApplicationController
  protect_from_forgery :except => [:create, :update, :destroy]

  def create
    filename = params[:qqfile]
    File.open("#{Rails.root}/tmp/#{filename}", "wb") do |f|
      f.write(request.raw_post)
    end

    @asset = Asset.new
    @asset.title = params[:title]
    @asset.upload_id = params[:upload_id]
    @asset.attach = File.new("#{Rails.root.to_s}/tmp/#{filename}")

    @asset.save
    File.unlink("#{Rails.root}/tmp/#{filename}")

    render :json => {:id => @asset.id, :url => @asset.url}
  end

  def update
    @asset = Asset.find(params[:id])
    @asset.update_attributes(params[:asset])
    render :text => ""
  end


  def destroy
    @asset = Asset.find(params[:id])
    @asset.destroy
  end
end

