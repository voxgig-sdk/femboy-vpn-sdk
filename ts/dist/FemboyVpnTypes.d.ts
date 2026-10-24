export interface Tariff {
    additional_device: string;
    items: any[];
    max_devices: number;
    mode: string;
    packages: any[];
    version: number;
}
export interface TariffListMatch {
    additional_device?: string;
    items?: any[];
    max_devices?: number;
    mode?: string;
    packages?: any[];
    version?: number;
}
