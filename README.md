cachejs
=======

A wrapper for the JavaScript Storage object with some helpful functions.

Cache allows you to set key-value pairs. However, both the *key* and *value* can be anything that can be JSON.stringify'ed. So, for example, the *key* could be an api url and the *value* could be the JSON response array.

There are two types of cache you can set:
* 'cache' (default) - which is persistent until you clear it and uses the localStorage object
* 'session' - which lasts until the browser is closed and uses the sessionStorage object

Methods:
=======
* Cache.get(key, [default_value, [type]]) - Returns the value for *key* from the specified *type* of cache. If the *key* is not found or Storage is not available, it returns *default_value* or FALSE if *default_value* is not set.
* Cache.set(key, value, [type]) - Sets the *value* for the *key* in the specified *type* of cache. Returns TRUE if successful, FALSE if the Storage object is not available.
* Cache.push(key, value, [type]) - Adds *value* to the end of the array associated with *key* in the specified *type* of cache. If *key* is not in the specified *type* of cache, it creates an array with *value* as the first element. Returns TRUE if successful, FALSE if the object associated with *key* is not an array or if the Storage object is not available.
* Cache.pop(key, [default_value, [type]]) - Removes the last element of the array associated with *key* in the specified *type* of cache and returns the element removed. If the *key* is not in the specified *type* of cache, it returns *default_value* or FALSE if *default_value* is not set.
* Cache.delete(key, [type]) - Removes the *key* and it's associated data from the specified *type* of cache. Returns TRUE if successful, FALSE if it fails or the Storage object is not available.
* Cache.clear_all([type]) - Removes all data from the specified *type* of cache. Returns TRUE if successful, False if it fails or the Storage object is not available.
