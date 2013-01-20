Quoridor::Application.routes.draw do
  devise_for :users

  match "/streaming" => SinatraQuoridor, :anchor => false
  root :to => "home#index"

end
