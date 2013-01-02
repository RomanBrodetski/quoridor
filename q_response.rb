module QResponse

	def out type, data
		"event: #{type}\ndata: #{data.class == Hash ? data.to_json : data.to_s}\n\n"
		# "data: #{data} \n\n"
	end

end