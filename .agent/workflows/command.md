---
description: 
---

# 개발서버 중지
taskkill /F /IM node.exe    

# 개발서비 실행
npm run dev    

# 배포
git status
git remote -v
git remote add origin https://github.com/ilso-k/mycarrot
git branch -M main
git add .
git commit -m "first deploy" 
git push -u origin main

# firebase 다루기
npm install firebase
firebase init 
firebase init hosting
firebase deploy