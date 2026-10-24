// Typed models for the FemboyVpn SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Tariff {
  additional_device: string
  items: any[]
  max_devices: number
  mode: string
  packages: any[]
  version: number
}

export interface TariffListMatch {
  additional_device?: string
  items?: any[]
  max_devices?: number
  mode?: string
  packages?: any[]
  version?: number
}

