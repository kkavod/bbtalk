require File.dirname(__FILE__) + "/app/main.rb"

if ENV['RACK_ENV'].eql? :production
  use Rack::Deflater   # gzip compression
end

# Enabling WebSocket signaling
Faye::WebSocket.load_adapter 'puma'
use Faye::RackAdapter, :mount => '/pubsub'

map '/' do
  run BBTalk::API
end
