/**
 * CacheJS
 *
 * A wrapper for the JavaScript Storage object
 *
 * Types:
 * 'cache' = localStorage, persistent (default)
 * 'session' = sessionStorage, cleared when browser is closed
 */

var Cache = (function() {

	var _get = function(key, default_value, type) {
		if(is_available() ) {
			type = type_validate(type);
			if(type === 'cache') {
				if(encode(key) in localStorage) {
					return decode(localStorage.getItem(encode(key)));
				}
			}
			else if(type === 'session') {
				if(encode(key) in sessionStorage) {
					return decode(sessionStorage.getItem(encode(key)));
				}
			}
		}
		return (typeof(default_value) !== 'undefined') ? default_value : false;
	};

	var _set = function(key, value, type) {
		if(is_available()) {
			type = type_validate(type);
			if(type === 'cache') {
				localStorage.setItem(encode(key), encode(value));
			}
			else if(type === 'session') {
				sessionStorage.setItem(encode(key), encode(value));
			}
			return true;
		}
		return false;
	};

	var _push = function(key, value, type) {
		if(is_available()) {
			obj = _get(key, [], type);
			if(Array.isArray(obj)) {
				obj.push(value);
				_set(key, obj, type);
				return true;
			}
		}
		return false;
	};

	var _pop = function(key, default_value, type) {
		if(is_available()) {
			obj = _get(key, null, type);
			if(Array.isArray(obj)) {
				value = obj.pop();
				_set(key, obj, type);
				return value;
			}
		}
		return (typeof(default_value) !== 'undefined') ? default_value : false;
	};

	var _delete = function(key, type) {
		if(is_available()) {
			type = type_validate(type);
			if(type === 'cache') {
				if(encode(key) in localStorage) {
					localStorage.removeItem(encode(key));
					return (encode(key) in localStorage) ? false : true;
				}
			}
			else if(type === 'session') {
				if(encode(key) in sessionStorage) {
					sessionStorage.removeItem(encode(key));
					return (encode(key) in sessionStorage) ? false : true;
				}
			}
		}
		return false;
	};

	var _clear = function(type) {
		if(is_available()) {
			type = type_validate(type);
			if(type === 'cache') {
				localStorage.clear();
				return (localStorage.length === 0);
			}
			else if(type === 'session') {
				sessionStorage.clear();
				return (sessionStorage.length === 0);
			}
		}
		return false;
	};

	var type_validate = function(type) {
		type = typeof(type) === 'string' ? type.toLowerCase() : 'cache';

		switch(type) {
			case 'cache':
			case 'session':
				break;
			default:
				type = 'cache';
		}

		return type;
	};

	var is_available = function() {
		return typeof(Storage) !== 'undefined';
	};

	var encode = function(obj) {
		return JSON.stringify(obj);
	};

	var decode = function(str) {
		try {
			return JSON.parse(str);
		} catch (e) {
			return str;
		}
	};

	// Public methods
	return {
		get: function(key, default_value, type) {
			return _get(key, default_value, type);
		},

		set: function(key, value, type) {
			return _set(key, value, type);
		},

		push: function(key, value, type) {
			return _push(key, value, type);
		},

		pop: function(key, default_value, type) {
			return _pop(key, default_value, type);
		},

		delete: function(key, type) {
			return _delete(key, type);
		},

		clear_all: function(type) {
			return _clear(type);
		},
	}
})();
