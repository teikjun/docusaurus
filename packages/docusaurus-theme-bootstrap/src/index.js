/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const glob = require('glob');
const {PurgeCSS} = require('purgecss');
const path = require('path');

const THEME_PATH = path.resolve(__dirname, './theme');

module.exports = function () {
  return {
    name: 'docusaurus-theme-bootstrap',
    getThemePath() {
      return THEME_PATH;
    },
    getClientModules() {
      return ['bootstrap/dist/css/bootstrap.min.css'];
    },
    async configureWebpack() {
      return {
        plugins: [
          await new PurgeCSS().purge ({
            content: [`${THEME_PATH}/**/*.js`],
          })
        ],
      };
    },
  }
};
