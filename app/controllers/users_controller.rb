class HomeController < ApplicationController

  protect_from_forgery

  def show
    @user = User.find_by_id(params[:id])
  end

end

