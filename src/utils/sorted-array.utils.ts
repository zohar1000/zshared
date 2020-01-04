export class SortedArrayUtils {
	static findIndex(items: any[], matchedValue: any) {
		if (items.length === 0) return -1;

		let { lowIx, highIx, pivotIx, isString, value } = SortedArrayUtils.initBinarySearch(items, matchedValue);
		let matchType = SortedArrayUtils.getMatchTypeForSingleValue(value, items[pivotIx], isString);
		while (matchType !== 0 && lowIx < highIx) {
			if (matchType === -1) {
				highIx = pivotIx - 1;
			} else {
				lowIx = pivotIx + 1;
			}
			if (highIx >= 0 && lowIx < items.length) {
				pivotIx = (lowIx + highIx) >> 1;
				matchType = SortedArrayUtils.getMatchTypeForSingleValue(value, items[pivotIx], isString);
			}
		}

		return (matchType === 0 ? pivotIx : -1);
	};

	static isExist(items: any[], matchedValue: any) {
		return SortedArrayUtils.findIndex(items, matchedValue) !== -1;
	}

	static findIndexByKeyValue(items: any[], key: string, matchedValue: any) {
		if (items.length === 0) return -1;

		let { lowIx, highIx, pivotIx, isString, value } = SortedArrayUtils.initBinarySearch(items, matchedValue);
		let matchType = SortedArrayUtils.getMatchTypeForSingleValue(value, items[pivotIx][key], isString);
		while (matchType !== 0 && lowIx < highIx) {
			if (matchType === -1) {
				highIx = pivotIx - 1;
			} else {
				lowIx = pivotIx + 1;
			}

			if (highIx >= 0 && lowIx < items.length) {
				pivotIx = (lowIx + highIx) >> 1;
				matchType = SortedArrayUtils.getMatchTypeForSingleValue(value, items[pivotIx][key], isString);
			}
		}

		return (matchType === 0 ? pivotIx : -1);
	}

	static isExistByKeyValue(items: any[], key: string, value: any) {
		return SortedArrayUtils.findIndexByKeyValue(items, key, value) !== -1;
	}

	static findByKeyValue(items: any[], key: string, value: any, defaultValue?: any) {
		const ix = SortedArrayUtils.findIndexByKeyValue(items, key, value);
		return ix === -1 ? (defaultValue ? defaultValue :undefined) : items[ix];
	}


	/********************************/
	/*   I N S E R T                */
	/********************************/

	static insertByKeyValue(items, item, key, opts: any = {}) {
		let { lowIx, highIx, pivotIx, isString, value } = SortedArrayUtils.initBinarySearch(items, item[key]);
		let insertIx = -1;

		const checkInsertPoint = () => {
			pivotIx = (lowIx + highIx) >> 1; // faster than divide by 2
			const matchType = SortedArrayUtils.getMatchTypeForSingleValue(value, items[pivotIx][key], isString);
			if (matchType === 0) {
				insertIx = pivotIx;
			} else {
				if (lowIx === highIx) {
					insertIx = (matchType === -1 ? pivotIx : pivotIx + 1);
				} else if (matchType === -1) {
					if (pivotIx - 1 === lowIx) {
						const isEqualLow = (SortedArrayUtils.getMatchTypeForSingleValue(value, items[lowIx][key], isString) === 0);
						insertIx = (isEqualLow ? lowIx : pivotIx);
					} else {
						highIx = pivotIx;
					}
				} else if (matchType === 1) {
					if (pivotIx + 1 === highIx) {
						insertIx = highIx;
					} else {
						lowIx = pivotIx;
					}
				}
			}
		};

		if (items.length === 0 || SortedArrayUtils.getMatchTypeForSingleValue(value, items[items.length - 1][key], isString) === 1) {
			insertIx = items.length;
			items.push(item);
		} else if (SortedArrayUtils.getMatchTypeForSingleValue(value, items[0][key], isString) === -1) {
			insertIx = 0;
			items.splice(0, 0, item);
		} else {
			while (insertIx === -1) {
				checkInsertPoint();
			}

			if (SortedArrayUtils.getMatchTypeForSingleValue(value, items[insertIx][key], isString) === 0) {
				if (opts.replaceMatch) items.splice(insertIx, 1, item);
			} else {
				items.splice(insertIx, 0, item);
			}
		}

		return insertIx;
	}

	static getMatchTypeForSingleValue(itemValue, pivotValue, isString) {
		if (isString) pivotValue = pivotValue.toLowerCase();

		if (itemValue > pivotValue) {
			return 1;
		} else if (itemValue < pivotValue) {
			return -1;
		} else {
			return 0;
		}
	}

	static initBinarySearch(items, value) {
		const lowIx = 0;
		const highIx = items.length - 1;
		const pivotIx = (highIx + lowIx) >> 1;
		const isString = (typeof value === 'string');
		if (isString) value = value.toLowerCase();
		return { lowIx, highIx, pivotIx, isString, value };
	}

	static isMatchInArrays(items1, items2) {
		return (items1.find(item1 => SortedArrayUtils.isExist(items2, item1)) !== undefined);
	}
}
