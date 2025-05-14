import { API_URL } from "../GetUserLogin.ts";
import { getUserToken } from "../../localStore/LocalStore.ts";

export const fetchGeneralSchedule = async (
  filterName?: string,
  filterId?: string | null
): Promise<any> => {
  try {
    const token = getUserToken();
    
    // Используем предоставленный код для запроса
    const response = await fetch(
      `${API_URL}/schedule-all?filter[${filterName}]=${filterId}`, 
      { 
        method: "GET", 
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json", 
        }, 
      }
    );
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении общего расписания:', error);
    return { schedules: [] };
  }
};

// Функция для получения общего расписания с несколькими фильтрами
export const fetchFilteredSchedule = async (
  groupId?: string | null,
  cabinetId?: string | null,
  teacherId?: string | null
): Promise<any> => {
  try {
    const token = getUserToken();
    let url = `${API_URL}/schedule-all`;
    
    // Создаем объект с параметрами запроса
    const params = new URLSearchParams();
    if (groupId) params.append('filter[group_id]', groupId);
    if (cabinetId) params.append('filter[cabinet_id]', cabinetId);
    if (teacherId) params.append('filter[teacher_id]', teacherId);
    
    // Добавляем параметры к URL, если они есть
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении общего расписания:', error);
    return { schedules: [] };
  }
};