const fs = require('fs');
const path = require('path');

const typePath = path.join(__dirname, '..', 'node_modules', '@types', 'mapbox__point-geometry', 'index.d.ts');
const dir = path.dirname(typePath);

if (fs.existsSync(dir) && !fs.existsSync(typePath)) {
  fs.writeFileSync(typePath,
    "declare module '@mapbox/point-geometry' {\n  class Point {\n    x: number;\n    y: number;\n    constructor(x: number, y: number);\n  }\n  export default Point;\n}\n"
  );
  console.log('Fixed mapbox__point-geometry types');
}
