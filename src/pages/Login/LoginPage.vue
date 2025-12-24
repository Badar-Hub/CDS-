<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/Auth/auth-store';
import type { IAuthRequestDto } from 'src/stores/Auth/dtos/iauth-request-dto';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const rememberMe = ref(false);

const handleLogin = async () => {
  isLoading.value = true;

  try {
    const credentials: IAuthRequestDto = {
      username: username.value,
      password: password.value,
    };

    const token = await authStore.login(credentials);
    console.log('Login successful, token:', token);
    await router.push({ name: 'Dashboard' });
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <div class="background-layer">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-pattern"></div>
    </div>

    <q-card class="login-card" flat>
      <div class="logo-section">
        <div class="logo-container">
          <q-icon name="hub" class="logo-icon" />
        </div>
        <h1 class="brand-title">CDS Platform</h1>
        <p class="brand-subtitle">Sign in to continue</p>
      </div>

      <q-card-section class="form-section">
        <q-form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <label class="input-label">Username</label>
            <q-input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              outlined
              dense
              class="custom-input"
              :rules="[(val) => val.length >= 3 || 'Minimum 3 characters']"
              lazy-rules
            >
              <template #prepend>
                <q-icon name="person_outline" class="input-icon" />
              </template>
            </q-input>
          </div>

          <div class="input-group">
            <label class="input-label">Password</label>
            <q-input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              outlined
              dense
              class="custom-input"
              :rules="[(val) => val.length >= 6 || 'Minimum 6 characters']"
              lazy-rules
            >
              <template #prepend>
                <q-icon name="lock_outline" class="input-icon" />
              </template>
              <template #append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer input-icon"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>

          <div class="options-row">
            <q-checkbox
              v-model="rememberMe"
              label="Remember me"
              dense
              class="remember-checkbox"
            />
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <q-btn
            type="submit"
            label="Sign In"
            class="login-btn"
            :loading="isLoading"
            unelevated
            no-caps
          >
            <template #loading>
              <q-spinner-dots size="24px" />
            </template>
          </q-btn>
        </q-form>

        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text">or continue with</span>
          <span class="divider-line"></span>
        </div>

        <div class="social-login">
          <q-btn
            flat
            round
            class="social-btn"
            aria-label="Sign in with Google"
          >
            <q-icon name="img:https://www.google.com/favicon.ico" size="20px" />
          </q-btn>
          <q-btn
            flat
            round
            class="social-btn"
            icon="mdi-microsoft"
            aria-label="Sign in with Microsoft"
          />
          <q-btn
            flat
            round
            class="social-btn"
            icon="mdi-github"
            aria-label="Sign in with GitHub"
          />
        </div>
      </q-card-section>

      <div class="card-footer">
        <p>
          Don't have an account?
          <router-link to="/register" class="signup-link">Sign up</router-link>
        </p>
      </div>
    </q-card>

    <div class="version-badge">v1.0.0</div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

// Animated background
.background-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  top: -200px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: -150px;
  right: -100px;
  animation-delay: -7s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(-30px, -20px) scale(1.02);
  }
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

// Login card
.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  animation: cardEntry 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cardEntry {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Logo section
.logo-section {
  text-align: center;
  margin-bottom: 36px;
}

.logo-container {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.4);
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.logo-icon {
  font-size: 36px;
  color: white;
}

.brand-title {
  font-family: 'Outfit', 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  font-size: 15px;
  color: #94a3b8;
  margin: 0;
  font-weight: 400;
}

// Form section
.form-section {
  padding: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
  letter-spacing: 0.3px;
}

.custom-input {
  :deep(.q-field__control) {
    background: rgba(15, 23, 42, 0.6);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.25s ease;
    height: 52px;

    &:hover {
      border-color: rgba(59, 130, 246, 0.4);
    }
  }

  :deep(.q-field__control.q-field__control--focused) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  :deep(.q-field__native) {
    color: #f1f5f9;
    font-size: 15px;
    padding: 0 16px;

    &::placeholder {
      color: #64748b;
    }
  }

  :deep(.q-field__marginal) {
    color: #64748b;
  }
}

.input-icon {
  color: #64748b;
  font-size: 20px;
}

// Options row
.options-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.remember-checkbox {
  :deep(.q-checkbox__label) {
    color: #94a3b8;
    font-size: 13px;
  }

  :deep(.q-checkbox__inner) {
    color: #64748b;
  }

  :deep(.q-checkbox__inner--truthy) {
    color: #3b82f6;
  }
}

.forgot-link {
  font-size: 13px;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }
}

// Login button
.login-btn {
  height: 52px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-top: 8px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Divider
.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 28px 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider-text {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

// Social login
.social-login {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-btn {
  width: 52px;
  height: 52px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: #94a3b8;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
    color: #f1f5f9;
    transform: translateY(-2px);
  }
}

// Footer
.card-footer {
  text-align: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  p {
    margin: 0;
    font-size: 14px;
    color: #94a3b8;
  }
}

.signup-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }
}

// Version badge
.version-badge {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 6px 12px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 11px;
  color: #64748b;
  letter-spacing: 0.5px;
}

// Responsive
@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px;
    border-radius: 20px;
  }

  .logo-container {
    width: 64px;
    height: 64px;
    border-radius: 16px;
  }

  .logo-icon {
    font-size: 32px;
  }

  .brand-title {
    font-size: 24px;
  }
}
</style>
