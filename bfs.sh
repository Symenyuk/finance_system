#!/bin/bash
echo "Start BF System update"

echo "Stop pm2 process"
cd /projects/bfs_admins
pm2 stop app

echo "git pull. You need to enter a password"
git pull origin master

echo "create frontend builds"
echo "build library"
cd /projects/bfs_admins/blockchain-financial-systems
ng build bfs-library

echo "build admin"
cd  /projects/bfs_admins/blockchain-financial-systems/projects
ng build bfs-admin --prod

echo "build hospital"
ng build bfs-hospital --prod

echo "build insurance"
ng build bfs-insurance --prod

echo "Start pm2 process"
cd /projects/bfs_admins
pm2 start app

echo "Done"