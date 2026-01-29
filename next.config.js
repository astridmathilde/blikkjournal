// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}

const path = require('path')
module.exports = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  
}