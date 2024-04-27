/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "*",
      "fdn2.gsmarena.com",
      "example.com",
      "anotherdomain.com,",
      "assets.example.com",
    ],
  },
};

export default nextConfig;
