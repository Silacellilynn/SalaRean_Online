import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabase'
import { INITIAL_USERS, initLocalStorageIfEmpty } from '../services/lmsService'

const AuthContext = createContext(null)

const AUTH_USER_KEY = 'wexsee_auth_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    // Default to the student user (Ung Pengseng) for seamless instant experience
    return INITIAL_USERS[0]
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initLocalStorageIfEmpty()

    if (isSupabaseConfigured) {
      // Check current Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchSupabaseProfile(session.user)
        } else {
          setLoading(false)
        }
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          fetchSupabaseProfile(session.user)
        } else {
          setLoading(false)
        }
      })

      return () => subscription.unsubscribe()
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchSupabaseProfile(authUser) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (!error && data) {
        setUser(data)
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data))
      } else {
        // Fallback user object
        const basicUser = {
          id: authUser.id,
          email: authUser.email,
          full_name: authUser.user_metadata?.full_name || authUser.email,
          role: authUser.user_metadata?.role || 'student',
          avatar_url: authUser.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + authUser.id,
          member_id: 'WEX-' + authUser.id.substring(0, 6).toUpperCase()
        }
        setUser(basicUser)
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(basicUser))
      }
    } catch (err) {
      console.warn('Profile fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Login handler
  const login = async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (data.user) {
        await fetchSupabaseProfile(data.user)
      }
      return data
    } else {
      // Local demo login check
      const matchedUser = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (matchedUser) {
        setUser(matchedUser)
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(matchedUser))
        return { user: matchedUser }
      }
      // If not in demo list, create temporary session
      const customUser = {
        id: `user-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        role: 'student',
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        member_id: `WEX-${Math.floor(1000 + Math.random() * 9000)}`
      }
      setUser(customUser)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(customUser))
      return { user: customUser }
    }
  }

  // Register handler
  const register = async ({ email, password, fullName, username, role = 'student', memberId }) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username || email.split('@')[0],
            role,
            member_id: memberId || `WEX-${Math.floor(1000 + Math.random() * 9000)}`
          }
        }
      })
      if (error) throw error
      return data
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        full_name: fullName,
        username: username || email.split('@')[0],
        role,
        member_id: memberId || `WEX-${Math.floor(1000 + Math.random() * 9000)}`,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${username || email}`,
        country: 'Indonesia',
        created_at: new Date().toISOString()
      }
      setUser(newUser)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser))
      return { user: newUser }
    }
  }

  // Switch Role quickly for demonstration & review
  const switchRole = (newRole) => {
    const demoUser = INITIAL_USERS.find(u => u.role === newRole)
    if (demoUser) {
      setUser(demoUser)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demoUser))
    } else if (user) {
      const updated = { ...user, role: newRole }
      setUser(updated)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated))
    }
  }

  // Logout handler
  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    setUser(null)
    localStorage.removeItem(AUTH_USER_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        switchRole,
        isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
