
import React, { useState } from 'react';
import { Table, Typography, Tag, Card, Space, Divider, Select, Row, Col } from 'antd';
import { BookOutlined, CheckCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { SubjectData } from './types';
import { assessmentsMockData } from '../../../mocks/assessmentsMock';

const { Title, Text } = Typography;
const { Option } = Select;

// Функция для определения цвета оценки
const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'Отлично':
      return 'success';
    case 'Хорошо':
      return 'processing';
    case 'Удовлетворительно':
      return 'warning';
    case 'Неудовлетворительно':
      return 'error';
    default:
      return 'default';
  }
};

// Функция для определения числового значения оценки
const getScoreValue = (grade: string): number => {
  switch (grade) {
    case 'Отлично':
      return 5;
    case 'Хорошо':
      return 4;
    case 'Удовлетворительно':
      return 3;
    case 'Неудовлетворительно':
      return 2;
    default:
      return 0;
  }
};

export const AssessmentsPage: React.FC = () => {
  // Доступные семестры
  const semesters = [
    { key: '1-2024', label: '1 семестр 2024-2025' },
    { key: '2-2025', label: '2 семестр 2024-2025' },
  ];
  
  // Состояние для выбранного семестра
  const [selectedSemester, setSelectedSemester] = useState<string>(semesters[0].key);
  
  // Получаем данные для выбранного семестра
  const data = assessmentsMockData[selectedSemester] || [];

  // Добавляем числовые значения оценок
  const dataWithScores = data.map(item => ({
    ...item,
    score: getScoreValue(item.grade)
  }));

  // Вычисляем средний балл
  const averageScore = dataWithScores.length > 0 
    ? dataWithScores.reduce((acc, curr) => acc + curr.score!, 0) / dataWithScores.length
    : 0;
  
  // Определяем количество оценок каждого типа
  const excellentCount = dataWithScores.filter(item => item.grade === 'Отлично').length;
  const goodCount = dataWithScores.filter(item => item.grade === 'Хорошо').length;
  const satisfactoryCount = dataWithScores.filter(item => item.grade === 'Удовлетворительно').length;
  const unsatisfactoryCount = dataWithScores.filter(item => item.grade === 'Неудовлетворительно').length;

  // Определяем колонки таблицы
  const columns: ColumnsType<SubjectData> = [
    {
      title: 'Наименование дисциплины',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Форма контроля',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag icon={type === 'Экзамен' ? <BookOutlined /> : <CheckCircleOutlined />} color={type === 'Экзамен' ? 'blue' : 'green'}>
          {type}
        </Tag>
      ),
      filters: [
        { text: 'Экзамен', value: 'Экзамен' },
        { text: 'Зачёт', value: 'Зачёт' },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
      title: 'Оценка',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade) => (
        <Tag color={getGradeColor(grade)}>
          {grade}
        </Tag>
      ),
      filters: [
        { text: 'Отлично', value: 'Отлично' },
        { text: 'Хорошо', value: 'Хорошо' },
        { text: 'Удовлетворительно', value: 'Удовлетворительно' },
        { text: 'Неудовлетворительно', value: 'Неудовлетворительно' },
      ],
      onFilter: (value, record) => record.grade.indexOf(value as string) === 0,
      sorter: (a, b) => getScoreValue(b.grade) - getScoreValue(a.grade),
      sortDirections: ['descend', 'ascend'],
    },
  ];

  // Обработчик изменения семестра
  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value);
  };

  // Получаем текущий семестр для отображения
  const currentSemester = semesters.find(sem => sem.key === selectedSemester)?.label || '';

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ margin: 0, color: '#2E8B57' }}>
              <BookOutlined style={{ marginRight: 12 }} />
              Успеваемость студента
            </Title>
            <Select 
              value={selectedSemester} 
              onChange={handleSemesterChange}
              style={{ width: 200 }}
            >
              {semesters.map(sem => (
                <Option key={sem.key} value={sem.key}>{sem.label}</Option>
              ))}
            </Select>
          </div>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                size="small" 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    <span>Учебный период</span>
                  </div>
                }
              >
                <Text strong>{currentSemester}</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                size="small" 
                title="Средний балл"
              >
                <Title level={1} style={{ margin: 0, textAlign: 'center', color: averageScore >= 4.5 ? '#52c41a' : averageScore >= 3.5 ? '#1890ff' : averageScore >= 2.5 ? '#faad14' : '#f5222d' }}>
                  {averageScore.toFixed(1)}
                </Title>
              </Card>
            </Col>
            <Col xs={24} md={8} lg={12}>
              <Card size="small" title="Статистика оценок">
                <Row gutter={[8, 8]}>
                  <Col span={6}>
                    <div style={{ textAlign: 'center' }}>
                      <Tag color="success" style={{ fontSize: '16px', padding: '4px 8px' }}>{excellentCount}</Tag>
                      <div><Text>Отлично</Text></div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center' }}>
                      <Tag color="processing" style={{ fontSize: '16px', padding: '4px 8px' }}>{goodCount}</Tag>
                      <div><Text>Хорошо</Text></div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center' }}>
                      <Tag color="warning" style={{ fontSize: '16px', padding: '4px 8px' }}>{satisfactoryCount}</Tag>
                      <div><Text>Удовл.</Text></div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center' }}>
                      <Tag color="error" style={{ fontSize: '16px', padding: '4px 8px' }}>{unsatisfactoryCount}</Tag>
                      <div><Text>Неудовл.</Text></div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card>
          <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false}
            bordered
            title={() => (
              <Title level={4} style={{ margin: 0 }}>
                Результаты промежуточной аттестации - {currentSemester}
              </Title>
            )}
            footer={() => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Всего предметов: {data.length}</Text>
                <Text strong>Средний балл: {averageScore.toFixed(2)}</Text>
              </div>
            )}
            locale={{ emptyText: 'Нет данных за выбранный период' }}
          />
        </Card>
      </Space>
    </div>
  );
};
