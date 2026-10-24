# frozen_string_literal: true

# Typed models for the FemboyVpn SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Tariff entity data model.
#
# @!attribute [rw] additional_device
#   @return [String]
#
# @!attribute [rw] items
#   @return [Array]
#
# @!attribute [rw] max_devices
#   @return [Integer]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] packages
#   @return [Array]
#
# @!attribute [rw] version
#   @return [Integer]
Tariff = Struct.new(
  :additional_device,
  :items,
  :max_devices,
  :mode,
  :packages,
  :version,
  keyword_init: true
)

# Request payload for Tariff#list.
#
# @!attribute [rw] additional_device
#   @return [String, nil]
#
# @!attribute [rw] items
#   @return [Array, nil]
#
# @!attribute [rw] max_devices
#   @return [Integer, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] packages
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
TariffListMatch = Struct.new(
  :additional_device,
  :items,
  :max_devices,
  :mode,
  :packages,
  :version,
  keyword_init: true
)

