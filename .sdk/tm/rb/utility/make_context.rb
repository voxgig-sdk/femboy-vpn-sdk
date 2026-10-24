# FemboyVpn SDK utility: make_context
require_relative '../core/context'
module FemboyVpnUtilities
  MakeContext = ->(ctxmap, basectx) {
    FemboyVpnContext.new(ctxmap, basectx)
  }
end
