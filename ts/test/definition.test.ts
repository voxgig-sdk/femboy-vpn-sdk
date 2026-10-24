import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
