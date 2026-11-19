
import { useState } from 'react'
import Courses from './Courses'

type Page = 'Home' | 'Courses' | 'Schedule' | 'Notifications'

const courses = [
  { name: 'Data Structures and Algorithms 1', instructor: 'Prof. Maria Santos', room: 'Room 301' },
  { name: 'Human-Computer Interaction 1', instructor: 'Prof. John Reyes', room: 'Room 302' },
  { name: 'Information Assurance and Security 1', instructor: 'Prof. Ana Cruz', room: 'Room 305' },
]

const schedules = [
  { day: '20', month: 'OCT', subject: courses[0].name, time: '8:00 AM - 10:00 AM', room: 'Room 301' },
  { day: '20', month: 'OCT', subject: courses[1].name, time: '10:00 AM - 12:00 PM', room: 'Room 302' },
  { day: '20', month: 'OCT', subject: courses[2].name, time: '1:00 PM - 3:00 PM', room: 'Room 305' },
]

const notifications = [
  { day: '20', title: 'Assignment 1 Posted', detail: 'Data Structures and Algorithms 1 · Due Oct 25, 2026.' },
  { day: '21', title: 'Quiz 1 Reminder', detail: 'Data Structures and Algorithms 1.' },
]

function BookLogo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#23566d] text-white">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 6.2C9.8 4.6 6.7 4.2 3 5v13c3.7-.8 6.8-.4 9 1.2 2.2-1.6 5.3-2 9-1.2V5c-3.7-.8-6.8-.4-9 1.2Z" />
        <path d="M12 6.2v13" stroke="#23566d" strokeWidth="1.2" fill="none" />
      </svg>
    </div>
  )
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage] = useState<Page>('Home')
  const [search, setSearch] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [fullName, setFullName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  if (!loggedIn && !isRegistering) {
    return (
      <main className="grid min-h-screen grid-cols-1 bg-[#d9e6ed] md:grid-cols-2">
        <section className="flex min-h-[380px] flex-col justify-between bg-[#23566d] p-8 text-white md:p-12">
          <BookLogo />
          <div className="max-w-md py-10">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Your classes, schedule and submissions in one place
            </h1>
            <p className="mt-5 text-base text-blue-100">
              Check announcement, open courses and hand in assignment before deadline
            </p>
          </div>
          <p className="text-sm text-blue-100">Student Learning Portal</p>
        </section>

        <section className="flex items-center justify-center p-6 md:p-12">
          <form
            onSubmit={(event) => {
              event.preventDefault()

              if (password !== '123456') {
              setLoginError('Incorrect password')
              return
              }

              setLoginError('')
              setLoggedIn(true)
              setPage('Home')
            }}
            className="w-full max-w-[420px] rounded-2xl border border-[#c4d5df] bg-[#f2f6f8] p-7 shadow-sm md:p-9"
          >
            <h2 className="text-2xl font-bold text-[#19313e]">Welcome Back</h2>
            <p className="mb-6 text-sm text-[#506b7b]">Sign in with your student account</p>

            <label className="mb-2 block text-sm font-semibold text-[#19313e]">
              Student ID or email
            </label>
            <input
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="e.g. 2026-0013"
              className="mb-5 w-full rounded-md border border-[#aec5d2] bg-white px-3 py-3 text-sm outline-none focus:border-[#23566d]"
            />

           
<label className="mb-2 block text-sm font-semibold text-[#19313e]">
  Password
</label>

<div className="relative">
  <input
    required
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={event => {
      setPassword(event.target.value)
      setLoginError('')
    }}
    placeholder="Enter your password"
    className={`w-full rounded-md border ${
      loginError ? 'border-red-500' : 'border-[#aec5d2]'
    } bg-white px-3 py-3 pr-12 text-sm outline-none focus:border-[#23566d]`}
  />

  
<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#668091] hover:text-[#23566d]"
  aria-label={showPassword ? 'Hide password' : 'Show password'}
>
  {showPassword ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 002.8 2.8" />
      <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.5 9 7-.3 1-1 2-2 3" />
      <path d="M6.6 6.6C4.5 7.8 3.4 10 3 12c.5 1.8 1.7 3.5 3.4 4.8A9.8 9.8 0 0012 19c1.2 0 2.3-.2 3.3-.7" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )}
</button>

</div>

{loginError && (
  <p className="mt-2 text-xs text-red-500">
    {loginError}
  </p>
)}


            <div className="my-5 flex items-center justify-between text-xs text-[#506b7b]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={event => setRemember(event.target.checked)}
                />
                Remember me
              </label>
              <button type="button" className="font-semibold text-[#23566d]">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#23566d] py-3 text-sm font-semibold text-white transition hover:bg-[#194457]"
            >
              Log In
            </button>

            <p className="mt-6 text-center text-sm text-[#506b7b]">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="font-bold text-[#23566d] hover:underline"
              >
                Create New Account
              </button>
            </p>
          </form>
        </section>
      </main>
    )
  }

  if (!loggedIn && isRegistering) {
    return (
      <main className="grid min-h-screen grid-cols-1 bg-[#d9e6ed] md:grid-cols-2">
        <section className="flex min-h-[380px] flex-col justify-between bg-[#23566d] p-8 text-white md:p-12">
          <BookLogo />
          <div className="max-w-md py-10">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Join the Student Learning Portal
            </h1>
            <p className="mt-5 text-base text-blue-100">
              Create your student account to access your learning portal.
            </p>
          </div>
          <p className="text-sm text-blue-100">Student Learning Portal</p>
        </section>

        <section className="flex items-center justify-center p-6 md:p-12">
          <form
            onSubmit={(event) => {
              event.preventDefault()

              if (password !== confirmPassword) {
                alert('Passwords do not match.')
                return
              }

              setIsRegistering(false)
              setPassword('')
              setConfirmPassword('')
            }}
            className="w-full max-w-[420px] rounded-2xl border border-[#c4d5df] bg-[#f2f6f8] p-7 shadow-sm md:p-9"
          >
            <h2 className="text-2xl font-bold text-[#19313e]">Create Account</h2>
            <p className="mb-6 text-sm text-[#506b7b]">Register as a student</p>

            <label className="mb-2 block text-sm font-semibold text-[#19313e]">Full Name</label>
            <input
              required
              value={fullName}
              onChange={event => setFullName(event.target.value)}
              placeholder="Enter your full name"
              className="mb-4 w-full rounded-md border border-[#aec5d2] bg-white px-3 py-3 text-sm outline-none focus:border-[#23566d]"
            />

            <label className="mb-2 block text-sm font-semibold text-[#19313e]">Student ID</label>
            <input
              required
              value={studentId}
              onChange={event => setStudentId(event.target.value)}
              placeholder="e.g. 2026-0013"
              className="mb-4 w-full rounded-md border border-[#aec5d2] bg-white px-3 py-3 text-sm outline-none focus:border-[#23566d]"
            />

            <label className="mb-2 block text-sm font-semibold text-[#19313e]">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="mb-4 w-full rounded-md border border-[#aec5d2] bg-white px-3 py-3 text-sm outline-none focus:border-[#23566d]"
            />

<label className="mb-2 block text-sm font-semibold text-[#19313e]">
  Password
</label>

<div className="relative mb-4">
  <input
    required
    minLength={8}
    type={showRegisterPassword ? 'text' : 'password'}
    value={password}
    onChange={event => setPassword(event.target.value)}
    placeholder="Create a password"
    className="w-full rounded-md border border-[#aec5d2] bg-white px-3 py-3 pr-12 text-sm outline-none focus:border-[#23566d]"
  />

  <button
    type="button"
    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#668091] hover:text-[#23566d]"
    aria-label={showRegisterPassword ? 'Hide password' : 'Show password'}
  >
    {showRegisterPassword ? (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 002.8 2.8" />
        <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.5 9 7-.3 1-1 2-2 3" />
        <path d="M6.6 6.6C4.5 7.8 3.4 10 3 12c.5 1.8 1.7 3.5 3.4 4.8A9.8 9.8 0 0012 19c1.2 0 2.3-.2 3.3-.7" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )}
  </button>
</div>

            
<label className="mb-2 block text-sm font-semibold text-[#19313e]">
  Confirm Password
</label>

<div className="relative mb-5">
  <input
    required
    minLength={8}
    type={showConfirmPassword ? 'text' : 'password'}
    value={confirmPassword}
    onChange={event => setConfirmPassword(event.target.value)}
    placeholder="Confirm your password"
    className="w-full rounded-md border border-[#aec5d2] bg-white px-3 py-3 pr-12 text-sm outline-none focus:border-[#23566d]"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#668091] hover:text-[#23566d]"
    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
  >
    {showConfirmPassword ? (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 002.8 2.8" />
        <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.5 9 7-.3 1-1 2-2 3" />
        <path d="M6.6 6.6C4.5 7.8 3.4 10 3 12c.5 1.8 1.7 3.5 3.4 4.8A9.8 9.8 0 0012 19c1.2 0 2.3-.2 3.3-.7" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )}
  </button>
</div>


            <button
              type="submit"
              className="w-full rounded-md bg-[#23566d] py-3 text-sm font-semibold text-white transition hover:bg-[#194457]"
            >
              Create Account
            </button>

            <p className="mt-6 text-center text-sm text-[#506b7b]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="font-bold text-[#23566d] hover:underline"
              >
                Log In
              </button>
            </p>
          </form>
        </section>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#d9e6ed] text-[#19313e]">
      <header className="sticky top-0 z-10 border-b border-[#c8d8e0] bg-[#f2f6f8]">
        <nav className="mx-auto flex max-w-[1180px] items-center gap-6 px-5 py-3">
          <BookLogo />
          <div className="flex flex-1 items-center gap-2 overflow-x-auto sm:gap-6">
            {(['Home', 'Courses', 'Schedule', 'Notifications'] as Page[]).map(item => (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition ${
                  page === item
                    ? 'border-[#23566d] text-[#23566d]'
                    : 'border-transparent text-[#315e75] hover:text-[#19313e]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#23566d] text-xs font-semibold text-white">
            JD
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-8">
        {page === 'Home' && (
          <>
            <div className="mb-5 grid gap-5 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#23566d] text-3xl text-white">
                  ♙
                </div>
                <div>
                  <h1>Welcome, {fullName || 'Student'}!</h1>
                  <p className="text-xs text-[#668091]">BSIT - 3B</p>
                </div>
              </div>

              <input
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="⌕   Search a Subject, Schedule, or Announcement"
                className="rounded-full border border-[#aec5d2] bg-[#f2f6f8] px-7 py-5 text-sm outline-none focus:border-[#23566d]"
              />
            </div>

            <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: '▢', title: 'My Courses', subtitle: 'View your subjects', target: 'Courses' as Page },
                { icon: '▦', title: 'Class Schedule', subtitle: 'Check your schedule', target: 'Schedule' as Page },
                { icon: '♧', title: 'Notifications', subtitle: 'View updates', target: 'Notifications' as Page },
                { icon: '▤', title: 'Announcement', subtitle: 'Latest news', target: 'Notifications' as Page },
              ].map(card => (
                <button
                  key={card.title}
                  onClick={() => setPage(card.target)}
                  className="rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-5 text-left transition hover:shadow-md"
                >
                  <div className="mb-2 text-2xl text-[#23566d]">{card.icon}</div>
                  <h3 className="text-sm font-bold">{card.title}</h3>
                  <p className="mt-2 text-xs text-[#668091]">{card.subtitle}</p>
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
              <section className="rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-4">
                <div className="mb-3 flex justify-between border-b border-[#d0dfe6] pb-3">
                  <h2 className="font-bold">Upcoming Schedule</h2>
                  <button onClick={() => setPage('Schedule')} className="text-sm text-[#23566d]">
                    View all
                  </button>
                </div>
                {schedules.map(item => (
                  <div key={item.subject} className="flex items-center gap-4 border-b border-[#d0dfe6] py-4 last:border-0">
                    <DateBox day={item.day} month={item.month} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{item.subject}</p>
                      <p className="text-xs text-[#668091]">{item.time} {item.room}</p>
                    </div>
                  </div>
                ))}
              </section>

              <section className="rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-4">
                <div className="mb-3 flex justify-between border-b border-[#d0dfe6] pb-3">
                  <h2 className="font-bold">Announcements</h2>
                  <button onClick={() => setPage('Notifications')} className="text-sm text-[#23566d]">
                    View all
                  </button>
                </div>
                {notifications.map(item => (
                  <div key={item.title} className="flex gap-3 border-b border-[#d0dfe6] py-4 last:border-0">
                    <DateBox day={item.day} month="OCT" />
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-[#668091]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </>
        )}

        {page === 'Courses' && <Courses />}

        {page === 'Schedule' && (
          <section>
            <h1 className="mb-5 text-xl font-bold">Class Schedule</h1>
            <div className="overflow-x-auto rounded-xl border border-[#aec5d2] bg-[#f2f6f8] p-4">
              <div className="grid min-w-[650px] grid-cols-[85px_1fr_220px_90px] border-b border-[#d0dfe6] pb-3 text-sm text-[#315e75]">
                <span>Date</span><span>Subject</span><span>Time</span><span>Room</span>
              </div>
              {schedules.map(item => (
                <div key={item.subject} className="grid min-w-[650px] grid-cols-[85px_1fr_220px_90px] items-center gap-2 border-b border-[#d0dfe6] py-5 last:border-0">
                  <DateBox day={item.day} month={item.month} />
                  <strong className="text-sm">{item.subject}</strong>
                  <span className="text-sm text-[#668091]">{item.time}</span>
                  <span className="text-sm text-[#668091]">{item.room}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === 'Notifications' && (
          <section>
            <h1 className="mb-7 text-xl font-bold">Notifications</h1>
            <div className="rounded-xl border border-[#aec5d2] bg-[#f2f6f8] px-7 py-5">
              {notifications.map(item => (
                <div key={item.title} className="flex items-center gap-4 border-b border-[#d0dfe6] py-5 last:border-0">
                  <DateBox day={item.day} month="OCT" />
                  <div>
                    <h2 className="text-sm font-bold">{item.title}</h2>
                    <p className="text-sm text-[#668091]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-10 flex justify-between text-xs text-[#668091]">
          <span>Student Learning Portal</span>
          <button
            onClick={() => {
              setLoggedIn(false)
              setEmail('')
              setPassword('')
            }}
            className="font-semibold text-[#23566d]"
          >
            Log Out
          </button>
        </footer>
      </main>
    </div>
  )
}

function DateBox({ day, month }: { day: string; month: string }) {
  return (
    <div className="flex h-10 w-9 shrink-0 flex-col items-center justify-center rounded-md border border-[#c4d5df] bg-[#d9e6ed]">
      <span className="text-[8px] font-medium">{month}</span>
      <span className="text-lg font-bold leading-none">{day}</span>
    </div>
  )
}

export default App
