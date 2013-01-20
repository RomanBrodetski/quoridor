
class Game
  PLAYER_COUNT = 2

  def initialize players
    @players = players.inject({}) {|hash, p| hash[p.id] = p ; hash}
    @board = Board.new
  end

  def start
    @players.values[0].notify_start 0, @players.values.map(&:name)
    @players.values[1].notify_start 1, @players.values.map(&:name)

    @players.values[0].notify_possible_pawn_moves(@board.possible_pawn_moves(0))
    @players.values[1].notify_possible_pawn_moves(@board.possible_pawn_moves(1))

    @players.values[0].notify_your_turn(1)
    @players.values[1].notify_your_turn(0)

    @current_player_num = 0
  end

  def move(player_id, move)
    # return :error unless player == @players.keys[@current_player] todo
    move = @players[player_id].process_his_move(move)
    if @board.move(@current_player_num, move) == :win
      current_player.notify_win
      @players.values[next_player_num].notify_loss
    end
    advance_move
    current_player.notify_move(move)
    return :success
  end

  private

  def advance_move
    current_player.notify_your_turn(0)
    @current_player_num = next_player_num
    current_player.notify_your_turn(1)
    current_player.notify_possible_pawn_moves(@board.possible_pawn_moves(@current_player_num))
  end

  def next_player_num
    # (@current_player + 1) % PLAYER_COUNT
    1 - @current_player_num
  end

  def current_player
    @players.values[@current_player_num]
  end

#
#   def transpose str, player
#     str[1] = (9 - str[1].to_i + (3 - str.length) ).to_s if player == 1
#     return str
#   end
  # def by_id(id)
  #    @players.select { |p| p[:id] == id}[0]
  # end

  # private

  # def self.out type, data
  #   "event: #{type} \n data: #{data} \n\n"
  # end

end
