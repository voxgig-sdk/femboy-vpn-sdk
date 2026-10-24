<?php
declare(strict_types=1);

// FemboyVpn SDK configuration

class FemboyVpnConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FemboyVpn",
                "slug" => "femboy-vpn",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://femboyvpn.connecto.lol/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "tariff" => [],
                ],
            ],
            "entity" => [
        'tariff' => [
          'fields' => [
            [
              'name' => 'additional_device',
              'title' => 'Additional Device',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Price of one additional device, as a decimal string (observed "25").',
            ],
            [
              'name' => 'items',
              'title' => 'Items',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Headline packages (observed: the 3-device packages for 1, 3, 6 and 12 months).',
            ],
            [
              'name' => 'max_devices',
              'title' => 'Max Devices',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Maximum number of devices per subscription.',
            ],
            [
              'name' => 'mode',
              'title' => 'Mode',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Service mode (observed "production").',
            ],
            [
              'name' => 'packages',
              'title' => 'Packages',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Every package: each term (1, 3, 6, 12 months) for each device tier (3, 5, 10, 15 observed).',
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Tariff sheet version (observed 1).',
            ],
          ],
          'name' => 'tariff',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/tariffs',
                  'segments' => [
                    [
                      'lit' => 'public',
                    ],
                    [
                      'lit' => 'tariffs',
                    ],
                  ],
                  'parts' => [
                    'public',
                    'tariffs',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FemboyVpnFeatures::make_feature($name);
    }
}
