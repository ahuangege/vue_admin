import type { Dic } from "./someInterface";
import { removeFromArr } from "./util";

let eventDic: Dic<Function[]> = {};

export function eventOn(event: string | number, cb: Function) {
    let arr = eventDic[event];
    if (!arr) {
        arr = [];
        eventDic[event] = arr;
    }
    if (!arr.includes(cb)) {
        arr.push(cb);
    }
}

export function eventOff(event: string | number, cb: Function) {
    let arr = eventDic[event];
    if (arr) {
        removeFromArr(arr, cb);
    }
}

export function eventEmit(event: string | number, ...args: any[]) {
    let arr = eventDic[event];
    if (arr) {
        for (let one of arr) {
            one.call(null, ...args);
        }
    }
}

export enum e_eventT {
    userInfo,
}