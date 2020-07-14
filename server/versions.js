import fs from 'fs';
import path from 'path';

const getVersions = () => {
  return fs.readdirSync('./versions').filter((file) => {
    return (
      fs.statSync(path.join('./versions', file)).isDirectory() &&
      file.startsWith('v')
    );
  });
};

export default getVersions().map((version) => {
  // eslint-disable-next-line import/no-dynamic-require
  return require(path.join('../versions', version, 'config')).default; // eslint-disable-line global-require
});
