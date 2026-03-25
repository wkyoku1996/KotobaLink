from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.db.init_data import DEMO_STUDENT_ID
from app.db.models import Course, Enrollment, MaterialReleaseVersion, TeachingMaterial
from app.modules.miniapp.schemas import (
    MiniAssessmentDetailData,
    MiniCourseAssessmentItem,
    MiniCourseDetailContent,
    MiniCourseDetailData,
    MiniCourseInfoItem,
    MiniCourseLessonItem,
    MiniCourseListItem,
    MiniLessonDetailData,
    MiniLessonPractice,
    MiniLessonPracticeQuestion,
    MiniMyCourseDetailData,
    MiniMyCourseListItem,
)


def list_live_courses(session: Session) -> list[MiniCourseListItem]:
    releases = (
        session.execute(
            select(MaterialReleaseVersion)
            .options(
                selectinload(MaterialReleaseVersion.material).selectinload(TeachingMaterial.course),
            )
            .where(
                MaterialReleaseVersion.is_live.is_(True),
                MaterialReleaseVersion.status == "live",
            )
            .order_by(MaterialReleaseVersion.published_at.desc(), MaterialReleaseVersion.created_at.desc())
        )
        .scalars()
        .all()
    )
    return [_build_course_list_item(release) for release in releases]


def get_live_course_detail(session: Session, course_id: str) -> MiniCourseDetailData:
    releases = (
        session.execute(
            select(MaterialReleaseVersion)
            .options(
                selectinload(MaterialReleaseVersion.material).selectinload(TeachingMaterial.course),
            )
            .where(
                MaterialReleaseVersion.is_live.is_(True),
                MaterialReleaseVersion.status == "live",
            )
            .order_by(MaterialReleaseVersion.published_at.desc(), MaterialReleaseVersion.created_at.desc())
        )
        .scalars()
        .all()
    )

    target_release = next((release for release in releases if _release_matches_course_identifier(release, course_id)), None)
    if target_release is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Live course not found")

    course_item = _build_course_list_item(target_release)
    detail = _build_course_detail(target_release)
    return MiniCourseDetailData(course=course_item, detail=detail)


def list_my_live_courses(session: Session) -> list[MiniMyCourseListItem]:
    enrollments = (
        session.execute(
            select(Enrollment)
            .options(selectinload(Enrollment.course))
            .where(Enrollment.student_id == DEMO_STUDENT_ID)
            .order_by(Enrollment.created_at.desc())
        )
        .scalars()
        .all()
    )
    return [
        MiniMyCourseListItem(
            id=enrollment.course_id,
            courseId=enrollment.course_id,
            courseName=enrollment.course.name,
            className=enrollment.class_name or enrollment.course.class_type or "待编班",
            teacher=enrollment.teacher or enrollment.course.teacher,
            classroom=enrollment.classroom or enrollment.course.classroom or "待安排",
            serviceStatus=_get_service_status_label(enrollment.service_status),
            lessonProgress=enrollment.lesson_progress,
        )
        for enrollment in enrollments
    ]


def get_my_live_course_detail(session: Session, course_id: str) -> MiniMyCourseDetailData:
    enrollment = (
        session.execute(
            select(Enrollment)
            .options(selectinload(Enrollment.course))
            .where(
                Enrollment.student_id == DEMO_STUDENT_ID,
                Enrollment.course_id == course_id,
            )
        )
        .scalars()
        .first()
    )
    if enrollment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrolled course not found")

    target_release = _load_live_release_by_course_id(session, course_id)
    detail = _build_course_detail(
        target_release,
        enrolled_class_name=enrollment.class_name,
        enrolled_teacher=enrollment.teacher,
        enrolled_classroom=enrollment.classroom,
        service_status=enrollment.service_status,
        lesson_progress=enrollment.lesson_progress,
        include_assessments=True,
    )

    return MiniMyCourseDetailData(
        enrollment=MiniMyCourseListItem(
            id=enrollment.course_id,
            courseId=enrollment.course_id,
            courseName=enrollment.course.name,
            className=enrollment.class_name or enrollment.course.class_type or "待编班",
            teacher=enrollment.teacher or enrollment.course.teacher,
            classroom=enrollment.classroom or enrollment.course.classroom or "待安排",
            serviceStatus=_get_service_status_label(enrollment.service_status),
            lessonProgress=enrollment.lesson_progress,
        ),
        detail=detail,
    )


