# module QResponse

# 	def out type, data
# 		"event: #{type}\ndata: #{data.class == Hash ? data.to_json : data.to_s}\n\n"
# 		# "data: #{data} \n\n"
# 	end

# end

module Sinatra
	module Helpers
		class Stream
			def put type, data
				self << "event: #{type}\ndata: #{data.class == Hash ? data.to_json : data.to_s}\n\n"
			end
		end
	end
end