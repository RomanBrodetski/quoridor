require './q_response'
require './pawn'
class Game
  PLAYER_COUNT = 2

  def initialize players
    @players = players.inject({}) {|hash, p| hash[p[:id]] = p ; hash}
  end

  def start
    # puts @players.values
    @walls = []
    @players.values[0][:pawn] = Pawn.new :string => "59"
    @players.values[1][:pawn] = Pawn.new :string => "51"
    @players.values.each_with_index {|con, index| con[:connection].put(:pawn_moves,  con[:pawn].moves(@walls, nil).map {|move| transpose(move, index)})}
    @players.values.each {|con| con[:connection].put(:state, :start)}
    @players.values.each {|con| con[:connection].put(:playernames,  @players.values.map {|p| p[:name]})}
    # @players.values[0][:connection].put(:color, :white)
    # @players.values[1][:connection].put(:color, :black)
    @players.values[0][:connection].put(:your_turn, 1)
    @current_player = 0
  end

  def move(player, move)
    return :error unless player == @players.keys[@current_player]
    move = transpose(move, @current_player)
    # puts @players[player][:name]
    # puts move
    # puts player
    # puts @players.keys[@current_player]
    # puts 'wow'
    if move.length == 3
      @walls << move
      advance_move
      @players.values[@current_player][:connection].put :move, transpose(move, @current_player)
    else
      @players.values[@current_player][:pawn] = Pawn.new :string => move
      advance_move #todo: methods current_player. other_player
      @players.values[@current_player][:connection].put :move, transpose(move, @current_player)
    end
    return :success
  end

  def advance_move
    @players.values[@current_player][:connection].put(:your_turn, 0)
    @current_player = next_player
    @players.values[@current_player][:connection].put(:your_turn, 1)
    @players.values[@current_player][:connection].put(:pawn_moves,  @players.values[@current_player][:pawn].moves(@walls, @players.values[next_player][:pawn]).map {|move| transpose(move, @current_player)})
  end

  def next_player
    (@current_player + 1) % PLAYER_COUNT
  end


  def transpose str, player
    puts player
    puts str
    if player == 1
      str[1] = (9 - str[1].to_i + (3 - str.length) ).to_s
      puts str
    end
    return str
  end
  # def by_id(id)
  #    @players.select { |p| p[:id] == id}[0]
  # end

  # private

  # def self.out type, data
  #   "event: #{type} \n data: #{data} \n\n"
  # end

end
