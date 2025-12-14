document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const loginMessage = document.getElementById('login-message') as HTMLParagraphElement;
    const loginContainer = document.getElementById('login-container') as HTMLDivElement;
    const appDiv = document.getElementById('app') as HTMLDivElement;
    const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;

    if (loginForm && loginMessage && loginContainer && appDiv && logoutButton) {
        loginForm.addEventListener('submit', (event: Event) => {
            event.preventDefault();

            const usernameInput = document.getElementById('username') as HTMLInputElement;
            const passwordInput = document.getElementById('password') as HTMLInputElement;

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Basic validation (replace with actual authentication logic)
            if (username === 'admin' && password === 'password') {
                loginMessage.textContent = '';
                loginContainer.style.display = 'none';
                appDiv.style.display = 'block';
                console.log('Login successful');
            } else {
                loginMessage.textContent = 'Invalid username or password.';
                console.log('Login failed');
            }
        });

        logoutButton.addEventListener('click', () => {
            appDiv.style.display = 'none';
            loginContainer.style.display = 'block';
            (document.getElementById('password') as HTMLInputElement).value = ''; // Clear password field on logout
            console.log('Logged out');
        });

        // Initial state: show login, hide app
        appDiv.style.display = 'none';
        loginContainer.style.display = 'block';

    } else {
        console.error('One or more required DOM elements not found.');
    }
});

function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet('IoT User'));