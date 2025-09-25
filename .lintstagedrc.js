module.exports = {
  '*.{js,jsx,ts,tsx}': (filenames) => [`npm run lint . ${filenames.join(' --file')}`],
  '*.{scss,html}': (filenames) => [`prettier --write ${filenames.join(' ')}`],
  '*.spec.{js,jsx,ts,tsx}': (filenames) => [
    `npm test -- --findRelatedTests ${filenames.join(' ')}`,
  ],
};
