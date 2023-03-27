export function isNotNUllOrUndefined(value) {
    var isNotNull = true;
    if (value === null || value === undefined || value === '') {
        return isNotNull = false
    }
    return isNotNull;

}