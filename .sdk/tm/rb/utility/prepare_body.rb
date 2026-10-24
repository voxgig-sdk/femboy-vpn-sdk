# FemboyVpn SDK utility: prepare_body
require_relative 'media'
module FemboyVpnUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FemboyVpnUtilities.raw_body(ctx.reqdata) if FemboyVpnUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
