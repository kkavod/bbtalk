module BBTalk::Helpers
  module Kurento
    @@instance = nil

    def kurento
      @@instance ||= org.kurento.client.KurentoClient(config['kms_ws_uri'])
    end
  end
end
