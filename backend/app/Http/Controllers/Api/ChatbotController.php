<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = strtolower(trim($validated['message']));

        $responses = [
            'courses' => [
                'patterns' => [
                    '/^(hi|hello|hey)[!. ]*$/',
                    '/^(what|where|how).*(course|courses|subject|subjects)/',
                    '/^(tell me about|show me|list).*(course|courses|subject|subjects)/',
                    '/^(how can i|how do i).*(view|find|access).*(course|courses|subject|subjects)/',
                ],
                'answer' => 'You can view your available courses in the Courses section of the Student Learning Portal.',
            ],

            'schedule' => [
                'patterns' => [
                    '/^(what|where|how).*(schedule|class time|class schedule)/',
                    '/^(show me|check|view).*(schedule|class schedule)/',
                ],
                'answer' => 'You can check your class schedule in the Schedule section.',
            ],

            'assignments' => [
                'patterns' => [
                    '/^(what|where|how).*(assignment|assignments)/',
                    '/^(show me|view|check).*(assignment|assignments)/',
                ],
                'answer' => 'You can view your assignments and submission details in the Assignments section.',
            ],

            'notifications' => [
                'patterns' => [
                    '/^(what|where|how).*(notification|notifications|announcement|announcements)/',
                    '/^(show me|view|check).*(notification|notifications|announcement|announcements)/',
                ],
                'answer' => 'You can check announcements and updates in the Notifications section.',
            ],

            'account' => [
                'patterns' => [
                    '/^(how|where|what).*(login|log in|register|registration|account|password)/',
                    '/^(how can i|how do i).*(login|log in|register|registration)/',
                ],
                'answer' => 'You can access your student account through the login and registration features of the Student Learning Portal.',
            ],
        ];

        foreach ($responses as $topic) {
            foreach ($topic['patterns'] as $pattern) {
                if (preg_match($pattern, $message)) {
                    return response()->json([
                        'reply' => $topic['answer'],
                    ]);
                }
            }
        }

        return response()->json([
            'reply' => config('chatbot.fallback_message'),
        ]);
    }
}
