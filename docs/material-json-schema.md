# 教材 JSON Schema（草案）

## 目标

这份文档定义 KotobaLink 教材内容的 `JSON v2` 草案，目标是：

- 用统一格式管理教材内容
- 覆盖教学内容常见结构
- 不要求每份教材把所有字段都填满
- 让后续导入、导出、版本包和内容协作都围绕同一份模板展开

当前原则：

- `JSON` 作为教材内容交换格式
- `PostgreSQL` 继续作为系统运行时存储
- 文件资源继续独立存储
- 教材内容采用 `unit -> sections[]` 的可扩展结构

## 设计原则

### 尽量全，但不是强制全填

模板会尽量包含：

- 会话
- 词汇
- 语法
- 表达
- 习题
- 作业
- 资源
- 评价
- 教师备注

但不是每一套教材都必须拥有这些内容。

### 用 section 承载教学语义

不再只用简单 `items[]` 表示所有内容，而是把单元内容拆成多个 `sections[]`：

- 一个 section 对应一种教学语义
- 前端可以按 `section.type` 分组件渲染
- 后续扩展新的内容类型不会破坏整体结构

### 资源与内容分离

- `assets[]` 统一管理文件资源
- `sections[].content` 通过 `asset_refs` 或 `asset_ref` 引用资源
- 避免同一资源在内容层重复写多次

## 顶层模板

```json
{
  "schema_version": "kotobalink.material.v2",
  "id": "material-001",
  "title": "Marugoto Starter A1",
  "series": "Marugoto",
  "level": "A1",
  "language": "jp-cn",
  "version": "v1.0",
  "summary": "Starter Japanese material",
  "status": "draft",
  "visibility": "teacher",
  "tags": ["conversation", "starter"],
  "cover_asset_ref": null,
  "course_refs": [],
  "metadata": {
    "publisher": null,
    "authors": [],
    "recommended_age": null,
    "estimated_unit_duration_minutes": null
  },
  "units": [],
  "assets": [],
  "publish": {
    "version": "v1.0",
    "status": "draft",
    "scope": "teacher",
    "note": null
  }
}
```

### 顶层字段说明

| 字段 | 说明 | 是否建议保留 |
| --- | --- | --- |
| `schema_version` | 模板版本号 | 是 |
| `id` | 教材唯一标识 | 是 |
| `title` | 教材名称 | 是 |
| `series` | 教材系列 | 建议 |
| `level` | 级别，例如 `A1` | 建议 |
| `language` | 语言或语言对，例如 `jp-cn` | 建议 |
| `version` | 内容版本号 | 建议 |
| `summary` | 教材简介 | 可选 |
| `status` | 教材状态 | 建议 |
| `visibility` | 可见范围 | 建议 |
| `tags` | 标签 | 可选 |
| `cover_asset_ref` | 封面资源引用 | 可选 |
| `course_refs` | 关联课程 ID 列表 | 可选 |
| `metadata` | 补充元信息 | 可选 |
| `units` | 单元列表 | 是 |
| `assets` | 资源列表 | 是 |
| `publish` | 发布信息 | 建议 |

## 单元模板

```json
{
  "id": "unit-001",
  "title": "Topic 1: かつどう",
  "code": "topic-01",
  "sort_order": 1,
  "status": "published",
  "learning_goal": "Warm-up conversation",
  "can_do": [
    "能够进行基础问候",
    "能够做简单自我介绍"
  ],
  "teacher_notes": [
    "先做听力导入",
    "注意引导学生开口"
  ],
  "sections": []
}
```

### 单元字段说明

| 字段 | 说明 |
| --- | --- |
| `id` | 单元唯一标识 |
| `title` | 单元标题 |
| `code` | 单元编码 |
| `sort_order` | 排序 |
| `status` | 单元状态 |
| `learning_goal` | 学习目标 |
| `can_do` | Can-do 目标列表 |
| `teacher_notes` | 教师提示 |
| `sections` | 单元下的内容区块 |

## Section 模板

```json
{
  "id": "section-001",
  "type": "vocabulary",
  "title": "重点词汇",
  "sort_order": 1,
  "enabled": true,
  "content": {}
}
```

### 当前建议支持的 section 类型

- `overview`
- `dialogue`
- `vocabulary`
- `grammar`
- `expression`
- `exercise`
- `homework`
- `resource`
- `assessment`
- `culture`
- `teacher_note`

## 常见 section.content 模板

### dialogue

```json
{
  "transcript": "A: ... B: ...",
  "translation": null,
  "audio_refs": ["asset-001"]
}
```

### vocabulary

```json
{
  "items": [
    {
      "id": "vocab-001",
      "word": "こんにちは",
      "reading": "こんにちは",
      "meaning": "你好",
      "example": "こんにちは、田中です。",
      "audio_ref": "asset-002",
      "tags": ["greeting"]
    }
  ]
}
```

### grammar

```json
{
  "points": [
    {
      "id": "grammar-001",
      "pattern": "〜は〜です",
      "meaning": "判断句",
      "explanation": "用于基础介绍和说明",
      "examples": [
        "わたしは田中です。"
      ]
    }
  ]
}
```

### exercise

```json
{
  "questions": [
    {
      "id": "question-001",
      "type": "choice",
      "prompt": "选择正确答案",
      "options": ["A", "B", "C"],
      "answer": "A",
      "explanation": null
    }
  ]
}
```

