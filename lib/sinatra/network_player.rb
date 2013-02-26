require_relative 'q_response'

class NetworkPlayer
  attr_reader :user

  def initialize options
      @c = options[:connection]
      @user = options[:user]
      puts "NetworkPlayer initialized: #{@user.email}"
  end

  def process_his_move move
     @player_number == 1 ? move.transpose : move
  end

  def notify_start player_number, players
     @player_number = player_number
     @c.put(:state, :start)
     @c.put(:playernames, players.map {|player| [player._id, player.name]})
  end

  def notify_your_turn val #0|1
    @c.put(:your_turn, val)
  end

  def notify_move move
    @c.put(:move, @player_number == 1 ? move.transpose : move )
  end

  def notify_possible_pawn_moves moves
    @c.put(:pawn_moves, @player_number == 1 ? moves.map(&:transpose) : moves)
  end

  def notify_win
    puts 'win'
    @c.put(:state, :win)
  end

  def notify_defeat
    @c.put(:state, :defeat)
  end

  private

end
