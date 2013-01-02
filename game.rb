require './q_response'
class Game
  include QResponse

  def initialize players
    @players = players
  end

  def start
    @players.each {|con| con[:connection] << out(:state, :start)}
    @players.each {|con| con[:connection] << out(:meta,  @players.map {|p| p[:name]})}
  end


  private

  # def self.out type, data
  # 	"event: #{type} \n data: #{data} \n\n"
  # end

end
