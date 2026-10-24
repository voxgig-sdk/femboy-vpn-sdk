<?php
declare(strict_types=1);

// FemboyVpn SDK base feature

class FemboyVpnBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FemboyVpnContext $ctx, array $options): void {}
    public function PostConstruct(FemboyVpnContext $ctx): void {}
    public function PostConstructEntity(FemboyVpnContext $ctx): void {}
    public function SetData(FemboyVpnContext $ctx): void {}
    public function GetData(FemboyVpnContext $ctx): void {}
    public function GetMatch(FemboyVpnContext $ctx): void {}
    public function SetMatch(FemboyVpnContext $ctx): void {}
    public function PrePoint(FemboyVpnContext $ctx): void {}
    public function PreSpec(FemboyVpnContext $ctx): void {}
    public function PreRequest(FemboyVpnContext $ctx): void {}
    public function PreResponse(FemboyVpnContext $ctx): void {}
    public function PreResult(FemboyVpnContext $ctx): void {}
    public function PreDone(FemboyVpnContext $ctx): void {}
    public function PreUnexpected(FemboyVpnContext $ctx): void {}
}
