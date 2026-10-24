"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FemboyVpn',
        slug: "femboy-vpn",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://femboyvpn.connecto.lol/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            tariff: {},
        }
    };
    entity = {
        "tariff": {
            "fields": [
                {
                    "name": "additional_device",
                    "title": "Additional Device",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Price of one additional device, as a decimal string (observed \"25\")."
                },
                {
                    "name": "items",
                    "title": "Items",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Headline packages (observed: the 3-device packages for 1, 3, 6 and 12 months)."
                },
                {
                    "name": "max_devices",
                    "title": "Max Devices",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Maximum number of devices per subscription."
                },
                {
                    "name": "mode",
                    "title": "Mode",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Service mode (observed \"production\")."
                },
                {
                    "name": "packages",
                    "title": "Packages",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Every package: each term (1, 3, 6, 12 months) for each device tier (3, 5, 10, 15 observed)."
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Tariff sheet version (observed 1)."
                }
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
                                    "lit": "public"
                                },
                                {
                                    "lit": "tariffs"
                                }
                            ],
                            "parts": [
                                "public",
                                "tariffs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map