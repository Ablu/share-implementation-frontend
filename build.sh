#!/bin/bash
set -e

sudo yum install -y epel-release
sudo yum install -y nginx

npm tsc
sudo cp -r * /usr/share/nginx/html/
sudo systemctl enable nginx
