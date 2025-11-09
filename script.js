// ========================
// REGISTER
// ========================
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
      const res = await fetch('http://127.0.0.1:5001/api/gigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      registerMessage.innerText = data.message;
    } catch (err) {
      registerMessage.innerText = '⚠️ Error connecting to server';
      console.error(err);
    }
  });
}

// ========================
// LOGIN SECTION
// ========================

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // ✅ This is where your code goes:
      if (res.ok) {
        loginMessage.innerText = data.message;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ email }));
        console.log('✅ Token saved:', data.token);

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
      } else {
        loginMessage.innerText = data.message || 'Login failed ❌';
      }
    } catch (err) {
      loginMessage.innerText = '⚠️ Error connecting to server';
      console.error(err);
    }
  });
}

// ========================
// POPUP LOGIC (Home Page)
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('popupOverlay');
  const signinBtn = document.getElementById('signinBtn');
  const signupBtn = document.getElementById('signupBtn');

  if (!overlay) return; // Stop if popup not on this page

  const popupShown = localStorage.getItem('popupShown');
  if (!popupShown) {
    setTimeout(() => {
      overlay.style.display = 'flex';
      overlay.classList.add('show');
    }, 500);
    localStorage.setItem('popupShown', 'true');
  }

  window.closePopup = function () {
    overlay.classList.remove('show');
    setTimeout(() => overlay.style.display = 'none', 300);
  };

  window.continueWithGoogle = function () {
    window.location.href = "login.html";
  };

  window.continueWithEmail = function () {
    window.location.href = "register.html";
  };

  window.signup = function () {
    window.location.href = "register.html";
  };

  if (signinBtn) {
    signinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.style.display = 'flex';
      overlay.classList.add('show');
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.style.display = 'flex';
      overlay.classList.add('show');
    });
  }

  // Uncomment this line while testing:
  // localStorage.removeItem('popupShown');
});
