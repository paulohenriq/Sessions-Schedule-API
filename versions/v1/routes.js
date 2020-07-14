import routers from './src/routers';

export default (version) => {
  version.use(routers.routes(), routers.allowedMethods());
};
