import { useEffect, useState } from 'react';
import { fetchPersonalSchedule } from "../../../API/schedule-api/schedule.ts";
import { fetchAllData, DataItem } from "../../../API/schedule-api/dropdown-api.ts";
import { fetchFilteredSchedule } from "../../../API/schedule-api/general-schedule.ts";
import { Card, Typography, Spin, Alert, Tag, Space, Divider, Row, Col, Timeline, Tabs, Button, Radio } from 'antd';
import { ClockCircleOutlined, BookOutlined, UserOutlined, HomeOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import Dropdown from '../../../components/dropdown/DropdownSelect';

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

// Добавляем тип для режима отображения
type ViewMode = 'personal' | 'general';

export const SchedulePage = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Состояния для режима просмотра и фильтров
  const [viewMode, setViewMode] = useState<ViewMode>('personal');
  const [groupData, setGroupData] = useState<DataItem[]>([]);
  const [cabinetData, setCabinetData] = useState<DataItem[]>([]);
  const [teacherData, setTeacherData] = useState<DataItem[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>();
  const [selectedCabinet, setSelectedCabinet] = useState<string | null>();
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>();

  // Загрузка личного расписания
  const loadPersonalSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPersonalSchedule();
      setScheduleData(data);
    } catch (err) {
      console.error("Failed to fetch schedule data:", err);
      setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке расписания");
    } finally {
      setLoading(false);
    }
  };

  // Загрузка общего расписания с фильтрами
  const loadGeneralSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFilteredSchedule(selectedGroup, selectedCabinet, selectedTeacher);
      setScheduleData(data);
      console.log("Загружено общее расписание:", data);
    } catch (err) {
      console.error("Ошибка при загрузке общего расписания:", err);
      setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке общего расписания");
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных для выпадающих списков
  const loadDropdownData = async () => {
    try {
      const [groups, cabinets, teachers] = await fetchAllData();
      setGroupData(groups);
      setCabinetData(cabinets);
      setTeacherData(teachers);
      console.log("Загружены данные для выпадающих списков:", { groups, cabinets, teachers });
    } catch (err) {
      console.error("Ошибка при загрузке данных для выпадающих списков:", err);
      setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке данных для выпадающих списков");
    }
  };

  // Обработчик изменения значения в выпадающем списке
  const handleValueChange = (value: string, name: string) => {
    console.log(`Изменено значение ${name}:`, value);
    switch (name) {
      case 'group_id':
        setSelectedGroup(value);
        break;
      case 'cabinet_id':
        setSelectedCabinet(value);
        break;
      case 'teacher_id':
        setSelectedTeacher(value);
        break;
    }
  };

  // Обработчик переключения режима просмотра
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'personal') {
      loadPersonalSchedule();
    } else {
      // При переключении на общий режим, сначала загружаем данные для выпадающих списков
      loadDropdownData();
      // Затем загружаем общее расписание без фильтров
      setSelectedGroup(null);
      setSelectedCabinet(null);
      setSelectedTeacher(null);
      loadGeneralSchedule();
    }
  };

  // Обработчик нажатия на кнопку применения фильтров
  const handleApplyFilters = () => {
    loadGeneralSchedule();
  };

  // Обработчик очистки всех фильтров
  const handleClearAllFilters = () => {
    setSelectedGroup(null);
    setSelectedCabinet(null);
    setSelectedTeacher(null);
    loadGeneralSchedule();
  };

  // Загрузка данных при первом рендере
  useEffect(() => {
    if (viewMode === 'personal') {
      loadPersonalSchedule();
    } else {
      loadDropdownData();
      loadGeneralSchedule();
    }
  }, []); // Убираем viewMode из зависимостей, чтобы не было циклической загрузки

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

  // Функция для определения эмодзи в зависимости от количества пар
  const getMoodEmoji = (entriesCount: number) => {
    if (entriesCount === 1) return "😊"; // счастливый (1 пара)
    if (entriesCount === 2) return "🙂"; // нейтральный (2 пары)
    if (entriesCount === 3) return "😐"; // слегка грустный (3 пары)
    return "😩"; // очень грустный (4+ пары)
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Typography.Title level={1} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Расписание занятий
      </Typography.Title>
      
      {/* Переключатель режима просмотра */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Radio.Group 
          value={viewMode} 
          onChange={(e) => handleViewModeChange(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="personal">Моё расписание</Radio.Button>
          <Radio.Button value="general">Общее расписание</Radio.Button>
        </Radio.Group>
      </div>
      
      {/* Блок с выпадающими списками для общего расписания */}
      {viewMode === 'general' && (
        <Card 
          style={{ marginBottom: '20px', borderRadius: '8px' }}
          title="Фильтры расписания"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Typography.Text strong>Группа</Typography.Text>
              <Dropdown
                dataInfo={groupData}
                value={selectedGroup}
                setValue={(value) => handleValueChange(value, 'group_id')}
                clearDropdownValue={() => setSelectedGroup(null)}
                placeholder="Выберите группу"
              />
            </Col>
            <Col xs={24} md={8}>
              <Typography.Text strong>Кабинет</Typography.Text>
              <Dropdown
                dataInfo={cabinetData}
                value={selectedCabinet}
                setValue={(value) => handleValueChange(value, 'cabinet_id')}
                clearDropdownValue={() => setSelectedCabinet(null)}
                placeholder="Выберите кабинет"
              />
            </Col>
            <Col xs={24} md={8}>
              <Typography.Text strong>Преподаватель</Typography.Text>
              <Dropdown
                dataInfo={teacherData}
                value={selectedTeacher}
                setValue={(value) => handleValueChange(value, 'teacher_id')}
                clearDropdownValue={() => setSelectedTeacher(null)}
                placeholder="Выберите преподавателя"
              />
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: '16px' }}>
            <Space>
              <Button onClick={handleClearAllFilters}>Сбросить фильтры</Button>
              <Button type="primary" onClick={handleApplyFilters}>Применить</Button>
            </Space>
          </Row>
        </Card>
      )}
      
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
                      <Typography.Text style={{ fontSize: '20px' }}>{getMoodEmoji(entries.length)}</Typography.Text>
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
                                <strong>Группа:</strong> ИС 1-1
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