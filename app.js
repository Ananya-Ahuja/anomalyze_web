function logoComponent() {
    return `
        <div class="anomalyze-logo" onclick="replayLogoAnimation()">
            <img src="/Users/ananyaahuja/Desktop/anomalyze_logo.png" alt="Anomalyze Logo" />
        </div>
    `;
}

window.replayLogoAnimation = function () {
    const el = document.querySelector('.anomalyze-logo');
    if (el) {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = null;
    }
};

function clearFormInnerAnimation() {
    const formInner = document.querySelector('.form-inner');
    if (formInner) {
        formInner.style.animation = 'none';
        formInner.style.opacity = '1';
        formInner.style.transform = 'translateX(0)';
    }
}
function animateFormInner(from = 'right') {
    const formInner = document.querySelector('.form-inner');
    if (!formInner) return;
    formInner.style.animation = 'none';
    void formInner.offsetWidth;

    const animationName = from === 'left' ? 'slideInLeft' : 'slideInRight';
    formInner.style.animation = `${animationName} 0.6s cubic-bezier(0.33,1,0.68,1) forwards`;
}
if (!document.getElementById('slideInFromLeftKeyframes')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'slideInLeftKeyframes';
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
    @keyframes slideInLeft {
        0%   { opacity: 0; transform: translateX(-70px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
        0%   { opacity: 0; transform: translateX(70px); }
        100% { opacity: 1; transform: translateX(0); }
    }`;
    document.head.appendChild(styleSheet);
}

function loginPage() {
    return `
        <div class="center-stack">
            ${logoComponent()}
            <div class="form-card">
                <form id="loginForm" class="form-inner" autocomplete="off">
                    <h2>Login</h2>
                    <p>Welcome back! Please login to continue.</p>
                    <label class="input-label" for="loginUsername">Username</label>
                    <input required type="text" class="input-field" id="loginUsername" placeholder="Username" />
                    <label class="input-label" for="loginPassword">Password</label>
                    <input required type="password" class="input-field" id="loginPassword" placeholder="Password" />
                    <div class="checkbox-row">
                        <label for="rememberMe" style="cursor:pointer;">
                            <input type="checkbox" id="rememberMe"/> Remember me
                        </label>
                        <button type="button" class="forgot-password-link" id="forgotPassLink">Forgot Password</button>
                    </div>
                    <button class="card-btn" id="loginBtn" type="submit">Login</button>
                    <div class="form-hint"><a class="link" data-page="signup" id="signupLink">Create a new account</a></div>
                </form>
            </div>
        </div>
    `;
}
function signupPage() {
    return `
        <div class="center-stack">
            ${logoComponent()}
            <div class="form-card signup">
                <form id="signupForm" class="form-inner" autocomplete="off">
                    <h2>Signup</h2>
                    <label class="input-label" for="signupEmail">Email ID</label>
                    <input required type="email" class="input-field" id="signupEmail" placeholder="Email ID"/>
                    <label class="input-label" for="signupUsername">Username</label>
                    <input required type="text" class="input-field" id="signupUsername" placeholder="Username"/>
                    <label class="input-label" for="signupPassword">Password</label>
                    <input required type="password" class="input-field" id="signupPassword" placeholder="Password"/>
                    <label class="input-label" for="signupConfirmPassword">Confirm Password</label>
                    <input required type="password" class="input-field" id="signupConfirmPassword" placeholder="Confirm Password"/>
                    <button class="card-btn" type="submit" id="createAccountBtn">Create Account</button>
                    <div class="form-hint">Already a member? <a class="link" data-page="login" id="loginLink">Login</a></div>
                </form>
            </div>
        </div>
    `;
}
function otpPage() {
    return `
        <div class="center-stack">
            ${logoComponent()}
            <div class="form-card">
                <form id="otpForm" class="form-inner" autocomplete="off">
                    <h2>Enter OTP</h2>
                    <p>Enter the 6-digit code from your registered Email ID.</p>
                    <div style="display:flex; justify-content:center; gap:8px; margin-bottom:25px; margin-top:19px;">
                        ${[...Array(6).keys()].map(i => `
                            <input maxlength="1" type="text" class="otp-input input-field" id="otp${i}" pattern="[0-9]*"
                            style="width: 44px; height: 48px; text-align: center; font-size: 1.5em;" />
                        `).join('')}
                    </div>

                    <div class="otp-resend-container">
                        <div>Resend in <span class="otp-resend-timer" id="resendTimer">60</span>s</div>
                        <button type="button" id="resendBtn" class="otp-resend-button" disabled>Resend</button>
                    </div>

                    <button class="card-btn" id="verifyBtn" style="margin-top:0;" type="submit">Verify</button>
                </form>
            </div>
        </div>
    `;
}

function welcomePage() {
    return `
        <div class="video-welcome">
            <video 
                src="/Users/ananyaahuja/Desktop/welcomesplash.mp4"
                autoplay
                muted
                playsinline
                id="welcomeVideo"
            ></video>
            <div class="video-overlay-gradient"></div>
        </div>
    `;
}

const routes = {
    login: loginPage,
    signup: signupPage,
    otp: otpPage,
    welcome: welcomePage
};

function render(page, options = {}) {
    window.location.hash = page;
    document.getElementById('container').innerHTML = routes[page]();
    setTimeout(() => window.replayLogoAnimation(), 50);

    const direction = options.animateFromLeft ? 'left' :
                      options.animateFromRight ? 'right' : null;
    animateFormInner(direction);

    if (page === 'login') {
        document.getElementById('signupLink').onclick = e => {
            e.preventDefault();
            render('signup', { animateFromRight: true });
        };
        document.getElementById('forgotPassLink').onclick = e => {
            e.preventDefault();
            render('otp', { animateFromRight: true });
        };
        document.getElementById('loginForm').onsubmit = e => {
            e.preventDefault();
            render('welcome');
        };
    } else if (page === 'signup') {
        document.getElementById('loginLink').onclick = e => {
            e.preventDefault();
            render('login', { animateFromLeft: true });
        };
        document.getElementById('signupForm').onsubmit = e => {
            e.preventDefault();
            const pw = document.getElementById('signupPassword').value;
            const cpw = document.getElementById('signupConfirmPassword').value;
            if (pw !== cpw) {
                alert('Passwords do not match.');
                return;
            }
            render('otp', { animateFromRight: true });
        };
    } else if (page === 'otp') {
        const inputs = [...Array(6).keys()].map(i => document.getElementById(`otp${i}`));
        inputs.forEach((el, idx) => {
            el.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value && idx < 5) inputs[idx + 1].focus();
            });
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !this.value && idx > 0) inputs[idx - 1].focus();
            });
        });
        document.getElementById('otpForm').onsubmit = e => {
            e.preventDefault();
            const code = inputs.map(inp => inp.value).join('');
            if (code.length !== 6) {
                alert('Enter all 6 digits');
                return;
            }
            render('welcome');
        };
    } else if (page === 'otp') {
        const inputs = [...Array(6).keys()].map(i => document.getElementById(`otp${i}`));
        inputs.forEach((el, idx) => {
            el.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value && idx < 5) inputs[idx + 1].focus();
            });
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !this.value && idx > 0) inputs[idx - 1].focus();
            });
        });

        const resendBtn = document.getElementById('resendBtn');
        const resendTimerElem = document.getElementById('resendTimer');
        let countdown = 60;
        let intervalId;

        function startTimer() {
            resendBtn.disabled = true;
            resendTimerElem.textContent = countdown;
            intervalId = setInterval(() => {
                countdown--;
                resendTimerElem.textContent = countdown;
                if (countdown <= 0) {
                    clearInterval(intervalId);
                    resendBtn.disabled = false;
                    resendTimerElem.textContent = '0';
                }
            }, 1000);
        }

        resendBtn.onclick = () => {
            // Your resend OTP logic goes here (API call, etc.)
            alert('Resend OTP requested!');
            countdown = 60;
            startTimer();
        };

        startTimer();

        document.getElementById('otpForm').onsubmit = e => {
            e.preventDefault();
            const code = inputs.map(inp => inp.value).join('');
            if (code.length !== 6) {
                alert('Enter all 6 digits');
               return;
            }
            clearInterval(intervalId);  // stop timer on success navigation
            render('welcome');
        };
    }


    document.querySelectorAll('.anomalyze-logo').forEach(el => {
        el.onclick = window.replayLogoAnimation;
    });
}

// SPLASH SCREEN LOGIC
let splashShown = false;
function hideSplashAndShowLogin() {
    const splash = document.getElementById('video-splash');
    if (!splash) return;
    splash.classList.add('hide');
    setTimeout(() => {
        splash.style.display = 'none';
        splashShown = true;
        render('login', { animateFromRight: true });
    }, 680); // matches transition duration
}

// On first load, show splash, then login.
window.onload = () => {
    const splash = document.getElementById('video-splash');
    if (splash && !splashShown) {
        let minDelay = 2200, maxDelay = 3400;
        const video = document.getElementById('splashVideo');
        let ended = false, timeoutId;

        function endSplash() {
            if (!ended) {
                ended = true;
                clearTimeout(timeoutId);
                hideSplashAndShowLogin();
            }
        }
        // Base duration on video length if possible, up to 3s.
        video.onloadedmetadata = function () {
            let dur = Math.max(minDelay, Math.min(maxDelay, video.duration * 1000));
            timeoutId = setTimeout(endSplash, dur);
        };
        timeoutId = setTimeout(endSplash, maxDelay);
        splash.onclick = () => endSplash();
        video.onended = endSplash;
    } else {
        let page = location.hash.replace('#', '') || 'login';
        if (!routes[page]) page = 'login';
        render(page);
    }
};
window.onhashchange = () => {
    if (!splashShown && document.getElementById('video-splash') && document.getElementById('video-splash').style.display!=='none') {
        // Splash is still up, ignore hash changes until splash gone
        return;
    }
    const page = location.hash.replace('#', '') || 'login';
    if (routes[page]) render(page);
};