require 'json'

class UsersController < ApplicationController
  respond_to :json

  def create
    user = User.find_or_create_by(user_params)
    respond_with user, location: nil
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end

end