def get_live_lesson_detail(session: Session, course_id: str, lesson_id: str, *, enrolled: bool) -> MiniLessonDetailData:
    release = _load_live_release_by_course_id(session, course_id)
    material = release.material
    course = material.course if material else None

    enrollment = None
    if enrolled:
        enrollment = (
            session.execute(
                select(Enrollment)
                .options(selectinload(Enrollment.course))
                .where(
                    Enrollment.student_id == DEMO_STUDENT_ID,
                    Enrollment.course_id == course_id,
                )
            )
            .scalars()
            .first()
        )
        if enrollment is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrolled lesson not found")

    snapshot = release.snapshot_json or {}
    course_snapshot = _extract_course_snapshot(snapshot)
    units = _extract_units(course_snapshot)
    target_unit = next((unit for unit in units if str(unit.get("id")) == lesson_id), None)
    if target_unit is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")

    teacher_name = (
        enrollment.teacher if enrollment and enrollment.teacher else course.teacher if course and course.teacher else "待安排"
    )
    classroom_name = (
        enrollment.classroom if enrollment and enrollment.classroom else course.classroom if course and course.classroom else "待安排"
    )
    class_name = (
        enrollment.class_name if enrollment and enrollment.class_name else course.class_type if course and course.class_type else "待编班"
    )

    contents = target_unit.get("contents") if isinstance(target_unit.get("contents"), list) else []
    outline = [str(content.get("title")) for content in contents if isinstance(content, dict) and content.get("title")]
    vocab = _extract_vocab_list(contents)
    grammar = _extract_grammar_list(contents)
    practice = _build_lesson_practice(contents)

    return MiniLessonDetailData(
        id=lesson_id,
        title=str(target_unit.get("title") or "课次详情"),
        courseName=material.title if not enrolled else (course.name if course else material.title),
        className=class_name,
        teacher=teacher_name,
        classroom=classroom_name,
        date="上线后开放",
        endTime="按排课安排",
        status="已发布" if not enrolled else "服务中",
        outline=outline or ["当前单元内容已发布，后续可在这里展示更细的教学步骤。"],
        vocab=vocab,
        grammar=grammar,
        isEnrolledLesson=enrolled,
        practice=practice if enrolled else None,
    )


def get_live_assessment_detail(
    session: Session,
    course_id: str,
    assessment_id: str,
    *,
    enrolled: bool,
) -> MiniAssessmentDetailData:
    release = _load_live_release_by_course_id(session, course_id)
    material = release.material
    course = material.course if material else None

    enrollment = None
    if enrolled:
        enrollment = (
            session.execute(
                select(Enrollment)
                .options(selectinload(Enrollment.course))
                .where(
                    Enrollment.student_id == DEMO_STUDENT_ID,
                    Enrollment.course_id == course_id,
                )
            )
            .scalars()
            .first()
        )
        if enrollment is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrolled assessment not found")

    snapshot = release.snapshot_json or {}
    course_snapshot = _extract_course_snapshot(snapshot)
    units = _extract_units(course_snapshot)
    assessments = _build_assessments(units)
    assessment = next((item for item in assessments if item.id == assessment_id), None)
    if assessment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assessment not found")

    teacher_name = (
        enrollment.teacher if enrollment and enrollment.teacher else course.teacher if course and course.teacher else "待安排"
    )
    class_name = (
        enrollment.class_name if enrollment and enrollment.class_name else course.class_type if course and course.class_type else "待编班"
    )

    return MiniAssessmentDetailData(
        id=assessment.id,
        title=assessment.title,
        courseName=material.title if not enrolled else (course.name if course else material.title),
        className=class_name,
        type=assessment.type,
        status=assessment.status,
        score=assessment.score,
        date=assessment.date,
        teacher=teacher_name,
        summary=assessment.summary,
        questions=_build_assessment_questions(assessment),
    )


