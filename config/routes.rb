Quoridor::Application.routes.draw do
  devise_for :users
  root :to => "home#index"
  # mount SinatraQuoridor => "/streaming"
  match "/streaming" => SinatraQuoridor, :anchor => false
  match "/users/:id" => "users#show"
end
