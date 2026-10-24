

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FemboyVpnSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TariffEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FEMBOY_VPN_TEST_LIVE=TRUE.
  afterEach(liveDelay('FEMBOY_VPN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FemboyVpnSDK.test()
    const ent = testsdk.Tariff()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('tariff hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FemboyVpnSDK.test(offline).Tariff().stream('list')) { }
    }, /offline/)

    for await (const _item of FemboyVpnSDK.test(offline).Tariff()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FemboyVpnSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Tariff().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FemboyVpnSDK.test().Tariff().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FemboyVpnSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Tariff().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Tariff().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FemboyVpnSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Tariff().list({"additional_device":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FEMBOY_VPN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tariff.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"additional_device":{"a":true,"h":"Additional Device","n":"additional_device","r":true,"sh":"Price of one additional device, as a decimal string (observed \"25\").","t":"`$STRING`","key$":"additional_device","index$":0},"items":{"a":true,"h":"Items","n":"items","r":true,"sh":"Headline packages (observed: the 3-device packages for 1, 3, 6 and 12 months).","t":"`$ARRAY`","key$":"items","index$":1},"max_devices":{"a":true,"h":"Max Devices","n":"max_devices","r":true,"sh":"Maximum number of devices per subscription.","t":"`$INTEGER`","key$":"max_devices","index$":2},"mode":{"a":true,"h":"Mode","n":"mode","r":true,"sh":"Service mode (observed \"production\").","t":"`$STRING`","key$":"mode","index$":3},"packages":{"a":true,"h":"Packages","n":"packages","r":true,"sh":"Every package: each term (1, 3, 6, 12 months) for each device tier (3, 5, 10, 15 observed).","t":"`$ARRAY`","key$":"packages","index$":4},"version":{"a":true,"h":"Version","n":"version","r":true,"sh":"Tariff sheet version (observed 1).","t":"`$INTEGER`","key$":"version","index$":5}},"name":"tariff","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /public/tariffs","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/public/tariffs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"public"},{"lit":"tariffs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"tariff","name__orig":"tariff","Name":"Tariff","name_":"tariff","name-":"tariff","NAME":"TARIFF","index$":0}, {"active":true,"entity":"tariff","key$":"BasicTariffFlow","kind":"basic","name":"BasicTariffFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tariff_ref01"}}],"index$":0}]}, 'Tariff', {"GET /public/tariffs":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tariff_ref01_data = Object.values(setup.data.existing.tariff)[0] as any

    // LIST
    const tariff_ref01_ent = client.Tariff()
    const tariff_ref01_match: any = {}

    const tariff_ref01_list = (await tariff_ref01_ent.list(tariff_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/tariff/TariffTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FemboyVpnSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['tariff01','tariff02','tariff03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FEMBOY_VPN_TEST_TARIFF_ENTID': idmap,
    'FEMBOY_VPN_TEST_LIVE': 'FALSE',
    'FEMBOY_VPN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FEMBOY_VPN_TEST_TARIFF_ENTID']

  const live = 'TRUE' === env.FEMBOY_VPN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FEMBOY_VPN_TEST_TARIFF_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FemboyVpnSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FEMBOY_VPN_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
