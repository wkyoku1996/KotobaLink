import { Alert, Button, Card, Empty, Input, List, Select, Space, Tag, Tree, Typography, message } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../auth/AuthProvider';
import { ModuleFrame } from '../components/ModuleFrame';
import { useMaterialData } from '../hooks/useMaterialData';
import {
  MEDIA_BASE_URL,
  fetchMaterialReleaseVersionDetail,
  fetchMaterialReleaseVersions,
  fetchPackageTemplate,
  getPackageTemplateExportUrl,
  savePackageTemplate,
  type PackageTemplateContent,
  type PackageTemplateDocument,
  type PackageTemplateResource,
  type PackageTemplateUnit,
} from '../lib/api';

type EditorNode =
  | { kind: 'material'; materialId: string }
  | { kind: 'unit'; materialId: string; unitId: string }
  | { kind: 'content'; materialId: string; unitId: string; contentId: string }
  | { kind: 'resource'; materialId: string; unitId: string; contentId: string; assetId: string };

type ContentLibraryItem = {
  content: PackageTemplateContent;
  sourceUnit: PackageTemplateUnit;
  resources: PackageTemplateResource[];
  preview: string;
};

type PendingChange = {
  id: string;
  label: string;
  kind: 'added' | 'updated' | 'deleted' | 'reordered' | 'assigned';
};

function toNodeKey(node: EditorNode) {
  switch (node.kind) {
    case 'material':
      return `material:${node.materialId}`;
    case 'unit':
      return `unit:${node.materialId}:${node.unitId}`;
    case 'content':
      return `content:${node.materialId}:${node.unitId}:${node.contentId}`;
    case 'resource':
      return `resource:${node.materialId}:${node.unitId}:${node.contentId}:${node.assetId}`;
  }
}

function parseNodeKey(key: string): EditorNode | null {
  const parts = key.split(':');
  if (parts[0] === 'material' && parts.length === 2) {
    return { kind: 'material', materialId: parts[1] };
  }
  if (parts[0] === 'unit' && parts.length === 3) {
    return { kind: 'unit', materialId: parts[1], unitId: parts[2] };
  }
  if (parts[0] === 'content' && parts.length === 4) {
    return { kind: 'content', materialId: parts[1], unitId: parts[2], contentId: parts[3] };
  }
  if (parts[0] === 'resource' && parts.length === 5) {
    return { kind: 'resource', materialId: parts[1], unitId: parts[2], contentId: parts[3], assetId: parts[4] };
  }
  return null;
}

function cloneDocument(document: PackageTemplateDocument) {
  return structuredClone(document);
}

function getPrimaryCourse(document: PackageTemplateDocument | null) {
  return document?.courses[0] ?? null;
}

function findUnit(document: PackageTemplateDocument, unitId: string) {
  return getPrimaryCourse(document)?.units.find((unit) => unit.id === unitId) ?? null;
}

function findContent(document: PackageTemplateDocument, unitId: string, contentId: string) {
  return findUnit(document, unitId)?.contents.find((content) => content.id === contentId) ?? null;
}

function getResourceLinks(content: PackageTemplateContent) {
  return content.resources;
}

function createPreview(content: PackageTemplateContent) {
  const value = content.data;
  if (!value || typeof value !== 'object') {
    return '暂无内容摘要';
  }

  if ('text' in value && typeof value.text === 'string' && value.text.trim()) {
    return value.text.slice(0, 80);
  }
  if ('prompt' in value && typeof value.prompt === 'string' && value.prompt.trim()) {
    return value.prompt.slice(0, 80);
  }
  if ('items' in value && Array.isArray(value.items)) {
    return `包含 ${value.items.length} 项内容`;
  }
  if ('points' in value && Array.isArray(value.points)) {
    return `包含 ${value.points.length} 条语法点`;
  }
  if ('tasks' in value && Array.isArray(value.tasks)) {
    return `包含 ${value.tasks.length} 项作业`;
  }
  return '查看详情了解此内容';
}

function renumberUnits(document: PackageTemplateDocument) {
  const course = getPrimaryCourse(document);
  if (!course) {
    return;
  }
  course.units.forEach((unit, index) => {
    unit.sort_order = index + 1;
  });
}

function renumberContents(unit: PackageTemplateUnit) {
  unit.contents.forEach((content, index) => {
    content.sort_order = index + 1;
  });
}

function getMaterialStatusLabel(status: string) {
  switch (status) {
    case 'published':
      return '已发布';
    case 'draft':
      return '编辑中';
    default:
      return status;
  }
}

function getMaterialStatusColor(status: string) {
  switch (status) {
    case 'published':
      return 'green';
    case 'draft':
      return 'gold';
    default:
      return 'default';
  }
}

function getContentTypeLabel(type: string) {
  switch (type) {
    case 'article':
      return '课文';
    case 'dialogue':
      return '对话 / 音频';
    case 'vocabulary':
      return '词汇';
    case 'grammar':
      return '语法';
    case 'exercise':
      return '习题';
    case 'homework':
      return '作业';
    case 'resource':
      return '资料';
    case 'expression':
      return '表达';
    case 'reading':
      return '阅读';
    case 'image':
      return '图片';
    default:
      return type;
  }
}

