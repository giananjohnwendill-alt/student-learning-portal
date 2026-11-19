
import api from '../api';
import type { Course, CourseFormData } from '../types/Course';

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses');
  return response.data;
};

export const createCourse = async (
  data: CourseFormData
): Promise<Course> => {
  const response = await api.post('/courses', data);
  return response.data.data;
};

export const updateCourse = async (
  id: number,
  data: CourseFormData
): Promise<Course> => {
  const response = await api.put(`/courses/${id}`, data);
  return response.data.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/courses/${id}`);
};
