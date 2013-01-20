class String
  def transpose
    "#{self[0]}#{(9 - self[1].to_i + (3 - self.length))}#{self[2]}"
  end

  def row
    self[1].to_i
  end

  def column
    self[0].to_i
  end

  def up? walls
    row > 1 && walls.grep(/[#{column}#{column - 1}]#{row-1}h/).empty?
  end

  def left? walls
    column > 1 && walls.grep(/#{column - 1}[#{row}#{row-1}]v/).empty?
  end

  def right? walls
    column < 9 && walls.grep(/#{column}[#{row}#{row-1}]v/).empty?
  end

  def down? walls
    row < 9 && walls.grep(/[#{column}#{column - 1}]#{row}h/).empty?
  end

  def up
    "#{column}#{row-1}"
  end

  def left
    "#{column-1}#{row}"
  end

  def right
    "#{column+1}#{row}"
  end

  def down
    "#{column}#{row+1}"
  end

end
