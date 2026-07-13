/**
 * AI 风景创作工作室 - 七牛云大模型
 */
document.addEventListener('DOMContentLoaded', () => {
  initUpload();
  initGenerate();
  renderGallery();
});

let uploadedImage = null;

const STYLE_PROMPTS = {
  realistic: '写实风光摄影风格，自然光影，高清细节',
  ink: '中国水墨画风格，留白意境，墨色晕染',
  vintage: '复古胶片风格，暖色调，轻微颗粒感',
  vivid: '鲜艳插画风格，色彩明快，适合旅游宣传',
  poetic: '诗意文艺风格，柔和色调，意境悠远'
};

const DEMO_GALLERY = [
  { image: 'image/gallery1.jpg', title: '慕田峪晨雾', author: '游客小王' },
  { image: 'image/gallery2.jpg', title: '雁栖夕照', author: '摄影爱好者' },
  { image: 'image/gallery3.jpg', title: '喇叭沟秋色', author: '自然探索者' },
  { image: 'image/gallery4.jpg', title: '水长城倒影', author: '旅行者' },
  { image: 'image/gallery5.jpg', title: '红螺寺银杏', author: '文化旅人' },
  { image: 'image/gallery6.jpg', title: '燕山层峦', author: '山野行者' }
];

function initUpload() {
  const zone = document.getElementById('upload-zone');
  const input = document.getElementById('file-input');
  const preview = document.getElementById('upload-preview');
  const placeholder = document.getElementById('upload-placeholder');
  const generateBtn = document.getElementById('generate-btn');

  if (!zone || !input) return;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  });
  input.addEventListener('change', e => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });

  function handleFile(file) {
    if (file.size > 10 * 1024 * 1024) {
      alert('图片大小不能超过 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      uploadedImage = e.target.result;
      preview.src = uploadedImage;
      preview.style.display = 'block';
      placeholder.style.display = 'none';
      zone.classList.add('has-image');
      generateBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
}

function initGenerate() {
  const btn = document.getElementById('generate-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    if (!uploadedImage) return;

    const loading = document.getElementById('loading');
    const loadingText = loading.querySelector('p');
    const resultPanel = document.getElementById('result-panel');
    const resultGrid = document.getElementById('result-grid');

    const genType = document.getElementById('gen-type').value;
    const genStyle = document.getElementById('gen-style').value;
    const genPrompt = document.getElementById('gen-prompt').value;
    const genLocation = document.getElementById('gen-location').value;

    loading.classList.add('show');
    if (loadingText) loadingText.textContent = '七牛云 AI 正在创作中，请稍候...';
    resultPanel.classList.remove('show');
    btn.disabled = true;

    try {
      const results = await generateWithAI(genType, genStyle, genPrompt, genLocation);
      renderResults(results, resultGrid);
      resultPanel.classList.add('show');
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      console.error(err);
      alert('AI 创作失败：' + err.message);
    } finally {
      loading.classList.remove('show');
      if (loadingText) loadingText.textContent = 'AI 正在创作中，请稍候...';
      btn.disabled = false;
    }
  });
}

const RURAL_THEME = '乡村振兴战略主题：产业兴旺、生态宜居、乡风文明、治理有效、生活富裕';

function buildImagePrompt(type, style, userPrompt, location) {
  const loc = location || '北京怀柔乡村';
  const styleDesc = STYLE_PROMPTS[style] || STYLE_PROMPTS.realistic;
  const typeDesc = {
    video: '生成一张乡村振兴主题旅游短片封面，展现乡村新貌、田野风光或民宿旅游，16:9构图',
    poster: '生成一张乡村振兴科普宣传海报，突出生态宜居、产业兴旺、美丽乡村元素',
    article: '优化为适合乡村游记配图的精美风景照，体现乡村振兴成果',
    story: '生成一张乡村风景故事意境图，展现田园诗意与乡村新貌'
  }[type] || '优化为乡村振兴主题风景照';

  let prompt = `${typeDesc}。地点：${loc}。风格：${styleDesc}。${RURAL_THEME}。`;
  if (userPrompt) prompt += `补充要求：${userPrompt}。`;
  prompt += '画面应体现美丽乡村、绿色发展、文旅融合，保持原图主要景物特征。';
  return prompt;
}

function buildTextPrompt(type, style, userPrompt, location) {
  const loc = location || '怀柔乡村';
  const styleName = { realistic: '写实', ink: '水墨意境', vintage: '怀旧', vivid: '活泼', poetic: '诗意' }[style] || '文艺';

  if (type === 'article') {
    return `请以乡村振兴为主题，根据${loc}的风景照片写一篇300字左右的乡村游记。风格：${styleName}。${userPrompt ? '用户补充：' + userPrompt : ''}需体现产业兴旺、生态宜居、乡风文明等乡村振兴内涵，语言优美有感染力。`;
  }
  if (type === 'story') {
    return `请以乡村振兴为主题，为${loc}写一段150字左右的乡村风景故事。风格：${styleName}。${userPrompt ? '用户补充：' + userPrompt : ''}要展现田园变化、农民幸福生活或文旅融合新貌。`;
  }
  if (type === 'video') {
    return `请以乡村振兴为主题，为${loc}风景短片写一段50字以内的旁白文案。风格：${styleName}。${userPrompt ? '用户补充：' + userPrompt : ''}`;
  }
  return `请以乡村振兴为主题，为${loc}写一段文旅介绍文案。${userPrompt || ''}`;
}

async function generateWithAI(type, style, userPrompt, location) {
  const locationName = location || '怀柔乡村';
  const styleNames = {
    realistic: '写实风光', ink: '水墨国风', vintage: '复古胶片',
    vivid: '鲜艳动漫', poetic: '诗意文艺'
  };

  const imagePrompt = buildImagePrompt(type, style, userPrompt, location);
  const needsText = ['article', 'story', 'video'].includes(type);
  const needsImage = ['poster', 'video', 'story', 'article'].includes(type);

  let generatedImage = uploadedImage;
  let generatedText = '';

  if (needsImage) {
    generatedImage = await QiniuAI.imageEdit(uploadedImage, imagePrompt, {
      image_config: { aspect_ratio: type === 'video' ? '16:9' : '4:3' }
    });
  }

  if (needsText) {
    const result = await QiniuAI.chat([
      { role: 'system', content: '你是乡村振兴主题文旅科普助手，专注于怀柔乡村的产业兴旺、生态宜居、乡风文明。撰写文案时紧扣乡村振兴战略，语言优美朴实。直接输出正文，不要加标题或多余说明。' },
      { role: 'user', content: buildTextPrompt(type, style, userPrompt, location) }
    ]);
    generatedText = result.text.trim();
  }

  const results = [];

  if (type === 'video') {
    results.push({
      title: `${locationName} · 乡村振兴短片`,
      desc: generatedText || `${styleNames[style]}风格风景短片封面`,
      type: 'video',
      image: generatedImage
    });
  } else if (type === 'article') {
    results.push({
      title: `乡村游记 · ${locationName}`,
      desc: generatedText,
      type: 'article',
      image: generatedImage
    });
  } else if (type === 'story') {
    results.push({
      title: `${locationName} · 乡村振兴故事`,
      desc: generatedText,
      type: 'story',
      image: generatedImage
    });
  } else if (type === 'poster') {
    results.push({
      title: `${locationName} · 乡村振兴海报`,
      desc: `乡村振兴主题 | ${styleNames[style]}风格科普宣传海报`,
      type: 'poster',
      image: generatedImage
    });
  }

  if (type !== 'poster') {
    const variantPrompt = buildImagePrompt('poster', style, '艺术变体，更具创意', location);
    try {
      const variantImage = await QiniuAI.imageEdit(uploadedImage, variantPrompt, {
        image_config: { aspect_ratio: '1:1' }
      });
      results.push({
        title: `${locationName} · 艺术变体`,
        desc: `${styleNames[style]}二次创作版本`,
        type: 'image',
        image: variantImage
      });
    } catch {
      results.push({
        title: `${locationName} · 艺术变体`,
        desc: `${styleNames[style]}二次创作版本`,
        type: 'image',
        image: generatedImage
      });
    }
  }

  return results;
}

function renderResults(results, container) {
  container.innerHTML = results.map(r => {
    const imgSrc = r.image.replace(/"/g, '&quot;');

    if (r.type === 'video') {
      return `
        <div class="result-item">
          <div class="result-video-thumb">
            <img src="${imgSrc}" alt="${r.title}">
            <span class="play-btn">▶</span>
          </div>
          <div class="result-item-body">
            <h4>${r.title}</h4>
            <p>${r.desc}</p>
            <div class="result-actions">
              <button onclick="downloadImage('${imgSrc}', '${r.title}')">下载</button>
              <button onclick="shareWork('${r.title}')">分享</button>
            </div>
          </div>
        </div>`;
    }

    if (r.type === 'article' || r.type === 'story') {
      return `
        <div class="result-item">
          <img src="${imgSrc}" alt="${r.title}">
          <div class="result-item-body">
            <h4>${r.title}</h4>
            <p class="result-text">${r.desc}</p>
            <div class="result-actions">
              <button onclick="copyText(${JSON.stringify(r.desc)})">复制文字</button>
              <button onclick="downloadImage('${imgSrc}', '${r.title}')">下载配图</button>
            </div>
          </div>
        </div>`;
    }

    return `
      <div class="result-item">
        <img src="${imgSrc}" alt="${r.title}">
        <div class="result-item-body">
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
          <div class="result-actions">
            <button onclick="downloadImage('${imgSrc}', '${r.title}')">下载</button>
            <button onclick="shareWork('${r.title}')">分享</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  container.innerHTML = DEMO_GALLERY.map(item => `
    <div class="gallery-item">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-item-overlay">
        <span>${item.title} · ${item.author}</span>
      </div>
    </div>
  `).join('');
}

window.downloadImage = function(src, name) {
  const a = document.createElement('a');
  a.href = src;
  a.download = (name || 'huairou-creation') + '.png';
  a.click();
};

window.copyText = function(text) {
  navigator.clipboard.writeText(text).then(() => alert('文字已复制到剪贴板'));
};

window.shareWork = function(title) {
  if (navigator.share) {
    navigator.share({ title, text: `我在科普十文旅创作了怀柔风景作品：${title}`, url: window.location.href });
  } else {
    alert(`分享：${title}`);
  }
};
