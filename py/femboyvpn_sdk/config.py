# FemboyVpn SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FemboyVpn",
            "slug": "femboy-vpn",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://femboyvpn.connecto.lol/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "tariff": {},
            },
        },
        "entity": {
      "tariff": {
        "fields": [
          {
            "name": "additional_device",
            "title": "Additional Device",
            "type": "`$STRING`",
            "req": True,
            "short": "Price of one additional device, as a decimal string (observed \"25\").",
          },
          {
            "name": "items",
            "title": "Items",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Headline packages (observed: the 3-device packages for 1, 3, 6 and 12 months).",
          },
          {
            "name": "max_devices",
            "title": "Max Devices",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Maximum number of devices per subscription.",
          },
          {
            "name": "mode",
            "title": "Mode",
            "type": "`$STRING`",
            "req": True,
            "short": "Service mode (observed \"production\").",
          },
          {
            "name": "packages",
            "title": "Packages",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Every package: each term (1, 3, 6, 12 months) for each device tier (3, 5, 10, 15 observed).",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Tariff sheet version (observed 1).",
          },
        ],
        "name": "tariff",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/public/tariffs",
                "segments": [
                  {
                    "lit": "public",
                  },
                  {
                    "lit": "tariffs",
                  },
                ],
                "parts": [
                  "public",
                  "tariffs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
