Quoridor::Application.routes.draw do
  match "/streaming" => SinatraQuoridor, :anchor => false
  match "/" => "home#index"

end
