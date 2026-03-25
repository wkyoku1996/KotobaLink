from __future__ import annotations

import wave
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config.settings import get_media_root_path
from app.db.base import Base
from app.db.models import (
    Course,
    Enrollment,
    MaterialItem,
    MaterialPublishRecord,
    MaterialUnit,
    MediaAsset,
    Order,
    Student,
    TeachingMaterial,
)
from app.db.session import SessionLocal, engine


DEMO_STUDENT_ID = "student-demo-001"
COURSE_FOUNDATIONS_ID = "course-001"
COURSE_SPRINT_ID = "course-002"
COURSE_TRAVEL_ID = "course-003"
ENROLLMENT_ID = "enrollment-001"
ORDER_ID = "order-001"

MATERIALS = [
    {
        "id": "material-001",
        "title": "入门口语套餐 A1",
        "series": "综合日语入门",
        "level": "A1",
        "language": "jp-cn",
        "version": "v2.1",
        "summary": "适合零基础到入门阶段的综合日语教学套餐，包含课文、词汇、语法、习题、音频与讲义资源。",
        "status": "draft",
        "visibility": "teacher",
        "course_id": COURSE_FOUNDATIONS_ID,
    },
    {
        "id": "material-002",
        "title": "生活交流套餐 A2",
        "series": "生活场景会话",
        "level": "A2",
        "language": "jp-cn",
        "version": "v1.8",
        "summary": "围绕出行、路线、约见等日常生活场景设计的进阶教学套餐，适合 A2 阶段口语与阅读训练。",
        "status": "draft",
        "visibility": "teacher",
        "course_id": COURSE_SPRINT_ID,
    },
    {
        "id": "material-003",
        "title": "旅行场景强化套餐",
        "series": "KotobaLink 自研",
        "level": "A2/B1",
        "language": "jp-cn",
        "version": "v0.9",
        "summary": "围绕机场、酒店、观光等旅行沟通场景设计的强化训练套餐，用于口语角色扮演与情境表达。",
        "status": "draft",
        "visibility": "teacher",
        "course_id": COURSE_TRAVEL_ID,
    },
]

UNITS = [
    {
        "id": "material-unit-001",
        "material_id": "material-001",
        "title": "第1课：はじめまして",
        "code": "topic-01",
        "learning_goal": "掌握初次见面时的基本问候、自我介绍和课堂入场表达。",
        "sort_order": 1,
        "status": "draft",
    },
    {
        "id": "material-unit-002",
        "material_id": "material-001",
        "title": "第2课：しゅみ",
        "code": "topic-02",
        "learning_goal": "围绕兴趣爱好进行简单表达，能说明自己喜欢做什么。",
        "sort_order": 2,
        "status": "draft",
    },
    {
        "id": "material-unit-003",
        "material_id": "material-001",
        "title": "第3课：たべもの",
        "code": "topic-03",
        "learning_goal": "能够表达饮食喜好，并完成简单的点餐会话。",
        "sort_order": 3,
        "status": "draft",
    },
    {
        "id": "material-unit-004",
        "material_id": "material-002",
        "title": "第1课：りょこうの じゅんび",
        "code": "lesson-01",
        "learning_goal": "能够讨论旅行准备事项，并说明简单的时间安排。",
        "sort_order": 1,
        "status": "draft",
    },
    {
        "id": "material-unit-005",
        "material_id": "material-002",
        "title": "第2课：でんしゃと バス",
        "code": "lesson-02",
        "learning_goal": "理解基础交通路线图，并能表达乘车、换乘相关信息。",
        "sort_order": 2,
        "status": "draft",
    },
    {
        "id": "material-unit-006",
        "material_id": "material-002",
        "title": "第3课：まちあわせ",
        "code": "lesson-03",
        "learning_goal": "能够约定见面地点，并礼貌地说明迟到和变更情况。",
        "sort_order": 3,
        "status": "draft",
    },
    {
        "id": "material-unit-007",
        "material_id": "material-003",
        "title": "场景1：机场值机",
        "code": "scene-01",
        "learning_goal": "掌握机场值机、行李托运与基础问答表达。",
        "sort_order": 1,
        "status": "draft",
    },
    {
        "id": "material-unit-008",
        "material_id": "material-003",
        "title": "场景2：酒店前台",
        "code": "scene-02",
        "learning_goal": "掌握酒店入住、确认预约和基础服务请求表达。",
        "sort_order": 2,
        "status": "draft",
    },
]

