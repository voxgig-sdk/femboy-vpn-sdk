import { FemboyVpnEntityBase } from '../FemboyVpnEntityBase';
import type { FemboyVpnSDK } from '../FemboyVpnSDK';
import type { Control } from '../types';
import type { Tariff, TariffListMatch } from '../FemboyVpnTypes';
declare class TariffEntity extends FemboyVpnEntityBase<Tariff> {
    constructor(client: FemboyVpnSDK, entopts: any);
    make(this: TariffEntity): TariffEntity;
    list(this: any, reqmatch?: TariffListMatch, ctrl?: Control): Promise<TariffEntity[]>;
}
export { TariffEntity };
