
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FemboyVpnSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FemboyVpnSDK.test()
    equal(testsdk instanceof FemboyVpnSDK, true,
      'FemboyVpnSDK.test() must return a client synchronously')
  })

})
