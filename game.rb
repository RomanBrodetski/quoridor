require './q_response'
class Game
  PLAYER_COUNT = 2

  def initialize players
    @players = players.inject({}) {|hash, p| hash[p[:id]] = p ; hash}
  end

  def start
    # puts @players.values
    @blocks = []
    @players.values.each {|con| con[:connection].put(:state, :start)}
    @players.values.each {|con| con[:connection].put(:playernames,  @players.values.map {|p| p[:name]})}
    @players.values[0][:connection].put(:color, :white)
    @players.values[1][:connection].put(:color, :black)
    @players.values[0][:connection].put(:your_turn, 1)
    @current_player = 0
  end

  def move(player, move)
    puts @players[player][:name]
    puts move 
    puts player
    puts @players.keys[@current_player]    
    return :error unless player == @players.keys[@current_player]
    puts 'wow'
    @blocks << move
    advance_move
    @players.values[@current_player][:connection].put :move, move
    return :success
  end

  def brandwidth type, msg
    @players.values.each do |p|
    	p[:connection].put type, msg
    end
  end

def advance_move
    @players.values[@current_player][:connection].put(:your_turn, 0)
    @current_player = (@current_player + 1) % PLAYER_COUNT
    @players.values[@current_player][:connection].put(:your_turn, 1)
end

  # def by_id(id)
  # 	 @players.select { |p| p[:id] == id}[0]
  # end

  # private

  # def self.out type, data
  # 	"event: #{type} \n data: #{data} \n\n"
  # end

end
