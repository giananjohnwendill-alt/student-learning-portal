<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // READ - Display all courses
    public function index()
    {
        return response()->json(Course::latest()->get());
    }

    // CREATE - Store a new course
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_code' => 'required|string|max:255|unique:courses,course_code',
            'course_title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructor' => 'required|string|max:255',
        ]);

        $course = Course::create($validated);

        return response()->json([
            'message' => 'Course created successfully.',
            'data' => $course,
        ], 201);
    }

    // READ - Display one course
    public function show(Course $course)
    {
        return response()->json($course);
    }

    // UPDATE - Update an existing course
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'course_code' => 'required|string|max:255|unique:courses,course_code,' . $course->id,
            'course_title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructor' => 'required|string|max:255',
        ]);

        $course->update($validated);

        return response()->json([
            'message' => 'Course updated successfully.',
            'data' => $course,
        ]);
    }

    // DELETE - Remove a course
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully.',
        ]);
    }
}
