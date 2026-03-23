import { Card, List, Tag, Typography } from 'antd';


type ModuleRoadmapProps = {
  items: string[];
};

export function ModuleRoadmap({ items }: ModuleRoadmapProps) {
  return (
    <Card title="模块规划" extra={<Tag color="processing">{items.length} items</Tag>} className="module-card">
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item}</Typography.Text>
          </List.Item>
        )}
      />
    </Card>
  );
}