function getContentTypeColor(type: string) {
  switch (type) {
    case 'article':
      return 'cyan';
    case 'dialogue':
      return 'blue';
    case 'vocabulary':
      return 'geekblue';
    case 'grammar':
      return 'purple';
    case 'exercise':
      return 'orange';
    case 'homework':
      return 'magenta';
    case 'resource':
      return 'gold';
    case 'expression':
      return 'lime';
    case 'reading':
      return 'green';
    case 'image':
      return 'volcano';
    default:
      return 'default';
  }
}

function getResourceTypeLabel(type: string) {
  switch (type) {
    case 'audio':
      return '音频';
    case 'pdf':
      return 'PDF';
    case 'image':
      return '图片';
    case 'video':
      return '视频';
    case 'svg':
      return '图卡';
    default:
      return type;
  }
}

function getResourceTypeColor(type: string) {
  switch (type) {
    case 'audio':
      return 'blue';
    case 'pdf':
      return 'red';
    case 'image':
      return 'purple';
    case 'video':
      return 'cyan';
    case 'svg':
      return 'volcano';
    default:
      return 'default';
  }
}

function getStringValue(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function getObjectArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === 'object') as Array<Record<string, unknown>> : [];
}

function renderContentDetail(content: PackageTemplateContent) {
  const data = content.data;
  const text = getStringValue(data.text);
  const translation = getStringValue(data.translation);
  const transcript = getStringValue(data.transcript);
  const prompt = getStringValue(data.prompt);

  if (content.type === 'article' || content.type === 'reading') {
    return (
      <div className="materials-detail-section">
        {text ? <Typography.Paragraph className="materials-detail-paragraph">{text}</Typography.Paragraph> : null}
        {translation ? (
          <div className="materials-detail-block">
            <Typography.Text type="secondary">参考释义</Typography.Text>
            <Typography.Paragraph className="materials-detail-paragraph">{translation}</Typography.Paragraph>
          </div>
        ) : null}
      </div>
    );
  }

  if (content.type === 'dialogue') {
    return (
      <div className="materials-detail-section">
        {transcript ? (
          <div className="materials-detail-block">
            <Typography.Text type="secondary">对话内容</Typography.Text>
            <Typography.Paragraph className="materials-detail-paragraph">{transcript}</Typography.Paragraph>
          </div>
        ) : null}
        {translation ? (
          <div className="materials-detail-block">
            <Typography.Text type="secondary">参考释义</Typography.Text>
            <Typography.Paragraph className="materials-detail-paragraph">{translation}</Typography.Paragraph>
          </div>
        ) : null}
      </div>
    );
  }

  if (content.type === 'vocabulary') {
    const items = getObjectArray(data.items);
    return (
      <div className="materials-detail-section">
        {items.map((item, index) => (
          <div key={`${content.id}-vocab-${index}`} className="materials-detail-block">
            <Space wrap>
              <Typography.Text strong>{getStringValue(item.word) ?? '未命名词汇'}</Typography.Text>
              {getStringValue(item.reading) ? <Tag>{getStringValue(item.reading)}</Tag> : null}
            </Space>
            {getStringValue(item.meaning) ? (
              <Typography.Paragraph className="materials-detail-paragraph">
                释义：{getStringValue(item.meaning)}
              </Typography.Paragraph>
            ) : null}
            {getStringValue(item.example) ? (
              <Typography.Paragraph className="materials-detail-paragraph materials-detail-example">
                例句：{getStringValue(item.example)}
              </Typography.Paragraph>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (content.type === 'grammar') {
    const points = getObjectArray(data.points);
    return (
      <div className="materials-detail-section">
        {points.map((point, index) => (
          <div key={`${content.id}-grammar-${index}`} className="materials-detail-block">
            <Typography.Text strong>{getStringValue(point.pattern) ?? '未命名语法点'}</Typography.Text>
            {getStringValue(point.meaning) ? (
              <Typography.Paragraph className="materials-detail-paragraph">
                用法：{getStringValue(point.meaning)}
              </Typography.Paragraph>
            ) : null}
            {getStringValue(point.explanation) ? (
              <Typography.Paragraph className="materials-detail-paragraph">
                说明：{getStringValue(point.explanation)}
              </Typography.Paragraph>
            ) : null}
            {Array.isArray(point.examples) && point.examples.length > 0 ? (
              <div className="materials-detail-sublist">
                <Typography.Text type="secondary">例句</Typography.Text>
                {point.examples.map((example, exampleIndex) => (
                  <Typography.Paragraph key={`${content.id}-grammar-example-${exampleIndex}`} className="materials-detail-paragraph materials-detail-example">
                    {String(example)}
                  </Typography.Paragraph>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (content.type === 'exercise') {
    const questions = getObjectArray(data.questions);
    return (
      <div className="materials-detail-section">
        {prompt ? (
          <div className="materials-detail-block">
            <Typography.Text type="secondary">练习说明</Typography.Text>
            <Typography.Paragraph className="materials-detail-paragraph">{prompt}</Typography.Paragraph>
          </div>
        ) : null}
        {questions.length > 0 ? (
          <div className="materials-detail-sublist">
            <Typography.Text type="secondary">题目列表</Typography.Text>
            {questions.map((question, index) => (
              <div key={`${content.id}-question-${index}`} className="materials-detail-block">
                <Typography.Text strong>第 {index + 1} 题</Typography.Text>
                {getStringValue(question.prompt) ? (
                  <Typography.Paragraph className="materials-detail-paragraph">
                    {getStringValue(question.prompt)}
                  </Typography.Paragraph>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (content.type === 'homework') {
    const tasks = getObjectArray(data.tasks);
    return (
      <div className="materials-detail-section">
        {tasks.map((task, index) => (
          <div key={`${content.id}-task-${index}`} className="materials-detail-block">
            <Typography.Text strong>{getStringValue(task.title) ?? `作业 ${index + 1}`}</Typography.Text>
            {getStringValue(task.description) ? (
              <Typography.Paragraph className="materials-detail-paragraph">
                {getStringValue(task.description)}
              </Typography.Paragraph>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (content.type === 'expression') {
    const expressions = getObjectArray(data.expressions);
    return (
      <div className="materials-detail-section">
        {expressions.map((item, index) => (
          <div key={`${content.id}-expression-${index}`} className="materials-detail-block">
            <Typography.Paragraph className="materials-detail-paragraph">
              {getStringValue(item.text) ?? `表达 ${index + 1}`}
            </Typography.Paragraph>
          </div>
        ))}
      </div>
    );
  }

  if (content.type === 'resource') {
    const items = getObjectArray(data.items);
    return (
      <div className="materials-detail-section">
        {items.map((item, index) => (
          <div key={`${content.id}-resource-${index}`} className="materials-detail-block">
            <Typography.Text strong>{getStringValue(item.title) ?? `资料 ${index + 1}`}</Typography.Text>
            {getStringValue(item.description) ? (
              <Typography.Paragraph className="materials-detail-paragraph">
                {getStringValue(item.description)}
              </Typography.Paragraph>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="materials-detail-block">
      <Typography.Paragraph className="materials-detail-paragraph">
        {createPreview(content)}
      </Typography.Paragraph>
    </div>
  );
}

export function TeachingMaterialsPage() {
  const { user } = useAuth();
  const { library, loading, error, reload } = useMaterialData();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [document, setDocument] = useState<PackageTemplateDocument | null>(null);
  const [baselineDocument, setBaselineDocument] = useState<PackageTemplateDocument | null>(null);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [libraryKeyword, setLibraryKeyword] = useState('');
  const [libraryType, setLibraryType] = useState<string>('all');
  const [libraryUnit, setLibraryUnit] = useState<string>('all');
  const [selectedLibraryItemId, setSelectedLibraryItemId] = useState<string | null>(null);
  const [draggingLibraryItemId, setDraggingLibraryItemId] = useState<string | null>(null);
  const [dragOverNodeKey, setDragOverNodeKey] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([]);

  const isTeacher = user?.role === 'teacher';

  useEffect(() => {
    if (!selectedMaterialId && library.length > 0) {
      setSelectedMaterialId(library[0].id);
    }
  }, [library, selectedMaterialId]);

  useEffect(() => {
    if (!selectedMaterialId) {
      return;
    }

    let active = true;
    setDocumentLoading(true);
    setDocumentError(null);

    fetchPackageTemplate(selectedMaterialId)
      .then((nextDocument) => {
        if (!active) {
          return;
        }
        setDocument(nextDocument);
        setBaselineDocument(cloneDocument(nextDocument));
        setSelectedNodeKey(toNodeKey({ kind: 'material', materialId: nextDocument.id }));
        setSelectedLibraryItemId(null);
        setPendingChanges([]);
        setDocumentLoading(false);
      })
      .catch((nextError) => {
        if (!active) {
          return;
        }
        setDocument(null);
        setDocumentError(nextError instanceof Error ? nextError.message : 'Unknown error');
        setDocumentLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedMaterialId]);

  const selectedNode = selectedNodeKey ? parseNodeKey(selectedNodeKey) : null;
  const selectedUnit =
    document && selectedNode && selectedNode.kind !== 'material'
      ? findUnit(document, selectedNode.unitId)
      : null;
  const selectedContent =
    document && selectedNode && (selectedNode.kind === 'content' || selectedNode.kind === 'resource')
      ? findContent(document, selectedNode.unitId, selectedNode.contentId)
      : null;
  const selectedResource =
    document && selectedNode?.kind === 'resource'
      ? selectedContent?.resources.find((asset) => asset.id === selectedNode.assetId) ?? null
      : null;

  const targetUnit =
    selectedNode?.kind === 'unit' || selectedNode?.kind === 'content' || selectedNode?.kind === 'resource'
      ? selectedUnit
      : null;

  const contentLibrary = useMemo<ContentLibraryItem[]>(() => {
    if (!document) {
      return [];
    }

    return (getPrimaryCourse(document)?.units ?? []).flatMap((unit) =>
      unit.contents.map((content) => ({
        content,
        sourceUnit: unit,
        resources: getResourceLinks(content),
        preview: createPreview(content),
      })),
    );
  }, [document]);

  const changeMap = useMemo(() => {
    return pendingChanges.reduce<Record<string, PendingChange>>((result, current) => {
      result[current.id] = current;
      return result;
    }, {});
  }, [pendingChanges]);

  const materialHasChanges = pendingChanges.length > 0;

  function getChangeToneClass(kind: PendingChange['kind']) {
    switch (kind) {
      case 'added':
        return 'change-tone-added';
      case 'updated':
        return 'change-tone-updated';
      case 'deleted':
        return 'change-tone-deleted';
      case 'reordered':
        return 'change-tone-reordered';
      case 'assigned':
        return 'change-tone-assigned';
    }
  }

  function getNodeChangeTone(node: EditorNode) {
    if (node.kind === 'material') {
      return materialHasChanges ? 'change-tone-updated' : '';
    }

    if (node.kind === 'unit') {
      const directChange = changeMap[toNodeKey(node)];
      if (directChange) {
        return getChangeToneClass(directChange.kind);
      }

      const childPrefix = `:${node.unitId}:`;
      const childChange = pendingChanges.find((change) => change.id.includes(childPrefix));
      return childChange ? getChangeToneClass(childChange.kind) : '';
    }

    if (node.kind === 'content') {
      const change = changeMap[toNodeKey(node)];
      return change ? getChangeToneClass(change.kind) : '';
    }

    return '';
  }

  function getNodeChangeClass(node: EditorNode) {
    if (node.kind === 'material') {
      const tone = getNodeChangeTone(node);
      return materialHasChanges ? `materials-tree-node-changed ${tone}`.trim() : '';
    }

    if (node.kind === 'unit') {
      const unitPrefix = `:${node.unitId}`;
      const hasChanges = pendingChanges.some(
        (change) =>
          change.id === toNodeKey(node) ||
          change.id.includes(`${unitPrefix}:`) ||
          change.label.includes(node.unitId),
      );
      const tone = getNodeChangeTone(node);
      return hasChanges ? `materials-tree-node-changed ${tone}`.trim() : '';
    }

    if (node.kind === 'content') {
      const tone = getNodeChangeTone(node);
      return changeMap[toNodeKey(node)] ? `materials-tree-node-changed ${tone}`.trim() : '';
    }

    return '';
  }

  const treeData = useMemo<TreeDataNode[]>(() => {
    if (!document) {
      return [];
    }

    const makeDropTitle = (label: string, node: EditorNode, accentLabel?: string, accentColor?: string) => {
      const nodeClass = getNodeChangeClass(node);
      const nodeKey = toNodeKey(node);
      const isDropTarget = dragOverNodeKey === nodeKey;

      return (
        <div
          className={`materials-tree-node ${draggingLibraryItemId ? 'materials-tree-node-droppable' : ''} ${isDropTarget ? 'materials-tree-node-drop-target' : ''} ${nodeClass}`}
          onDragEnter={(event) => {
            if (isTeacher || !draggingLibraryItemId) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            setDragOverNodeKey(nodeKey);
          }}
          onDragOver={(event) => {
            if (isTeacher || !draggingLibraryItemId) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = 'copy';
            if (dragOverNodeKey !== nodeKey) {
              setDragOverNodeKey(nodeKey);
            }
          }}
          onDragLeave={(event) => {
            if (isTeacher || !draggingLibraryItemId) {
              return;
            }
            event.stopPropagation();
            if (dragOverNodeKey === nodeKey) {
              setDragOverNodeKey(null);
            }
          }}
          onDrop={(event) => {
            if (isTeacher || !draggingLibraryItemId) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            const dragId = draggingLibraryItemId || event.dataTransfer.getData('text/plain');
            const droppedItem = contentLibrary.find((item) => item.content.id === dragId);
            if (!droppedItem) {
              return;
            }
            assignContentToNode(droppedItem, node);
            setDraggingLibraryItemId(null);
            setDragOverNodeKey(null);
          }}
        >
          <span>{label}</span>
          {accentLabel ? <Tag color={accentColor ?? 'default'}>{accentLabel}</Tag> : null}
        </div>
      );
    };

    return [
      {
        key: toNodeKey({ kind: 'material', materialId: document.id }),
        title: makeDropTitle(document.title, { kind: 'material', materialId: document.id }),
        children: (getPrimaryCourse(document)?.units ?? []).map((unit) => ({
          key: toNodeKey({ kind: 'unit', materialId: document.id, unitId: unit.id }),
          title: makeDropTitle(unit.title, { kind: 'unit', materialId: document.id, unitId: unit.id }),
          children: unit.contents.map((content) => ({
            key: toNodeKey({
              kind: 'content',
              materialId: document.id,
              unitId: unit.id,
              contentId: content.id,
            }),
            title: makeDropTitle(
              `${getContentTypeLabel(content.type)} · ${content.title}`,
              {
                kind: 'content',
                materialId: document.id,
                unitId: unit.id,
                contentId: content.id,
              },
              getContentTypeLabel(content.type),
              getContentTypeColor(content.type),
            ),
            children: getResourceLinks(content).map((asset) => ({
              key: toNodeKey({
                kind: 'resource',
                materialId: document.id,
                unitId: unit.id,
                contentId: content.id,
                assetId: asset.id,
              }),
              title: `${getResourceTypeLabel(asset.resource_type)} · ${asset.file_name}`,
              isLeaf: true,
            })),
          })),
        })),
      },
    ];
  }, [changeMap, contentLibrary, document, dragOverNodeKey, draggingLibraryItemId, isTeacher, materialHasChanges, pendingChanges]);

  const filteredLibrary = useMemo(() => {
    const keyword = libraryKeyword.trim().toLowerCase();
    return contentLibrary.filter((item) => {
      const matchType = libraryType === 'all' || item.content.type === libraryType;
      const matchUnit = libraryUnit === 'all' || item.sourceUnit.id === libraryUnit;
      const matchKeyword =
        keyword.length === 0 ||
        item.content.title.toLowerCase().includes(keyword) ||
        item.sourceUnit.title.toLowerCase().includes(keyword) ||
        item.preview.toLowerCase().includes(keyword);
      return matchType && matchUnit && matchKeyword;
    });
  }, [contentLibrary, libraryKeyword, libraryType, libraryUnit]);

  const selectedLibraryItem =
    filteredLibrary.find((item) => item.content.id === selectedLibraryItemId) ??
    contentLibrary.find((item) => item.content.id === selectedLibraryItemId) ??
    null;

  function updateDocument(mutator: (draft: PackageTemplateDocument) => void) {
    setDocument((current) => {
      if (!current) {
        return current;
      }
      const draft = cloneDocument(current);
      mutator(draft);
      return draft;
    });
  }

  function registerChange(change: PendingChange) {
    setPendingChanges((current) => {
      const index = current.findIndex((item) => item.id === change.id);
      if (index < 0) {
        return [change, ...current];
      }

      const next = [...current];
      next[index] = change;
      return next;
    });
  }

  function handleTreeDrop(info: Parameters<NonNullable<TreeProps['onDrop']>>[0]) {
    if (!document) {
      return;
    }

    const dragNode = parseNodeKey(String(info.dragNode.key));
    const dropNode = parseNodeKey(String(info.node.key));
    if (!dragNode || !dropNode) {
      return;
    }

    if (dragNode.kind === 'unit' && dropNode.kind === 'unit' && dragNode.materialId === dropNode.materialId) {
      updateDocument((draft) => {
        const course = getPrimaryCourse(draft);
        if (!course) {
          return;
        }
        const dragIndex = course.units.findIndex((unit) => unit.id === dragNode.unitId);
        const dropIndex = course.units.findIndex((unit) => unit.id === dropNode.unitId);
        if (dragIndex < 0 || dropIndex < 0) {
          return;
        }
        const [moved] = course.units.splice(dragIndex, 1);
        const targetIndex = info.dropPosition > dropIndex ? dropIndex + 1 : dropIndex;
        course.units.splice(targetIndex, 0, moved);
        renumberUnits(draft);
      });
      registerChange({
        id: toNodeKey({ kind: 'material', materialId: dragNode.materialId }),
        label: `已调整单元顺序：${findUnit(document, dragNode.unitId)?.title ?? dragNode.unitId}`,
        kind: 'reordered',
      });
      return;
    }

    if (
      dragNode.kind === 'content' &&
      dropNode.kind === 'content' &&
      dragNode.materialId === dropNode.materialId &&
      dragNode.unitId === dropNode.unitId
    ) {
      updateDocument((draft) => {
        const unit = findUnit(draft, dragNode.unitId);
        if (!unit) {
          return;
        }
        const dragIndex = unit.contents.findIndex((content) => content.id === dragNode.contentId);
        const dropIndex = unit.contents.findIndex((content) => content.id === dropNode.contentId);
        if (dragIndex < 0 || dropIndex < 0) {
          return;
        }
        const [moved] = unit.contents.splice(dragIndex, 1);
        const targetIndex = info.dropPosition > dropIndex ? dropIndex + 1 : dropIndex;
        unit.contents.splice(targetIndex, 0, moved);
        renumberContents(unit);
      });
      registerChange({
        id: toNodeKey({ kind: 'unit', materialId: dragNode.materialId, unitId: dragNode.unitId }),
        label: `已调整内容顺序：${findUnit(document, dragNode.unitId)?.title ?? dragNode.unitId}`,
        kind: 'reordered',
      });
    }
  }

  function removeCurrent() {
    if (!document || !selectedNode || selectedNode.kind === 'material' || isTeacher) {
      return;
    }

    updateDocument((draft) => {
      const course = getPrimaryCourse(draft);
      if (!course) {
        return;
      }

      if (selectedNode.kind === 'unit') {
        const removedUnit = findUnit(draft, selectedNode.unitId);
        course.units = course.units.filter((unit) => unit.id !== selectedNode.unitId);
        renumberUnits(draft);
        registerChange({
          id: `deleted:${selectedNode.unitId}`,
          label: `已删除单元：${removedUnit?.title ?? selectedNode.unitId}`,
          kind: 'deleted',
        });
        return;
      }

      if (selectedNode.kind === 'content') {
        const unit = findUnit(draft, selectedNode.unitId);
        if (!unit) {
          return;
        }
        const removedContent = unit.contents.find((content) => content.id === selectedNode.contentId);
        unit.contents = unit.contents.filter((content) => content.id !== selectedNode.contentId);
        renumberContents(unit);
        registerChange({
          id: `deleted:${selectedNode.contentId}`,
          label: `已删除内容：${removedContent?.title ?? selectedNode.contentId}`,
          kind: 'deleted',
        });
        return;
      }

      if (selectedNode.kind === 'resource') {
        const content = findContent(draft, selectedNode.unitId, selectedNode.contentId);
        if (!content) {
          return;
        }
        content.resources = content.resources.filter((resource) => resource.id !== selectedNode.assetId);
        registerChange({
          id: toNodeKey({
            kind: 'content',
            materialId: document.id,
            unitId: selectedNode.unitId,
            contentId: selectedNode.contentId,
          }),
          label: `已移除资源：${selectedNode.assetId}`,
          kind: 'updated',
        });
      }
    });
    setSelectedNodeKey(toNodeKey({ kind: 'material', materialId: document.id }));
  }

  function assignContentToNode(item: ContentLibraryItem, node: EditorNode) {
    if (!document || isTeacher) {
      return;
    }

    const unitId =
      node.kind === 'unit'
        ? node.unitId
        : node.kind === 'content'
          ? node.unitId
          : node.kind === 'resource'
            ? node.unitId
            : null;

    if (!unitId) {
      return;
    }

    const copiedContentId = `${item.content.id}-copy-${Date.now()}`;

    updateDocument((draft) => {
      const unit = findUnit(draft, unitId);
      if (!unit) {
        return;
      }

      const copiedContent = structuredClone(item.content);
      copiedContent.id = copiedContentId;
      copiedContent.sort_order = unit.contents.length + 1;
      copiedContent.title =
        unit.id === item.sourceUnit.id ? `${item.content.title}（复制）` : item.content.title;

      unit.contents.push(copiedContent);
      renumberContents(unit);
    });

    registerChange({
      id: toNodeKey({
        kind: 'content',
        materialId: document.id,
        unitId,
        contentId: copiedContentId,
      }),
      label: `已加入内容：${item.content.title}`,
      kind: 'assigned',
    });

    registerChange({
      id: toNodeKey({ kind: 'unit', materialId: document.id, unitId }),
      label: `已向单元加入内容：${item.content.title}`,
      kind: 'updated',
    });

    const targetLabel =
      node.kind === 'unit'
        ? findUnit(document, node.unitId)?.title
        : node.kind === 'content' || node.kind === 'resource'
          ? findUnit(document, node.unitId)?.title
          : document.title;
    messageApi.success(`已把「${item.content.title}」加入 ${targetLabel ?? '当前目录'}`);
  }

  function submitChanges() {
    if (!document || pendingChanges.length === 0) {
      return;
    }
    savePackageTemplate(document.id, document)
      .then((result) => {
        setDocument(result.template);
        setBaselineDocument(cloneDocument(result.template));
        setPendingChanges([]);
        reload();
        messageApi.success(`内容改动已提交，并生成版本 ${result.created_release.version_number}。`);
      })
      .catch((nextError) => {
        messageApi.error(nextError instanceof Error ? nextError.message : '保存失败');
      });
  }

  function resetChanges() {
    if (!baselineDocument) {
      return;
    }

    setDocument(cloneDocument(baselineDocument));
    setPendingChanges([]);
    messageApi.info('已重置到上次确认状态。');
  }

  function resetToInitialVersion() {
    if (!document) {
      return;
    }

    fetchMaterialReleaseVersions(document.id)
      .then((releases) => {
        if (releases.length === 0) {
          messageApi.info('当前内容包还没有历史版本，无法重置到初始版本。');
          return null;
        }
        return fetchMaterialReleaseVersionDetail(document.id, releases[releases.length - 1].id);
      })
      .then((detail) => {
        if (!detail) {
          return;
        }
        const initialTemplate = structuredClone(detail.snapshot_json) as PackageTemplateDocument;
        setDocument(initialTemplate);
        setSelectedNodeKey(toNodeKey({ kind: 'material', materialId: initialTemplate.id }));
        setPendingChanges([
          {
            id: `reset-initial:${initialTemplate.id}`,
            label: `已重置为初始版本：${detail.version_number}`,
            kind: 'updated',
          },
        ]);
        messageApi.success(`已把当前编辑内容重置为初始版本 ${detail.version_number}，提交后会生成新版本。`);
      })
      .catch((nextError) => {
        messageApi.error(nextError instanceof Error ? nextError.message : '重置初始版本失败');
      });
  }

  function assignContentToTarget(item: ContentLibraryItem) {
    if (!document || !targetUnit) {
      return;
    }
    assignContentToNode(item, {
      kind: 'unit',
      materialId: document.id,
      unitId: targetUnit.id,
    });
  }

  const summaryText = (() => {
    if (selectedResource) {
      return `当前选中资源：${selectedResource.file_name}`;
    }
    if (selectedContent) {
      return `当前选中内容：${selectedContent.title}`;
    }
    if (selectedUnit) {
      return `当前目标单元：${selectedUnit.title}`;
    }
    if (document) {
      return `当前内容包：${document.title}`;
    }
    return '选择内容包后查看目录';
  })();

  return (
    <ModuleFrame
      eyebrow="教学内容"
      title={isTeacher ? '教学内容' : '教材内容'}
      compact
      summary="页面收成一个统一编辑台：顶部固定检索，中间三栏编辑，底部固定提交动作。目录继续支持拖拽，内容和资源按业务语义展示。"
      metrics={[
        { label: '内容包总数', value: String(library.length) },
        { label: '当前单元', value: String(getPrimaryCourse(document)?.units.length ?? 0) },
        { label: '内容块', value: String(contentLibrary.length) },
      ]}
    >
      {contextHolder}

      {loading ? <Alert type="info" message="正在读取内容包列表..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`内容包列表加载失败：${error}`} showIcon className="login-alert" /> : null}
      {documentLoading ? <Alert type="info" message="正在读取课程目录..." showIcon className="login-alert" /> : null}
      {documentError ? <Alert type="error" message={`课程目录加载失败：${documentError}`} showIcon className="login-alert" /> : null}
      {pendingChanges.length > 0 ? (
        <Alert
          type="warning"
          showIcon
          className="login-alert"
          message={`当前有 ${pendingChanges.length} 项未提交改动`}
          description="所有已改动节点和它们的上级目录都会直接用背景色高亮；删除项不会再出现在树里，会统一列在右侧改动清单中。"
        />
      ) : null}

      <Card title="课程目录编辑台" extra={<Typography.Text type="secondary">{summaryText}</Typography.Text>} className="module-card materials-workbench-card">
        <div className="materials-workbench">
          <div className="materials-workbench-toolbar">
            <Space wrap className="full-width">
              <Input
                value={libraryKeyword}
                onChange={(event) => setLibraryKeyword(event.target.value)}
                placeholder="检索标题、单元、摘要"
                className="toolbar-input"
              />
              <Select
                value={libraryType}
                onChange={setLibraryType}
                className="toolbar-select"
                options={[
                  { value: 'all', label: '全部类型' },
                  { value: 'article', label: '文章' },
                  { value: 'dialogue', label: '会话 / 音频' },
                  { value: 'vocabulary', label: '词汇' },
                  { value: 'grammar', label: '语法' },
                  { value: 'exercise', label: '习题' },
                  { value: 'homework', label: '作业' },
                  { value: 'resource', label: '资源' },
                ]}
              />
              <Select
                value={libraryUnit}
                onChange={setLibraryUnit}
                className="toolbar-select"
                options={[
                  { value: 'all', label: '全部单元' },
                  ...(getPrimaryCourse(document)?.units.map((unit) => ({ value: unit.id, label: unit.title })) ?? []),
                ]}
              />
            </Space>

            <div className="materials-workbench-toolbar-row">
              <Typography.Text type="secondary" className="materials-library-helper">
                先在中间选中目标单元，再从右侧把内容块拖进去。关联资源会随内容一起带入目录。
              </Typography.Text>
              <Typography.Text type="secondary">当前模式：左侧切内容包，中间调目录，右侧查看内容详情与关联资源。</Typography.Text>
            </div>
          </div>

          <div className="materials-editor-header-row">
            <div className="materials-pane-header materials-pane-header-standalone">
              <Typography.Text strong>内容包列表</Typography.Text>
              <Typography.Text type="secondary">{library.length} 个内容包</Typography.Text>
            </div>
            <div className="materials-pane-header materials-pane-header-standalone">
              <Typography.Text strong>课程目录</Typography.Text>
              <Typography.Text type="secondary">{summaryText}</Typography.Text>
            </div>
            <div className="materials-pane-header materials-pane-header-standalone">
              <Typography.Text strong>内容素材库</Typography.Text>
              <Typography.Text type="secondary">{filteredLibrary.length} 条内容</Typography.Text>
            </div>
            <div className="materials-pane-header materials-pane-header-standalone">
              <Typography.Text strong>内容详情</Typography.Text>
              <Typography.Text type="secondary">
                {selectedLibraryItem ? selectedLibraryItem.content.title : '请选择一个内容块'}
              </Typography.Text>
            </div>
          </div>

          <div className="materials-editor-content-row">
            <div className="materials-pane materials-pane-embedded">
              <div className="materials-pane-scroll">
                <List
                  dataSource={library}
                  renderItem={(item) => (
                    <List.Item
                      className={[
                        'material-list-item',
                        item.id === selectedMaterialId ? 'material-list-item-active' : '',
                        item.id === selectedMaterialId && materialHasChanges
                          ? 'material-list-item-changed change-tone-updated'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setSelectedMaterialId(item.id)}
                    >
                      <Space direction="vertical" size={4} className="full-width">
                        <Space wrap>
                          <Typography.Text strong>{item.title}</Typography.Text>
                          <Tag color={getMaterialStatusColor(item.status)}>
                            {getMaterialStatusLabel(item.status)}
                          </Tag>
                        </Space>
                        <Typography.Text type="secondary">
                          {item.series} / {item.level} / {item.unit_count} 单元 / {item.resource_count} 资源
                        </Typography.Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </div>

            <div className="materials-pane materials-pane-embedded">
              <div className="materials-pane-scroll">
                {document ? (
                  <Tree
                    draggable={!isTeacher && !draggingLibraryItemId}
                    blockNode
                    defaultExpandAll
                    treeData={treeData}
                    selectedKeys={selectedNodeKey ? [selectedNodeKey] : []}
                    onSelect={(keys) => setSelectedNodeKey(String(keys[0] ?? ''))}
                    onDrop={handleTreeDrop}
                  />
                ) : (
                  <Empty description="选择内容包后查看目录" />
                )}
              </div>
            </div>

            <div className="materials-pane materials-pane-embedded materials-editor-panel">
              <div className="materials-library-scroll">
                <List
                  className="materials-library-list"
                  dataSource={filteredLibrary}
                  renderItem={(item) => (
                    <List.Item
                      draggable={!isTeacher}
                      className={[
                        'material-list-item',
                        item.content.id === selectedLibraryItemId ? 'material-list-item-active' : '',
                        (() => {
                          const contentNode = {
                            kind: 'content' as const,
                            materialId: document?.id ?? 'material',
                            unitId: item.sourceUnit.id,
                            contentId: item.content.id,
                          };
                          const tone = getNodeChangeTone(contentNode);
                          return changeMap[toNodeKey(contentNode)]
                            ? `material-list-item-changed ${tone}`.trim()
                            : '';
                        })(),
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onDragStart={(event) => {
                        setDraggingLibraryItemId(item.content.id);
                        event.dataTransfer.effectAllowed = 'copy';
                        event.dataTransfer.setData('text/plain', item.content.id);
                      }}
                      onDragEnd={() => {
                        setDraggingLibraryItemId(null);
                        setDragOverNodeKey(null);
                      }}
                      onClick={() => setSelectedLibraryItemId(item.content.id)}
                      actions={[
                        <Button
                          key="assign"
                          type="link"
                          disabled={!targetUnit || isTeacher}
                          onClick={() => assignContentToTarget(item)}
                        >
                          加入当前单元
                        </Button>,
                      ]}
                    >
                      <Space direction="vertical" size={4} className="full-width">
                        <Space wrap>
                          <Typography.Text strong>{item.content.title}</Typography.Text>
                          <Tag color={getContentTypeColor(item.content.type)}>
                            {getContentTypeLabel(item.content.type)}
                          </Tag>
                          <Tag>{item.sourceUnit.title}</Tag>
                        </Space>
                        <Typography.Text type="secondary">{item.preview}</Typography.Text>
                        <Typography.Text type="secondary">关联资源 {item.resources.length}</Typography.Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </div>

            <div className="materials-pane materials-pane-embedded">
              <Card className="module-card materials-detail-card">
                <div className="materials-detail-scroll">
                  {!selectedLibraryItem ? <Empty description="从左侧选择一个内容块" /> : null}

                  {selectedLibraryItem ? (
                    <Space direction="vertical" size={12} className="full-width">
                      <Space wrap>
                        <Typography.Text strong>{selectedLibraryItem.content.title}</Typography.Text>
                        <Tag color={getContentTypeColor(selectedLibraryItem.content.type)}>
                          {getContentTypeLabel(selectedLibraryItem.content.type)}
                        </Tag>
                        <Tag>{selectedLibraryItem.sourceUnit.title}</Tag>
                      </Space>
                      <Typography.Paragraph className="card-description">
                        {selectedLibraryItem.preview}
                      </Typography.Paragraph>
                      <Typography.Text type="secondary">内容详情：</Typography.Text>
                      {renderContentDetail(selectedLibraryItem.content)}
                      <Typography.Text type="secondary">关联资源：</Typography.Text>
                      <List
                        size="small"
                        dataSource={selectedLibraryItem.resources}
                        renderItem={(asset) => (
                          <List.Item
                            actions={[
                              <Button key="preview" type="link" href={`${MEDIA_BASE_URL}${asset.file_url}`} target="_blank">
                                查看
                              </Button>,
                            ]}
                          >
                            <Space wrap>
                              <Typography.Text>{asset.file_name}</Typography.Text>
                              <Tag color={getResourceTypeColor(asset.resource_type)}>
                                {getResourceTypeLabel(asset.resource_type)}
                              </Tag>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </Space>
                  ) : null}

                  {pendingChanges.length > 0 ? (
                    <>
                      <Typography.Text type="secondary">待提交改动：</Typography.Text>
                      <List
                        size="small"
                        dataSource={pendingChanges}
                        renderItem={(change) => (
                          <List.Item>
                            <Space wrap>
                              <Tag color={getChangeColor(change.kind)}>{getChangeLabel(change.kind)}</Tag>
                              <Typography.Text>{change.label}</Typography.Text>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </>
                  ) : null}
                </div>
              </Card>
            </div>
          </div>

          <div className="materials-workbench-footer">
            <Space wrap>
              <Button onClick={resetChanges} disabled={!baselineDocument || pendingChanges.length === 0 || isTeacher}>
                重置改动{pendingChanges.length > 0 ? ` (${pendingChanges.length})` : ''}
              </Button>
              <Button onClick={resetToInitialVersion} disabled={!document || isTeacher}>
                重置为初始版本
              </Button>
              <Button type="primary" onClick={submitChanges} disabled={pendingChanges.length === 0 || isTeacher}>
                提交改动{pendingChanges.length > 0 ? ` (${pendingChanges.length})` : ''}
              </Button>
              <Button danger onClick={removeCurrent} disabled={!selectedNode || selectedNode.kind === 'material' || isTeacher}>
                删除当前节点
              </Button>
              {document ? (
                <Button href={getPackageTemplateExportUrl(document.id)} target="_blank">
                  导出 JSON
                </Button>
              ) : null}
            </Space>
          </div>
        </div>
      </Card>
    </ModuleFrame>
  );
}

function getChangeLabel(kind: PendingChange['kind']) {
  switch (kind) {
    case 'added':
      return '新增';
    case 'updated':
      return '已修改';
    case 'deleted':
      return '已删除';
    case 'reordered':
      return '已调整';
    case 'assigned':
      return '已分配';
  }
}

function getChangeColor(kind: PendingChange['kind']) {
  switch (kind) {
    case 'added':
      return 'green';
    case 'updated':
      return 'gold';
    case 'deleted':
      return 'red';
    case 'reordered':
      return 'purple';
    case 'assigned':
      return 'blue';
  }
}