def _build_course_list_item(release: MaterialReleaseVersion) -> MiniCourseListItem:
    snapshot = release.snapshot_json or {}
    course_snapshot = _extract_course_snapshot(snapshot)
    material = release.material
    course = material.course if material else None
    units = _extract_units(course_snapshot)

    return MiniCourseListItem(
        id=material.id,
        name=material.title,
        type=_get_course_type_label(course),
        duration=_get_course_duration_label(course, len(units)),
        benefit=course.benefit if course else material.title,
        status="上线中",
        price=_format_price(course.price if course else 0),
        summary=material.summary or (course.summary if course and course.summary else str(course_snapshot.get("summary") or "")),
        classType=course.class_type if course else "待编班",
        classSchedule=course.class_schedule if course else "发布后按排课安排开放",
        classroom=course.classroom if course else "待安排",
        teacher=course.teacher if course else "待安排",
        liveVersion=release.version_number,
        materialId=material.id,
        materialTitle=material.title,
        lessonCount=len(units),
        contentCount=sum(_count_contents(unit) for unit in units),
    )


def _build_course_detail(
    release: MaterialReleaseVersion,
    *,
    enrolled_class_name: str | None = None,
    enrolled_teacher: str | None = None,
    enrolled_classroom: str | None = None,
    service_status: str | None = None,
    lesson_progress: int | None = None,
    include_assessments: bool = False,
) -> MiniCourseDetailContent:
    snapshot = release.snapshot_json or {}
    course_snapshot = _extract_course_snapshot(snapshot)
    material = release.material
    course = material.course if material else None
    units = _extract_units(course_snapshot)
    teacher_name = enrolled_teacher or (course.teacher if course and course.teacher else "待安排")
    classroom_name = enrolled_classroom or (course.classroom if course and course.classroom else "待安排")
    class_name = enrolled_class_name or (course.class_type if course and course.class_type else "待编班")
    lessons = [
        _build_lesson(unit, course, index + 1, class_name=class_name, teacher_name=teacher_name, classroom_name=classroom_name)
        for index, unit in enumerate(units)
    ]

    return MiniCourseDetailContent(
        title=material.title if not include_assessments else (course.name if course else material.title),
        courseInfo=[
            MiniCourseInfoItem(label="课程类型", value=_get_course_type_label(course)),
            MiniCourseInfoItem(label="课程周期", value=_get_course_duration_label(course, len(units))),
            MiniCourseInfoItem(label="课程价格", value=_format_price(course.price if course else 0)),
            MiniCourseInfoItem(
                label="课程说明",
                value=course.summary if course and course.summary else str(course_snapshot.get("summary") or material.summary or "围绕已发布课程目录开放学习内容。"),
            ),
            *(
                [
                    MiniCourseInfoItem(
                        label="课时进度",
                        value=f"{lesson_progress} / {len(units)}" if lesson_progress is not None else f"0 / {len(units)}",
                    ),
                    MiniCourseInfoItem(
                        label="服务状态",
                        value=_get_service_status_label(service_status) if service_status else "服务中",
                    ),
                ]
                if include_assessments
                else []
            ),
        ],
        classInfo=[
            MiniCourseInfoItem(label="班级名称", value=class_name if include_assessments else (course.class_type if course and course.class_type else "待排课")),
            MiniCourseInfoItem(
                label="上课时间",
                value=course.class_schedule if course and course.class_schedule else "课程上线后按排课安排开放",
            ),
            MiniCourseInfoItem(label="上课教室", value=classroom_name),
            MiniCourseInfoItem(label="当前状态", value="服务中" if include_assessments else "上线中"),
        ],
        teacherInfo=[
            MiniCourseInfoItem(label="教师姓名", value=teacher_name),
            MiniCourseInfoItem(label="教师身份", value="课程讲师"),
            MiniCourseInfoItem(label="擅长方向", value="日语课程讲授与学习辅导"),
            MiniCourseInfoItem(
                label="教师介绍",
                value="当前为内容上线阶段演示数据，后续会接入真实教师档案与排课信息。",
            ),
        ],
        lessons=lessons,
        assessmentOverview=[
            MiniCourseInfoItem(label="考核方式", value="按单元学习任务、作业反馈和阶段复盘综合评估"),
            MiniCourseInfoItem(
                label="当前安排",
                value=f"当前已上线 {len(units)} 个单元，后续将按发布版本逐步补充课次与考核安排",
            ),
        ],
        assessments=_build_assessments(units) if include_assessments else [],
    )


