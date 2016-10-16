#!/bin/bash
set -e

sudo yum install -y epel-release
sudo yum install -y nginx node /usr/bin/npm
npm install .
npm run typings install

npm run tsc
sudo cp -r * /usr/share/nginx/html/
sudo systemctl enable nginx
