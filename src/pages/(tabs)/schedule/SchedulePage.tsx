import { useEffect, useState } from 'react';
import { fetchDataScheduleOnly } from "../../../API/schedule-api/schedule.ts";
import { Card, Typography, Spin, Alert, Tag, Space, Divider, Row, Col, Timeline, Tabs } from 'antd';
import { ClockCircleOutlined, BookOutlined, UserOutlined, HomeOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';

// Определим типы (оставляем из предыдущего примера для ясности)
interface ScheduleCall {
  para: string;
  time: string;
}

interface ScheduleEntry {
  date: string;
  day_of_week: string;
  group: string;
  cabinet: string;
  lesson: string;
  teacher: string;
  schedule_call: ScheduleCall;
  id?: string | number; // Для уникального ключа, если есть
}

interface ScheduleData {
  schedules: ScheduleEntry[];
}

// Тип для сгруппированных данных
interface GroupedSchedule {
  [date: string]: {
    day_of_week: string;
    entries: ScheduleEntry[];
  };
}

// Добавляем интерфейс для группировки по неделям
interface WeeklyGroupedSchedule {
  [weekNumber: string]: {
    dates: {
      [date: string]: {
        day_of_week: string;
        entries: ScheduleEntry[];
      }
    }
  }
}

export const SchedulePage = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDataScheduleOnly();
        setScheduleData(data);
        console.log("Fetched data:", data);
      } catch (err) {
        console.error("Failed to fetch schedule data:", err);
        setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке расписания");
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Загрузка расписания..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Ошибка"
        description={error}
        type="error"
        showIcon
        style={{ maxWidth: '800px', margin: '20px auto' }}
      />
    );
  }

  if (!scheduleData || !scheduleData.schedules || scheduleData.schedules.length === 0) {
    return (
      <Alert
        message="Нет данных"
        description="Расписание не загружено или нет занятий."
        type="info"
        showIcon
        style={{ maxWidth: '800px', margin: '20px auto' }}
      />
    );
  }

  // Функция для определения номера недели из даты
  const getWeekNumber = (dateStr: string) => {
    const date = new Date(dateStr.split('.').reverse().join('-'));
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Группируем занятия по неделям и датам
  const groupedByWeek = scheduleData.schedules.reduce<WeeklyGroupedSchedule>((acc, schedule) => {
    const { date, day_of_week } = schedule;
    const weekNumber = `Неделя ${getWeekNumber(date)}`;
    
    if (!acc[weekNumber]) {
      acc[weekNumber] = { dates: {} };
    }
    
    if (!acc[weekNumber].dates[date]) {
      acc[weekNumber].dates[date] = { day_of_week, entries: [] };
    }
    
    acc[weekNumber].dates[date].entries.push(schedule);
    return acc;
  }, {});

  // Функция для определения цвета тега в зависимости от предмета
  const getLessonTagColor = (lesson: string) => {
    const colors = ['blue', 'green', 'purple', 'magenta', 'cyan', 'orange', 'geekblue'];
    // Простой хеш для определения цвета на основе названия предмета
    const hash = lesson.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Цвета для дней недели
  const dayColors: Record<string, string> = {
    'Понедельник': 'blue',
    'Вторник': 'cyan',
    'Среда': 'green',
    'Четверг': 'orange',
    'Пятница': 'purple',
    'Суббота': 'magenta',
    'Воскресенье': 'red'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Typography.Title level={1} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Расписание занятий
      </Typography.Title>
      
      <Tabs
        type="card"
        items={Object.entries(groupedByWeek).map(([weekNumber, { dates }]) => ({
          key: weekNumber,
          label: (
            <Space>
              <CalendarOutlined />
              {weekNumber}
            </Space>
          ),
          children: (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {Object.entries(dates).map(([date, { day_of_week, entries }]) => (
                <Card 
                  key={date}
                  title={
                    <Typography.Title level={2} style={{ margin: 0, color: dayColors[day_of_week] || 'blue' }}>
                      {day_of_week}
                    </Typography.Title>
                  }
                  bordered={true}
                  style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                  <Divider orientation="left">
                    <Space>
                      <CalendarOutlined />
                      <Typography.Text strong>{date}</Typography.Text>
                    </Space>
                  </Divider>
                  
                  <Timeline>
                    {entries.map((scheduleItem, index) => (
                      <Timeline.Item 
                        key={scheduleItem.id || `${date}-${scheduleItem.schedule_call.para}-${index}`}
                        color={getLessonTagColor(scheduleItem.lesson)}
                        dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
                      >
                        <Card 
                          size="small" 
                          style={{ 
                            marginBottom: '10px',
                            borderLeft: `3px solid ${getLessonTagColor(scheduleItem.lesson)}`,
                            backgroundColor: '#fafafa'
                          }}
                        >
                          <Row gutter={[16, 8]}>
                            <Col span={24}>
                              <Space>
                                <Tag color="volcano">{scheduleItem.schedule_call.para} пара</Tag>
                                <Typography.Text strong>{scheduleItem.schedule_call.time}</Typography.Text>
                              </Space>
                            </Col>
                            
                            <Col span={24}>
                              <Typography.Title level={4} style={{ margin: '8px 0' }}>
                                <BookOutlined style={{ marginRight: '8px' }} />
                                {scheduleItem.lesson}
                              </Typography.Title>
                            </Col>
                            
                            <Col xs={24} md={8}>
                              <Typography.Text>
                                <UserOutlined style={{ marginRight: '8px' }} />
                                <strong>Преподаватель:</strong> {scheduleItem.teacher}
                              </Typography.Text>
                            </Col>
                            
                            <Col xs={24} md={8}>
                              <Typography.Text>
                                <HomeOutlined style={{ marginRight: '8px' }} />
                                <strong>Кабинет:</strong> {scheduleItem.cabinet}
                              </Typography.Text>
                            </Col>
                            
                            <Col xs={24} md={8}>
                              <Typography.Text>
                                <TeamOutlined style={{ marginRight: '8px' }} />
                                <strong>Группа:</strong> {scheduleItem.group}
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Card>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              ))}
            </Space>
          )
        }))}
      />
    </div>
  );
};