### homework

```json
{
  "tasks": [
    {
      "id": "task-001",
      "title": "完成 workbook 第 4-5 页",
      "description": "巩固本课词汇与句型",
      "asset_refs": ["asset-010"]
    }
  ]
}
```

### resource

```json
{
  "items": [
    {
      "id": "resource-001",
      "title": "Workbook PDF",
      "description": "课堂练习册",
      "asset_ref": "asset-011"
    }
  ]
}
```

## 资源模板

```json
{
  "id": "asset-001",
  "file_name": "dialogue.wav",
  "asset_type": "audio",
  "mime_type": "audio/wav",
  "storage_key": "materials/demo/dialogue.wav",
  "file_url": "/media/materials/demo/dialogue.wav",
  "visibility": "teacher",
  "meta": {
    "file_size": 88244,
    "duration_seconds": 120
  }
}
```

### 资源字段说明

| 字段 | 说明 |
| --- | --- |
| `id` | 资源唯一标识 |
| `file_name` | 原始文件名 |
| `asset_type` | 资源类型，如 `audio`、`pdf` |
| `mime_type` | mime type |
| `storage_key` | 存储键 |
| `file_url` | 访问地址 |
| `visibility` | 可见范围 |
| `meta` | 额外元信息，如文件大小、时长 |

## 完整示例

```json
{
  "schema_version": "kotobalink.material.v2",
  "id": "material-001",
  "title": "Marugoto Starter A1",
  "series": "Marugoto",
  "level": "A1",
  "language": "jp-cn",
  "version": "v1.0",
  "summary": "Starter Japanese material",
  "status": "published",
  "visibility": "teacher",
  "tags": ["conversation", "starter"],
  "cover_asset_ref": null,
  "course_refs": ["course-001"],
  "metadata": {
    "publisher": "KotobaLink",
    "authors": [],
    "recommended_age": null,
    "estimated_unit_duration_minutes": 90
  },
  "units": [
    {
      "id": "unit-001",
      "title": "Topic 1: かつどう",
      "code": "topic-01",
      "sort_order": 1,
      "status": "published",
      "learning_goal": "Warm-up conversation",
      "can_do": [
        "能够进行基础问候",
        "能够做简单自我介绍"
      ],
      "teacher_notes": [
        "先做听力导入"
      ],
      "sections": [
        {
          "id": "section-001",
          "type": "dialogue",
          "title": "会话",
          "sort_order": 1,
          "enabled": true,
          "content": {
            "transcript": "A: ... B: ...",
            "translation": null,
            "audio_refs": ["asset-001"]
          }
        },
        {
          "id": "section-002",
          "type": "vocabulary",
          "title": "词汇",
          "sort_order": 2,
          "enabled": true,
          "content": {
            "items": [
              {
                "id": "vocab-001",
                "word": "こんにちは",
                "reading": "こんにちは",
                "meaning": "你好",
                "example": "こんにちは、田中です。",
                "audio_ref": "asset-002",
                "tags": ["greeting"]
              }
            ]
          }
        },
        {
          "id": "section-003",
          "type": "grammar",
          "title": "语法",
          "sort_order": 3,
          "enabled": true,
          "content": {
            "points": [
              {
                "id": "grammar-001",
                "pattern": "〜は〜です",
                "meaning": "判断句",
                "explanation": "用于基础介绍和说明",
                "examples": ["わたしは田中です。"]
              }
            ]
          }
        },
        {
          "id": "section-004",
          "type": "exercise",
          "title": "习题",
          "sort_order": 4,
          "enabled": true,
          "content": {
            "questions": [
              {
                "id": "question-001",
                "type": "choice",
                "prompt": "选择正确答案",
                "options": ["A", "B", "C"],
                "answer": "A",
                "explanation": null
              }
            ]
          }
        },
        {
          "id": "section-005",
          "type": "homework",
          "title": "作业",
          "sort_order": 5,
          "enabled": false,
          "content": {
            "tasks": []
          }
        }
      ]
    }
  ],
  "assets": [
    {
      "id": "asset-001",
      "file_name": "dialogue.wav",
      "asset_type": "audio",
      "mime_type": "audio/wav",
      "storage_key": "materials/demo/dialogue.wav",
      "file_url": "/media/materials/demo/dialogue.wav",
      "visibility": "teacher",
      "meta": {
        "file_size": 88244,
        "duration_seconds": 120
      }
    },
    {
      "id": "asset-002",
      "file_name": "konnichiwa.wav",
      "asset_type": "audio",
      "mime_type": "audio/wav",
      "storage_key": "materials/demo/konnichiwa.wav",
      "file_url": "/media/materials/demo/konnichiwa.wav",
      "visibility": "teacher",
      "meta": {
        "file_size": 12000,
        "duration_seconds": 2
      }
    }
  ],
  "publish": {
    "version": "v1.0",
    "status": "published",
    "scope": "teacher",
    "note": "Initial release"
  }
}
```

## 当前结论

这份 `v2` 模板和当前系统运行中的 `v1` 导出不是一回事：

- `v1`：偏系统结构和资源挂接
- `v2`：偏教学内容表达和导入导出标准

建议顺序：

1. 先确认这份 `v2` 模板字段是否符合你的教材表达需求
2. 再决定是否把后端导出接口升级为 `v2`
3. 最后再做 `v2` 的导入能力
