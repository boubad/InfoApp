// objectstore.js
//
export class ObjectStore {
    constructor() {} // constructor
    perform_get(key) {
        return null;
    }
    perform_store(key, val) {}
    perform_remove(key) {}
        //
    _local() {
        return (window.localStorage !== undefined);
    }
    store_value(key, value) {
            if ((key !== undefined) && (key !== null) && (key.toString().trim().length > 0)) {
                let skey = key.toString().trim().toLowerCase();
                if (this._local()) {
                    if ((value !== undefined) && (value !== null)) {
                        try {
                            this.perform_store(skey, JSON.stringify(value));
                        } catch (ex) {
                            this[skey] = value;
                        }
                    } else {
                        this.remove_key(key);
                    }
                } else {
                    let v = (value !== undefined) ? value : null;
                    this[skey] = v;
                }
            } // key
        } // store_value
    get_value(key) {
            let vRet = null;
            if ((key !== undefined) && (key !== null) && (key.toString().trim().length > 0)) {
                let skey = key.toString().trim().toLowerCase();
                if (this._local()) {
                    let sval = this.perform_get(skey);
                    if (sval === null) {
                        if (this[skey] !== undefined) {
                            vRet = this[skey];
                        }
                    } else {
                        vRet = JSON.parse(sval);
                    }
                } else {
                    if (this[skey] !== undefined) {
                        vRet = this[skey];
                    }
                }
            } // key
            return vRet;
        } // get_value
    remove_key(key) {
            if ((key !== undefined) && (key !== null) && (key.toString().trim().length > 0)) {
                let skey = key.toString().trim().toLowerCase();
                if (this._local()) {
                    if (this.perform_get(skey) !== null) {
                        this.perform_remove(skey);
                    }
                }
                if (this[skey] !== undefined) {
                    this[skey] = null;
                }
            }
        } // remove_key
} // class ObjectStore