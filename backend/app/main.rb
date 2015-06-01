require 'rubygems'
require 'jbundler'
require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'] || :development)

module BBTalk; end

require_relative 'helpers/config'
require_relative 'helpers/kurento'

class BBTalk::API < Grape::API
  format :json

  options '/*' do
    200
  end

  helpers BBTalk::Helpers::Config
  helpers BBTalk::Helpers::Kurento
  helpers BBTalk::Helpers
end

require_relative 'api/pubsub'
