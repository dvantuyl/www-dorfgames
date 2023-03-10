import { transform, isEqual, isObject } from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(
	object: Record<string, unknown>,
	base: Record<string, unknown>
): Record<string, unknown> {
	function changes(object, base) {
		return transform(object, function (result, value, key) {
			if (!isEqual(value, base[key])) {
				result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}
