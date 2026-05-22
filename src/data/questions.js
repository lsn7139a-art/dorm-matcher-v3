// ============================================================
// [TEST_VERSION_ONLY] 内置测试数据 - 正式版必须删除
// ============================================================
export const TEST_DORMITORIES = [
  {
    id: 'test_dorm_1',
    name: '深夜游戏宿舍',
    description: '都是夜猫子，游戏搭子型宿舍',
    members: [
      {
        id: 'test_u1', name: '小强', tagline: '每天睡前必打两把王者，不开麦浑身难受', mbti: 'ESFP',
        answers: {
          bed_time: 5, bed_activity: 5, bed_game_voice: 2,
          sleep_time: 6, wake_time: 3, sleep_sensitivity: 3,
          room_tidy: 2, trash_habit: 2, shower_freq: 2,
          study_place: 4, study_noise: 3,
          game_habit: 3, game_types: ['moba', 'fps'], game_voice: 3, game_duration: 4, game_motivation: 2, game_self_control: 1,
          music_video: 3, ac_temp: 1, smoking: 2, guest_policy: 2,
          hobby_main: 2, hobby_content: ['anime', 'game'], chat_topic: ['game', 'tech'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 2, mbti_sn_2: 1,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 2, mbti_jp_2: 3,
          conflict_style: 2, sharing: 3, ideal_dorm: 2
        }
      },
      {
        id: 'test_u2', name: '阿轩', tagline: '英雄联盟重度玩家，打到禁排才睡觉', mbti: 'ENTP',
        answers: {
          bed_time: 5, bed_activity: 5, bed_game_voice: 3,
          sleep_time: 6, wake_time: 4, sleep_sensitivity: 4,
          room_tidy: 1, trash_habit: 3, shower_freq: 1,
          study_place: 4, study_noise: 3,
          game_habit: 3, game_types: ['moba'], game_voice: 3, game_duration: 5, game_motivation: 1, game_self_control: 0,
          music_video: 3, ac_temp: 0, smoking: 2, guest_policy: 3,
          hobby_main: 2, hobby_content: ['anime', 'game'], chat_topic: ['game', 'meme'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 3, mbti_sn_2: 3,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 3, mbti_jp_2: 3,
          conflict_style: 2, sharing: 2, ideal_dorm: 2
        }
      },
      {
        id: 'test_u3', name: '小林', tagline: 'FPS玩家，虽然不开麦但外放音效', mbti: 'ISTP',
        answers: {
          bed_time: 4, bed_activity: 5, bed_game_voice: 0,
          sleep_time: 5, wake_time: 3, sleep_sensitivity: 3,
          room_tidy: 1, trash_habit: 2, shower_freq: 2,
          study_place: 2, study_noise: 2,
          game_habit: 3, game_types: ['fps'], game_voice: 0, game_duration: 4, game_motivation: 1, game_self_control: 2,
          music_video: 2, ac_temp: 1, smoking: 1, guest_policy: 1,
          hobby_main: 2, hobby_content: ['tech', 'game'], chat_topic: ['game', 'tech'], free_time: 1,
          mbti_ei_1: 1, mbti_ei_2: 1, mbti_ei_3: 1,
          mbti_sn_1: 1, mbti_sn_2: 0,
          mbti_tf_1: 0, mbti_tf_2: 1,
          mbti_jp_1: 2, mbti_jp_2: 2,
          conflict_style: 1, sharing: 2, ideal_dorm: 1
        }
      },
      {
        id: 'test_u11', name: '大飞', tagline: '王者荣耀上分狂魔，每天至少三小时起步', mbti: 'ESTP',
        answers: {
          bed_time: 5, bed_activity: 5, bed_game_voice: 2,
          sleep_time: 6, wake_time: 4, sleep_sensitivity: 4,
          room_tidy: 1, trash_habit: 3, shower_freq: 2,
          study_place: 3, study_noise: 3,
          game_habit: 3, game_types: ['moba', 'fps'], game_voice: 3, game_duration: 4, game_motivation: 2, game_self_control: 1,
          music_video: 2, ac_temp: 0, smoking: 2, guest_policy: 2,
          hobby_main: 2, hobby_content: ['game', 'sports'], chat_topic: ['game', 'sports'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 1, mbti_sn_2: 1,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 3, mbti_jp_2: 3,
          conflict_style: 2, sharing: 2, ideal_dorm: 2
        }
      },
      {
        id: 'test_u12', name: '阿凯', tagline: '吃鸡爱好者，外放声音但自认为不大', mbti: 'ESFP',
        answers: {
          bed_time: 4, bed_activity: 5, bed_game_voice: 1,
          sleep_time: 5, wake_time: 3, sleep_sensitivity: 3,
          room_tidy: 2, trash_habit: 2, shower_freq: 1,
          study_place: 3, study_noise: 2,
          game_habit: 3, game_types: ['fps', 'party'], game_voice: 2, game_duration: 3, game_motivation: 1, game_self_control: 2,
          music_video: 2, ac_temp: 1, smoking: 1, guest_policy: 2,
          hobby_main: 2, hobby_content: ['game', 'music'], chat_topic: ['game', 'meme'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 2, mbti_ei_3: 3,
          mbti_sn_1: 2, mbti_sn_2: 1,
          mbti_tf_1: 3, mbti_tf_2: 2,
          mbti_jp_1: 2, mbti_jp_2: 3,
          conflict_style: 2, sharing: 3, ideal_dorm: 2
        }
      },
      {
        id: 'test_u13', name: '小磊', tagline: '原神每日必清，打完才睡', mbti: 'INFP',
        answers: {
          bed_time: 4, bed_activity: 5, bed_game_voice: 0,
          sleep_time: 5, wake_time: 3, sleep_sensitivity: 2,
          room_tidy: 2, trash_habit: 2, shower_freq: 1,
          study_place: 2, study_noise: 2,
          game_habit: 3, game_types: ['rpg'], game_voice: 0, game_duration: 3, game_motivation: 0, game_self_control: 2,
          music_video: 1, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 2, hobby_content: ['anime', 'game', 'novel'], chat_topic: ['anime', 'game'], free_time: 1,
          mbti_ei_1: 0, mbti_ei_2: 1, mbti_ei_3: 0,
          mbti_sn_1: 2, mbti_sn_2: 2,
          mbti_tf_1: 3, mbti_tf_2: 3,
          mbti_jp_1: 2, mbti_jp_2: 2,
          conflict_style: 0, sharing: 2, ideal_dorm: 1
        }
      }
    ]
  },
  {
    id: 'test_dorm_2',
    name: '早睡早起宿舍',
    description: '作息规律，互相不影响',
    members: [
      {
        id: 'test_u4', name: '小雨', tagline: '10点半必睡，睡前看书或听播客，戴耳机', mbti: 'INFJ',
        answers: {
          bed_time: 0, bed_activity: 2, bed_music_habit: 0,
          sleep_time: 0, wake_time: 0, sleep_sensitivity: 0,
          room_tidy: 4, trash_habit: 0, shower_freq: 1,
          study_place: 0, study_noise: 0,
          game_habit: 0,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['reading', 'music'], chat_topic: ['study', 'life'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 0, mbti_ei_3: 0,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 3, mbti_tf_2: 3,
          mbti_jp_1: 0, mbti_jp_2: 0,
          conflict_style: 2, sharing: 2, ideal_dorm: 0
        }
      },
      {
        id: 'test_u5', name: '阿文', tagline: '轻度游戏玩家，只玩休闲游戏，从不熬夜', mbti: 'ISFJ',
        answers: {
          bed_time: 2, bed_activity: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 3, trash_habit: 1, shower_freq: 1,
          study_place: 1, study_noise: 1,
          game_habit: 1, game_types: ['party', 'survival'], game_voice: 0, game_duration: 1, game_motivation: 0, game_self_control: 3,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 2,
          hobby_main: 0, hobby_content: ['reading', 'music'], chat_topic: ['life', 'study'], free_time: 0,
          mbti_ei_1: 1, mbti_ei_2: 1, mbti_ei_3: 1,
          mbti_sn_1: 1, mbti_sn_2: 1,
          mbti_tf_1: 2, mbti_tf_2: 2,
          mbti_jp_1: 1, mbti_jp_2: 1,
          conflict_style: 1, sharing: 3, ideal_dorm: 1
        }
      },
      {
        id: 'test_u6', name: '小雪', tagline: '生活规律，但周末会稍微晚点睡', mbti: 'ENFP',
        answers: {
          bed_time: 2, bed_activity: 3, bed_media_habit: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 2, trash_habit: 1, shower_freq: 1,
          study_place: 1, study_noise: 2,
          game_habit: 2, game_types: ['rpg', 'party'], game_voice: 1, game_duration: 2, game_motivation: 0, game_self_control: 2,
          music_video: 1, ac_temp: 2, smoking: 0, guest_policy: 2,
          hobby_main: 1, hobby_content: ['music', 'movie'], chat_topic: ['life', 'movie'], free_time: 1,
          mbti_ei_1: 2, mbti_ei_2: 2, mbti_ei_3: 2,
          mbti_sn_1: 2, mbti_sn_2: 2,
          mbti_tf_1: 3, mbti_tf_2: 2,
          mbti_jp_1: 2, mbti_jp_2: 2,
          conflict_style: 2, sharing: 2, ideal_dorm: 2
        }
      },
      {
        id: 'test_u14', name: '小静', tagline: '早睡早起身体好，每天晨跑', mbti: 'ISTJ',
        answers: {
          bed_time: 0, bed_activity: 0,
          sleep_time: 0, wake_time: 0, sleep_sensitivity: 0,
          room_tidy: 4, trash_habit: 0, shower_freq: 0,
          study_place: 0, study_noise: 0,
          game_habit: 0,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['sports', 'reading'], chat_topic: ['sports', 'study'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 0, mbti_ei_3: 0,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 0, mbti_jp_2: 0,
          conflict_style: 2, sharing: 1, ideal_dorm: 0
        }
      },
      {
        id: 'test_u15', name: '小兰', tagline: '喜欢安静，睡前听古典音乐', mbti: 'ISFP',
        answers: {
          bed_time: 2, bed_activity: 2, bed_music_habit: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 3, trash_habit: 1, shower_freq: 1,
          study_place: 1, study_noise: 1,
          game_habit: 0,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 1, hobby_content: ['music', 'art'], chat_topic: ['music', 'life'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 1, mbti_ei_3: 0,
          mbti_sn_1: 1, mbti_sn_2: 2,
          mbti_tf_1: 3, mbti_tf_2: 3,
          mbti_jp_1: 1, mbti_jp_2: 2,
          conflict_style: 0, sharing: 2, ideal_dorm: 0
        }
      },
      {
        id: 'test_u16', name: '阿诚', tagline: '生活极简，不碰游戏，偶尔看书', mbti: 'INTJ',
        answers: {
          bed_time: 2, bed_activity: 1, bed_light: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 3, trash_habit: 0, shower_freq: 1,
          study_place: 0, study_noise: 0,
          game_habit: 0,
          music_video: 0, ac_temp: 3, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['reading', 'tech'], chat_topic: ['tech', 'study'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 0, mbti_ei_3: 0,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 0, mbti_jp_2: 0,
          conflict_style: 2, sharing: 1, ideal_dorm: 0
        }
      }
    ]
  },
  {
    id: 'test_dorm_3',
    name: '学霸互助宿舍',
    description: '学习为主，偶尔放松',
    members: [
      {
        id: 'test_u7', name: '阿哲', tagline: '每天泡图书馆，宿舍只是睡觉', mbti: 'INTJ',
        answers: {
          bed_time: 2, bed_activity: 1, bed_light: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 3, trash_habit: 1, shower_freq: 1,
          study_place: 0, study_noise: 0,
          game_habit: 1, game_types: ['strategy'], game_voice: 0, game_duration: 1, game_motivation: 0, game_self_control: 3,
          music_video: 0, ac_temp: 3, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['reading', 'tech'], chat_topic: ['study', 'tech'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 0, mbti_ei_3: 0,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 0, mbti_jp_2: 1,
          conflict_style: 2, sharing: 1, ideal_dorm: 1
        }
      },
      {
        id: 'test_u8', name: '小慧', tagline: '学习累了会打游戏解压，但从不沉迷', mbti: 'ENTJ',
        answers: {
          bed_time: 2, bed_activity: 3, bed_media_habit: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 3, trash_habit: 1, shower_freq: 1,
          study_place: 0, study_noise: 0,
          game_habit: 2, game_types: ['strategy', 'rpg'], game_voice: 0, game_duration: 2, game_motivation: 0, game_self_control: 3,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['reading', 'movie'], chat_topic: ['study', 'life'], free_time: 0,
          mbti_ei_1: 2, mbti_ei_2: 2, mbti_ei_3: 2,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 0, mbti_jp_2: 1,
          conflict_style: 2, sharing: 2, ideal_dorm: 1
        }
      },
      {
        id: 'test_u17', name: '小颖', tagline: '奖学金选手，偶尔看番放松', mbti: 'ISTJ',
        answers: {
          bed_time: 2, bed_activity: 3, bed_media_habit: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 3, trash_habit: 0, shower_freq: 1,
          study_place: 0, study_noise: 0,
          game_habit: 1, game_types: ['rpg'], game_voice: 0, game_duration: 1, game_motivation: 0, game_self_control: 3,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['anime', 'reading'], chat_topic: ['anime', 'study'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 0, mbti_ei_3: 0,
          mbti_sn_1: 0, mbti_sn_2: 1,
          mbti_tf_1: 0, mbti_tf_2: 1,
          mbti_jp_1: 0, mbti_jp_2: 0,
          conflict_style: 1, sharing: 2, ideal_dorm: 0
        }
      },
      {
        id: 'test_u18', name: '阿明', tagline: '考研党，每天学到十一点回宿舍', mbti: 'INTP',
        answers: {
          bed_time: 4, bed_activity: 3, bed_media_habit: 0,
          sleep_time: 4, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 2, trash_habit: 1, shower_freq: 1,
          study_place: 0, study_noise: 0,
          game_habit: 1, game_types: ['strategy'], game_voice: 0, game_duration: 1, game_motivation: 0, game_self_control: 3,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 0,
          hobby_main: 0, hobby_content: ['tech', 'reading'], chat_topic: ['tech', 'study'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 0, mbti_ei_3: 0,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 0, mbti_jp_2: 1,
          conflict_style: 2, sharing: 1, ideal_dorm: 0
        }
      },
      {
        id: 'test_u19', name: '小薇', tagline: '自律达人，每天六点起床背单词', mbti: 'ESTJ',
        answers: {
          bed_time: 2, bed_activity: 1, bed_light: 0,
          sleep_time: 2, wake_time: 0, sleep_sensitivity: 1,
          room_tidy: 4, trash_habit: 0, shower_freq: 0,
          study_place: 0, study_noise: 0,
          game_habit: 0,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['reading', 'sports'], chat_topic: ['study', 'life'], free_time: 0,
          mbti_ei_1: 2, mbti_ei_2: 2, mbti_ei_3: 1,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 0, mbti_jp_2: 0,
          conflict_style: 2, sharing: 2, ideal_dorm: 1
        }
      },
      {
        id: 'test_u20', name: '小杰', tagline: '目标明确，学习之余看看纪录片', mbti: 'INFJ',
        answers: {
          bed_time: 2, bed_activity: 3, bed_media_habit: 0,
          sleep_time: 2, wake_time: 1, sleep_sensitivity: 1,
          room_tidy: 3, trash_habit: 1, shower_freq: 1,
          study_place: 0, study_noise: 1,
          game_habit: 0,
          music_video: 0, ac_temp: 2, smoking: 0, guest_policy: 1,
          hobby_main: 0, hobby_content: ['movie', 'reading'], chat_topic: ['movie', 'life'], free_time: 0,
          mbti_ei_1: 0, mbti_ei_2: 0, mbti_ei_3: 0,
          mbti_sn_1: 0, mbti_sn_2: 0,
          mbti_tf_1: 3, mbti_tf_2: 3,
          mbti_jp_1: 0, mbti_jp_2: 1,
          conflict_style: 1, sharing: 2, ideal_dorm: 0
        }
      }
    ]
  },
  {
    id: 'test_dorm_4',
    name: '社交活跃宿舍',
    description: '经常一起活动，带朋友回来',
    members: [
      {
        id: 'test_u9', name: '阿豪', tagline: '社牛，经常组局打游戏或出去浪', mbti: 'ESFJ',
        answers: {
          bed_time: 4, bed_activity: 4, bed_chat_duration: 2,
          sleep_time: 4, wake_time: 2, sleep_sensitivity: 3,
          room_tidy: 1, trash_habit: 2, shower_freq: 1,
          study_place: 3, study_noise: 3,
          game_habit: 3, game_types: ['moba', 'party'], game_voice: 2, game_duration: 3, game_motivation: 2, game_self_control: 1,
          music_video: 3, ac_temp: 1, smoking: 2, guest_policy: 3,
          hobby_main: 2, hobby_content: ['game', 'sports'], chat_topic: ['game', 'meme', 'life'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 2, mbti_sn_2: 2,
          mbti_tf_1: 3, mbti_tf_2: 3,
          mbti_jp_1: 2, mbti_jp_2: 2,
          conflict_style: 3, sharing: 3, ideal_dorm: 3
        }
      },
      {
        id: 'test_u10', name: '小美', tagline: '喜欢热闹，经常和室友一起看剧聊天', mbti: 'ENFJ',
        answers: {
          bed_time: 4, bed_activity: 4, bed_chat_duration: 2,
          sleep_time: 4, wake_time: 2, sleep_sensitivity: 2,
          room_tidy: 2, trash_habit: 1, shower_freq: 1,
          study_place: 2, study_noise: 2,
          game_habit: 2, game_types: ['party', 'rpg'], game_voice: 1, game_duration: 2, game_motivation: 2, game_self_control: 2,
          music_video: 2, ac_temp: 1, smoking: 1, guest_policy: 3,
          hobby_main: 1, hobby_content: ['movie', 'music'], chat_topic: ['movie', 'life', 'meme'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 2, mbti_sn_2: 2,
          mbti_tf_1: 3, mbti_tf_2: 3,
          mbti_jp_1: 2, mbti_jp_2: 2,
          conflict_style: 3, sharing: 3, ideal_dorm: 3
        }
      },
      {
        id: 'test_u21', name: '小阳', tagline: '追星达人，经常和室友一起看综艺', mbti: 'ESFP',
        answers: {
          bed_time: 4, bed_activity: 3, bed_media_habit: 2,
          sleep_time: 4, wake_time: 2, sleep_sensitivity: 2,
          room_tidy: 1, trash_habit: 2, shower_freq: 1,
          study_place: 3, study_noise: 2,
          game_habit: 2, game_types: ['party'], game_voice: 1, game_duration: 2, game_motivation: 2, game_self_control: 2,
          music_video: 3, ac_temp: 1, smoking: 1, guest_policy: 3,
          hobby_main: 1, hobby_content: ['music', 'movie'], chat_topic: ['music', 'meme', 'life'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 2, mbti_sn_2: 2,
          mbti_tf_1: 3, mbti_tf_2: 3,
          mbti_jp_1: 2, mbti_jp_2: 3,
          conflict_style: 3, sharing: 3, ideal_dorm: 3
        }
      },
      {
        id: 'test_u22', name: '阿龙', tagline: '运动健将，经常约人打球', mbti: 'ESTP',
        answers: {
          bed_time: 4, bed_activity: 4, bed_chat_duration: 1,
          sleep_time: 4, wake_time: 2, sleep_sensitivity: 3,
          room_tidy: 1, trash_habit: 2, shower_freq: 0,
          study_place: 3, study_noise: 3,
          game_habit: 2, game_types: ['fps', 'sports'], game_voice: 2, game_duration: 2, game_motivation: 1, game_self_control: 2,
          music_video: 2, ac_temp: 0, smoking: 2, guest_policy: 3,
          hobby_main: 1, hobby_content: ['sports', 'game'], chat_topic: ['sports', 'game', 'meme'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 1, mbti_sn_2: 1,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 3, mbti_jp_2: 3,
          conflict_style: 2, sharing: 3, ideal_dorm: 3
        }
      },
      {
        id: 'test_u23', name: '小可', tagline: '动漫社社长，经常组织线下活动', mbti: 'ENFP',
        answers: {
          bed_time: 4, bed_activity: 3, bed_media_habit: 1,
          sleep_time: 4, wake_time: 2, sleep_sensitivity: 2,
          room_tidy: 2, trash_habit: 1, shower_freq: 1,
          study_place: 2, study_noise: 2,
          game_habit: 2, game_types: ['rpg', 'party'], game_voice: 1, game_duration: 2, game_motivation: 2, game_self_control: 2,
          music_video: 2, ac_temp: 1, smoking: 0, guest_policy: 3,
          hobby_main: 1, hobby_content: ['anime', 'game', 'art'], chat_topic: ['anime', 'game', 'meme'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 2, mbti_ei_3: 3,
          mbti_sn_1: 2, mbti_sn_2: 2,
          mbti_tf_1: 3, mbti_tf_2: 2,
          mbti_jp_1: 2, mbti_jp_2: 2,
          conflict_style: 2, sharing: 3, ideal_dorm: 3
        }
      },
      {
        id: 'test_u24', name: '阿亮', tagline: '什么都聊，宿舍气氛组担当', mbti: 'ENTP',
        answers: {
          bed_time: 4, bed_activity: 4, bed_chat_duration: 2,
          sleep_time: 5, wake_time: 3, sleep_sensitivity: 3,
          room_tidy: 1, trash_habit: 2, shower_freq: 1,
          study_place: 3, study_noise: 3,
          game_habit: 2, game_types: ['moba', 'card'], game_voice: 2, game_duration: 2, game_motivation: 1, game_self_control: 2,
          music_video: 2, ac_temp: 1, smoking: 1, guest_policy: 3,
          hobby_main: 2, hobby_content: ['game', 'movie'], chat_topic: ['meme', 'game', 'life'], free_time: 2,
          mbti_ei_1: 3, mbti_ei_2: 3, mbti_ei_3: 3,
          mbti_sn_1: 3, mbti_sn_2: 3,
          mbti_tf_1: 0, mbti_tf_2: 0,
          mbti_jp_1: 3, mbti_jp_2: 3,
          conflict_style: 2, sharing: 3, ideal_dorm: 3
        }
      }
    ]
  }
]
// ============================================================
// [TEST_VERSION_ONLY] 反馈数据存储键名
// ============================================================
export const FEEDBACK_STORAGE_KEY = 'dorm_matcher_feedback'

// ============================================================
// 宿舍要求优先级 - 问卷前选择，影响匹配权重
// ============================================================
export const DORM_PRIORITIES = [
  { id: 'quiet', label: '安静环境', icon: '🤫', description: '希望室友能保持安静，不影响休息和学习', dimension: 'sleep', weightMultiplier: 1.8 },
  { id: 'sleep_schedule', label: '作息同步', icon: '🕐', description: '希望室友和自己的作息时间一致', dimension: 'sleep', weightMultiplier: 1.6 },
  { id: 'gaming', label: '游戏搭子', icon: '🎮', description: '希望室友也打游戏，可以一起开黑', dimension: 'entertainment', weightMultiplier: 2.0 },
  { id: 'cleanliness', label: '干净整洁', icon: '✨', description: '希望宿舍保持干净，室友有良好卫生习惯', dimension: 'cleanliness', weightMultiplier: 1.7 },
  { id: 'studying', label: '学习氛围', icon: '📚', description: '希望室友也爱学习，互相督促', dimension: 'study', weightMultiplier: 1.8 },
  { id: 'social', label: '社交互动', icon: '🎉', description: '希望和室友成为朋友，经常一起活动', dimension: 'lifestyle', weightMultiplier: 1.5 },
  { id: 'reading', label: '阅读看书', icon: '📖', description: '希望室友也喜欢看书，可以交流读书心得', dimension: 'study', weightMultiplier: 1.4 },
  { id: 'privacy', label: '个人空间', icon: '🔒', description: '希望室友尊重个人空间和隐私', dimension: 'lifestyle', weightMultiplier: 1.3 },
  { id: 'no_smoking', label: '无烟环境', icon: '🚭', description: '希望宿舍没有人吸烟', dimension: 'lifestyle', weightMultiplier: 1.6 },
  { id: 'temperature', label: '空调温度', icon: '❄️', description: '对空调温度有明确偏好，希望室友能接受', dimension: 'lifestyle', weightMultiplier: 1.2 }
]

export function getPriorityWeights(priorities) {
  const weights = {
    sleep: 1.0,
    cleanliness: 1.0,
    study: 1.0,
    entertainment: 1.0,
    lifestyle: 1.0,
    personality: 1.0
  }

  if (!priorities || priorities.length === 0) return weights

  for (const pid of priorities) {
    const prio = DORM_PRIORITIES.find(p => p.id === pid)
    if (!prio) continue
    const dim = prio.dimension
    if (weights[dim] !== undefined) {
      const rank = priorities.indexOf(pid)
      const rankBonus = rank === 0 ? 0.2 : rank === 1 ? 0.1 : 0
      weights[dim] = Math.max(weights[dim], prio.weightMultiplier + rankBonus)
    }
  }

  return weights
}

export const QUESTIONS = [
  {
    id: 'summer_behavior',
    text: '这个暑假你过得怎么样？',
    icon: '☀️',
    options: [
      { value: 0, label: '很自律，每天都有计划' },
      { value: 1, label: '还不错，该玩玩该学学' },
      { value: 2, label: '有点放飞，作息不太规律' },
      { value: 3, label: '完全放飞，天天熬夜打游戏' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的暑假生活...',
    weight: 0.8,
    dimension: 'personality',
    isAnchorQuestion: true,
    followUps: [
      {
        condition: (val) => val >= 2,
        questions: [
          {
            id: 'summer_why_wild',
            text: '暑假放飞主要是因为？',
            icon: '🤔',
            options: [
              { value: 0, label: '打游戏停不下来' },
              { value: 1, label: '追剧看番，一看就到凌晨' },
              { value: 2, label: '和朋友出去玩，经常很晚' },
              { value: 3, label: '没什么事做，不知不觉就晚了' },
              { value: 4, label: '其他原因' }
            ],
            allowCustom: true,
            customPlaceholder: '说说为什么放飞...',
            weight: 1.0,
            dimension: 'personality',
            indirectMapping: { 0: { game_tendency: 2, late_night: 2 }, 1: { media_tendency: 2, late_night: 1 }, 2: { social_tendency: 2, late_night: 1 }, 3: { self_control: -1, late_night: 1 } },
            followUps: [
              {
                condition: (val) => val === 0,
                questions: [
                  {
                    id: 'summer_game_type',
                    text: '暑假主要打什么游戏？',
                    icon: '🎮',
                    options: [
                      { value: 0, label: 'MOBA（王者/英雄联盟），经常开黑' },
                      { value: 1, label: 'FPS（吃鸡/瓦），需要专注' },
                      { value: 2, label: 'RPG（原神/崩铁），慢慢玩' },
                      { value: 3, label: '什么都玩，看心情' }
                    ],
                    weight: 0.8,
                    dimension: 'entertainment',
                    indirectMapping: { 0: { voice_tendency: 2, game_intensity: 2 }, 1: { voice_tendency: 1, game_intensity: 2 }, 2: { voice_tendency: 0, game_intensity: 1 }, 3: { game_intensity: 1 } }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        condition: (val) => val <= 1,
        questions: [
          {
            id: 'summer_why_disciplined',
            text: '暑假能保持自律，主要是因为？',
            icon: '💪',
            options: [
              { value: 0, label: '有明确目标，想提前准备' },
              { value: 1, label: '家里管得严' },
              { value: 2, label: '习惯早睡早起，改不了' },
              { value: 3, label: '有兼职/实习/培训' }
            ],
            allowCustom: true,
            customPlaceholder: '说说你的自律秘诀...',
            weight: 0.8,
            dimension: 'personality',
            indirectMapping: { 0: { self_discipline: 2, study_tendency: 1 }, 1: { self_discipline: 0, external_control: 2 }, 2: { self_discipline: 2, biological_clock: 2 }, 3: { self_discipline: 1, external_control: 1 } }
          }
        ]
      }
    ]
  },
  {
    id: 'current_vs_summer',
    text: '和暑假相比，你现在的状态？',
    icon: '📊',
    options: [
      { value: 0, label: '基本一样，还是比较放松' },
      { value: 1, label: '稍微收了一点' },
      { value: 2, label: '比暑假认真多了' },
      { value: 3, label: '完全切换到学生模式了' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的变化...',
    weight: 1.0,
    dimension: 'personality',
    consistencySignal: true,
    followUps: [
      {
        condition: (val) => val === 0,
        questions: [
          {
            id: 'why_no_change',
            text: '开学了还是暑假状态，你觉得是因为？',
            icon: '🤷',
            options: [
              { value: 0, label: '大学嘛，不用太紧张' },
              { value: 1, label: '还没适应，慢慢来' },
              { value: 2, label: '我就是这样的人，随性' },
              { value: 3, label: '其实有在努力，只是表面看不出来' }
            ],
            allowCustom: true,
            customPlaceholder: '说说你的想法...',
            weight: 0.8,
            dimension: 'personality',
            indirectMapping: { 0: { self_discipline: -1, adaptability: 0 }, 1: { adaptability: -1 }, 2: { self_discipline: -1, consistency: 1 }, 3: { self_discipline: 1, social_desirability: 1 } }
          }
        ]
      }
    ]
  },
  {
    id: 'late_night_scenario',
    text: '凌晨一点你突然睡不着，你会？',
    icon: '🦉',
    options: [
      { value: 0, label: '翻来覆去，强迫自己睡' },
      { value: 1, label: '听点白噪音/音乐助眠' },
      { value: 2, label: '拿手机刷一刷，困了再睡' },
      { value: 3, label: '起来打游戏/看剧，反正睡不着' },
      { value: 4, label: '找还没睡的人聊天' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你失眠时会做什么...',
    weight: 1.2,
    dimension: 'sleep',
    indirectMapping: { 0: { self_control: 2, sleep_priority: 2 }, 1: { self_control: 1, sleep_priority: 2 }, 2: { self_control: 0, media_tendency: 1 }, 3: { self_control: -1, game_tendency: 2, late_night: 2 }, 4: { social_tendency: 2, late_night: 1 } }
  },
  {
    id: 'alarm_reaction',
    text: '闹钟响了但你不想起，你会？',
    icon: '⏰',
    options: [
      { value: 0, label: '立刻起来，从不赖床' },
      { value: 1, label: '赖5分钟就起' },
      { value: 2, label: '设好几个闹钟，慢慢醒' },
      { value: 3, label: '关掉闹钟继续睡，能睡多久是多久' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的起床习惯...',
    weight: 1.0,
    dimension: 'sleep',
    indirectMapping: { 0: { self_discipline: 2, biological_clock: 2 }, 1: { self_discipline: 1 }, 2: { self_discipline: 0, sleep_chaos: 1 }, 3: { self_discipline: -1, sleep_chaos: 2 } }
  },
  {
    id: 'bed_time',
    text: '你通常几点上床？',
    icon: '🛏️',
    options: [
      { value: 0, label: '22:00 前' },
      { value: 2, label: '22:00-23:00' },
      { value: 4, label: '23:00-00:00' },
      { value: 5, label: '00:00-01:00' },
      { value: 6, label: '01:00 之后' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的情况...',
    weight: 1.5,
    dimension: 'sleep',
    followUps: [
      {
        condition: () => true,
        questions: [
          {
            id: 'bed_activity',
            text: '上床后到入睡之间，你通常在做什么？',
            icon: '📱',
            options: [
              { value: 0, label: '直接睡觉' },
              { value: 1, label: '看书或学习' },
              { value: 2, label: '听音乐或播客' },
              { value: 3, label: '刷手机看视频' },
              { value: 4, label: '和室友聊天' },
              { value: 5, label: '打游戏' }
            ],
            allowCustom: true,
            customPlaceholder: '说说你睡前通常做什么...',
            weight: 1.3,
            dimension: 'sleep',
            followUps: [
              {
                condition: (val) => val === 1,
                questions: [
                  {
                    id: 'bed_light',
                    text: '在床上看书学习时，灯光方面？',
                    icon: '💡',
                    options: [
                      { value: 0, label: '开小夜灯，尽量不影响别人' },
                      { value: 1, label: '开台灯，正常亮度' },
                      { value: 2, label: '开大灯' }
                    ],
                    allowCustom: true,
                    customPlaceholder: '说说你的情况...',
                    weight: 1.0,
                    dimension: 'sleep'
                  }
                ]
              },
              {
                condition: (val) => val === 2,
                questions: [
                  {
                    id: 'bed_music_habit',
                    text: '在床上听音乐播客时？',
                    icon: '🎧',
                    options: [
                      { value: 0, label: '戴耳机，不影响别人' },
                      { value: 1, label: '外放但声音很小' },
                      { value: 2, label: '外放，正常音量' }
                    ],
                    allowCustom: true,
                    customPlaceholder: '说说你的习惯...',
                    weight: 1.0,
                    dimension: 'sleep'
                  }
                ]
              },
              {
                condition: (val) => val === 3,
                questions: [
                  {
                    id: 'bed_media_habit',
                    text: '在床上刷手机看视频时？',
                    icon: '📱',
                    options: [
                      { value: 0, label: '戴耳机，调低亮度' },
                      { value: 1, label: '戴耳机，亮度正常' },
                      { value: 2, label: '外放但声音很小' },
                      { value: 3, label: '外放，声音正常' }
                    ],
                    allowCustom: true,
                    customPlaceholder: '说说你的习惯...',
                    weight: 1.2,
                    dimension: 'sleep'
                  }
                ]
              },
              {
                condition: (val) => val === 4,
                questions: [
                  {
                    id: 'bed_chat_duration',
                    text: '和室友聊天通常聊多久？',
                    icon: '💬',
                    options: [
                      { value: 0, label: '就几句，很快结束' },
                      { value: 1, label: '聊一会儿，十几分钟' },
                      { value: 2, label: '经常越聊越嗨，停不下来' }
                    ],
                    allowCustom: true,
                    customPlaceholder: '说说你们聊什么...',
                    weight: 1.0,
                    dimension: 'sleep'
                  }
                ]
              },
              {
                condition: (val) => val === 5,
                questions: [
                  {
                    id: 'bed_game_voice',
                    text: '在床上打游戏你会开语音吗？',
                    icon: '🎙️',
                    options: [
                      { value: 0, label: '不会，静音或打字' },
                      { value: 1, label: '偶尔开，会压低声音' },
                      { value: 2, label: '经常开麦' }
                    ],
                    allowCustom: true,
                    customPlaceholder: '说说你的习惯...',
                    weight: 1.3,
                    dimension: 'sleep'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sleep_time',
    text: '你通常几点真正入睡？',
    icon: '🌙',
    options: [
      { value: 0, label: '22:00 前' },
      { value: 2, label: '22:00-23:00' },
      { value: 4, label: '23:00-00:00' },
      { value: 5, label: '00:00-01:00' },
      { value: 6, label: '01:00 之后' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的情况，比如"看有没有早课"...',
    weight: 2.0,
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
    dimension: 'cleanliness',
    socialDesirabilityBias: 0.7
  },
  {
    id: 'room_tidy_reversed',
    text: '如果让你室友来描述你的桌面，他们会说？',
    icon: '🪞',
    options: [
      { value: 4, label: '井井有条，比我还整洁' },
      { value: 3, label: '还好，不算乱' },
      { value: 2, label: '有点乱，但能接受' },
      { value: 1, label: '比较乱，找东西要翻' },
      { value: 0, label: '很乱，像战场' }
    ],
    allowCustom: true,
    customPlaceholder: '或者让他们自己描述...',
    weight: 1.5,
    dimension: 'cleanliness',
    isReversed: true,
    consistencyPartner: 'room_tidy',
    socialDesirabilityBias: 0.7
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
          id: 'game_duration',
          text: '你每次打游戏大概多久？',
          icon: '⏱️',
          options: [
            { value: 0, label: '半小时以内' },
            { value: 1, label: '半小时到一小时' },
            { value: 2, label: '一到两小时' },
            { value: 3, label: '两到三小时' },
            { value: 4, label: '三小时以上，打起来就停不下来' }
          ],
          allowCustom: true,
          customPlaceholder: '说说你的情况...',
          weight: 1.3,
          dimension: 'entertainment',
          gameBehaviorSignal: 'duration'
        },
        {
          id: 'game_motivation',
          text: '你打游戏主要是为了？',
          icon: '🎯',
          options: [
            { value: 0, label: '放松消遣，学习累了随便打打' },
            { value: 1, label: '和朋友一起，社交娱乐' },
            { value: 2, label: '喜欢竞技对抗，赢了爽' },
            { value: 3, label: '打发时间，太无聊了' },
            { value: 4, label: '沉迷其中，玩起来就停不下来' }
          ],
          allowCustom: true,
          customPlaceholder: '说说你的想法...',
          weight: 1.4,
          dimension: 'entertainment',
          gameBehaviorSignal: 'motivation'
        },
        {
          id: 'game_self_control',
          text: '如果室友要睡了，你还正在打游戏，你会？',
          icon: '⏰',
          options: [
            { value: 0, label: '马上关掉，不影响别人' },
            { value: 1, label: '打完这一把就关' },
            { value: 2, label: '和他们说等一下，打完这局' },
            { value: 3, label: '戴耳机继续，音量调小' },
            { value: 4, label: '继续打，声音小一点就行' }
          ],
          allowCustom: true,
          customPlaceholder: '说说你的真实情况...',
          weight: 1.5,
          dimension: 'entertainment',
          gameBehaviorSignal: 'self_control'
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
    id: 'hobby_main',
    text: '课余时间你最常做什么？',
    icon: '🎯',
    options: [
      { value: 0, label: '看书学习，提升自己' },
      { value: 1, label: '追剧看番听音乐' },
      { value: 2, label: '打游戏' },
      { value: 3, label: '运动健身' },
      { value: 4, label: '社交活动，和朋友一起' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你平时最常做什么...',
    weight: 1.5,
    dimension: 'entertainment',
    followUps: [
      {
        condition: () => true,
        questions: [
          {
            id: 'hobby_content',
            text: '你平时关注/喜欢哪些内容？',
            icon: '💡',
            type: 'multi',
            options: [
              { value: 'anime', label: '动漫/二次元' },
              { value: 'movie', label: '电影/电视剧/综艺' },
              { value: 'music', label: '音乐（流行/说唱/古典等）' },
              { value: 'game', label: '游戏（电竞/主机/手游）' },
              { value: 'sports', label: '体育（篮球/足球/健身）' },
              { value: 'tech', label: '科技/数码/编程' },
              { value: 'reading', label: '小说/文学/漫画' },
              { value: 'art', label: '画画/设计/摄影' },
              { value: 'novel', label: '网文/轻小说' },
              { value: 'other', label: '其他' }
            ],
            allowCustom: true,
            customPlaceholder: '说说你还关注什么...',
            weight: 1.0,
            dimension: 'entertainment'
          },
          {
            id: 'chat_topic',
            text: '和室友聊天时，你最想聊什么？',
            icon: '💬',
            type: 'multi',
            options: [
              { value: 'game', label: '游戏/电竞' },
              { value: 'anime', label: '动漫/二次元' },
              { value: 'movie', label: '电影/剧/综艺' },
              { value: 'music', label: '音乐/追星' },
              { value: 'sports', label: '体育/运动' },
              { value: 'tech', label: '科技/数码' },
              { value: 'study', label: '学习/考试/未来规划' },
              { value: 'life', label: '日常生活/八卦' },
              { value: 'meme', label: '梗/段子/搞笑' },
              { value: 'other', label: '其他' }
            ],
            allowCustom: true,
            customPlaceholder: '说说你还想聊什么...',
            weight: 1.3,
            dimension: 'entertainment'
          },
          {
            id: 'free_time',
            text: '周末没安排时，你更想怎么过？',
            icon: '🏖️',
            options: [
              { value: 0, label: '安静待着，做自己的事' },
              { value: 1, label: '找一两个朋友出去逛逛' },
              { value: 2, label: '和室友一起打游戏/看剧' },
              { value: 3, label: '组局出去玩，越热闹越好' }
            ],
            allowCustom: true,
            customPlaceholder: '说说你理想的周末...',
            weight: 1.2,
            dimension: 'entertainment'
          }
        ]
      }
    ]
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
    id: 'mbti_dynamic',
    text: '🧠 性格探索',
    icon: '🧠',
    type: 'mbti_group',
    weight: 2.0,
    dimension: 'personality'
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
  },
  {
    id: 'college_expectation',
    text: '你对大学生活最期待的是什么？',
    icon: '🎓',
    options: [
      { value: 0, label: '专心学习，争取好成绩' },
      { value: 1, label: '拓展人脉，认识新朋友' },
      { value: 2, label: '发展兴趣，丰富课余生活' },
      { value: 3, label: '锻炼能力，为就业做准备' },
      { value: 4, label: '探索自我，寻找人生方向' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的期待...',
    weight: 0.7,
    dimension: 'personality',
    socialDesirabilityBias: 0.8
  },
  {
    id: 'future_plan',
    text: '毕业后你最想做什么？',
    icon: '🚀',
    options: [
      { value: 0, label: '继续深造（考研/出国）' },
      { value: 1, label: '进入企业工作' },
      { value: 2, label: '自主创业' },
      { value: 3, label: '考公务员/事业编' },
      { value: 4, label: '还没想好，走一步看一步' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的规划...',
    weight: 0.7,
    dimension: 'personality',
    socialDesirabilityBias: 0.8
  },
  {
    id: 'study_motivation',
    text: '你上大学的主要动力是什么？',
    icon: '🔥',
    options: [
      { value: 0, label: '实现父母的期望' },
      { value: 1, label: '为了更好的工作和收入' },
      { value: 2, label: '追求知识和真理' },
      { value: 3, label: '改变命运，实现梦想' },
      { value: 4, label: '体验大学生活，享受青春' }
    ],
    allowCustom: true,
    customPlaceholder: '说说你的动力来源...',
    weight: 0.6,
    dimension: 'personality',
    socialDesirabilityBias: 0.85
  }
]

function normalizeFollowUps(followUps) {
  if (!followUps) return []
  if (Array.isArray(followUps)) return followUps
  return [followUps]
}

export function getFlatQuestions() {
  const result = []

  function addQuestion(q, parentId) {
    const entry = { ...q }
    if (parentId) {
      entry.isFollowUp = true
      entry.parentQuestion = parentId
    }
    result.push(entry)
    const branches = normalizeFollowUps(q.followUps)
    for (const branch of branches) {
      for (const fq of branch.questions) {
        addQuestion(fq, q.id)
      }
    }
  }

  for (const q of QUESTIONS) {
    addQuestion(q, null)
  }
  return result
}

export function getVisibleQuestions(answers) {
  const result = []

  function addQuestion(q, parentId) {
    const entry = { ...q }
    if (parentId) {
      entry.isFollowUp = true
      entry.parentQuestion = parentId
    }
    result.push(entry)
    const answer = answers[q.id]
    if (answer !== undefined && q.followUps) {
      const branches = normalizeFollowUps(q.followUps)
      for (const branch of branches) {
        if (branch.condition(answer)) {
          for (const fq of branch.questions) {
            addQuestion(fq, q.id)
          }
        }
      }
    }
  }

  for (const q of QUESTIONS) {
    addQuestion(q, null)
  }
  return result
}

export function getAnswersVector(answers) {
  const allQuestions = getFlatQuestions().filter(q => q.type !== 'multi' && q.type !== 'mbti_group' && !q.isReversed)
  return allQuestions.map(q => {
    const answer = answers[q.id]
    if (typeof answer === 'number') return answer
    return 0
  })
}

export function getWeightsVector() {
  const allQuestions = getFlatQuestions().filter(q => q.type !== 'multi' && q.type !== 'mbti_group' && !q.isReversed)
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
  const dims = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  const allMbtiQs = []
  for (const dim of ['EI', 'SN', 'TF', 'JP']) {
    for (const q of MBTI_QUESTION_BANK[dim]) {
      allMbtiQs.push({ ...q, mbtiDimension: dim })
    }
  }

  for (const q of allMbtiQs) {
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

export function getDescendantIds(questionId) {
  const allQuestions = getFlatQuestions()
  const ids = []

  function collect(parentId) {
    for (const q of allQuestions) {
      if (q.parentQuestion === parentId) {
        ids.push(q.id)
        collect(q.id)
      }
    }
  }

  collect(questionId)
  return ids
}

export function getConsistencyScore(answers) {
  const allQuestions = getFlatQuestions()
  const pairs = []

  for (const q of allQuestions) {
    if (q.consistencyPartner) {
      pairs.push({ q1: q.id, q2: q.consistencyPartner })
    }
  }

  if (pairs.length === 0) return 100

  let totalDiff = 0
  for (const pair of pairs) {
    const a1 = answers[pair.q1]
    const a2 = answers[pair.q2]
    if (a1 === undefined || a2 === undefined) continue
    const maxVal = 4
    totalDiff += Math.abs(a1 - a2) / maxVal
  }

  const avgDiff = totalDiff / pairs.length
  return Math.round((1 - avgDiff) * 100)
}

export function getGameBehaviorProfile(answers) {
  const habit = answers.game_habit || 0
  const duration = answers.game_duration || 0
  const motivation = answers.game_motivation || 0
  const selfControl = answers.game_self_control || 0
  const voice = answers.game_voice || 0

  let riskLevel = 'low'
  let riskFactors = []

  if (habit >= 2) {
    if (duration >= 3) {
      riskLevel = 'high'
      riskFactors.push('单次游戏时长超过3小时')
    } else if (duration >= 2) {
      if (riskLevel !== 'high') riskLevel = 'medium'
      riskFactors.push('单次游戏1-3小时')
    }

    if (motivation >= 3) {
      riskLevel = 'high'
      riskFactors.push('游戏动机偏向沉迷/打发时间')
    }

    if (selfControl >= 2) {
      riskLevel = 'high'
      riskFactors.push('难以主动停止游戏')
    } else if (selfControl >= 1) {
      if (riskLevel !== 'high') riskLevel = 'medium'
      riskFactors.push('停止游戏需要一定意志力')
    }

    if (voice >= 2) {
      if (riskLevel !== 'high') riskLevel = 'medium'
      riskFactors.push('游戏时经常开麦')
    }
  }

  return { riskLevel, riskFactors }
}

export function getTopicCompatibility(answersA, answersB) {
  const topicsA = answersA.chat_topic || []
  const topicsB = answersB.chat_topic || []
  const hobbiesA = answersA.hobby_content || []
  const hobbiesB = answersB.hobby_content || []

  if (topicsA.length === 0 && hobbiesA.length === 0) return 0.5
  if (topicsB.length === 0 && hobbiesB.length === 0) return 0.5

  const commonTopics = topicsA.filter(t => topicsB.includes(t))
  const commonHobbies = hobbiesA.filter(t => hobbiesB.includes(t))

  const topicScore = topicsA.length > 0 && topicsB.length > 0
    ? commonTopics.length / Math.max(topicsA.length, topicsB.length)
    : 0
  const hobbyScore = hobbiesA.length > 0 && hobbiesB.length > 0
    ? commonHobbies.length / Math.max(hobbiesA.length, hobbiesB.length)
    : 0

  const commonItems = [...new Set([...commonTopics, ...commonHobbies])]

  return {
    score: topicScore * 0.6 + hobbyScore * 0.4,
    commonItems
  }
}

export function getDynamicGameWeight(answers) {
  const habit = answers.game_habit || 0
  const duration = answers.game_duration || 0
  const hobbyMain = answers.hobby_main ?? -1
  const hobbyContent = answers.hobby_content || []

  const isGamePrimaryHobby = hobbyMain === 2
  const hobbyIncludesGame = hobbyContent.includes('game')

  let weight = 1.0

  if (isGamePrimaryHobby) weight += 0.8
  if (hobbyIncludesGame) weight += 0.4
  if (habit >= 3) weight += 0.5
  if (habit >= 2) weight += 0.3
  if (duration >= 3) weight += 0.5
  if (duration >= 2) weight += 0.2

  return Math.min(weight, 3.0)
}

// ============================================================
// MBTI 题库 - 每维度5-6道题，随机抽选
// ============================================================
export const MBTI_QUESTION_BANK = {
  EI: [
    {
      id: 'mbti_ei_1', text: '周末没有安排时，你更想？',
      options: [
        { value: 0, label: '一个人待着充电' },
        { value: 1, label: '约一两个好友出去' },
        { value: 2, label: '看心情，都行' },
        { value: 3, label: '组局，人越多越好' }
      ],
      weight: 2.0, mbtiDimension: 'EI'
    },
    {
      id: 'mbti_ei_2', text: '在一个全是陌生人的聚会里，你会？',
      options: [
        { value: 0, label: '找个角落待着，等认识的人来' },
        { value: 1, label: '安静观察，有人搭话就聊' },
        { value: 2, label: '试着主动找话题' },
        { value: 3, label: '主动自我介绍，认识所有人' }
      ],
      weight: 2.0, mbtiDimension: 'EI'
    },
    {
      id: 'mbti_ei_3', text: '忙了一整天之后，你怎么恢复精力？',
      options: [
        { value: 0, label: '独处，安静地做自己的事' },
        { value: 1, label: '和一两个好朋友聊天' },
        { value: 2, label: '看情况，有时独处有时社交' },
        { value: 3, label: '出去嗨，和朋友待在一起' }
      ],
      weight: 2.0, mbtiDimension: 'EI'
    },
    {
      id: 'mbti_ei_4', text: '在宿舍里，你更希望？',
      options: [
        { value: 0, label: '有自己的安静空间' },
        { value: 1, label: '偶尔和室友互动' },
        { value: 2, label: '经常和室友一起做事' },
        { value: 3, label: '宿舍越热闹越好' }
      ],
      weight: 2.0, mbtiDimension: 'EI'
    },
    {
      id: 'mbti_ei_5', text: '微信群里有人@你，你的第一反应？',
      options: [
        { value: 0, label: '有点紧张，先看看再说' },
        { value: 1, label: '看情况，重要就回' },
        { value: 2, label: '秒回，有互动就开心' },
        { value: 3, label: '马上回复，顺便活跃气氛' }
      ],
      weight: 1.5, mbtiDimension: 'EI'
    },
    {
      id: 'mbti_ei_6', text: '选座位时你倾向于？',
      options: [
        { value: 0, label: '角落或靠墙，不被注意' },
        { value: 1, label: '中间偏后，能看清但不太显眼' },
        { value: 2, label: '中间位置，方便交流' },
        { value: 3, label: '前排或中间，越显眼越好' }
      ],
      weight: 1.5, mbtiDimension: 'EI'
    }
  ],
  SN: [
    {
      id: 'mbti_sn_1', text: '你更喜欢哪种聊天方式？',
      options: [
        { value: 0, label: '聊具体的事，实际的话题' },
        { value: 1, label: '都可以，但偏向实际' },
        { value: 2, label: '都可以，但偏向天马行空' },
        { value: 3, label: '聊想法、可能性、各种脑洞' }
      ],
      weight: 1.5, mbtiDimension: 'SN'
    },
    {
      id: 'mbti_sn_2', text: '做决定时你更依赖？',
      options: [
        { value: 0, label: '事实和数据，经验总结' },
        { value: 1, label: '偏向事实，也听直觉' },
        { value: 2, label: '偏向直觉，也看事实' },
        { value: 3, label: '直觉和第六感' }
      ],
      weight: 1.5, mbtiDimension: 'SN'
    },
    {
      id: 'mbti_sn_3', text: '看一部电影后，你更想讨论？',
      options: [
        { value: 0, label: '剧情逻辑和细节' },
        { value: 1, label: '角色和故事的合理性' },
        { value: 2, label: '背后的隐喻和可能性' },
        { value: 3, label: '各种脑洞和续集猜想' }
      ],
      weight: 1.5, mbtiDimension: 'SN'
    },
    {
      id: 'mbti_sn_4', text: '学习新东西时，你更倾向于？',
      options: [
        { value: 0, label: '按步骤来，一步一步学' },
        { value: 1, label: '先看实例，再理解原理' },
        { value: 2, label: '先理解大框架，再填细节' },
        { value: 3, label: '先联想各种可能性，再归纳' }
      ],
      weight: 1.5, mbtiDimension: 'SN'
    },
    {
      id: 'mbti_sn_5', text: '描述一件事时，你更习惯？',
      options: [
        { value: 0, label: '按时间顺序，详细描述' },
        { value: 1, label: '说关键事实，不啰嗦' },
        { value: 2, label: '用比喻和联想' },
        { value: 3, label: '天马行空，想到哪说到哪' }
      ],
      weight: 1.5, mbtiDimension: 'SN'
    }
  ],
  TF: [
    {
      id: 'mbti_tf_1', text: '朋友跟你诉苦时，你第一反应是？',
      options: [
        { value: 0, label: '帮他分析问题，找解决办法' },
        { value: 1, label: '先理解感受，再想办法' },
        { value: 2, label: '先安慰，再一起分析' },
        { value: 3, label: '陪着他，让他知道有人在乎' }
      ],
      weight: 2.0, mbtiDimension: 'TF'
    },
    {
      id: 'mbti_tf_2', text: '宿舍有矛盾时，你觉得最重要的是？',
      options: [
        { value: 0, label: '把事情说清楚，对事不对人' },
        { value: 1, label: '先照顾大家感受，再谈事情' },
        { value: 2, label: '两者都重要' },
        { value: 3, label: '和气最重要，别伤了感情' }
      ],
      weight: 2.0, mbtiDimension: 'TF'
    },
    {
      id: 'mbti_tf_3', text: '选选修课时，你更看重？',
      options: [
        { value: 0, label: '学分和实用性' },
        { value: 1, label: '实用为主，也看兴趣' },
        { value: 2, label: '兴趣为主，也看学分' },
        { value: 3, label: '自己喜欢最重要' }
      ],
      weight: 1.5, mbtiDimension: 'TF'
    },
    {
      id: 'mbti_tf_4', text: '室友做了一件让你不舒服的事，你会？',
      options: [
        { value: 0, label: '直接说，把问题解决' },
        { value: 1, label: '想好措辞再委婉说' },
        { value: 2, label: '暗示一下，希望对方能懂' },
        { value: 3, label: '算了，忍忍就过去了' }
      ],
      weight: 2.0, mbtiDimension: 'TF'
    },
    {
      id: 'mbti_tf_5', text: '评价一个人时，你更看重？',
      options: [
        { value: 0, label: '能力和做事靠谱' },
        { value: 1, label: '能力和人品都重要' },
        { value: 2, label: '人品和待人方式' },
        { value: 3, label: '善良和真诚' }
      ],
      weight: 1.5, mbtiDimension: 'TF'
    }
  ],
  JP: [
    {
      id: 'mbti_jp_1', text: '你做事更倾向于？',
      options: [
        { value: 0, label: '提前规划，按计划来' },
        { value: 1, label: '有个大致方向就行' },
        { value: 2, label: '走一步看一步' },
        { value: 3, label: '随心所欲，deadline是第一生产力' }
      ],
      weight: 1.5, mbtiDimension: 'JP'
    },
    {
      id: 'mbti_jp_2', text: '旅行时你更喜欢？',
      options: [
        { value: 0, label: '详细攻略，精确到小时' },
        { value: 1, label: '定好大方向，细节随缘' },
        { value: 2, label: '只定出发和回程，中间随走' },
        { value: 3, label: '说走就走，到了再说' }
      ],
      weight: 1.5, mbtiDimension: 'JP'
    },
    {
      id: 'mbti_jp_3', text: '你的桌面/书架通常是什么状态？',
      options: [
        { value: 0, label: '分类整理，井井有条' },
        { value: 1, label: '大致有序，偶尔乱' },
        { value: 2, label: '有点乱，但我知道在哪' },
        { value: 3, label: '乱就乱，需要的时候再找' }
      ],
      weight: 1.5, mbtiDimension: 'JP'
    },
    {
      id: 'mbti_jp_4', text: '期末复习时，你通常？',
      options: [
        { value: 0, label: '提前两周开始，按计划复习' },
        { value: 1, label: '提前一周，每天安排好' },
        { value: 2, label: '考前三天突击' },
        { value: 3, label: '考前一晚通宵' }
      ],
      weight: 2.0, mbtiDimension: 'JP'
    },
    {
      id: 'mbti_jp_5', text: '约朋友出去玩，你更习惯？',
      options: [
        { value: 0, label: '提前约好时间地点' },
        { value: 1, label: '提前一天约，具体再定' },
        { value: 2, label: '当天约，看谁有空' },
        { value: 3, label: '临时起意，走起' }
      ],
      weight: 1.5, mbtiDimension: 'JP'
    }
  ]
}

export function generateMbtiQuestions(countPerDim = 2, seed = null) {
  const rng = seed !== null ? (() => {
    let s = seed
    return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff }
  })() : Math.random

  const selected = []
  for (const dim of ['EI', 'SN', 'TF', 'JP']) {
    const pool = [...MBTI_QUESTION_BANK[dim]]
    const picked = []
    for (let i = 0; i < Math.min(countPerDim, pool.length); i++) {
      const idx = Math.floor(rng() * pool.length)
      picked.push(pool.splice(idx, 1)[0])
    }
    selected.push(...picked)
  }

  return selected.map(q => ({
    ...q,
    icon: '🧠',
    dimension: 'personality',
    allowCustom: true,
    customPlaceholder: '说说你的想法...'
  }))
}

export function getMbtiQuestionsForSession() {
  const stored = localStorage.getItem('dorm_matcher_mbti_seed')
  let seed
  if (stored) {
    seed = parseInt(stored, 10)
  } else {
    seed = Date.now()
    localStorage.setItem('dorm_matcher_mbti_seed', seed.toString())
  }
  return generateMbtiQuestions(2, seed)
}

export function getIndirectMapping(answers) {
  const mapping = {}
  const allQuestions = getFlatQuestions()

  for (const q of allQuestions) {
    if (!q.indirectMapping) continue
    const val = answers[q.id]
    if (val === undefined) continue
    const valMapping = q.indirectMapping[val]
    if (!valMapping) continue

    for (const [key, score] of Object.entries(valMapping)) {
      mapping[key] = (mapping[key] || 0) + score
    }
  }

  return mapping
}
