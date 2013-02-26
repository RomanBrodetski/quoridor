class EmConnectionManager

  include EventMachine::Deferrable

  def send(data, id = nil)
    data.each_line do |line|
      line = "data: #{line.strip}\n"
      @body_callback.call line
    end
    @body_callback.call "id: #{id}\n" if id
    @body_callback.call "\n"
  end

  def each(&blk)
    @body_callback = blk
  end

end
