import { Button } from 'antd';

import { useAuth } from '../auth/AuthProvider';
import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function CoursesPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <ModuleFrame
      eyebrow="Courses"
      title={isTeacher ? '我的课程' : '课程中心'}
      summary={
        isTeacher
          ? '教师端只展示与本人授课相关的课程、班级和 lesson 视图，便于处理作业、反馈和课堂记录。'
          : '统一承载课程目录、已开班课程、模板、定价和上下架状态。当前展示的是后台框架效果，不做真实编辑能力。'
      }
      metrics={[
        { label: isTeacher ? '授课课程' : '目录课程', value: isTeacher ? '6' : '24' },
        { label: isTeacher ? '本周课次' : '进行中班级', value: isTeacher ? '12' : '9' },
        { label: isTeacher ? '待反馈课后记录' : '待发布草稿', value: isTeacher ? '4' : '6' },
      ]}
    >
      <PageToolbar
        title={isTeacher ? '授课课程与课次视图' : '课程检索与运营视图'}
        description={
          isTeacher
            ? '教师可查看自己的课程和课次，不提供新建课程或全局课程配置入口。'
            : '这里先固定后台页面的操作栏样式，后续再接真实筛选、搜索和批量动作。'
        }
        actions={
          isTeacher ? (
            <>
              <Button>课堂记录</Button>
              <Button type="primary">作业查看</Button>
            </>
          ) : (
            <>
              <Button>导出</Button>
              <Button type="primary">新建课程</Button>
            </>
          )
        }
      />
      <PlaceholderBoard
        title={isTeacher ? '授课课程视图' : '课程目录视图'}
        description={
          isTeacher
            ? '后续这里会接我的课程、课次进度、课堂记录和作业反馈。'
            : '后续这里会接列表筛选、状态过滤和批量发布能力。'
        }
        columns={isTeacher ? ['课程', '班级', '下次上课', '作业', '反馈状态'] : ['课程', '类型', '教师', '状态', '价格']}
        rows={
          isTeacher
            ? [
                ['Conversation Foundations', 'Evening A', 'Tue 19:00', '待批改', '待填写'],
                ['JLPT Sprint', 'Weekend B', 'Sat 10:00', '已完成', '已提交'],
                ['Business Speaking', 'Corporate 1', 'Thu 20:00', '待发布', '草稿'],
              ]
            : [
                ['Conversation Foundations', 'Conversation', 'Sato', 'Published', 'JPY 19,800'],
                ['JLPT Sprint', 'Exam', 'Takeda', 'Draft', 'JPY 24,800'],
                ['Business Speaking', 'Premium', 'Mori', 'Scheduled', 'JPY 32,000'],
              ]
        }
      />
      <ModuleRoadmap
        items={
          isTeacher
            ? [
                '我的课程详情与班级课表',
                '课次进度与课堂记录',
                '作业发布、批改与评分',
                '课后反馈与教学备注',
              ]
            : [
                '课程模板与复制发布',
                '班级维度课程实例',
                '价格与优惠策略',
                '课程详情和 lesson 配置',
              ]
        }
      />
    </ModuleFrame>
  );
}
