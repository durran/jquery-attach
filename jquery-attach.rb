require "sinatra"
require "haml"
require "sinatra/reloader" if development?

get "/" do
  haml :index
end

post "/upload" do
  name = env["HTTP_X_FILE_NAME"]
  file = request.body
  data = file.read
end
