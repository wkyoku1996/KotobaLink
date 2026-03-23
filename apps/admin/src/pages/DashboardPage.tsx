import { Card, Col, Descriptions, List, Row, Space, Statistic, Tag, Typography } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { PlaceholderBoard } from '../components/PlaceholderBoard';
import { useAuth } from '../auth/AuthProvider';
import { useDashboardData } from '../hooks/useDashboardData';


const defaultFeatures = [
  { title: '教学域', description: 'Students / Teachers / Courses / Schedule' },
  { title: '运营域', description: 'Orders / Memberships / Activities / Notifications' },
  { title: '系统域', description: 'Workspace / Content / Settings' },
];

const defaultTodoItems = [
  '课程发布前检查',
  '本周排课冲突复核',
  '会员续费提醒策略',
  '活动报名审核队列',
];

const defaultSections = [
  {
    title: '框架目标',
    description: '统一后台导航、页面模板、模块分区和后续业务页开发入口。',
  },
  {
    title: '当前状态',
    description: '已经接入 Ant Design、Docker 开发环境、基础 API 联调和模块页面骨架。',
  },
  {
    title: '下一阶段',
    description: '在当前框架上逐步替换成真实的学员、课程、订单与排课模块。',
  },
];

export function DashboardPage() {
  const { user } = useAuth();
  const { profile, courses, studentCourses, orders, loading, error } = useDashboardData();
  const role = user?.role ?? 'super_admin';
  const isTeacher = role === 'teacher';
  const isSuperAdmin = role === 'super_admin';

  const features = isTeacher
    ? [
        { title: '教学执行', description: '我的学员 / 我的课程 / 教学通知' },
        { title: '课堂协作', description: '作业 / 反馈 / 请假 / 课后记录' },
        { title: '系统支持', description: '个人工作台与基础通知入口' },
      ]
    : isSuperAdmin
      ? [
          { title: '治理域', description: '权限 / 设置 / 全局配置 / 系统规则' },
          { title: '业务域', description: '教学 / 运营 / 内容 / 通知总览' },
          { title: '平台域', description: '环境 / 数据 / 健康状态 / 扩展入口' },
        ]
      : defaultFeatures;

  const todoItems = isTeacher
    ? ['待批改作业', '今日请假确认', '课后反馈补录', '下节课学员提醒']
    : isSuperAdmin
      ? ['权限矩阵复核', '配置项审查', '系统通知模板整理', '跨模块权限边界确认']
      : defaultTodoItems;

  const sections = isTeacher
    ? [
        { title: '教师端目标', description: '统一教师工作台、教学执行入口和后续作业反馈、请假处理等页面模板。' },
        { title: '当前状态', description: '已完成教师角色权限收口，并把菜单、页面标题和操作入口切成教师视角。' },
        { title: '下一阶段', description: '在当前框架上接入我的学员、我的课程、作业反馈和课堂记录等真实教学模块。' },
      ]
    : isSuperAdmin
      ? [
          { title: '治理端目标', description: '统一超级管理员的治理视角、系统边界和全局配置入口，便于后续承接权限和系统能力。' },
          { title: '当前状态', description: '已完成按角色切换的导航、总览页和工作台框架，超级管理员保留全局治理入口。' },
          { title: '下一阶段', description: '在当前治理框架上接入角色权限矩阵、系统配置、全局字典和平台监控等模块。' },
        ]
      : defaultSections;

  return (
    <ModuleFrame
      eyebrow="Dashboard"
      title={isTeacher ? '教师工作台总览' : isSuperAdmin ? '治理框架总览' : '后台框架总览'}
      summary={
        isTeacher
          ? '当前先把教师端的大框架、教学执行导航和典型工作台布局搭起来。首页保留少量实时接口数据，用来确认教师端外壳和后端链路可以正常协作。'
          : isSuperAdmin
            ? '当前先把超级管理员的治理框架、系统导航和跨模块视图搭起来。首页保留少量实时接口数据，用来确认这套治理外壳和后端链路可以正常协作。'
            : '当前先把管理后台的大框架和典型企业后台布局搭起来。首页保留少量实时接口数据，用来确认这套后台外壳和后端链路可以正常协作。'
      }
      metrics={[
        { label: isTeacher ? '教师入口' : isSuperAdmin ? '治理入口' : '模块入口', value: isTeacher ? '5' : isSuperAdmin ? '11' : '10' },
        { label: '已接 API', value: '4' },
        { label: '设计体系', value: 'Ant Design' },
      ]}
    >
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={15}>
          <Card title={isTeacher ? '教师端说明' : isSuperAdmin ? '治理端说明' : '框架说明'} className="module-card">
            <Space direction="vertical" size={18} className="full-width">
              {sections.map((section) => (
                <div key={section.title} className="overview-block">
                  <Typography.Title level={5}>{section.title}</Typography.Title>
                  <Typography.Paragraph type="secondary" className="card-description">
                    {section.description}
                  </Typography.Paragraph>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} xl={9}>
          <Card title={isTeacher ? '教师端分区' : isSuperAdmin ? '治理端分区' : '模块分区'} className="module-card">
            <List
              dataSource={features}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <Tag color="blue">{item.title}</Tag>
                    <Typography.Text>{item.description}</Typography.Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={8}>
          <Card title={isTeacher ? '教学数据联调状态' : isSuperAdmin ? '平台联调状态' : '联调状态'} className="module-card">
            {loading ? <Typography.Text>正在读取接口数据...</Typography.Text> : null}
            {error ? <Typography.Text type="danger">接口请求失败：{error}</Typography.Text> : null}
            {!loading && !error && profile ? (
              <Space direction="vertical" size={16} className="full-width">
                <Statistic title={isTeacher ? '示例学员' : isSuperAdmin ? '样例主体' : '当前学员'} value={profile.name} />
                <Statistic title={isTeacher ? '当前教学课程' : isSuperAdmin ? '样例课程' : '当前课程'} value={profile.current_course} />
                <Statistic title={isTeacher ? '学员状态' : isSuperAdmin ? '样例状态' : '会员状态'} value={profile.membership_status} />
                <Tag color="processing">Backend Connected</Tag>
              </Space>
            ) : null}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={isTeacher ? '教学数据摘要' : isSuperAdmin ? '治理数据摘要' : '当前数据摘要'} className="module-card">
            <Space direction="vertical" size={20} className="full-width">
              <Statistic title={isTeacher ? '负责课程' : isSuperAdmin ? '业务预览' : '已报名课程'} value={studentCourses.length} />
              <Statistic title={isTeacher ? '可见课程目录' : isSuperAdmin ? '课程目录数' : '课程目录数'} value={courses.length} />
              <Statistic title={isTeacher ? '教学通知' : isSuperAdmin ? '订单预览' : '订单记录'} value={isTeacher ? 6 : orders.length} />
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={isTeacher ? '教学待办' : isSuperAdmin ? '治理待办' : '待办与备注'} className="module-card">
            <Space direction="vertical" size={14}>
              <List
                size="small"
                dataSource={todoItems}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title={isTeacher ? '当前教师端元信息' : isSuperAdmin ? '当前治理端元信息' : '当前框架元信息'} className="module-card">
        <Descriptions column={{ xs: 1, md: 2, xl: 4 }} size="small">
          <Descriptions.Item label="UI System">Ant Design</Descriptions.Item>
          <Descriptions.Item label="Frontend">React + Vite</Descriptions.Item>
          <Descriptions.Item label="Backend">FastAPI</Descriptions.Item>
          <Descriptions.Item label="Database">PostgreSQL</Descriptions.Item>
        </Descriptions>
      </Card>

      <PlaceholderBoard
        title={isTeacher ? '我的课程预览' : '已报名课程预览'}
        description={
          isTeacher
            ? '这个区块保留实时接口数据，用来确认教师工作台和后端联调可用。'
            : '这个区块保留实时接口数据，用来确认后台框架和后端联调可用。'
        }
        columns={['课程', '教师 / 班级', '状态', '进度']}
        rows={studentCourses.map((course) => [
          course.course_name,
          `${course.teacher ?? 'TBD'} / ${course.class_name ?? 'Unassigned'}`,
          course.service_status,
          `${course.lesson_progress} lessons`,
        ])}
      />

      <PlaceholderBoard
        title={isTeacher ? '教学课程目录预览' : '课程目录预览'}
        description={
          isTeacher
            ? '这里只作为教师端首页预览区，后续真实教学页会接课堂记录和作业处理。'
            : '这里只作为后台首页的预览区，真正管理页在课程中心。'
        }
        columns={['课程', '教师', '状态', '价格']}
        rows={courses.map((course) => [
          course.name,
          course.teacher,
          course.status,
          `JPY ${course.price.toLocaleString()}`,
        ])}
      />
    </ModuleFrame>
  );
}
