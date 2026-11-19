
export interface Course {
  id: number;
  course_code: string;
  course_title: string;
  description: string | null;
  instructor: string;
  created_at: string;
  updated_at: string;
}

export interface CourseFormData {
  course_code: string;
  course_title: string;
  description: string;
  instructor: string;
}
