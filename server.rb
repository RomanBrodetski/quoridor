require './game'
require 'json'
class Quoridor < Sinatra::Base
  set server: 'thin', connections: [], port: 6666
  set :public_folder, File.dirname(__FILE__) + "/assets"
  set :player_count, 2
  set queue: []

  get '/' do
    haml :lobby
  end

  get '/stream', provides: 'text/event-stream' do
    puts "connection from #{params[:name]} accepted"
    stream :keep_open do |out|
      settings.connections << {:connection => out, :name => params[:name]}
      out.callback { settings.connections.delete(out) }

      if settings.connections.length >= settings.player_count
        @game = Game.new settings.connections.shift(settings.player_count)
        @game.start
      end

    end
  end




end
