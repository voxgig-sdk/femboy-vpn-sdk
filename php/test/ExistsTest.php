<?php
declare(strict_types=1);

// FemboyVpn SDK exists test

require_once __DIR__ . '/../femboyvpn_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FemboyVpnSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
