//baseitem.js
//
export class BaseItem {
    constructor(oMap) {
        this.id = null;
        this.rev = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this.id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this.rev = oMap._rev;
            }
        } // oMap
    } // constructor
    //
    static check_date(d) {
        let dRet = null;
        if ((d !== undefined) && (d !== null)) {
            let t = Date.parse(d.toString());
            if (!isNaN(t)) {
                dRet = d;
            }
        }
        return dRet;
    } // check_date
    //
    collection_name() {
        return null;
    }
    type() {
        return null;
    }
    is_storeable() {
        return (this.type() !== null) && (this.collection_name() !== null);
    }
    to_insert_map(oMap) {
        if (this.type() !== null) {
            oMap.type = this.type();
        }
    } // toInsertMap
    to_fetch_map(oMap) {
        this.to_insert_map(oMap);
        if (oMap.type !== undefined) {
            oMap.type = null;
        }
        if (this.id !== null) {
            oMap._id = this.id;
        }
        if (this.rev !== null) {
            oMap._rev = this.rev;
        }
    } // to_fetch_map
    toString() {
        let oMap = {};
        this.to_fetch_map(oMap);
        return JSON.stringify(oMap);
    } // toString
    //
    static array_contains(cont, val) {
        if ((cont !== undefined) && (cont !== null) && (val !== undefined) && (val !== null)) {
            let s = val.toString().trim().toLowerCase();
            if (s.length > 0) {
                let n = cont.length;
                for (let i = 0; i < n; ++i) {
                    let x = cont[i];
                    if ((x !== undefined) && (x !== null)) {
                        let ss = x.toString().trim().toLowerCase();
                        if (ss == s) {
                            return true;
                        }
                    }
                } // i
            } // s
        }
        return false;
    } // _array_contains
    static array_add(cont, val) {
        if ((cont !== undefined) && (cont !== null) && (val !== undefined) && (val !== null)) {
            let s = val.toString().trim().toLowerCase();
            if (s.length > 0) {
                let bFound = false;
                var n = cont.length;
                for (let i = 0; i < n; ++i) {
                    let x = cont[i];
                    if ((x !== undefined) && (x !== null)) {
                        let ss = x.toString().trim().toLowerCase();
                        if (ss == s) {
                            bFound = true;
                            break;
                        }
                    }
                } // i
                if (!bFound) {
                    cont.push(val);
                }
            } // val
        }
    } // _array_add
    static array_remove(cont, val) {
        if ((cont !== undefined) && (cont !== null) && (val !== undefined) && (val !== null)) {
            let s = val.toString().trim().toLowerCase();
            if (s.length > 0) {
                let index = -1;
                let n = cont.length;
                for (let i = 0; i < n; ++i) {
                    let x = cont[i];
                    if ((x !== undefined) && (x !== null)) {
                        let ss = x.toString().trim().toLowerCase();
                        if (ss == s) {
                            index = i;
                            break;
                        }
                    }
                } // i
                if (index >= 0) {
                    cont = cont.splice(index, 1);
                }
            } // val
        }
    } // _array_add
    sort_func(p1, p2) {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.id !== undefined) && (p1.id !== null)) {
                if ((p2.id !== undefined) && (p2.id !== null)) {
                    let s1 = p1.id.toString();
                    let s2 = p2.id.toString();
                    vRet = s1.localeCompare(s2);
                } else {
                    vRet = 1;
                }
            } else {
                vRet = 1;
            }
        } else if ((p1 === undefined) || (p1 === null)) {
            vRet = 1;
        }
        return vRet;
    } // sort_func
} // class BaseItem