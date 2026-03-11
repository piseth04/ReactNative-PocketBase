import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import pb from '../utils/pb'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [pbConnected, setPbConnected] = useState(false)
  const router = useRouter()

  // Check PocketBase connection on mount
  useEffect(() => {
    checkPocketBaseConnection()
  }, [])

  const checkPocketBaseConnection = async () => {
    try {
      console.log('Checking PocketBase connection at:', pb.baseURL)
      const health = await pb.health.check()
      console.log('PocketBase health check:', health)
      setPbConnected(true)
    } catch (err) {
      console.error('PocketBase connection failed:', err)
      setError(`Cannot connect to server at ${pb.baseURL}`)
      setPbConnected(false)
    }
  }

  const handleLogin = async () => {
    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password')
      return
    }

    if (!pbConnected) {
      setError(`Cannot connect to server at ${pb.baseURL}`)
      return
    }

    setIsLoading(true)
    setError('')

    try {
      console.log('Attempting login with email:', email)
      
      // Authenticate with PocketBase
      const authData = await pb.collection('users').authWithPassword(email, password)
      
      console.log('Login successful:', authData?.record?.email)
      
      // PocketBase automatically saves the auth token to storage
      // Wait a moment for auth state to update
      setTimeout(() => {
        router.replace('/')
      }, 100)
    } catch (err) {
      console.error('Login error:', err)
      console.error('Error status:', err.status)
      console.error('Error response:', err.response)
      
      let errorMsg = 'Login failed. Please try again.'
      
      if (err.status === 400) {
        errorMsg = 'Invalid email or password'
      } else if (err.status === 401) {
        errorMsg = 'Invalid credentials'
      } else if (err.status === 404) {
        errorMsg = 'User not found'
      } else if (err.message === 'Failed to fetch') {
        errorMsg = `Cannot connect to server at ${pb.baseURL}`
      } else if (err.message) {
        errorMsg = err.message
      }
      
      setError(errorMsg)
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    // Navigate to signup screen (create signup.jsx for this)
    Alert.alert('Sign Up', 'Sign up functionality coming soon!')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>To-Do List</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {/* Connection Status */}
        <View style={[styles.statusContainer, pbConnected ? styles.statusConnected : styles.statusDisconnected]}>
          <Text style={styles.statusText}>
            {pbConnected ? '✓ Connected' : '✗ Not Connected'}
          </Text>
        </View>

        {/* Error Message */}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading && pbConnected}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading && pbConnected}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, (isLoading || !pbConnected) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading || !pbConnected}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#fee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  statusContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusConnected: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  statusDisconnected: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
})