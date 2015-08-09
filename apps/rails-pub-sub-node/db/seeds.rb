class Seed

  def self.go
    create_guest_account
  end

  def self.create_guest_account
    User.create(name: 'Guest', color: 'FF00CC')
  end

end

Seed.go