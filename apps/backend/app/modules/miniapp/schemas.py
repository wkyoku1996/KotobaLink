from pydantic import BaseModel

from app.common.schemas import ApiResponse


class MiniCourseListItem(BaseModel):
    id: str
    name: str
    type: str
    duration: str
    benefit: str | None = None
    status: str
    price: str
    summary: str | None = None
    classType: str | None = None
    classSchedule: str | None = None
    classroom: str | None = None
    teacher: str
    liveVersion: str
    materialId: str
    materialTitle: str
    lessonCount: int
    contentCount: int


class MiniCourseInfoItem(BaseModel):
    label: str
    value: str


class MiniCourseLessonItem(BaseModel):
    id: str
    title: str
    date: str
    endTime: str
    className: str
    teacher: str
    classroom: str
    status: str
    summary: str


class MiniCourseAssessmentItem(BaseModel):
    id: str
    title: str
    date: str
    type: str
    score: str
    summary: str
    status: str


class MiniLessonPracticeQuestion(BaseModel):
    id: str
    type: str
    prompt: str
    options: list[str] = []
    correctAnswer: str | None = None
    answer: str | None = None
    placeholder: str | None = None


class MiniLessonPractice(BaseModel):
    quizTitle: str
    examTitle: str
    questions: list[MiniLessonPracticeQuestion]


class MiniLessonDetailData(BaseModel):
    id: str
    title: str
    courseName: str
    className: str
    teacher: str
    classroom: str
    date: str
    endTime: str
    status: str
    outline: list[str]
    vocab: list[str]
    grammar: list[str]
    isEnrolledLesson: bool = False
    practice: MiniLessonPractice | None = None


class MiniAssessmentDetailData(BaseModel):
    id: str
    title: str
    courseName: str
    className: str
    type: str
    status: str
    score: str
    date: str
    teacher: str
    summary: str
    questions: list[MiniLessonPracticeQuestion]


class MiniCourseDetailContent(BaseModel):
    title: str
    courseInfo: list[MiniCourseInfoItem]
    classInfo: list[MiniCourseInfoItem]
    teacherInfo: list[MiniCourseInfoItem]
    lessons: list[MiniCourseLessonItem]
    assessmentOverview: list[MiniCourseInfoItem]
    assessments: list[MiniCourseAssessmentItem] = []


class MiniCourseDetailData(BaseModel):
    course: MiniCourseListItem
    detail: MiniCourseDetailContent


class MiniMyCourseListItem(BaseModel):
    id: str
    courseId: str
    courseName: str
    className: str
    teacher: str
    classroom: str
    serviceStatus: str
    lessonProgress: int


class MiniMyCourseSummaryData(BaseModel):
    lessonCompleted: int
    lessonTotal: int
    level: str
    homeworkCompleted: int | None = None
    homeworkTotal: int | None = None
    pendingMakeups: int | None = None


class MiniMyCourseDetailData(BaseModel):
    enrollment: MiniMyCourseListItem
    detail: MiniCourseDetailContent


class MiniCourseListResponse(ApiResponse):
    data: list[MiniCourseListItem]


class MiniCourseDetailResponse(ApiResponse):
    data: MiniCourseDetailData


class MiniMyCourseListResponse(ApiResponse):
    data: list[MiniMyCourseListItem]


class MiniMyCourseSummaryResponse(ApiResponse):
    data: MiniMyCourseSummaryData


class MiniMyCourseDetailResponse(ApiResponse):
    data: MiniMyCourseDetailData


class MiniLessonDetailResponse(ApiResponse):
    data: MiniLessonDetailData


class MiniAssessmentDetailResponse(ApiResponse):
    data: MiniAssessmentDetailData
