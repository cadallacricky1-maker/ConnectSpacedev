document.addEventListener('DOMContentLoaded', function() { initializeAccountPage(); });
function initializeAccountPage() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => { item.addEventListener('click', function() { switchTab(this.dataset.tab); }); });
  const profileForm = document.getElementById('profileForm');
  if (profileForm) { profileForm.addEventListener('submit', handleProfileUpdate); }
  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) { passwordForm.addEventListener('submit', handlePasswordChange); }
  loadUserProfile();
}
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => item.classList.remove('active'));
  const selectedTab = document.getElementById(tabName + 'Tab');
  if (selectedTab) { selectedTab.classList.add('active'); }
  event.target.closest('.menu-item').classList.add('active');
}
function loadUserProfile() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) { window.location.href = 'signin.html'; return; }
  const userData = localStorage.getItem('user_' + currentUser);
  if (userData) {
    const user = JSON.parse(userData);
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    if (profileName) profileName.value = user.fullname || '';
    if (profileEmail) profileEmail.value = user.email || '';
  }
}
function handleProfileUpdate(event) {
  event.preventDefault();
  const currentUser = localStorage.getItem('currentUser');
  const userData = localStorage.getItem('user_' + currentUser);
  if (!userData) { showAlert('Error loading user data', 'error'); return; }
  const user = JSON.parse(userData);
  user.fullname = document.getElementById('profileName').value;
  user.email = document.getElementById('profileEmail').value;
  localStorage.setItem('user_' + currentUser, JSON.stringify(user));
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  if (userName) userName.textContent = user.fullname;
  if (userEmail) userEmail.textContent = user.email;
  showAlert('Profile updated successfully!', 'success');
}
function handlePasswordChange(event) {
  event.preventDefault();
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (newPassword.length < 8) { const newPasswordError = document.getElementById('newPasswordError'); if (newPasswordError) newPasswordError.textContent = 'Password must be at least 8 characters'; return; }
  if (newPassword !== confirmPassword) { const confirmError = document.getElementById('confirmPasswordError'); if (confirmError) confirmError.textContent = 'Passwords do not match'; return; }
  event.target.reset();
  showAlert('Password changed successfully!', 'success');
}
function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-' + type;
  alert.textContent = message;
  const accountContent = document.querySelector('.account-content');
  accountContent.insertBefore(alert, accountContent.firstChild);
  setTimeout(() => { alert.remove(); }, 5000);
}
function clearPasswordErrors() {
  const errors = ['currentPasswordError', 'newPasswordError', 'confirmPasswordError'];
  errors.forEach(id => { const element = document.getElementById(id); if (element) element.textContent = ''; });
}
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') { input.type = 'text'; } else { input.type = 'password'; }
}
function signOut() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('rememberMe');
  window.location.href = 'signin.html';
}
const signoutBtn = document.getElementById('signoutBtn');
if (signoutBtn) { signoutBtn.addEventListener('click', function(e) { e.preventDefault(); signOut(); }); }