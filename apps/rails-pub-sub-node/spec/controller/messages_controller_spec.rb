require 'rails_helper'

RSpec.describe MessagesController, type: :controller do

  before(:each) do
    @user = User.create(name: 'original_gangsta')
  end

  describe "POST #create" do
    it 'can create a message' do
      params = {user_name: @user.name, body: 'a new message'}
      post :create, format: :json, message: params
      data = JSON.parse(response.body, symbolize_names: true)
      new_message = Message.first
      expect(new_message.body).to eq('a new message')
      expect(data[:user_id]).to eq(@user.id)
      expect(data[:body]).to eq('a new message')
    end
  end

  describe "GET #index" do
    it 'can get all messages' do
      3.times { Message.create(user_id: @user.id, body: 'a new message') }
      get :index, format: :json
      data = JSON.parse(response.body, symbolize_names: true)
      expect(data.length).to eq(3)
      expect(data.first[:body]).to eq('a new message')
    end
  end

end