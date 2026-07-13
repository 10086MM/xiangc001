/**
 * 七牛云 AI 大模型调用封装
 */
const QiniuAI = {
  get config() {
    return window.AI_CONFIG || {};
  },

  headers() {
    const apiKey = this.config.apiKey;
    if (!apiKey) {
      throw new Error('请先在 js/ai-config.js 中配置七牛云 apiKey');
    }
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    };
  },

  async chat(messages, options = {}) {
    const res = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        model: options.model || this.config.textModel,
        messages,
        stream: false,
        ...options
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`七牛云文本生成失败 (${res.status}): ${err.slice(0, 200)}`);
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message;
    return {
      text: message?.content || '',
      images: message?.images || []
    };
  },

  async imageEdit(image, prompt, options = {}) {
    const res = await fetch(`${this.config.baseUrl}/images/edits`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        model: options.model || this.config.imageModel,
        image,
        prompt,
        image_config: options.image_config || { aspect_ratio: '16:9' }
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`七牛云图像生成失败 (${res.status}): ${err.slice(0, 200)}`);
    }

    const data = await res.json();
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) throw new Error('七牛云未返回图像数据');

    const format = data.output_format || 'png';
    return `data:image/${format};base64,${b64}`;
  }
};

if (typeof window !== 'undefined') {
  window.QiniuAI = QiniuAI;
}
