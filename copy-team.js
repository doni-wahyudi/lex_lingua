const fs = require('fs');
const path = require('path');

const projectRoot = 'c:\\Users\\22036590\\Documents\\code\\website\\lex_lingua';
const srcDir = path.join(projectRoot, 'additional', 'image', 'team');
const destDir = path.join(projectRoot, 'public', 'images', 'team');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const mappings = {
    'drs murzal.png': 'member-1.png',
    'prof annalisa.png': 'member-2.png',
    'nurhidayatulloh.png': 'member-3.png',
    'helena primadi.png': 'member-4.png',
    'nico thomas.png': 'member-5.png'
  };

  const logs = [];
  Object.entries(mappings).forEach(([srcName, destName]) => {
    const src = path.join(srcDir, srcName);
    const dest = path.join(destDir, destName);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      logs.push(`SUCCESS: Copied ${srcName} to ${destName}`);
    } else {
      logs.push(`ERROR: Source file does not exist: ${src}`);
    }
  });

  fs.writeFileSync(path.join(projectRoot, 'copy-log.txt'), logs.join('\n'));
} catch (err) {
  fs.writeFileSync(path.join(projectRoot, 'copy-log.txt'), 'FATAL ERROR: ' + err.message + '\n' + err.stack);
}
