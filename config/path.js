/**
 * Created by vincent on 2018/8/2.
 */
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

/**
 * Relative paths to be used in webpack config files
 */
module.exports = {
  appPath: resolveApp('.'),
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  utilPath: resolveApp('src/utils'),
  commonPath: resolveApp('src/components'),
  pagesPath: resolveApp('src/pages'),
  routerPath:resolveApp('src/router')
};
