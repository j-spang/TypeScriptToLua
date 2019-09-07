import * as TSTLErrors from "../../src/TSTLErrors";
import * as util from "../util";
import * as ts from "typescript";

const jsonOptions = {
    resolveJsonModule: true,
    noHeader: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
};

test.each([0, "", [], [1, "2", []], { a: "b" }, { a: { b: "c" } }])("JSON (%p)", json => {
    util.testModule(JSON.stringify(json))
        .setOptions(jsonOptions)
        .setMainFileName("main.json")
        .expectToEqual(json);
});

test("Empty JSON", () => {
    util.testModule("")
        .setOptions(jsonOptions)
        .setMainFileName("main.json")
        .expectToHaveDiagnosticOfError(TSTLErrors.InvalidJsonFileContent(util.nodeStub));
});
