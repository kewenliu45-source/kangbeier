# 分享图片说明

## 当前文件

- `share.png` — 微信分享、社交媒体分享时显示的封面图（800×800 PNG）
- `share.svg` — 源文件（用于重新生成 PNG）

## 如何更新分享图片

1. 修改 `share.svg` 中的内容
2. 运行以下命令重新生成 PNG：
   ```bash
   node -e "const sharp = require('sharp'); const fs = require('fs'); sharp(fs.readFileSync('public/images/share.svg')).resize(800,800).png().toFile('public/images/share.png').then(() => console.log('done'))"
   ```
3. 提交代码并推送

## 图片要求

- **尺寸**: 800×800 像素（微信最低要求 200×200）
- **格式**: PNG 或 JPG（微信不支持 SVG）
- **大小**: 建议不超过 32KB（当前约 24KB）
