export class ArrayUtils {
  static getDistinctItems(items) {
	  // return [...new Set(items)];    // for es6 only, currently compiled for es5
    return items.filter((value, index, self) => self.indexOf(value) === index);
  }
  
  static deleteItem(items, value) {
    const ix = items.indexOf(value);
    if (ix !== -1) items.splice(ix, 1);
	}
}
