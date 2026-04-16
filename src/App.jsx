import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { WorkoutProvider } from './context/WorkoutContext'
import { ToastProvider } from './context/ToastContext'
import ErrorBoundary from './components/ErrorBoundary'
import RequireAuth from './components/RequireAuth'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import FirebaseSetupBanner from './components/FirebaseSetupBanner'
import Home from './pages/Home'
import Exercises from './pages/Exercises'
import ExerciseDetail from './pages/ExerciseDetail'
import Plans from './pages/Plans'
import WorkoutLog from './pages/WorkoutLog'
import StartWorkout from './pages/StartWorkout'
import Timer from './pages/Timer'
import Stats from './pages/Stats'
import PRs from './pages/PRs'
import Calendar from './pages/Calendar'
import Calculator from './pages/Calculator'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Knowledge from './pages/Knowledge'

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <WorkoutProvider>
              <div className="min-h-screen bg-gray-950 text-white">
                <FirebaseSetupBanner />
                <Navbar />
                <main className="max-w-5xl mx-auto px-4 pt-6 pb-24 md:pb-8">
                  <Routes>
                    {/* 公開頁面：不需要登入 */}
                    <Route path="/" element={<Home />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/exercises/:id" element={<ExerciseDetail />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/timer" element={<Timer />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/knowledge" element={<Knowledge />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* 需要登入的頁面 */}
                    <Route path="/log" element={<RequireAuth><WorkoutLog /></RequireAuth>} />
                    <Route path="/start/:planId" element={<RequireAuth><StartWorkout /></RequireAuth>} />
                    <Route path="/stats" element={<RequireAuth><Stats /></RequireAuth>} />
                    <Route path="/prs" element={<RequireAuth><PRs /></RequireAuth>} />
                    <Route path="/calendar" element={<RequireAuth><Calendar /></RequireAuth>} />
                  </Routes>
                </main>
                <BottomNav />
              </div>
            </WorkoutProvider>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
