// localobjectstore.js
//
import {
    ObjectStore
}
from '../model/objectstore';
//
export class LocalObjectStore extends ObjectStore {
    constructor() {}
    perform_get(key) {
        return window.localStorage.getItem(key);
    }
    perform_store(key, val) {
        window.localStorage.setItem(key, val);
    }
    perform_remove(key) {
        window.localStorage.removeItem(key);
    }
} // class LocalObjectStore