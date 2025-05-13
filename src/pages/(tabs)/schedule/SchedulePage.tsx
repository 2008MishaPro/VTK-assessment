import { useEffect, useState } from 'react';
import { fetchDataScheduleOnly } from "../../../API/schedule-api/schedule.ts";

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

export const SchedulePage = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        // Предполагаем, что fetchDataScheduleOnly возвращает Promise<ScheduleData>
        // Если она не асинхронная, то useEffect все равно полезен для выполнения действия один раз
        const data = await fetchDataScheduleOnly(); // или .then() синтаксис
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
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после монтирования

  if (loading) {
    return <div>Загрузка расписания...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!scheduleData || !scheduleData.schedules || scheduleData.schedules.length === 0) {
    return <div>Расписание не загружено или нет занятий.</div>;
  }

  // Группируем занятия по дате
  const groupedByDate = scheduleData.schedules.reduce<GroupedSchedule>((acc, schedule) => {
    const { date, day_of_week } = schedule;
    if (!acc[date]) {
      acc[date] = { day_of_week, entries: [] };
    }
    acc[date].entries.push(schedule);
    return acc;
  }, {});

  return (
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Расписание занятий</h1>
        {Object.entries(groupedByDate).map(([date, { day_of_week, entries }]) => (
            <div key={date} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h2 style={{ marginTop: '0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                {date} ({day_of_week})
              </h2>
              {entries.map((scheduleItem, index) => (
                  <div
                      // Используем scheduleItem.id если он есть, иначе index + другие поля для большей уникальности
                      key={scheduleItem.id || `${date}-${scheduleItem.schedule_call.para}-${index}`}
                      style={{
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        borderTop: index > 0 ? '1px dashed #ddd' : 'none',
                        marginLeft: '10px'
                      }}
                  >
                    <p style={{ margin: '5px 0' }}>
                      <strong>Время:</strong> {scheduleItem.schedule_call.para} пара ({scheduleItem.schedule_call.time})
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Предмет:</strong> {scheduleItem.lesson}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Преподаватель:</strong> {scheduleItem.teacher}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Кабинет:</strong> {scheduleItem.cabinet}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Группа:</strong> {scheduleItem.group}
                    </p>
                  </div>
              ))}
            </div>
        ))}
      </div>
  );
};