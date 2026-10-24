"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "tariff",
        "accessor": "Tariff",
        "op": "list",
        "method": "GET",
        "path": "/public/tariffs",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "additional_device": "25",
            "items": [
                {
                    "amount": "300",
                    "currency": "RUB",
                    "days": 30,
                    "devices": 3,
                    "months": 1
                }
            ],
            "max_devices": 100,
            "mode": "production",
            "packages": [
                {
                    "amount": "300",
                    "currency": "RUB",
                    "days": 30,
                    "devices": 3,
                    "months": 1
                },
                {
                    "amount": "350",
                    "currency": "RUB",
                    "days": 30,
                    "devices": 5,
                    "months": 1
                }
            ],
            "version": 1
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map