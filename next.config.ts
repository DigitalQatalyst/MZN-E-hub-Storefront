const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['ujs.qxk.mybluehost.me'],
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT"
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': 'react-native-web', // or set to false to stub it
    };
    return config;
  }
};
export default nextConfig;
