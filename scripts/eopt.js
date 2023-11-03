const ts = require('typescript');

const readFile = ts.sys.readFile.bind(ts.sys);

function compile(fileNames, strict) {
  if (strict) {
    ts.sys.readFile = function (...args) {
      let file = readFile(...args);
      file = file.replaceAll('// @ts-expect-eopt-error', '// @ts-expect-error');
      return file;
    };
  }
  else {
    ts.sys.readFile = readFile;
  }

  const program = ts.createProgram(fileNames, {
    lib: ['lib.esnext.d.ts', 'lib.dom.d.ts'],
    noImplicitAny: false,
    noEmitOnError: true,
    noEmit: true,
    pretty: false,
    strict: true,
    exactOptionalPropertyTypes: strict,
  });

  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  return allDiagnostics;
}

const formatHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

const diagnostics = compile(process.argv.slice(2), false);
// const strictDiagnostics = compile(process.argv.slice(2), true);
const strictDiagnostics = [];

const allDiagnostics = [...diagnostics];
strictDiagnostics.forEach(strictDiagnostic => {
  if (strictDiagnostic.file) {
    const strictDiagnosticPos = ts.getLineAndCharacterOfPosition(strictDiagnostic.file, strictDiagnostic.start);

    const isUnique = diagnostics.every(diagnostic => {
      if (diagnostic.file) {
        const diagnosticPos = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
        return !(
          diagnosticPos.line === strictDiagnosticPos.line
          && diagnosticPos.character === strictDiagnosticPos.character
          && diagnostic.messageText === strictDiagnostic.messageText
        );
      }
    });

    if (isUnique) {
      allDiagnostics.push(strictDiagnostic);
    }
  }
});

console.log(ts.formatDiagnosticsWithColorAndContext(allDiagnostics, formatHost));

const exitCode = allDiagnostics.length ? 1 : 0;
// console.log(`Process exiting with code '${exitCode}'.`);
process.exit(exitCode);
