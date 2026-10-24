-- FemboyVpn SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FemboyVpn",
      slug = "femboy-vpn",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://femboyvpn.connecto.lol/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["tariff"] = {},
      },
    },
    entity = {
      ["tariff"] = {
        ["fields"] = {
          {
            ["name"] = "additional_device",
            ["title"] = "Additional Device",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Price of one additional device, as a decimal string (observed \"25\").",
          },
          {
            ["name"] = "items",
            ["title"] = "Items",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Headline packages (observed: the 3-device packages for 1, 3, 6 and 12 months).",
          },
          {
            ["name"] = "max_devices",
            ["title"] = "Max Devices",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Maximum number of devices per subscription.",
          },
          {
            ["name"] = "mode",
            ["title"] = "Mode",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Service mode (observed \"production\").",
          },
          {
            ["name"] = "packages",
            ["title"] = "Packages",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Every package: each term (1, 3, 6, 12 months) for each device tier (3, 5, 10, 15 observed).",
          },
          {
            ["name"] = "version",
            ["title"] = "Version",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Tariff sheet version (observed 1).",
          },
        },
        ["name"] = "tariff",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/tariffs",
                ["segments"] = {
                  {
                    ["lit"] = "public",
                  },
                  {
                    ["lit"] = "tariffs",
                  },
                },
                ["parts"] = {
                  "public",
                  "tariffs",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
