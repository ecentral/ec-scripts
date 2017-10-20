const check = require('check-node-version');
const settings = require('../settings');

const checkVersions = () => (
    new Promise((resolve, reject) => {
        check(settings.requiredVersions, (err, result) => {
            if (err) reject(err);

            resolve({
                node: result.node.isSatisfied,
                npm: result.npm.isSatisfied,
                yarn: result.yarn.isSatisfied,
            });
        });
    })
);

module.exports = checkVersions;
