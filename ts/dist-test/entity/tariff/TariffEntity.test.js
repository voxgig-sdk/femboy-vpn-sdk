"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TariffEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FEMBOY_VPN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FEMBOY_VPN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FemboyVpnSDK.test();
        const ent = testsdk.Tariff();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('tariff hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.FemboyVpnSDK.test(offline).Tariff().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.FemboyVpnSDK.test(offline).Tariff()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.FemboyVpnSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Tariff().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.FemboyVpnSDK.test().Tariff().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.FemboyVpnSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Tariff().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Tariff().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FemboyVpnSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Tariff().list({ "additional_device": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FEMBOY_VPN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'tariff.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "additional_device": { "a": true, "h": "Additional Device", "n": "additional_device", "r": true, "sh": "Price of one additional device, as a decimal string (observed \"25\").", "t": "`$STRING`", "key$": "additional_device", "index$": 0 }, "items": { "a": true, "h": "Items", "n": "items", "r": true, "sh": "Headline packages (observed: the 3-device packages for 1, 3, 6 and 12 months).", "t": "`$ARRAY`", "key$": "items", "index$": 1 }, "max_devices": { "a": true, "h": "Max Devices", "n": "max_devices", "r": true, "sh": "Maximum number of devices per subscription.", "t": "`$INTEGER`", "key$": "max_devices", "index$": 2 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": true, "sh": "Service mode (observed \"production\").", "t": "`$STRING`", "key$": "mode", "index$": 3 }, "packages": { "a": true, "h": "Packages", "n": "packages", "r": true, "sh": "Every package: each term (1, 3, 6, 12 months) for each device tier (3, 5, 10, 15 observed).", "t": "`$ARRAY`", "key$": "packages", "index$": 4 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "sh": "Tariff sheet version (observed 1).", "t": "`$INTEGER`", "key$": "version", "index$": 5 } }, "name": "tariff", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /public/tariffs", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/public/tariffs", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "public" }, { "lit": "tariffs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "tariff", "name__orig": "tariff", "Name": "Tariff", "name_": "tariff", "name-": "tariff", "NAME": "TARIFF", "index$": 0 }, { "active": true, "entity": "tariff", "key$": "BasicTariffFlow", "kind": "basic", "name": "BasicTariffFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "tariff_ref01" } }], "index$": 0 }] }, 'Tariff', { "GET /public/tariffs": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let tariff_ref01_data = Object.values(setup.data.existing.tariff)[0];
        // LIST
        const tariff_ref01_ent = client.Tariff();
        const tariff_ref01_match = {};
        const tariff_ref01_list = (await tariff_ref01_ent.list(tariff_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/tariff/TariffTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FemboyVpnSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['tariff01', 'tariff02', 'tariff03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FEMBOY_VPN_TEST_TARIFF_ENTID': idmap,
        'FEMBOY_VPN_TEST_LIVE': 'FALSE',
        'FEMBOY_VPN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FEMBOY_VPN_TEST_TARIFF_ENTID'];
    const live = 'TRUE' === env.FEMBOY_VPN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FEMBOY_VPN_TEST_TARIFF_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FemboyVpnSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=TariffEntity.test.js.map