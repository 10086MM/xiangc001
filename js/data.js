/**
 * 怀柔文旅数据 - 图片均为本地 image/ 目录
 */
const HUAIROU_DATA = {
  spots: [
    {
      id: 'mutianyu',
      name: '慕田峪长城',
      category: '文化遗产',
      image: 'image/mutianyu.jpg',
      description: '慕田峪长城始建于北齐，明代重修。长城沿线村落发展民宿旅游，是文旅融合助力乡村振兴的典范。',
      location: '怀柔区渤海镇',
      tags: ['世界遗产', '登山', '摄影']
    },
    {
      id: 'yanqi',
      name: '雁栖湖',
      category: '生态景观',
      image: 'image/yanqi.jpg',
      description: '雁栖湖三面环山，湖水清澈。国际会都建设与乡村旅游协同发展，带动周边乡村经济振兴。',
      location: '怀柔区雁栖镇',
      tags: ['湖泊', '会议旅游', '骑行']
    },
    {
      id: 'hongluo',
      name: '红螺寺',
      category: '宗教文化',
      image: 'image/hongluo.jpg',
      description: '千年古刹红螺寺，银杏金黄。古寺文化与乡村民俗相映成趣，是乡风文明建设的文化地标。',
      location: '怀柔区红螺东路',
      tags: ['古寺', '祈福', '银杏']
    },
    {
      id: 'huanghuacheng',
      name: '黄花城水长城',
      category: '自然奇观',
      image: 'image/huanghuacheng.jpg',
      description: '长城入水奇观，碧水青山。生态优先的绿色发展模式，让乡村既保生态又促增收。',
      location: '怀柔区九渡河镇',
      tags: ['水上长城', '徒步', '野餐']
    },
    {
      id: 'labagou',
      name: '喇叭沟门原始森林',
      category: '生态景观',
      image: 'image/forest.jpg',
      description: '原始森林生态景区，秋季红叶漫山。生态旅游与林下经济结合，践行绿水青山就是金山银山。',
      location: '怀柔区喇叭沟门乡',
      tags: ['红叶', '森林', '观鸟']
    },
    {
      id: 'science',
      name: '怀柔科学城',
      category: '科技科普',
      image: 'image/science.jpg',
      description: '怀柔科学城辐射带动周边乡村，科技人才下乡、科普进田间，科技赋能乡村振兴。',
      location: '怀柔区科学城',
      tags: ['科普', '科技', '研学']
    }
  ],

  routes: [
    {
      id: 'culture',
      name: '文化探秘线',
      duration: '1天',
      distance: '约45公里',
      description: '探访千年古迹与美丽乡村，感受文化振兴与文旅融合的乡村新貌',
      color: '#1a5c45',
      stops: [
        { name: '红螺寺', desc: '千年古刹，银杏金黄', x: 35, y: 55 },
        { name: '慕田峪长城', desc: '雄关漫道，登高望远', x: 55, y: 75 },
        { name: '黄花城水长城', desc: '长城入水，江南风韵', x: 45, y: 65 }
      ]
    },
    {
      id: 'nature',
      name: '生态山水线',
      duration: '1-2天',
      distance: '约80公里',
      description: '徜徉山水田园，体验生态宜居与产业兴旺的乡村振兴成果',
      color: '#2d8a66',
      stops: [
        { name: '雁栖湖', desc: '湖光山色，国际会都', x: 60, y: 40 },
        { name: '喇叭沟门', desc: '原始森林，红叶漫山', x: 75, y: 20 },
        { name: '怀柔水库', desc: '碧波荡漾，垂钓休闲', x: 40, y: 45 }
      ]
    },
    {
      id: 'science-tour',
      name: '科普研学线',
      duration: '半天',
      distance: '约30公里',
      description: '走进科学城与乡村科普站，探索科技赋能乡村振兴的实践路径',
      color: '#c8956c',
      stops: [
        { name: '怀柔科学城', desc: '大国重器，科技前沿', x: 50, y: 50 },
        { name: '中科院大学', desc: '科教融合，人才培养', x: 48, y: 48 },
        { name: '乡村科普站', desc: '田间地头，科普下乡', x: 42, y: 60 }
      ]
    }
  ],

  geology: {
    overview: {
      title: '怀柔地质概况',
      image: 'image/geology.jpg',
      content: '怀柔区位于北京市东北部，地处燕山山脉中段，地貌类型多样，包括山地、丘陵、河谷平原等。区内燕山期花岗岩广泛分布，形成了独特的山体景观。长城沿线可见明显的断层崖和侵蚀地貌，河谷地带发育有冲积扇和阶地沉积。',
      facts: [
        { label: '地貌类型', value: '山地、丘陵、河谷平原' },
        { label: '主要岩石', value: '燕山期花岗岩、片麻岩' },
        { label: '海拔范围', value: '50m - 1681m（云蒙山）' },
        { label: '地质年代', value: '元古界至新生代' }
      ]
    },
    greatwall: {
      title: '长城沿线地质',
      image: 'image/scenery.jpg',
      content: '慕田峪、黄花城等长城段落依山而建，充分利用了天然山脊和断崖地形。墙体石材多就地取材，主要为花岗岩和石灰岩。关隘处常见断层通过，形成了天然的军事防御屏障。水长城段因水库蓄水，淹没了部分河谷长城，形成了独特的水下长城景观。',
      facts: [
        { label: '墙体石材', value: '花岗岩、石灰岩就地取材' },
        { label: '地形利用', value: '山脊、断崖、关隘' },
        { label: '特殊景观', value: '水长城淹没段' },
        { label: '侵蚀类型', value: '风化、流水侵蚀' }
      ]
    },
    ecology: {
      title: '生态与地貌',
      image: 'image/ecology.jpg',
      content: '喇叭沟门原始森林保存了完整的垂直植被带谱，从山麓的阔叶林到山顶的桦林，展现了燕山山地植被的典型特征。雁栖湖盆地属永定河水系，湖水来源于周边山泉和降雨，水质达到国家二类标准。区内生物多样性丰富，有国家一级保护动物褐马鸡等。',
      facts: [
        { label: '森林覆盖率', value: '75%以上' },
        { label: '植被类型', value: '暖温带落叶阔叶林' },
        { label: '水体标准', value: '国家二类水质' },
        { label: '珍稀物种', value: '褐马鸡、豹猫等' }
      ]
    },
    scenery: {
      title: '沿途风貌',
      image: 'image/village.jpg',
      content: '沿京承高速进入怀柔，可见燕山山脉连绵起伏。乡村公路两旁板栗、核桃成林，渤海镇、九渡河镇等村落保留明清民居风貌，民宿旅游蓬勃发展，是京郊乡村振兴的生动样板。',
      facts: [
        { label: '特色物产', value: '板栗、核桃、虹鳟鱼' },
        { label: '村落风貌', value: '明清民居、青砖灰瓦' },
        { label: '最佳季节', value: '春秋两季' },
        { label: '交通干线', value: '京承高速、怀雁路' }
      ]
    }
  },

  quiz: [
    {
      question: '乡村振兴战略的总要求是什么？',
      options: ['产业兴旺、生态宜居、乡风文明、治理有效、生活富裕', '农业现代化、农村城镇化', '脱贫攻坚、全面小康', '绿色发展、协调发展'],
      answer: 0,
      explanation: '乡村振兴战略总要求是：产业兴旺、生态宜居、乡风文明、治理有效、生活富裕。'
    },
    {
      question: '怀柔区的特色产业名片是什么农产品？',
      options: ['苹果', '板栗', '葡萄', '大米'],
      answer: 1,
      explanation: '怀柔板栗闻名遐迩，是带动农民增收、产业兴旺的特色农产品。'
    },
    {
      question: '慕田峪长城的植被覆盖率大约是多少？',
      options: ['60%', '76%', '86%', '96%'],
      answer: 3,
      explanation: '慕田峪长城植被覆盖率高达96%以上，生态宜居成效显著。'
    },
    {
      question: '黄花城水长城体现了哪种乡村振兴理念？',
      options: ['先污染后治理', '绿水青山就是金山银山', '围湖造田', '大规模开发'],
      answer: 1,
      explanation: '水长城景区坚持生态优先，山水相依，是绿色发展理念的生动体现。'
    },
    {
      question: '怀柔科学城对乡村振兴的主要作用是？',
      options: ['科技赋能、人才带动', '取代传统农业', '减少农村人口', '关闭旅游景区'],
      answer: 0,
      explanation: '科学城辐射带动周边乡村，以科技赋能产业兴旺和治理有效。'
    }
  ],

  learnModules: [
    {
      title: '乡村振兴',
      subtitle: '五大振兴 · 怀柔实践',
      image: 'image/village.jpg',
      topics: ['产业兴旺：板栗产业与民宿经济', '生态宜居：森林保护与美丽乡村', '乡风文明：长城文化与民俗传承', '治理有效：数字乡村与基层治理', '生活富裕：农民增收与文旅融合']
    },
    {
      title: '生态科普',
      subtitle: '绿水青山就是金山银山',
      image: 'image/forest.jpg',
      topics: ['燕山山地植被与生物多样性', '喇叭沟门生态保护实践', '雁栖湖水质保护与治理', '板栗林下经济与绿色种植']
    },
    {
      title: '长城文化',
      subtitle: '文化振兴与文旅融合',
      image: 'image/mutianyu2.jpg',
      topics: ['长城文化与乡村民俗', '慕田峪文旅融合示范', '古村落保护与活化利用', '非遗传承与乡村旅游']
    },
    {
      title: '科技赋能',
      subtitle: '科学城辐射乡村',
      image: 'image/science.jpg',
      topics: ['怀柔科学城与区域协同发展', '科普下乡与研学实践', '智慧农业与数字乡村', '人才返乡与创新创业']
    }
  ]
};

if (typeof window !== 'undefined') {
  window.HUAIROU_DATA = HUAIROU_DATA;
}
