-- Typed models for the FemboyVpn SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Tariff
---@field additional_device string
---@field items table
---@field max_devices number
---@field mode string
---@field packages table
---@field version number

---@class TariffListMatch
---@field additional_device? string
---@field items? table
---@field max_devices? number
---@field mode? string
---@field packages? table
---@field version? number

local M = {}

return M
