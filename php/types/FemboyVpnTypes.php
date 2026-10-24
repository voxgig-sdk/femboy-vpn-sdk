<?php
declare(strict_types=1);

// Typed models for the FemboyVpn SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Tariff entity data model. */
class Tariff
{
    public string $additional_device;
    public array $items;
    public int $max_devices;
    public string $mode;
    public array $packages;
    public int $version;
}

/** Request payload for Tariff#list. */
class TariffListMatch
{
    public ?string $additional_device = null;
    public ?array $items = null;
    public ?int $max_devices = null;
    public ?string $mode = null;
    public ?array $packages = null;
    public ?int $version = null;
}

