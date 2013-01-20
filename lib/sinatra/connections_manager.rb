class ConnectionsManager
  attr_reader :games
  PLAYER_COUNT = 2

  def initialize
    @cons = []
    @games = {}
  end

  def << connection
    @cons << connection
    arrange_games
    self
  end

  def arrange_games
    if @cons.length >= PLAYER_COUNT
      connections =  @cons.shift(PLAYER_COUNT)
      game = Game.new connections.map{|con| NetworkPlayer.new con}
      # connections.each {|con| con[:session][:game] = @game}
      # puts connections.map {|q| q[:session][:game].to_yaml}
      game.start
      connections.each {|con| @games[con[:id]] = game}
    end
  end

  # def game id
  # 	return games[id]
  # end

end