ASSETS = [
    {
        "id": "asset-001",
        "file_name": "第1课-初次见面对话音频.wav",
        "asset_type": "audio",
        "mime_type": "audio/wav",
        "storage_key": "materials/demo/topic01-dialogue.wav",
        "file_size": 44144,
        "duration_seconds": 1,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-002",
        "file_name": "入门套餐-课堂练习册.pdf",
        "asset_type": "pdf",
        "mime_type": "application/pdf",
        "storage_key": "materials/demo/starter-workbook.pdf",
        "file_size": 560,
        "duration_seconds": None,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-003",
        "file_name": "第2课-兴趣爱好对话音频.wav",
        "asset_type": "audio",
        "mime_type": "audio/wav",
        "storage_key": "materials/demo/topic02-hobby-dialogue.wav",
        "file_size": 44144,
        "duration_seconds": 1,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-004",
        "file_name": "第2课-兴趣词汇补充表.pdf",
        "asset_type": "pdf",
        "mime_type": "application/pdf",
        "storage_key": "materials/demo/topic02-vocabulary-sheet.pdf",
        "file_size": 560,
        "duration_seconds": None,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-005",
        "file_name": "第3课-菜单图卡.svg",
        "asset_type": "image",
        "mime_type": "image/svg+xml",
        "storage_key": "materials/demo/topic03-menu-photo.svg",
        "file_size": 420,
        "duration_seconds": None,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-006",
        "file_name": "第1课-旅行计划对话音频.wav",
        "asset_type": "audio",
        "mime_type": "audio/wav",
        "storage_key": "materials/demo/a2-travel-dialogue.wav",
        "file_size": 44144,
        "duration_seconds": 1,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-007",
        "file_name": "第1课-行程阅读材料.pdf",
        "asset_type": "pdf",
        "mime_type": "application/pdf",
        "storage_key": "materials/demo/a2-route-reading.pdf",
        "file_size": 560,
        "duration_seconds": None,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-008",
        "file_name": "场景1-机场值机角色卡.pdf",
        "asset_type": "pdf",
        "mime_type": "application/pdf",
        "storage_key": "materials/demo/travel-airport-roleplay.pdf",
        "file_size": 560,
        "duration_seconds": None,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-009",
        "file_name": "场景2-酒店前台对话音频.wav",
        "asset_type": "audio",
        "mime_type": "audio/wav",
        "storage_key": "materials/demo/hotel-frontdesk-dialogue.wav",
        "file_size": 44144,
        "duration_seconds": 1,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
    {
        "id": "asset-010",
        "file_name": "场景2-酒店服务图卡.svg",
        "asset_type": "image",
        "mime_type": "image/svg+xml",
        "storage_key": "materials/demo/hotel-service-card.svg",
        "file_size": 420,
        "duration_seconds": None,
        "visibility": "teacher",
        "uploaded_by": "ops_admin",
    },
]

ITEMS = [
    {
        "id": "material-item-001",
        "unit_id": "material-unit-001",
        "asset_id": "asset-001",
        "title": "对话：初次见面",
        "item_type": "audio",
        "content_text": "A: はじめまして。B: はじめまして。よろしくおねがいします。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-002",
        "unit_id": "material-unit-001",
        "asset_id": None,
        "title": "课文：自己介绍",
        "item_type": "article",
        "content_text": "わたしは アンナです。アメリカから きました。どうぞ よろしく おねがいします。",
        "sort_order": 2,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-003",
        "unit_id": "material-unit-001",
        "asset_id": None,
        "title": "词汇：问候语",
        "item_type": "vocabulary",
        "content_text": "こんにちは|こんにちは|你好|こんにちは、アンナです。\nはじめまして|はじめまして|初次见面|はじめまして、リーです。\nよろしく おねがいします|よろしく おねがいします|请多关照|どうぞ よろしく おねがいします。",
        "sort_order": 3,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-004",
        "unit_id": "material-unit-001",
        "asset_id": None,
        "title": "语法：〜は〜です",
        "item_type": "grammar",
        "content_text": "〜は〜です|判断句，用于介绍身份和属性|わたしは がくせいです。;かれは せんせいです。",
        "sort_order": 4,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-005",
        "unit_id": "material-unit-001",
        "asset_id": None,
        "title": "习题：选择合适的问候",
        "item_type": "exercise",
        "content_text": "根据场景选择最合适的问候语，完成课堂 pair work。",
        "sort_order": 5,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-006",
        "unit_id": "material-unit-001",
        "asset_id": "asset-002",
        "title": "课堂练习册",
        "item_type": "worksheet",
        "content_text": "用于课后复习和家庭作业的练习册。",
        "sort_order": 6,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-007",
        "unit_id": "material-unit-002",
        "asset_id": "asset-003",
        "title": "对话：兴趣爱好",
        "item_type": "audio",
        "content_text": "A: しゅみは なんですか。B: えいがを みることです。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-008",
        "unit_id": "material-unit-002",
        "asset_id": None,
        "title": "词汇：兴趣爱好",
        "item_type": "vocabulary",
        "content_text": "えいが|えいが|电影|えいがを みます。\nおんがく|おんがく|音乐|おんがくを ききます。\nスポーツ|スポーツ|运动|スポーツが すきです。",
        "sort_order": 2,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-009",
        "unit_id": "material-unit-002",
        "asset_id": None,
        "title": "语法：〜ことです",
        "item_type": "grammar",
        "content_text": "〜ことです|名词化表达，用于说明兴趣、习惯等|しゅみは えいがを みることです。;たのしみは ほんを よむことです。",
        "sort_order": 3,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-010",
        "unit_id": "material-unit-002",
        "asset_id": "asset-004",
        "title": "兴趣词汇表",
        "item_type": "resource",
        "content_text": "课堂补充词汇与小组讨论提纲。",
        "sort_order": 4,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-011",
        "unit_id": "material-unit-002",
        "asset_id": None,
        "title": "作业：我的兴趣介绍",
        "item_type": "homework",
        "content_text": "准备一段 30 秒的兴趣介绍，并在下节课进行口头分享。",
        "sort_order": 5,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-012",
        "unit_id": "material-unit-003",
        "asset_id": "asset-005",
        "title": "菜单图片观察",
        "item_type": "image",
        "content_text": "观察菜单图片，回答你想点什么以及原因。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-013",
        "unit_id": "material-unit-003",
        "asset_id": None,
        "title": "课文：午餐时间",
        "item_type": "article",
        "content_text": "A: なにを たべますか。B: カレーを たべます。A: のみものは？ B: おちゃを おねがいします。",
        "sort_order": 2,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-014",
        "unit_id": "material-unit-003",
        "asset_id": None,
        "title": "习题：点餐对话重组",
        "item_type": "exercise",
        "content_text": "将打乱顺序的对话卡片重新排列，并完成角色扮演。",
        "sort_order": 3,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-015",
        "unit_id": "material-unit-004",
        "asset_id": "asset-006",
        "title": "旅行计划对话",
        "item_type": "audio",
        "content_text": "しゅっぱつは なんじですか。ごぜん しちじ はんです。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-016",
        "unit_id": "material-unit-004",
        "asset_id": None,
        "title": "阅读：行程安排",
        "item_type": "reading",
        "content_text": "一日目は きょうとに いきます。二日目は ならを けんがくします。",
        "sort_order": 2,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-017",
        "unit_id": "material-unit-004",
        "asset_id": None,
        "title": "语法：〜予定です",
        "item_type": "grammar",
        "content_text": "〜予定です|表示预定和计划|らいしゅう とうきょうへ いく予定です。;あした べんきょうする予定です。",
        "sort_order": 3,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-018",
        "unit_id": "material-unit-004",
        "asset_id": "asset-007",
        "title": "行程阅读表",
        "item_type": "resource",
        "content_text": "供课堂小组讨论的路线阅读材料。",
        "sort_order": 4,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-019",
        "unit_id": "material-unit-005",
        "asset_id": None,
        "title": "词汇：交通工具",
        "item_type": "vocabulary",
        "content_text": "でんしゃ|でんしゃ|电车|でんしゃに のります。\nバス|バス|公交车|バスで いきます。\nえき|えき|车站|えきで あいます。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-020",
        "unit_id": "material-unit-005",
        "asset_id": None,
        "title": "习题：路线说明",
        "item_type": "exercise",
        "content_text": "根据地图说明从车站到学校的路线，完成 pair explanation。",
        "sort_order": 2,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-021",
        "unit_id": "material-unit-006",
        "asset_id": None,
        "title": "表达：迟到说明",
        "item_type": "expression",
        "content_text": "おくれて すみません。いま むかっています。あと 10 ぷんで つきます。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-022",
        "unit_id": "material-unit-007",
        "asset_id": "asset-008",
        "title": "机场值机场景角色卡",
        "item_type": "resource",
        "content_text": "机场值机情境角色卡，用于课堂角色扮演与提问训练。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-023",
        "unit_id": "material-unit-007",
        "asset_id": None,
        "title": "词汇：机场常用语",
        "item_type": "vocabulary",
        "content_text": "にもつ|にもつ|行李|にもつは ひとつです。\nパスポート|パスポート|护照|パスポートを みせてください。\nとうじょうけん|とうじょうけん|登机牌|とうじょうけんは ありますか。",
        "sort_order": 2,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-024",
        "unit_id": "material-unit-008",
        "asset_id": "asset-009",
        "title": "对话：酒店前台",
        "item_type": "audio",
        "content_text": "チェックイン おねがいします。よやく しています。",
        "sort_order": 1,
        "visibility": "teacher",
        "required": True,
    },
    {
        "id": "material-item-025",
        "unit_id": "material-unit-008",
        "asset_id": "asset-010",
        "title": "酒店服务图卡",
        "item_type": "image",
        "content_text": "房间服务图卡，用于课堂快速问答。",
        "sort_order": 2,
        "visibility": "teacher",
        "required": False,
    },
    {
        "id": "material-item-026",
        "unit_id": "material-unit-008",
        "asset_id": None,
        "title": "习题：前台请求表达",
        "item_type": "exercise",
        "content_text": "根据场景完成请求句型替换练习。",
        "sort_order": 3,
        "visibility": "teacher",
        "required": False,
    },
]

PUBLISH_RECORDS = [
    {
        "id": "material-publish-001",
        "material_id": "material-001",
        "version": "v2.1",
        "publish_scope": "teacher",
        "status": "draft",
        "note": "当前仍处于编辑整理阶段，词汇、语法和习题模块尚未进入正式发布流程。",
        "published_by": "ops_admin",
    },
    {
        "id": "material-publish-002",
        "material_id": "material-002",
        "version": "v1.8",
        "publish_scope": "teacher",
        "status": "draft",
        "note": "当前仍处于编辑整理阶段，出行与路线阅读配套材料尚未进入正式发布流程。",
        "published_by": "ops_admin",
    },
    {
        "id": "material-publish-003",
        "material_id": "material-003",
        "version": "v0.9",
        "publish_scope": "teacher",
        "status": "draft",
        "note": "旅行场景强化内容仍在内部整理中，当前仅供教师试排课程目录。",
        "published_by": "ops_admin",
    },
]


def seed_core_demo_data(session: Session) -> None:
    student = session.get(Student, DEMO_STUDENT_ID)
    if student is None:
        student = Student(id=DEMO_STUDENT_ID)
        session.add(student)
    student.name = "王美"
    student.avatar = None
    student.level = "N4"
    student.class_name = "晚间 A 班"
    student.membership_status = "active"

    course_foundations = session.get(Course, COURSE_FOUNDATIONS_ID)
    if course_foundations is None:
        course_foundations = Course(id=COURSE_FOUNDATIONS_ID)
        session.add(course_foundations)
    course_foundations.name = "入门口语课程 A1"
    course_foundations.course_type = "premium"
    course_foundations.duration = "12 周"
    course_foundations.price = 19800
    course_foundations.benefit = "按内容包开放学习与作业反馈"
    course_foundations.summary = "适合零基础到入门阶段的综合日语口语课程。"
    course_foundations.teacher = "佐藤老师"
    course_foundations.class_type = "小班直播"
    course_foundations.class_schedule = "每周二 / 周四 19:30"
    course_foundations.classroom = "东京线上教室 A"
    course_foundations.status = "draft"

    course_sprint = session.get(Course, COURSE_SPRINT_ID)
    if course_sprint is None:
        course_sprint = Course(id=COURSE_SPRINT_ID)
        session.add(course_sprint)
    course_sprint.name = "生活交流课程 A2"
    course_sprint.course_type = "premium"
    course_sprint.duration = "8 周"
    course_sprint.price = 24800
    course_sprint.benefit = "生活场景表达与阅读强化"
    course_sprint.summary = "围绕出行、路线、约见等生活交流主题的进阶课程。"
    course_sprint.teacher = "武田老师"
    course_sprint.class_type = "周末直播班"
    course_sprint.class_schedule = "每周六 10:00"
    course_sprint.classroom = "东京线上教室 B"
    course_sprint.status = "draft"

    course_travel = session.get(Course, COURSE_TRAVEL_ID)
    if course_travel is None:
        course_travel = Course(id=COURSE_TRAVEL_ID)
        session.add(course_travel)
    course_travel.name = "旅行场景强化课程"
    course_travel.course_type = "special"
    course_travel.duration = "6 周"
    course_travel.price = 16800
    course_travel.benefit = "机场、酒店、观光场景表达强化"
    course_travel.summary = "面向旅行交流需求设计的情境口语强化课程。"
    course_travel.teacher = "中村老师"
    course_travel.class_type = "情境口语工作坊"
    course_travel.class_schedule = "每周日 14:00"
    course_travel.classroom = "东京线上教室 C"
    course_travel.status = "draft"

    enrollment = session.get(Enrollment, ENROLLMENT_ID)
    if enrollment is None:
        enrollment = Enrollment(id=ENROLLMENT_ID)
        session.add(enrollment)
    enrollment.student_id = DEMO_STUDENT_ID
    enrollment.course_id = COURSE_FOUNDATIONS_ID
    enrollment.class_name = "晚间 A 班"
    enrollment.teacher = "佐藤老师"
    enrollment.classroom = "东京线上教室 A"
    enrollment.service_status = "active"
    enrollment.lesson_progress = 4

    order = session.get(Order, ORDER_ID)
    if order is None:
        order = Order(id=ORDER_ID)
        session.add(order)
    order.student_id = DEMO_STUDENT_ID
    order.course_id = COURSE_FOUNDATIONS_ID
    order.business_type = "course"
    order.target_id = COURSE_FOUNDATIONS_ID
    order.target_name = "入门口语课程 A1"
    order.class_name = "晚间 A 班"
    order.teacher = "佐藤老师"
    order.price = 19800
    order.benefit = "按内容包开放学习与作业反馈"
    order.status = "completed"
    order.payment_status = "paid"
    order.paid = True

    session.add_all([student, course_foundations, course_sprint, course_travel, enrollment, order])
    session.commit()


def seed_material_demo_data(session: Session) -> None:
    seed_material_ids = {material["id"] for material in MATERIALS}
    seed_unit_ids = {unit["id"] for unit in UNITS}
    seed_asset_ids = {asset["id"] for asset in ASSETS}
    seed_item_ids = {item["id"] for item in ITEMS}
    seed_publish_ids = {record["id"] for record in PUBLISH_RECORDS}

    for material_data in MATERIALS:
        material = session.get(TeachingMaterial, material_data["id"])
        if material is None:
            material = TeachingMaterial(id=material_data["id"])
            session.add(material)

        material.title = material_data["title"]
        material.series = material_data["series"]
        material.level = material_data["level"]
        material.language = material_data["language"]
        material.version = material_data["version"]
        material.summary = material_data["summary"]
        material.status = material_data["status"]
        material.visibility = material_data["visibility"]
        material.cover_asset_url = None
        material.course_id = material_data["course_id"]

    for unit_data in UNITS:
        unit = session.get(MaterialUnit, unit_data["id"])
        if unit is None:
            unit = MaterialUnit(id=unit_data["id"])
            session.add(unit)

        unit.material_id = unit_data["material_id"]
        unit.title = unit_data["title"]
        unit.code = unit_data["code"]
        unit.learning_goal = unit_data["learning_goal"]
        unit.sort_order = unit_data["sort_order"]
        unit.status = unit_data["status"]

    for asset_data in ASSETS:
        asset = session.get(MediaAsset, asset_data["id"])
        if asset is None:
            asset = MediaAsset(id=asset_data["id"])
            session.add(asset)

        asset.file_name = asset_data["file_name"]
        asset.asset_type = asset_data["asset_type"]
        asset.mime_type = asset_data["mime_type"]
        asset.storage_key = asset_data["storage_key"]
        asset.file_size = asset_data["file_size"]
        asset.duration_seconds = asset_data["duration_seconds"]
        asset.visibility = asset_data["visibility"]
        asset.uploaded_by = asset_data["uploaded_by"]

    for item_data in ITEMS:
        item = session.get(MaterialItem, item_data["id"])
        if item is None:
            item = MaterialItem(id=item_data["id"])
            session.add(item)

        item.unit_id = item_data["unit_id"]
        item.asset_id = item_data["asset_id"]
        item.title = item_data["title"]
        item.item_type = item_data["item_type"]
        item.content_text = item_data["content_text"]
        item.sort_order = item_data["sort_order"]
        item.visibility = item_data["visibility"]
        item.required = item_data["required"]

    for publish_data in PUBLISH_RECORDS:
        record = session.get(MaterialPublishRecord, publish_data["id"])
        if record is None:
            record = MaterialPublishRecord(id=publish_data["id"])
            session.add(record)

        record.material_id = publish_data["material_id"]
        record.version = publish_data["version"]
        record.publish_scope = publish_data["publish_scope"]
        record.status = publish_data["status"]
        record.note = publish_data["note"]
        record.published_by = publish_data["published_by"]

    stray_publish_records = session.execute(
        select(MaterialPublishRecord).where(
            MaterialPublishRecord.material_id.in_(seed_material_ids),
            MaterialPublishRecord.id.not_in(seed_publish_ids),
        )
    ).scalars().all()
    for record in stray_publish_records:
        session.delete(record)

    stray_items = session.execute(
        select(MaterialItem)
        .join(MaterialUnit, MaterialItem.unit_id == MaterialUnit.id)
        .where(
            MaterialUnit.material_id.in_(seed_material_ids),
            MaterialItem.id.not_in(seed_item_ids),
        )
    ).scalars().all()
    for item in stray_items:
        session.delete(item)

    stray_units = session.execute(
        select(MaterialUnit).where(
            MaterialUnit.material_id.in_(seed_material_ids),
            MaterialUnit.id.not_in(seed_unit_ids),
        )
    ).scalars().all()
    for unit in stray_units:
        session.delete(unit)

    session.flush()

    stray_assets = session.execute(
        select(MediaAsset).where(MediaAsset.id.not_in(seed_asset_ids))
    ).scalars().all()
    for asset in stray_assets:
        if not asset.items:
            session.delete(asset)

    session.commit()


def ensure_demo_media_files() -> None:
    media_root = get_media_root_path()

    for asset_data in ASSETS:
        file_path = media_root / asset_data["storage_key"]
        file_path.parent.mkdir(parents=True, exist_ok=True)

        if file_path.exists():
            continue

        if asset_data["asset_type"] == "audio":
            with wave.open(str(file_path), "w") as wav_file:
                wav_file.setnchannels(1)
                wav_file.setsampwidth(2)
                wav_file.setframerate(22050)
                wav_file.writeframes(b"\x00\x00" * 22050)
            continue

        if asset_data["mime_type"] == "application/pdf":
            _write_demo_pdf(file_path, asset_data["file_name"])
            continue

        if asset_data["mime_type"] == "image/svg+xml":
            file_path.write_text(
                (
                    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">'
                    '<rect width="100%" height="100%" fill="#f5f7fa"/>'
                    '<rect x="40" y="40" width="560" height="280" rx="24" fill="#e6f4ff" stroke="#1677ff" />'
                    f'<text x="80" y="180" font-size="28" fill="#1677ff">{asset_data["file_name"]}</text>'
                    "</svg>"
                ),
                encoding="utf-8",
            )


def _write_demo_pdf(file_path: Path, label: str) -> None:
    safe_label = label[:36]
    pdf_bytes = (
        b"%PDF-1.4\n"
        b"1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n"
        b"2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n"
        b"3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 400 240] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n"
        + f"4 0 obj<< /Length {52 + len(safe_label)} >>stream\nBT /F1 16 Tf 36 160 Td ({safe_label}) Tj ET\nendstream\nendobj\n".encode()
        + b"5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n"
        + b"xref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000241 00000 n \n0000000354 00000 n \n"
        + b"trailer<< /Size 6 /Root 1 0 R >>\nstartxref\n424\n%%EOF\n"
    )
    file_path.write_bytes(pdf_bytes)


def ensure_seed_data(session: Session) -> None:
    seed_core_demo_data(session)
    seed_material_demo_data(session)


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    ensure_demo_media_files()
    with SessionLocal() as session:
        ensure_seed_data(session)
