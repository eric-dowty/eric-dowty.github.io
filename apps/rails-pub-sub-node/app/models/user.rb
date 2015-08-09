class User < ActiveRecord::Base
  validates :name, presence: true
  has_many :messages

  def self.create_new_user(name)
    user = User.find_or_create_by(name: name)
    user.update(color: random_color)
    user
  end

  def self.random_color
    ['FF66FF', 'FF6600', 'CC66FF', 'CC0066', '99FF66', '993366', '3333FF', '33FF00'].sample
  end

end