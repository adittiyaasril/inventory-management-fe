/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "*",
      "res.cloudinary.com",
      "fdn2.gsmarena.com",
      "plus.unsplash.com",
      "example.com",
      "anotherdomain.com,",
      "assets.example.com",
    ],
  },
};

export default nextConfig;
