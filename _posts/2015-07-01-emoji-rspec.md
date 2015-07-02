---
layout: post
title: Using Emoji Rspec
cover: cover.jpg
date:   2015-07-01 12:00:00
categories: posts
---

We all want to class up our test suites now and again. For this I like to incorporate emoji's into my RSpec testing with the emoji-rspec gem. No more boring red and green text! For source code to this problem visit my [GitHub account](https://github.com/eric-dowty/eric-dowty.github.io/tree/master/git-repos/example-emoji-rspec).  

### Part 1: Create a new Rails app with an RSpec test suite

First create a new Rails application by enter the following command in your terminal. The -T at the end tells Rails not to initialize the app with Test::Unit:

```rails new example-emoji-rspec -T
```

Next, change directory into the app and open it in your text editor. 

Then add the following to your Gemfile:

```gem 'rspec-rails'
```

Then from the terminal run:

```bundle install
```

```rails g rspec:install
```

Now that we have and RSpec test suite setup we need to write some tests before we can incorporate the emojis.

### Part 2: Create a basic RSpec test file

Now we will create a simple RSpec test file and see what the output looks like. Create a file called example_spec.rb in the 'spec' folder with the following command in the terminal:

```touch spec/example_spec.rb
```

Then add the following code to the example_spec.rb file:

```ruby
require 'rails_helper'
RSpec.describe "an example test" do
  it "passes this test" do
    expect(true).to eq(true)
  end
  it "fails this test" do
    expect(true).to eq(false)
  end
end
```

Next run the following command from the terminal:

```rake spec
```

You should see an output that looks like the following picture:

<center>
![RSpec Test](/images/2015-07-01/no-emoji.png)
</center>

We now have our RSpec test up and running, however, it isn't very informative so in the next section we'll add some configuration to give us a better output.

### Part 3: Configure RSpec output

To configure our RSpec output we'll first modify the .rspec file at the root of the folder. Open the .rspec file and add the following to make the RSpec output in the terminal print out each test description:

```
--format documentation
```

Next open the spec_helper.rb file in the 'spec' folder. Within the 'RSpec.configure do' block add the following to eliminate unnecessary RSpec output:

```config.backtrace_exclusion_patterns << /\.rvm\/gems/
```

Next run the test again by entering the following command in the terminal:

```rake spec
```

You should see the following output:

<center>
![RSpec Formatted](/images/2015-07-01/test-formatted.png)
</center>

Now that we have a working test and it is formatted the way we want it, it's time to add some emojis!

### Part 4: Adding emojis to the test output

We'll be using a gem called emoji-rspec. For more information on emoji-rspec visit [the emoji-rspec GitHub repo](https://github.com/carhartl/emoji-rspec.git)

Now add the following to your Gemfile:

```gem 'emoji-rspec', git: "git@github.com:carhartl/emoji-rspec.git", branch: "rspec-3"
```

Then from the terminal run:

```bundle install
```

Next open the .rspec file and add the following:

```
--require emoji-rspec
--format hearts
```
Remember to move the --format documentation to the bottom of the .rspec file or the formatting of the emojis may come out a bit off!!!

Next run the test again by entering the following command in the terminal:

```rake spec
```

You did it! You should see the following output: 

<center>
![RSpec with Emojis](/images/2015-07-01/emojis.png)
</center>

I like to use the heart emojis, however there are several more you can use by simply changing the '--format hearts' to something else in the .rspec file. For example if I change it to:

```
--format celebrate 
```

My output will now look like:

<center>
![RSpec Celebrate Emojis](/images/2015-07-01/celebrate.png)
</center>

For a complete description of the different emoji formats within this gem visit [the emoji-rspec GitHub repo](https://github.com/carhartl/emoji-rspec.git)