export const QUESTIONS = [
  {
    id: 'sleep_time',
    text: '你通常几点睡觉？',
    icon: '🌙',
    options: [
      { value: 0, label: '22:00 前' },
      { value: 1, label: '22:00-23:00' },
      { value: 2, label: '23:00-00:00' },
      { value: 3, label: '00:00-01:00' },
      { value: 4, label: '01:00 之后' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的情况，比如"看有没有早课"...',
    weight: 1.5,
    dimension: 'sleep'
  },
  {
    id: 'wake_time',
    text: '第二天没课的话，你几点自然醒？',
    icon: '☀️',
    options: [
      { value: 0, label: '7点前就醒了' },
      { value: 1, label: '7-8点' },
      { value: 2, label: '8-9点' },
      { value: 3, label: '9-10点' },
      { value: 4, label: '10点以后' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看昨晚几点睡的"...',
    weight: 1.5,
    dimension: 'sleep'
  },
  {
    id: 'sleep_sensitivity',
    text: '宿舍有人开灯或说话时，你还能睡着吗？',
    icon: '💡',
    options: [
      { value: 0, label: '完全不行，一点光和声音就醒' },
      { value: 1, label: '有点难，需要安静黑暗' },
      { value: 2, label: '还好，翻个身继续睡' },
      { value: 3, label: '基本不影响我' },
      { value: 4, label: '打雷都叫不醒我' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"戴眼罩耳塞就行"...',
    weight: 1.5,
    dimension: 'sleep'
  },
  {
    id: 'room_tidy',
    text: '你的桌面和床铺通常是什么状态？',
    icon: '🧹',
    options: [
      { value: 0, label: '东西到处都是，但我知道在哪' },
      { value: 1, label: '有点乱但还能接受' },
      { value: 2, label: '基本整洁，偶尔乱一下' },
      { value: 3, label: '比较整齐，东西归位' },
      { value: 4, label: '非常整洁，容不得一点乱' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"心情好就收拾，不好就乱着"...',
    weight: 1.5,
    dimension: 'cleanliness'
  },
  {
    id: 'shower_freq',
    text: '你多久洗一次澡？',
    icon: '🚿',
    options: [
      { value: 0, label: '一天一次或更多' },
      { value: 1, label: '基本每天' },
      { value: 2, label: '隔天一次' },
      { value: 3, label: '看情况，不一定' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"夏天每天，冬天看心情"...',
    weight: 1.3,
    dimension: 'cleanliness'
  },
  {
    id: 'trash_habit',
    text: '你倒垃圾的节奏是？',
    icon: '🗑️',
    options: [
      { value: 0, label: '每天必倒' },
      { value: 1, label: '2-3天倒一次' },
      { value: 2, label: '满了就倒' },
      { value: 3, label: '堆到不行才倒' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"轮到我值日就倒"...',
    weight: 1.0,
    dimension: 'cleanliness'
  },
  {
    id: 'study_place',
    text: '你更习惯在哪里学习？',
    icon: '📚',
    options: [
      { value: 0, label: '图书馆或自习室' },
      { value: 1, label: '图书馆为主，偶尔宿舍' },
      { value: 2, label: '看心情，哪都行' },
      { value: 3, label: '宿舍为主，偶尔图书馆' },
      { value: 4, label: '就在宿舍' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"考前图书馆，平时宿舍"...',
    weight: 1.2,
    dimension: 'study'
  },
  {
    id: 'study_noise',
    text: '你在宿舍学习时，室友打游戏看视频你会？',
    icon: '🎧',
    options: [
      { value: 0, label: '完全受不了，必须安静' },
      { value: 1, label: '有点影响，戴耳机能忍' },
      { value: 2, label: '还好，不太影响我' },
      { value: 3, label: '无所谓，我也能看' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看什么内容，太吵就不行"...',
    weight: 1.3,
    dimension: 'study'
  },
  {
    id: 'game_habit',
    text: '你打游戏吗？',
    icon: '🎮',
    options: [
      { value: 0, label: '不打' },
      { value: 1, label: '偶尔玩玩' },
      { value: 2, label: '经常玩' },
      { value: 3, label: '重度玩家' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的游戏习惯...',
    weight: 1.2,
    dimension: 'entertainment',
    followUps: {
      condition: (val) => val >= 1,
      questions: [
        {
          id: 'game_types',
          text: '你通常玩什么类型的游戏？',
          icon: '🎯',
          type: 'multi',
          options: [
            { value: 'moba', label: 'MOBA（王者荣耀/英雄联盟）' },
            { value: 'fps', label: 'FPS（CS2/瓦罗兰特/PUBG）' },
            { value: 'rpg', label: 'RPG（原神/崩铁/黑神话）' },
            { value: 'strategy', label: '策略（文明/全面战争）' },
            { value: 'party', label: '派对游戏（蛋仔/糖豆人）' },
            { value: 'card', label: '卡牌（炉石/游戏王）' },
            { value: 'survival', label: '生存建造（我的世界/饥荒）' },
            { value: 'other', label: '其他' }
          ],
          allowCustom: true,
          customPlaceholder: '说说你还玩什么...',
          weight: 1.0,
          dimension: 'entertainment'
        },
        {
          id: 'game_voice',
          text: '打游戏时你会开语音吗？',
          icon: '🎙️',
          options: [
            { value: 0, label: '从不开麦' },
            { value: 1, label: '偶尔开，小声说' },
            { value: 2, label: '经常开麦沟通' },
            { value: 3, label: '必须开麦，会喊' }
          ],
          allowCustom: true,
          customPlaceholder: '比如"看室友在不在"...',
          weight: 1.5,
          dimension: 'entertainment'
        }
      ]
    }
  },
  {
    id: 'music_video',
    text: '你在宿舍听音乐看视频时？',
    icon: '🎵',
    options: [
      { value: 0, label: '一定戴耳机' },
      { value: 1, label: '大多戴耳机，偶尔外放' },
      { value: 2, label: '看室友在不在' },
      { value: 3, label: '经常外放' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"室友也外放我就外放"...',
    weight: 1.3,
    dimension: 'entertainment'
  },
  {
    id: 'ac_temp',
    text: '夏天空调你希望开多少度？',
    icon: '❄️',
    options: [
      { value: 0, label: '24°C以下，越凉越好' },
      { value: 1, label: '24-26°C' },
      { value: 2, label: '26°C左右' },
      { value: 3, label: '27-28°C' },
      { value: 4, label: '不太想开空调' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"怕冷，26度以下受不了"...',
    weight: 1.3,
    dimension: 'lifestyle'
  },
  {
    id: 'smoking',
    text: '你对宿舍里吸烟怎么看？',
    icon: '🚭',
    options: [
      { value: 0, label: '完全不能接受' },
      { value: 1, label: '去阳台抽就行' },
      { value: 2, label: '无所谓' },
      { value: 3, label: '我自己偶尔抽' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的看法...',
    weight: 1.5,
    dimension: 'lifestyle'
  },
  {
    id: 'guest_policy',
    text: '室友带朋友来宿舍，你能接受吗？',
    icon: '🚪',
    options: [
      { value: 0, label: '不太喜欢，宿舍是私人空间' },
      { value: 1, label: '偶尔可以，提前说一声' },
      { value: 2, label: '无所谓' },
      { value: 3, label: '挺好的，我也经常带' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看什么朋友，待多久"...',
    weight: 1.0,
    dimension: 'lifestyle'
  },
  {
    id: 'mbti_ei_1',
    text: '周末没有安排时，你更想？',
    icon: '🧠',
    options: [
      { value: 0, label: '一个人待着充电' },
      { value: 1, label: '约一两个好友出去' },
      { value: 2, label: '看心情，都行' },
      { value: 3, label: '组局，人越多越好' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你理想中的周末...',
    weight: 2.0,
    dimension: 'personality',
    mbtiDimension: 'EI'
  },
  {
    id: 'mbti_ei_2',
    text: '在一个全是陌生人的聚会里，你会？',
    icon: '🧠',
    options: [
      { value: 0, label: '找个角落待着，等认识的人来' },
      { value: 1, label: '安静观察，有人搭话就聊' },
      { value: 2, label: '试着主动找话题' },
      { value: 3, label: '主动自我介绍，认识所有人' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看有没有共同话题"...',
    weight: 2.0,
    dimension: 'personality',
    mbtiDimension: 'EI'
  },
  {
    id: 'mbti_ei_3',
    text: '忙了一整天之后，你怎么恢复精力？',
    icon: '🧠',
    options: [
      { value: 0, label: '独处，安静地做自己的事' },
      { value: 1, label: '和一两个好朋友聊天' },
      { value: 2, label: '看情况，有时独处有时社交' },
      { value: 3, label: '出去嗨，和朋友待在一起' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的方式...',
    weight: 2.0,
    dimension: 'personality',
    mbtiDimension: 'EI'
  },
  {
    id: 'mbti_sn_1',
    text: '你更喜欢哪种聊天方式？',
    icon: '🧠',
    options: [
      { value: 0, label: '聊具体的事，实际的话题' },
      { value: 1, label: '都可以，但偏向实际' },
      { value: 2, label: '都可以，但偏向天马行空' },
      { value: 3, label: '聊想法、可能性、各种脑洞' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看和谁聊"...',
    weight: 1.5,
    dimension: 'personality',
    mbtiDimension: 'SN'
  },
  {
    id: 'mbti_sn_2',
    text: '做决定时你更依赖？',
    icon: '🧠',
    options: [
      { value: 0, label: '事实和数据，经验总结' },
      { value: 1, label: '偏向事实，也听直觉' },
      { value: 2, label: '偏向直觉，也看事实' },
      { value: 3, label: '直觉和第六感' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看什么决定"...',
    weight: 1.5,
    dimension: 'personality',
    mbtiDimension: 'SN'
  },
  {
    id: 'mbti_tf_1',
    text: '朋友跟你诉苦时，你第一反应是？',
    icon: '🧠',
    options: [
      { value: 0, label: '帮他分析问题，找解决办法' },
      { value: 1, label: '先理解感受，再想办法' },
      { value: 2, label: '先安慰，再一起分析' },
      { value: 3, label: '陪着他，让他知道有人在乎' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看是什么问题"...',
    weight: 2.0,
    dimension: 'personality',
    mbtiDimension: 'TF'
  },
  {
    id: 'mbti_tf_2',
    text: '宿舍有矛盾时，你觉得最重要的是？',
    icon: '🧠',
    options: [
      { value: 0, label: '把事情说清楚，对事不对人' },
      { value: 1, label: '先照顾大家感受，再谈事情' },
      { value: 2, label: '两者都重要' },
      { value: 3, label: '和气最重要，别伤了感情' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的想法...',
    weight: 2.0,
    dimension: 'personality',
    mbtiDimension: 'TF'
  },
  {
    id: 'mbti_jp_1',
    text: '你做事更倾向于？',
    icon: '🧠',
    options: [
      { value: 0, label: '提前规划，按计划来' },
      { value: 1, label: '有个大致方向就行' },
      { value: 2, label: '走一步看一步' },
      { value: 3, label: '随心所欲，deadline是第一生产力' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"大事有计划，小事随性"...',
    weight: 1.5,
    dimension: 'personality',
    mbtiDimension: 'JP'
  },
  {
    id: 'mbti_jp_2',
    text: '旅行时你更喜欢？',
    icon: '🧠',
    options: [
      { value: 0, label: '详细攻略，精确到小时' },
      { value: 1, label: '定好大方向，细节随缘' },
      { value: 2, label: '只定出发和回程，中间随走' },
      { value: 3, label: '说走就走，到了再说' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看去哪，远的地方会做攻略"...',
    weight: 1.5,
    dimension: 'personality',
    mbtiDimension: 'JP'
  },
  {
    id: 'conflict_style',
    text: '和室友有分歧时，你通常会？',
    icon: '🤝',
    options: [
      { value: 0, label: '先忍着，实在不行再说' },
      { value: 1, label: '私下找对方聊' },
      { value: 2, label: '直接说出来，一起商量' },
      { value: 3, label: '拉上大家开个宿舍会' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看什么事，小事就算了"...',
    weight: 2.0,
    dimension: 'personality'
  },
  {
    id: 'sharing',
    text: '室友想借你的东西，你的态度是？',
    icon: '📦',
    options: [
      { value: 0, label: '不太想借，各用各的' },
      { value: 1, label: '小东西可以，大件不行' },
      { value: 2, label: '基本都行，说一声就好' },
      { value: 3, label: '随便用，不分你我' }
    ],
    allowCustom: true,
    customPlaceholder: '比如"看什么东西和什么人"...',
    weight: 1.0,
    dimension: 'personality'
  },
  {
    id: 'ideal_dorm',
    text: '你理想中的宿舍生活是什么样的？',
    icon: '🏡',
    options: [
      { value: 0, label: '安静舒适，各自独立' },
      { value: 1, label: '偶尔一起吃饭聊天' },
      { value: 2, label: '经常一起活动，像小家庭' },
      { value: 3, label: '形影不离，什么都一起' }
    ],
    allowCustom: true,
    customPlaceholder: '描述一下你理想中的宿舍...',
    weight: 2.0,
    dimension: 'personality'
  }
]

export function getFlatQuestions() {
  const result = []
  for (const q of QUESTIONS) {
    result.push(q)
    if (q.followUps && q.followUps.questions) {
      for (const fq of q.followUps.questions) {
        result.push({ ...fq, isFollowUp: true, parentQuestion: q.id })
      }
    }
  }
  return result
}

export function getVisibleQuestions(answers) {
  const result = []
  for (const q of QUESTIONS) {
    result.push(q)
    if (q.followUps) {
      const answer = answers[q.id]
      if (answer !== undefined && q.followUps.condition(answer)) {
        for (const fq of q.followUps.questions) {
          result.push({ ...fq, isFollowUp: true, parentQuestion: q.id })
        }
      }
    }
  }
  return result
}

export function getAnswersVector(answers) {
  const allQuestions = getFlatQuestions().filter(q => q.type !== 'multi')
  return allQuestions.map(q => {
    const answer = answers[q.id]
    if (typeof answer === 'number') return answer
    return 0
  })
}

export function getWeightsVector() {
  const allQuestions = getFlatQuestions().filter(q => q.type !== 'multi')
  return allQuestions.map(q => q.weight)
}

export function getDimensionLabel(dim) {
  const map = {
    sleep: '作息',
    cleanliness: '卫生',
    study: '学习',
    entertainment: '娱乐',
    lifestyle: '生活',
    personality: '性格'
  }
  return map[dim] || dim
}

export function getMbtiResult(answers) {
  const mbtiQuestions = getFlatQuestions().filter(q => q.mbtiDimension)
  const dims = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  for (const q of mbtiQuestions) {
    const val = answers[q.id]
    if (val === undefined) continue
    const weight = q.weight
    switch (q.mbtiDimension) {
      case 'EI':
        if (val <= 1) dims.I += weight * (2 - val)
        else dims.E += weight * val
        break
      case 'SN':
        if (val <= 1) dims.S += weight * (2 - val)
        else dims.N += weight * val
        break
      case 'TF':
        if (val <= 1) dims.T += weight * (2 - val)
        else dims.F += weight * val
        break
      case 'JP':
        if (val <= 1) dims.J += weight * (2 - val)
        else dims.P += weight * val
        break
    }
  }

  return {
    type: (dims.E >= dims.I ? 'E' : 'I') +
          (dims.S >= dims.N ? 'S' : 'N') +
          (dims.T >= dims.F ? 'T' : 'F') +
          (dims.J >= dims.P ? 'J' : 'P'),
    scores: dims
  }
}
