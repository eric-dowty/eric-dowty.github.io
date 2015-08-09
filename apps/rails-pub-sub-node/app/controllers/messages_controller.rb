require 'json'

class MessagesController < ApplicationController
  respond_to :json

  def index
    respond_with Message.all, location: nil
  end

  def create
    user_id = User.find_by(name: message_params[:user_name]).id
    message = Message.create(user_id: user_id, body: message_params[:body])
    $redis.publish('new_message', "<span style='color:#{message.user.color}'>#{message.user.name}:</span> #{message.body}")
    respond_with message, location: nil
  end

  private

  def message_params
    params.require(:message).permit(:user_name, :body)
  end

end