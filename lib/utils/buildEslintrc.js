const fs = require('fs');
const path = require('path');

/**
 * Creates a .eslintrc file in the given path.
 * @param {string} extPath
 * @param {Object} eslintConfig
 */
const buildEslintrc = (extPath, eslintConfig) => {
    // Create eslint config file.
    const content = JSON.stringify(eslintConfig, null, 4);
    const eslintFileName = path.join(extPath, '.eslintrc.json');

    fs.writeFileSync(eslintFileName, content);
};

module.exports = buildEslintrc;
