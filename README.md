# 科普十文旅 · 怀柔乡村振兴综合网站

以乡村振兴为主题的怀柔乡村资源综合平台，包含旅游导览、地理科普、互动学习与 AI 风景创作。

## 功能

- 旅游导览：三条精品文旅路线
- 地理科普：地貌、长城、生态、人文
- 互动学习：知识模块与趣味测验
- 风景创作：上传风景照，七牛云 AI 生成图文作品

## 本地运行

1. 复制 `js/ai-config.example.js` 为 `js/ai-config.js`，填入七牛云 API Key
2. 用任意静态服务器打开，例如：

```bash
python -m http.server 8080
```

3. 浏览器访问 `http://localhost:8080`

## 技术栈

纯静态 HTML / CSS / JavaScript，AI 接口兼容 OpenAI 格式（七牛云 `api.qnaigc.com`）。
