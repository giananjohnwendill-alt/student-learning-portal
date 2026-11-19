
import { useEffect, useState } from 'react';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from './services/courseService';

import type { Course, CourseFormData } from './types/Course';

const emptyForm: CourseFormData = {
  course_code: '',
  course_title: '',
  description: '',
  instructor: '',
};

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<CourseFormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCourses = async () => {
    try {
      setError('');
      const data = await getCourses();
      setCourses(data);
    } catch {
      setError('Unable to load courses. Check your Laravel server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (editingId !== null) {
        await updateCourse(editingId, form);
      } else {
        await createCourse(form);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadCourses();
    } catch {
      setError('Unable to save course. Please check the information.');
    }
  };

  const handleEdit = (course: Course) => {
    setForm({
      course_code: course.course_code,
      course_title: course.course_title,
      description: course.description ?? '',
      instructor: course.instructor,
    });

    setEditingId(course.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      await deleteCourse(id);
      await loadCourses();
    } catch {
      setError('Unable to delete course.');
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">My Courses</h1>
          <p className="mt-1 text-sm text-[#668091]">
            Manage your enrolled courses
          </p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(true);
          }}
          className="rounded-md bg-[#23566d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#194457]"
        >
          + Add Course
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid gap-4 rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-5 md:grid-cols-2"
        >
          <h2 className="text-lg font-bold md:col-span-2">
            {editingId !== null ? 'Edit Course' : 'Add New Course'}
          </h2>

          <input
            required
            value={form.course_code}
            onChange={(e) =>
              setForm({ ...form, course_code: e.target.value })
            }
            placeholder="Course Code"
            className="rounded-md border border-[#aec5d2] bg-white p-3 text-sm"
          />

          <input
            required
            value={form.course_title}
            onChange={(e) =>
              setForm({ ...form, course_title: e.target.value })
            }
            placeholder="Course Title"
            className="rounded-md border border-[#aec5d2] bg-white p-3 text-sm"
          />

          <input
            required
            value={form.instructor}
            onChange={(e) =>
              setForm({ ...form, instructor: e.target.value })
            }
            placeholder="Instructor"
            className="rounded-md border border-[#aec5d2] bg-white p-3 text-sm"
          />

          <input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description (optional)"
            className="rounded-md border border-[#aec5d2] bg-white p-3 text-sm"
          />

          <div className="flex gap-2 md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-[#23566d] px-5 py-2 text-sm font-semibold text-white"
            >
              {editingId !== null ? 'Update Course' : 'Save Course'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-[#aec5d2] px-5 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-[#668091]">Loading courses...</p>
      ) : courses.length === 0 ? (
        <div className="rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-8 text-center">
          <p className="font-semibold">No courses available.</p>
          <p className="mt-1 text-sm text-[#668091]">
            Click Add Course to create your first course.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-5"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#23566d] text-2xl text-white">
                ▣
              </div>

              <p className="text-xs font-semibold text-[#668091]">
                {course.course_code}
              </p>

              <h2 className="mt-1 font-bold">
                {course.course_title}
              </h2>

              <p className="mt-2 text-sm text-[#668091]">
                {course.instructor}
              </p>

              <p className="mt-2 text-xs text-[#668091]">
                {course.description || 'No description provided.'}
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="rounded-md bg-[#d9e6ed] px-4 py-2 text-xs font-semibold text-[#23566d]"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(course.id)}
                  className="rounded-md bg-red-100 px-4 py-2 text-xs font-semibold text-red-700"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Courses;
