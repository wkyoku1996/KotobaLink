const COURSE_ASSESSMENTS = {
  2: [
    {
      id: 'exam-2-1',
      title: '单元测试 1',
      type: '单元测试',
      date: '2026-03-15 20:40',
      status: '已完成',
      score: '86',
      summary: '覆盖生活会话、点餐表达和基础敬语转换。',
      questions: [
        {
          id: 'a1-q1',
          type: 'choice',
          prompt: '表达“请给我一杯水”更合适的是哪一句？',
          options: ['水を 一杯 お願いします。', '水が 一杯 行きます。', '水を 右に 曲がります。'],
          correctAnswer: '水を 一杯 お願いします。',
        },
        {
          id: 'a1-q2',
          type: 'blank',
          prompt: '补全句子：ここで 少し 待って ____ 。',
          placeholder: '请输入表达',
          answer: 'ください',
        },
      ],
    },
    {
      id: 'exam-2-2',
      title: '阶段口语小考',
      type: '口语小考',
      date: '2026-03-22 19:30',
      status: '待参加',
      score: '未开始',
      summary: '重点考察场景应答、语速控制和敬语礼貌度。',
      questions: [
        {
          id: 'a2-q1',
          type: 'choice',
          prompt: '老师提问后想自然表达“我觉得这个更方便”，应选哪句？',
          options: ['こちらの ほうが 便利だと 思います。', 'こちらが 右に 曲がります。', 'こちらを お願いしました。'],
          correctAnswer: 'こちらの ほうが 便利だと 思います。',
        },
        {
          id: 'a2-q2',
          type: 'blank',
          prompt: '补全句子：日本語で はっきり 話す ____ に しています。',
          placeholder: '请输入词语',
          answer: 'よう',
        },
      ],
    },
  ],
  4: [
    {
      id: 'exam-4-1',
      title: 'N4 语法阶段测验',
      type: '阶段测验',
      date: '2026-03-18 20:00',
      status: '已完成',
      score: '88',
      summary: '覆盖 N4 核心语法、条件句和固定搭配辨析。',
      questions: [
        {
          id: 'b1-q1',
          type: 'choice',
          prompt: '“一边做作业一边听音乐”应使用哪组语法？',
          options: ['〜ながら', '〜ので', '〜ことに'],
          correctAnswer: '〜ながら',
        },
        {
          id: 'b1-q2',
          type: 'blank',
          prompt: '补全句子：早く 寝なければ ____ 。',
          placeholder: '请输入后半句',
          answer: 'なりません',
        },
      ],
    },
  ],
  6: [
    {
      id: 'exam-6-1',
      title: '口语表达检测',
      type: '表达检测',
      date: '2026-03-23 10:00',
      status: '待参加',
      score: '未开始',
      summary: '围绕自我介绍、追问回应和自由表达做口语检测。',
      questions: [
        {
          id: 'c1-q1',
          type: 'choice',
          prompt: '表达“我最近在挑战每天用日语记日记”，更自然的是哪句？',
          options: ['最近 日本語で 日記を 書く ように しています。', '最近 日本語で 日記を 右に 曲がります。', '最近 日本語を お願いします。'],
          correctAnswer: '最近 日本語で 日記を 書く ように しています。',
        },
        {
          id: 'c1-q2',
          type: 'blank',
          prompt: '补全句子：将来 日本で 働きたい ____ 思います。',
          placeholder: '请输入助词',
          answer: 'と',
        },
      ],
    },
  ],
}

module.exports = {
  COURSE_ASSESSMENTS,
}
