/* ============================================
   AUTH — password gate using SHA-256
   Plain text password never stored in code.
   ============================================ */

const AUTH_HASH = '1914209bfd4e0829b79b7d08c8e579a58237b31061b0db1ead417603b474561c';
const SESSION_KEY = 'guluth_auth';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Call on protected pages — redirects to gate if not authenticated
function requireAuth() {
  if (sessionStorage.getItem(SESSION_KEY) !== AUTH_HASH) {
    window.location.replace('gate.html');
  }
}

// Call on gate.html submit
async function attemptLogin(password, errorEl) {
  const hash = await hashPassword(password);
  if (hash === AUTH_HASH) {
    sessionStorage.setItem(SESSION_KEY, AUTH_HASH);
    window.location.replace('index.html');
  } else {
    errorEl.textContent = 'Incorrect code. Please try again.';
    errorEl.style.display = 'block';
  }
}
