const nextConfig = {
  reactStrictMode: true,
  basePath:
    process.env.GITHUB_REPOSITORY !== undefined
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
      : '',
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
