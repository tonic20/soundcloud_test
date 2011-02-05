require 'bundler/capistrano'

set :default_environment, {
  'PATH' => "/home/deploy/.rvm/gems/ree-1.8.7-2010.02/bin:/home/deploy/.rvm/gems/ree-1.8.7-2010.02@global/bin:/home/deploy/.rvm/rubies/ree-1.8.7-2010.02/bin:/home/deploy/.rvm/bin:$PATH",
  'RUBY_VERSION' => 'ruby 1.8.7',
  'GEM_HOME'     => '/home/deploy/.rvm/gems/ree-1.8.7-2010.02',
  'GEM_PATH'     => '/home/deploy/.rvm/gems/ree-1.8.7-2010.02:/home/deploy/.rvm/gems/ree-1.8.7-2010.02@global',
  'BUNDLE_PATH'  => '/home/deploy/.rvm/gems/ree-1.8.7-2010.02'
}

set :application, "soundcloud_test"
set :scm, :git
set :repository,  "git@github.com:tonic20/soundcloud_test.git"
set :user, "deploy"
set :deploy_via, :remote_cache
set :deploy_to, "/opt/kopylov.net/soundcloud/"
set :branch, "master"

role :web, "penzasoft.com"
role :app, "penzasoft.com"
role :db,  "penzasoft.com", :primary => true

after "deploy", "deploy:migrate"
after "deploy", "deploy:cleanup"

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

