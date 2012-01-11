require "bundler"
Bundler.require

$LOAD_PATH.unshift(File.dirname(__FILE__))
require "jquery-attach"

run Sinatra::Application