def _build_lesson(
    unit: dict,
    course: Course | None,
    order: int,
    *,
    class_name: str,
    teacher_name: str,
    classroom_name: str,
) -> MiniCourseLessonItem:
    contents = unit.get("contents") if isinstance(unit.get("contents"), list) else []
    learning_goal = str(unit.get("learning_goal") or "").strip()
    summary = learning_goal or f"当前单元包含 {len(contents)} 项学习内容，已按发布版本开放。"
    return MiniCourseLessonItem(
        id=str(unit.get("id") or f"lesson-{order}"),
        title=str(unit.get("title") or f"第 {order} 单元"),
        date="上线后开放",
        endTime="按排课安排",
        className=class_name,
        teacher=teacher_name,
        classroom=classroom_name,
        status="已发布",
        summary=summary,
    )


def _build_assessments(units: list[dict]) -> list[MiniCourseAssessmentItem]:
    return [
        MiniCourseAssessmentItem(
            id=f"assessment-{index + 1}",
            title=f"{str(unit.get('title') or f'第{index + 1}单元')} 学习复盘",
            date="待安排",
            type="单元复盘",
            score="待开放",
            summary="课程发布后将按单元学习进度逐步开放复盘与测评内容。",
            status="未开始",
        )
        for index, unit in enumerate(units)
    ]


def _build_assessment_questions(assessment: MiniCourseAssessmentItem) -> list[MiniLessonPracticeQuestion]:
    return [
        MiniLessonPracticeQuestion(
            id=f"{assessment.id}-q1",
            type="blank",
            prompt=f"请用日语简要说明你对“{assessment.title}”这一单元的理解。",
            answer="开放题",
            placeholder="这里先作为开放题演示输入框，后续再接真实题目配置",
        ),
        MiniLessonPracticeQuestion(
            id=f"{assessment.id}-q2",
            type="choice",
            prompt="本次考核主要围绕哪一类学习任务展开？",
            options=["词汇与句型复盘", "系统运维配置", "支付渠道切换"],
            correctAnswer="词汇与句型复盘",
        ),
    ]


def _extract_vocab_list(contents: list[dict]) -> list[str]:
    values: list[str] = []
    for content in contents:
        if not isinstance(content, dict) or str(content.get("type")) != "vocabulary":
            continue
        data = content.get("data")
        if not isinstance(data, dict):
            continue
        items = data.get("items")
        if not isinstance(items, list):
            continue
        for item in items:
            if not isinstance(item, dict):
                continue
            word = str(item.get("word") or "").strip()
            meaning = str(item.get("meaning") or "").strip()
            if word and meaning:
                values.append(f"{word}：{meaning}")
            elif word:
                values.append(word)
    return values


