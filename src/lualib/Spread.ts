function __TS__Spread<T>(this: void, iterable: string | Iterable<T>): T[] {
    const arr = [];
    if (typeof iterable === "string") {
        for (let i = 0; i < iterable.length; i += 1) {
            arr[arr.length] = iterable[i];
        }
    } else {
        for (const item of iterable) {
            arr[arr.length] = item;
        }
    }
    return (table.unpack || unpack)(arr);
}
