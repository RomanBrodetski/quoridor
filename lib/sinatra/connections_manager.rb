class ConnectionsManager
  attr_reader :games
  PLAYER_COUNT = 2

  def initialize
    @cons = []
    @games = {}
  end

  def << connection
    # puts 'adding connection'
    # con =  @cons.select {|con| con[:user].id == connection[:user].id}[0]
    # con = @cons << connection
    # unless
    #     @cons
    # puts "<< called: #{connection}"
    @cons << connection
    arrange_games
    self
  end

  def arrange_games
    if @cons.length >= PLAYER_COUNT
      connections =  @cons.shift(PLAYER_COUNT)
      game = Game.new connections.map{|con| NetworkPlayer.new con}
      game.start
      connections.each {|con| @games[con[:user].id] = game}
    end
  end

  # def game id
  # 	return games[id]
  # end

end
