# FemboyVpn SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FemboyVpnFeatures
  def self.make_feature(name)
    case name
    when "base"
      FemboyVpnBaseFeature.new
    when "ratelimit"
      FemboyVpnRatelimitFeature.new
    when "retry"
      FemboyVpnRetryFeature.new
    when "test"
      FemboyVpnTestFeature.new
    when "timeout"
      FemboyVpnTimeoutFeature.new
    else
      FemboyVpnBaseFeature.new
    end
  end
end
