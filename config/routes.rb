SoundcloudTest::Application.routes.draw do
  resources :assets

  root :to => "pages#index"
end

