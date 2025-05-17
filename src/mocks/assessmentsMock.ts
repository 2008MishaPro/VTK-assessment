import { SubjectData } from '../pages/(tabs)/assessments/types';

// Моки оценок по семестрам
export const assessmentsMockData: Record<string, SubjectData[]> = {
  '1-2024': [
    {
      key: '1',
      subject: 'Русский язык',
      type: 'Экзамен',
      grade: 'Хорошо',
    },
    {
      key: '2',
      subject: 'Литература',
      type: 'Зачёт',
      grade: 'Отлично',
    },
    {
      key: '3',
      subject: 'Математика',
      type: 'Экзамен',
      grade: 'Отлично',
    },
    {
      key: '4',
      subject: 'Физика',
      type: 'Экзамен',
      grade: 'Удовлетворительно',
    },
    {
      key: '5',
      subject: 'Английский язык',
      type: 'Зачёт',
      grade: 'Хорошо',
    },
    {
      key: '6',
      subject: 'Информатика',
      type: 'Экзамен',
      grade: 'Отлично',
    },
    {
      key: '7',
      subject: 'История',
      type: 'Зачёт',
      grade: 'Хорошо',
    },
  ],
  '2-2025': [
    {
      key: '8',
      subject: 'Химия',
      type: 'Экзамен',
      grade: 'Удовлетворительно',
    },
    {
      key: '9',
      subject: 'Биология',
      type: 'Зачёт',
      grade: 'Отлично',
    },
    {
      key: '10',
      subject: 'География',
      type: 'Зачёт',
      grade: 'Хорошо',
    },
    {
      key: '11',
      subject: 'Программирование',
      type: 'Экзамен',
      grade: 'Отлично',
    },
    {
      key: '12',
      subject: 'Базы данных',
      type: 'Экзамен',
      grade: 'Хорошо',
    },
    {
      key: '13',
      subject: 'Веб-разработка',
      type: 'Зачёт',
      grade: 'Отлично',
    },
    {
      key: '14',
      subject: 'Операционные системы',
      type: 'Экзамен',
      grade: 'Хорошо',
    },
    {
      key: '15',
      subject: 'Компьютерные сети',
      type: 'Экзамен',
      grade: 'Хорошо',
    },
    {
      key: '16',
      subject: 'Информационная безопасность',
      type: 'Зачёт',
      grade: 'Отлично',
    },
    {
      key: '17',
      subject: 'Проектирование ПО',
      type: 'Экзамен',
      grade: 'Отлично',
    },
    {
      key: '18',
      subject: 'Мобильная разработка',
      type: 'Зачёт',
      grade: 'Хорошо',
    },
  ],
};