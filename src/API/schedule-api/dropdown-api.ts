import { API_URL } from "../GetUserLogin.ts";
import { getUserToken } from "../../localStore/LocalStore.ts";

// Интерфейс для элементов выпадающего списка
export interface DataItem {
  label: string;
  value: string;
}

// Функция для получения данных из API
export const fetchData = async (url: string): Promise<DataItem[]> => {
  try {
    const token = getUserToken();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    const fetchedData = await response.json();

    // Преобразуем данные в формат для выпадающего списка
    const formattedData = fetchedData.map((item: any) => ({
      label: item.name,
      value: item.id
    }));
    
    return formattedData;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};

// Функция для получения всех данных для выпадающих списков
export const fetchAllData = async (
  firstUrl = `${API_URL}/dropdown/groups`,
  secondUrl = `${API_URL}/dropdown/cabinets`,
  thirdUrl = `${API_URL}/dropdown/teacher`
): Promise<DataItem[][]> => {
  const dataPromises = [
    fetchData(firstUrl),
    fetchData(secondUrl),
    fetchData(thirdUrl)
  ];
  return Promise.all(dataPromises);
};

// Функция для получения общего расписания с фильтрами
export const fetchGeneralSchedule = async (
  groupId?: string | null,
  cabinetId?: string | null,
  teacherId?: string | null
): Promise<any> => {
  try {
    const token = getUserToken();
    let url = `${API_URL}/general-schedule`;
    
    // Создаем объект с параметрами запроса
    const params = new URLSearchParams();
    if (groupId) params.append('group_id', groupId);
    if (cabinetId) params.append('cabinet_id', cabinetId);
    if (teacherId) params.append('teacher_id', teacherId);
    
    // Добавляем параметры к URL, если они есть
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
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