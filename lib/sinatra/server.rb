#coding: utf-8
require 'json'
require_relative 'connections_manager'
require_relative 'network_player'

class SinatraQuoridor < Sinatra::Base
  # register Sinatra::Namespace
  set :sessions, true
  set :connections, ConnectionsManager.new

  before do
    # puts "--->" + request.path_info
    break unless request.path_info.starts_with? '/random'
    # puts "Sinatra before filter!"
    @user = User.find_by_id (session["warden.user.user.key"][1])
  end


  get '/random', provides: 'text/event-stream' do
    # puts ">---" + request.path_info
    # puts "connection from #{params[:name]} accepted: #{params[:id]}"
    # session[:user_id] = params[:id]s
    stream :keep_open do |out|
      EventMachine::PeriodicTimer.new(20) { out << "ping: \n\n" } #prevent browsers from disconnection
      settings.connections << {:connection => out, :user => @user}
      out.callback { puts 'for what?' }
    end
  end

  post '/move' do
    settings.connections.games[@user.id].move(@user.id, params[:move])
    203
    # puts session[:user_id]
    # puts session[:game]
    # puts settings.games.select {|game| game.con[:id] == session[:user_id]}.inspect
  end
end
