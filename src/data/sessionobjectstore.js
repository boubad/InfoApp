// sessionobjectstore.js
//
import {
    ObjectStore
}
from './objectstore';
//
export class SessionObjectStore extends ObjectStore {
    constructor() {}
    perform_get(key) {
        return window.sessionStorage.getItem(key);
    }
    perform_store(key, val) {
        window.sessionStorage.setItem(key, val);
    }
    perform_remove(key) {
        window.sessionStorage.removeItem(key);
    }
} // class SessionObjectStore