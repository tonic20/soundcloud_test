class PagesController < ApplicationController
  def index
    @assets = Asset.all
  end
end

