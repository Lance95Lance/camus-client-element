#!/bin/bash
echo "---------------------------拉取分支..."
git pull

echo "---------------------------关闭nginx"
service nginx stop

echo "---------------------------yarn install..."
yarn install

echo "---------------------------yarn build..."
yarn build

sleep 20s

 \cp -r dist /usr/share/nginx/html

 \cp docker/nginx.conf /etc/nginx

service nginx start

echo "---------------------------nginx启动完成"