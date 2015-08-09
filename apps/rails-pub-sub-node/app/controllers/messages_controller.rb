require 'json'

class MessagesController < ApplicationController
  respond_to :json

  def index
    respond_with Message.all, location: nil
  end

  def create
    message = Message.create(message_params)
    $redis.publish('new_message', "#{message.user.name}: #{message.body}")
    respond_with message, location: nil
  end

  private

  def message_params
    params.require(:message).permit(:user_id, :body)
  end

end