require './q_response'
class Game

  def initialize players
    @players = players
  end

  def start
  	puts @players[0][:connection].class
    @players.each {|con| con[:connection].put(:state, :start)}
    @players.each {|con| con[:connection].put(:playernames,  @players.map {|p| p[:name]})}
    @players[0][:connection].put(:color, :white)
    @players[1][:connection].put(:color, :black)
    @players[0][:connection].put(:your_turn, 1)
  end


  private

  # def self.out type, data
  # 	"event: #{type} \n data: #{data} \n\n"
  # end

end
