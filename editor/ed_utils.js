
function HashTable(obj)
{
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.appendToItem = function(key, value) {
        if(this.items.hasOwnProperty(key)) {
            //console.log(typeof(this.items[key]));
            //if (this.items[key].hasOwnProperty(push)) {
                this.items[key].push(value);
            //} else {
            //    console.log("Error: can't push to value of type " + typeof(value));
            //}
        } else {
            this.items[key] = [value];
        }
    }

    this.removeFromItem = function(key, value) {
        if(this.items.hasOwnProperty(key)) {
            //if (this.items[key].hasOwnProperty(splice) && this.items[key].hasOwnProperty(indexOf)) {
                var i = this.items[key].indexOf(value);
                if(i >= 0) {
                    this.items[key].splice(i, 1);
                }
            //} else {
            //    console.log("Error: can't remove from value of type " + typeof(value));
            //}
        }
    }


    this.setItem = function(key, value)
    {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key);
    }
   
    this.removeItem = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    this.keys = function()
    {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function()
    {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function()
    {
        this.items = {}
        this.length = 0;
    }
}
