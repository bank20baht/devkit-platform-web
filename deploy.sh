#!/bin/bash
ng build --configuration production
aws s3 sync dist/devkit-platform-web/browser s3://devkit-platform.20baht.com/ --delete
echo "✅ Deployed to https://devkit-platform.20baht.com"
echo "ถ้าไม่เห็นการเปลี่ยนแปลง → purge cache ที่ Cloudflare"
