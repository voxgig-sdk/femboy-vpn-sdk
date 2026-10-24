<?php
declare(strict_types=1);

// FemboyVpn SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FemboyVpnMakeContext
{
    public static function call(array $ctxmap, ?FemboyVpnContext $basectx): FemboyVpnContext
    {
        return new FemboyVpnContext($ctxmap, $basectx);
    }
}
