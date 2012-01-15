require "sinatra"
require "haml"
require "sinatra/reloader" if development?

get "/" do
  haml :index
end

post "/upload" do
  env["HTTP_X_FILE_NAME"].tap do
    file = request.body
    data = file.read
  end
end