def _extract_grammar_list(contents: list[dict]) -> list[str]:
    values: list[str] = []
    for content in contents:
        if not isinstance(content, dict) or str(content.get("type")) != "grammar":
            continue
        data = content.get("data")
        if not isinstance(data, dict):
            continue
        points = data.get("points")
        if not isinstance(points, list):
            continue
        for point in points:
            if not isinstance(point, dict):
                continue
            pattern = str(point.get("pattern") or "").strip()
            meaning = str(point.get("meaning") or "").strip()
            if pattern and meaning:
                values.append(f"{pattern}：{meaning}")
            elif pattern:
                values.append(pattern)
    return values


def _build_lesson_practice(contents: list[dict]) -> MiniLessonPractice | None:
    exercise = next(
        (
            content
            for content in contents
            if isinstance(content, dict) and str(content.get("type")) == "exercise"
        ),
        None,
    )
    if not isinstance(exercise, dict):
        return None

    data = exercise.get("data")
    if not isinstance(data, dict):
        return None

    prompt = str(data.get("prompt") or "").strip()
    if not prompt:
        return None

    return MiniLessonPractice(
        quizTitle="课后练习",
        examTitle="单元练习",
        questions=[
            MiniLessonPracticeQuestion(
                id="practice-1",
                type="blank",
                prompt=prompt,
                answer="开放题",
                placeholder="这里先作为演示输入框，后续再接真实题目配置",
            )
        ],
    )


def _extract_course_snapshot(snapshot: dict) -> dict:
    courses = snapshot.get("courses")
    if isinstance(courses, list) and courses:
        first = courses[0]
        if isinstance(first, dict):
            return first
    return {}


def _extract_units(course_snapshot: dict) -> list[dict]:
    units = course_snapshot.get("units")
    if not isinstance(units, list):
        return []
    return [unit for unit in units if isinstance(unit, dict)]


def _count_contents(unit: dict) -> int:
    contents = unit.get("contents")
    return len(contents) if isinstance(contents, list) else 0


def _get_course_type_label(course: Course | None) -> str:
    if course is None:
        return "内容课程"
    mapping = {
        "material_package": "内容课程",
        "basic": "基础课程",
        "premium": "精品课程",
        "exam": "考试课程",
        "special": "专项课程",
    }
    return mapping.get(course.course_type, "内容课程")


def _get_course_duration_label(course: Course | None, unit_count: int) -> str:
    if course and course.duration:
        return course.duration
    return f"{max(unit_count, 1)} 个单元"


def _format_price(price: int) -> str:
    return f"¥{price:,}"


def _get_service_status_label(status_value: str | None) -> str:
    mapping = {
        "active": "服务中",
        "paused": "暂停中",
        "completed": "已完成",
    }
    return mapping.get(status_value or "", status_value or "服务中")


def _load_live_release_by_course_id(session: Session, course_id: str) -> MaterialReleaseVersion:
    releases = (
        session.execute(
            select(MaterialReleaseVersion)
            .options(selectinload(MaterialReleaseVersion.material).selectinload(TeachingMaterial.course))
            .where(
                MaterialReleaseVersion.is_live.is_(True),
                MaterialReleaseVersion.status == "live",
            )
            .order_by(MaterialReleaseVersion.published_at.desc(), MaterialReleaseVersion.created_at.desc())
        )
        .scalars()
        .all()
    )
    target_release = next((release for release in releases if _release_matches_course_identifier(release, course_id)), None)
    if target_release is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Live enrolled course not found")
    return target_release


def _release_matches_course_identifier(release: MaterialReleaseVersion, identifier: str) -> bool:
    snapshot_course_id = str(_extract_course_snapshot(release.snapshot_json).get("id") or "")
    material_id = str(release.material_id or "")
    related_course_id = str(release.material.course.id if release.material and release.material.course else "")
    return identifier in {snapshot_course_id, material_id, related_course_id}
