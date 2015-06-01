class BBTalk::API
  resource :test_pubsub do
    desc "Add pubsub client"
    get 'publish' do
      faye_client = Faye::Client.new("http://localhost:9494/pubsub")
      faye_client.publish('/mychannel', {:message => "Bore Gadol"})
      { :ok => true }
    end
  end
end

Thread.new {
  kurento = org.kurento.client.KurentoClient.create('ws://localhost:8888/kurento')

  pipeline = kurento.createMediaPipeline

  composite = org.kurento.client.Composite::Builder.new(pipeline).build

  EM.run {
    faye_client = Faye::Client.new("http://localhost:9494/pubsub")
    faye_client.subscribe('/room') do |message|
      case message['message']
        when 'user-joined'
          endpoint = org.kurento.client.WebRtcEndpoint::Builder.new(pipeline).build
          endpoint.addOnIceGatheringDoneListener do |event|
            answer = {
              :message => "user-registered",
              :sdpAnswer => endpoint.getLocalSessionDescriptor
            }
            faye_client.publish("/room/#{message['userName']}", answer)
          end

          hub_port = org.kurento.client.HubPort::Builder.new(composite).build
          endpoint.connect(hub_port)
          hub_port.connect(endpoint)

          endpoint.processOffer(message['sdpOffer'])
          endpoint.gatherCandidates
      end
      puts "Received message on /room [#{message}]";
    end
  }

  pipeline.release
}
