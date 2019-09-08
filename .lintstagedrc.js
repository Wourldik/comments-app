module.exports = {
  '*.css': 'stylelint',
  '*.scss': 'stylelint --syntax=scss',
  'src/**/*.ts': 'tslint -p src/tsconfig.app.json -c src/tslint.json',
  'e2e/**/*.ts': 'tslint -p e2e/tsconfig.e2e.json -c tslint.json',
};
