// TODO: In the future, change this to __TS__RegisterFileInfo and provide tstl interface to
// get some metadata about transpilation.
function __TS__SourceMapTraceBack(this: void, fileName: string, sourceMap: { [line: number]: number }): void {
    globalThis.__TS__sourcemap = globalThis.__TS__sourcemap || {};
    globalThis.__TS__sourcemap[fileName] = sourceMap;

    if (globalThis.__TS__originalTraceback === undefined) {
        globalThis.__TS__originalTraceback = debug.traceback;
        debug.traceback = (thread, message, level) => {
            const trace = globalThis.__TS__originalTraceback(thread, message, level);
            const [result] = string.gsub(trace, "(%S+).lua:(%d+)", (file, line) => {
                const fileSourceMap = globalThis.__TS__sourcemap[file + ".lua"];
                if (fileSourceMap && fileSourceMap[line]) {
                    return `${file}.ts:${fileSourceMap[line]}`;
                }
                return `${file}.lua:${line}`;
            });

            return result;
        };
    }
}
