# require './q_response'

class NetworkPlayer
  attr_reader :name, :id

  def initialize options
      @c = options[:connection]
      @name = options[:name]
      @id = options[:id]
  end

  def process_his_move move
     @player_number == 1 ? move.transpose : move
  end

  def notify_start player_number, player_names
     @player_number = player_number
     @c.put(:state, :start)
     @c.put(:playernames, player_names)
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
  end

  def notify_loss
  end

  private

end
