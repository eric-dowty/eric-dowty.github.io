---
layout: post
title: A Simple Session Cart in Rails
cover: cover.jpg
date:   2015-06-11 12:00:00
categories: posts
---

Hey all! This post is about implementing a simple session cart in Rails. What do we mean by a session cart you may ask?! Simply put we will be storing hash values in the browser session which we can then access and modify as we are deciding what we want in our cart. Think about it like a cart in an ecommerce site. For source code to this problem visit my [GitHub account](https://github.com/eric-dowty/simple-rails-cart).  

### Part 1: Create a new Rails app.

First create a new Rails application by enter the following command in your terminal:

```rails new simple-cart
```

change directory into the app and open it in your text editor.
