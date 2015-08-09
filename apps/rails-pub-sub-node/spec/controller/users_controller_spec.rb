require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "POST #create" do
    it "creates a team" do
      params = {name: 'original_gangsta'}
      post :create, format: :json, user: params
      data = JSON.parse(response.body, symbolize_names: true)
      new_user = User.first
      expect(new_user.name).to eq('original_gangsta')
      expect(data[:name]).to eq('original_gangsta')
    end
  end

end