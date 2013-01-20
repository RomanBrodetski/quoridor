#coding: utf-8
require 'json'
require_relative 'connections_manager'
require_relative 'network_player'

class SinatraQuoridor < Sinatra::Base
  set :sessions, true

  set :connections, ConnectionsManager.new

  get '/random', provides: 'text/event-stream' do
    puts "connection from #{params[:name]} accepted: #{params[:id]}"
    puts User.find_by_id(session["warden.user.user.key"][1]).email
    # session[:user_id] = params[:id]s
    stream :keep_open do |out|
      # puts session[:user_id]
      # settings.connections << {:connection => out, :name => params[:name], :id => params[:id]}
      # out.callback { settings.connections.delete(out) }
    end
  end


  post '/move' do
    puts '/move'
    puts params[:move]
    id = params[:id]
    puts id
    settings.connections.games[id].move(id, params[:move])
    203
    # puts session[:user_id]
    # puts session[:game]
    # puts settings.games.select {|game| game.con[:id] == session[:user_id]}.inspect
  end
end
