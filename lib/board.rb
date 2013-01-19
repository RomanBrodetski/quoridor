class Board
  attr_reader :pawns, :walls

  def initialize
    @pawns = ["59", "51"]
    @walls = []
  end

  def move player_index, move
    if move.length == 3 #wall
      @walls << move
    else #pawn
      @pawns[player_index] = move
    end
    return :success unless move.row == (player_index == 0 ? 9 : 1)
    return :win
  end

  def possible_pawn_moves index
    pawn = @pawns[index]
    enemy_pawn = @pawns[1-index]
    result = []
    directions = %w[up right down left]
    directions.each_with_index do |dir, index|
      if pawn.send(:"#{dir}?", walls)
        if enemy_pawn == pawn.send(dir.to_sym)
          if pawn.send(dir.to_sym).send(:"#{dir}?", walls)
            result << pawn.send(dir.to_sym).send(dir.to_sym)
          else
            if pawn.send(dir.to_sym).send(:"#{directions[(index - 1) % 4]}?", walls)
              result << pawn.send(dir.to_sym).send(directions[(index - 1) % 4].to_sym)
            end
            if pawn.send(dir.to_sym).send(:"#{directions[(index + 1) % 4]}?", walls)
              result << pawn.send(dir.to_sym).send(directions[(index + 1) % 4].to_sym)
            end
          end
        else
          result << pawn.send(dir.to_sym)
        end
      end
    end
    result

    #e.g. if pawn.up?(walls)
    #   if enemy_pawn == pawn.up
    #     puts "-> enemy_pawn == self.up"
    #     if pawn.up.up? walls
    #       puts "-> self.up.up? walls"
    #       result << pawn.up.up
    #     else
    #       result << pawn.up.left if pawn.up.left? walls
    #       result << pawn.up.right if pawn.up.right? walls
    #     end
    #   else
    #     result << pawn.up
    #   end

  end

  private
end
