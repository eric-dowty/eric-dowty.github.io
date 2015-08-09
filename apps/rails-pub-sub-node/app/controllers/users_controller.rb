require 'json'

class UsersController < ApplicationController
  respond_to :json

  def create
    user = User.create_new_user(user_params[:name])
    $redis.publish('new_user', { name: user.name, color: user.color}.to_json )
    respond_with user, location: nil
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end

end