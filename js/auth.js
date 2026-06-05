document.addEventListener('DOMContentLoaded', function() { initializeAuth(); });
function initializeAuth() {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) { signupForm.addEventListener('submit', handleSignup); document.getElementById('password').addEventListener('input', updatePasswordStrength); }
  const signinForm = document.getElementById('signinForm');
  if (signinForm) { signinForm.addEventListener('submit', handleSignin); }
  const emailForm = document.getElementById('emailForm');
  if (emailForm) { emailForm.addEventListener('submit', handleEmailSubmit); }
  const resendBtn = document.getElementById('resendBtn');
  if (resendBtn) { resendBtn.addEventListener('click', handleResend); }
  const googleSignup = document.getElementById('googleSignup');
  if (googleSignup) { googleSignup.addEventListener('click', handleGoogleAuth); }
  const googleSignin = document.getElementById('googleSignin');
  if (googleSignin) { googleSignin.addEventListener('click', handleGoogleAuth); }
  loadUserData();
}
function handleSignup(event) {
  event.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;
  if (!validateSignupForm(fullname, email, password, confirmPassword, terms)) return;
  const userData = { fullname, email, password: hashPassword(password), createdAt: new Date().toISOString() };
  localStorage.setItem('user_' + email, JSON.stringify(userData));
  localStorage.setItem('currentUser', email);
  showSuccessMessage('Account created successfully! Redirecting to sign in...');
  setTimeout(() => { window.location.href = 'signin.html'; }, 2000);
}
function validateSignupForm(fullname, email, password, confirmPassword, terms) {
  let isValid = true;
  clearErrorMessages();
  if (!fullname || fullname.trim().length < 2) { showError('fullnameError', 'Please enter a valid full name'); isValid = false; }
  if (!isValidEmail(email)) { showError('emailError', 'Please enter a valid email address'); isValid = false; }
  if (localStorage.getItem('user_' + email)) { showError('emailError', 'This email is already registered'); isValid = false; }
  if (password.length < 8) { showError('passwordError', 'Password must be at least 8 characters'); isValid = false; }
  if (password !== confirmPassword) { showError('confirmPasswordError', 'Passwords do not match'); isValid = false; }
  if (!terms) { showError('termsError', 'You must agree to the terms and conditions'); isValid = false; }
  return isValid;
}
function handleSignin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  if (!email || !password) { showErrorMessage('Please fill in all fields'); return; }
  const userData = localStorage.getItem('user_' + email);
  if (!userData) { showErrorMessage('Email or password is incorrect'); return; }
  const user = JSON.parse(userData);
  if (user.password !== hashPassword(password)) { showErrorMessage('Email or password is incorrect'); return; }
  localStorage.setItem('currentUser', email);
  if (rememberMe) { localStorage.setItem('rememberMe', 'true'); }
  showSuccessMessage('Signed in successfully! Redirecting...');
  setTimeout(() => { window.location.href = 'account.html'; }, 2000);
}
function handleEmailSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  if (!isValidEmail(email)) { const emailError = document.getElementById('emailError'); if (emailError) emailError.textContent = 'Please enter a valid email address'; return; }
  showConfirmation(email);
}
function showConfirmation(email) {
  const emailStep = document.getElementById('emailStep');
  const confirmationStep = document.getElementById('confirmationStep');
  const confirmationEmail = document.getElementById('confirmationEmail');
  if (emailStep) emailStep.style.display = 'none';
  if (confirmationStep) confirmationStep.style.display = 'block';
  if (confirmationEmail) confirmationEmail.textContent = email;
}
function handleResend() {
  const email = document.getElementById('confirmationEmail').textContent;
  alert('Reset link sent again to ' + email);
}
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') { input.type = 'text'; } else { input.type = 'password'; }
}
function updatePasswordStrength(event) {
  const password = event.target.value;
  const strengthBar = document.getElementById('strengthBar');
  if (!strengthBar) return;
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
  strengthBar.classList.remove('weak', 'medium', 'strong');
  if (strength < 2) { strengthBar.classList.add('weak'); } else if (strength < 4) { strengthBar.classList.add('medium'); } else { strengthBar.classList.add('strong'); }
}
function handleGoogleAuth(event) {
  event.preventDefault();
  alert('Google authentication would be implemented here');
}
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) { element.textContent = message; element.classList.add('show'); }
}
function clearErrorMessages() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => { error.textContent = ''; error.classList.remove('show'); });
}
function showErrorMessage(message) {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) { errorDiv.textContent = message; errorDiv.style.display = 'block'; }
}
function showSuccessMessage(message) {
  const successDiv = document.getElementById('successMessage');
  if (successDiv) { successDiv.textContent = message; successDiv.style.display = 'block'; }
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'hash_' + Math.abs(hash).toString(16);
}
function loadUserData() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) { if (window.location.pathname.includes('account')) { window.location.href = 'signin.html'; } return; }
  const userData = localStorage.getItem('user_' + currentUser);
  if (userData) {
    const user = JSON.parse(userData);
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    if (userName) userName.textContent = user.fullname;
    if (userEmail) userEmail.textContent = user.email;
  }
}
function signOut() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('rememberMe');
  window.location.href = 'signin.html';
}
const signoutBtn = document.getElementById('signoutBtn');
if (signoutBtn) { signoutBtn.addEventListener('click', function(e) { e.preventDefault(); signOut(); }); }