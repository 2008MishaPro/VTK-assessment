import { fetchPersonalSchedule } from "./personal-schedule";
import { fetchGeneralSchedule, fetchFilteredSchedule } from "./general-schedule";

// Реэкспортируем функции для обратной совместимости
export const fetchDataScheduleOnly = fetchPersonalSchedule;

// Экспортируем все функции для использования в приложении
export {
  fetchPersonalSchedule,
  fetchGeneralSchedule,
  fetchFilteredSchedule
};
