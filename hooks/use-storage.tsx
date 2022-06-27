/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useStorage<T>(key: string, defaultValue: T, storageObject: Storage) {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof defaultValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);

    return ([value, setValue] as [T, Dispatch<SetStateAction<T>>]);
};

export default function useLocalStorage<T>(key: string, defaultValue: T) {
    if (typeof window === 'undefined') return [defaultValue, () => { }] as [T, Dispatch<SetStateAction<T>>];
    else return useStorage(key, defaultValue, window.localStorage);
};