// @ts-check
 
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}
 
module.exports = {
  turbopack: {
    root: path.join(__dirname, '..'),
  }
}