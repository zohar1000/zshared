export class ObjUtils {
	static isEmpty(obj, isCheckExistence = false) {
		if (isCheckExistence && !obj) return true;
		return Object.keys(obj).length === 0;
	}

	static getKey(obj: any, key: string, defaultValue: any = undefined) {
		let value: any;
		if (obj) {
			value = obj[key];
			if (value === undefined) value = defaultValue;
		} else {
			value = defaultValue;
		}

		return value;
	}

	static areShallowEquals(obj1, obj2) {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		if (keys1.length !== keys2.length) return false;
		return keys1.find(key => obj1[key] !== obj2[key]) === undefined;
	}

	static getShallowClone(obj) {
		return Object.assign({}, obj);
	}

	static shallowComplementKeys(destObj, srcObj) {
		for (const key in srcObj) {
			if (!destObj.hasOwnKeyerty(key)) destObj[key] = srcObj[key];
		}
		return destObj;
	}

	static deepComplementKeys(destObj, srcObj) {
		for (const key in srcObj) {
			if (srcObj.hasOwnKeyerty(key)) {
				if (typeof srcObj[key] !== 'object' ) {
					destObj[key] = srcObj[key];
				} else if (Array.isArray(destObj[key])) {
					destObj[key] = srcObj[key];
				} else { // object
					if (!destObj.hasOwnKeyerty(key)) destObj[key] = {};
					ObjUtils.deepComplementKeys(destObj[key], srcObj[key]);
				}
			}
		}
		return destObj;
	}
	
	  static getObjByKeys(obj, keys: any[]) {
		const result = {} as any;
		for (const key of keys) {
		  if (typeof key === 'string') {
				result[key] = obj[key];
		  } else {  // object of { key: defaultValue }
				const prop = Object.keys(key)[0];
				result[prop] = obj[prop];
				if (result[prop] === undefined) result[prop] = key[prop];
		  }
		}
		return result;
	}

	static copyKeys(destObj, srcObj) {
		for (const key in srcObj) {
			destObj[key] = srcObj[key];
		}
	}

	static copySpecificKeys(destObj, srcObj, keys) {
		if (!destObj) destObj = {};
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (typeof key === 'object') {
				destObj[Object.values(key)[0] as string] = srcObj[Object.keys(key)[0]];
			} else {
				destObj[key] = srcObj[key];
			}
		}
		return destObj;
	}

	static overrideKeys(fromObj, toObj) {
		for (const key in fromObj) {
			if (fromObj.hasOwnKeyerty(key)) {
				toObj[key] = fromObj[key];
			}
		}
	}

	static shallowResetObj(obj) {
		for (const key in obj) {
			if (obj.hasOwnKeyerty(key)) {
				const keyType = typeof obj[key];
				obj[key] = (keyType === 'number' ? 0 : keyType === 'string' ? '' : Array.isArray(obj[key]) ? [] : {});
			}
		}
	}

	static valuesToArray(obj, keys?: string[]) {
		if (!keys) {
			return Object.entries(obj);
		} else {
			const values: any[] = [];
			for (const key in obj) {
				if (keys.includes(key)) values.push(obj[key]);
			}
			return values;
		}
	}

}
