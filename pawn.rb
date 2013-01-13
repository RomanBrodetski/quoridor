class Pawn
  attr_accessor :row, :column
  alias_method :col, :column

  def initialize options
    if str=options[:string]
      @row = str[1].to_i
      @column =str[0].to_i
    elsif options[:row] && options[:column]
      @row = options[:row]
      @column = options[:column]
    end
  end

  # def v?
  #   orientaion == 'v'
  # end
  def == other
    self.to_s == other.to_s
  end

  def up? walls
    @row > 1 && walls.grep(/[#{column}#{column - 1}]#{row-1}h/).empty?
  end
  def left? walls
    @column > 1 && walls.grep(/#{column - 1}[#{row}#{row-1}]v/).empty?
  end
  def right? walls
    @column < 9 && walls.grep(/#{column + 1}[#{row}#{row-1}]v/).empty?
  end
  def down? walls
    @row < 9 && walls.grep(/[#{column}#{column - 1}]#{row}h/).empty?
  end

  def up
    pawn = Pawn.new :row => row - 1, :column => column
  end

  def left
    pawn = Pawn.new :row => row, :column => column - 1
  end

  def right
    pawn = Pawn.new :row => row, :column => column + 1
  end

  def down
    pawn = Pawn.new :row => row + 1, :column => column
  end

  def moves walls, enemy_pawn
    result = []
    if self.up? walls
      result << self.up.to_s
    end
    if self.left? walls
      result << self.left.to_s
    end
    if self.right? walls
      result << self.right.to_s
    end
    if self.down? walls 
      result << self.down.to_s
    end
    return result
  end


  def to_s
    "#{@column}#{@row}#{@orientation}"
  end

end
