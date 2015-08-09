class Message < ActiveRecord::Base
  validates :user_id, :body, presence: true
  belongs_to :user
end