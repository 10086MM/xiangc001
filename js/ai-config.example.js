/**
 * 七牛云 AI 配置模板
 * 复制为 ai-config.js 并填入你的 API Key
 */
const AI_CONFIG = {
  baseUrl: 'https://api.qnaigc.com/v1',
  apiKey: '你的七牛云 API Key',
  imageModel: 'gemini-2.5-flash-image',
  textModel: 'deepseek-v3'
};

if (typeof window !== 'undefined') {
  window.AI_CONFIG = AI_CONFIG;
}
