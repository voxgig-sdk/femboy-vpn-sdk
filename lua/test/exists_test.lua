-- FemboyVpn SDK exists test

local sdk = require("femboy-vpn_sdk")

describe("FemboyVpnSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
