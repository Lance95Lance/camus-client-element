#!/bin/bash
echo "---------------------------拉取分支..."
git pull

echo "---------------------------关闭nginx"
service nginx stop

echo "---------------------------build..."
yarn build

sleep 15s

cp -r dist /usr/share/nginx/html

/usr/local/nginx/sbin/nginx/sbin/nginx  -c  ./docker/nginx.conf

sleep 5s
# 新pid
newpid=`cat gunicorn.pid`
echo "---------------------------启动完成,pid为${newpid}"