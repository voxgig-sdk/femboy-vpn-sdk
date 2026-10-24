import { TariffEntity } from './entity/TariffEntity';
export type * from './FemboyVpnTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FemboyVpnEntityBase } from './FemboyVpnEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class FemboyVpnSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Tariff(entopts?: Record<string, any>): TariffEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FemboyVpnSDK;
    tester(testopts?: any, sdkopts?: any): FemboyVpnSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FemboyVpnSDK;
export { stdutil, config, BaseFeature, FemboyVpnEntityBase, FemboyVpnSDK, SDK, };
export type { DirectResult };
