require "sinatra"
require "haml"
require "json"
require "sinatra/reloader" if development?

get "/" do
  haml :index
end

post "/upload" do
  content_type :json
  { filename: env["HTTP_X_FILE_NAME"] }.to_json
end
