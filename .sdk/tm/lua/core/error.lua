-- FemboyVpn SDK error

local json = require("dkjson")

local FemboyVpnError = {}
FemboyVpnError.__index = FemboyVpnError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function FemboyVpnError.new(code, msg, ctx)
  local self = setmetatable({}, FemboyVpnError)
  self.is_sdk_error = true
  self.sdk = "FemboyVpn"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function FemboyVpnError:context()
  return CONTEXT[self]
end


function FemboyVpnError:error()
  return self.msg
end


function FemboyVpnError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function FemboyVpnError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function FemboyVpnError:to_json()
  return json.encode(self:to_table())
end


function FemboyVpnError:__tostring()
  return self.msg
end


function FemboyVpnError.__tojson(self)
  return self:to_json()
end


return FemboyVpnError
