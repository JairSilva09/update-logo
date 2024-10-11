import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID, effect, inject } from '@angular/core';
import {
    SignalStoreFeature,
    getState,
    patchState,
    signalStoreFeature,
    withHooks,
    withMethods,
} from '@ngrx/signals';

type SignalStoreFeatureInput<State> = Pick<
    Parameters<SignalStoreFeature>[0],
    'signals' | 'methods'
> & {
    state: State;
};

const NOOP = () => {};

type WithStorageSyncFeatureResult = {
    state: {};
    signals: {};
    methods: {
        clearStorage(): void;
        readFromStorage(): void;
        writeToStorage(): void;
    };
};

const StorageSyncStub: Pick<
    WithStorageSyncFeatureResult,
    'methods'
>['methods'] = {
    clearStorage: NOOP,
    readFromStorage: NOOP,
    writeToStorage: NOOP,
};

export type SyncConfig<State> = {
    key: string;
    autoSync?: boolean;
    select?: (state: State) => Partial<State>;
    parse?: (stateString: string) => State;
    stringify?: (state: State) => string;
    storage?: () => Storage;
};

export function withStorageSync<
    State extends object,
    Input extends SignalStoreFeatureInput<State>
>(key: string): SignalStoreFeature<Input, WithStorageSyncFeatureResult>;
export function withStorageSync<
    State extends object,
    Input extends SignalStoreFeatureInput<State>
>(
    config: SyncConfig<Input['state']>
): SignalStoreFeature<Input, WithStorageSyncFeatureResult>;
export function withStorageSync<
    State extends object,
    Input extends SignalStoreFeatureInput<State>
>(
    configOrKey: SyncConfig<Input['state']> | string
): SignalStoreFeature<Input, WithStorageSyncFeatureResult> {
    const {
        key,
        autoSync = true,
        select = (state: State) => state,
        parse = JSON.parse,
        stringify = JSON.stringify,
        storage: storageFactory = () => localStorage,
    } = typeof configOrKey === 'string' ? {key: configOrKey} : configOrKey;    

    return signalStoreFeature(
        withMethods((store, platformId = inject(PLATFORM_ID)) => {
            if (isPlatformServer(platformId)) {
                console.warn(
                    `'withStorageSync' provides non-functional implementation due to server-side execution`
                );
                return StorageSyncStub;
            }

            const storage = storageFactory();

            return {
                /**
                 * Removes the item stored in storage.
                 */
                clearStorage(): void {
                    storage.removeItem(key);
                },
                /**
                 * Reads item from storage and patches the state.
                 */
                readFromStorage(): void {
                    const stateString = storage.getItem(key);
                    if (stateString) {
                        patchState(store, parse(stateString));
                    }
                },
                /**
                 * Writes selected portion to storage.
                 */
                writeToStorage(): void {
                    const slicedState = select(getState(store) as State);
                    storage.setItem(key, stringify(slicedState));
                },
            };
        }),
        withHooks({
            onInit(store, platformId = inject(PLATFORM_ID)) {
                if (isPlatformServer(platformId)) {
                    return;
                }

                if (autoSync) {
                    store.readFromStorage();

                    effect(() => {
                        store.writeToStorage();
                    });
                }
            },
        })
    );
}