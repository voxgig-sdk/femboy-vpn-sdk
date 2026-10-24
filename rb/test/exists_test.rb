# FemboyVpn SDK exists test

require "minitest/autorun"
require_relative "../FemboyVpn_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FemboyVpnSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
