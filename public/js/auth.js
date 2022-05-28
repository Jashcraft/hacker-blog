const signupHandler = async e => {
    e.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();
    if(username && password && email){
        const signupConfirmed = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, password, email}),
            headers: { 'Content-Type': 'application/json' }
        })

        if(signupConfirmed.ok){
            document.location.replace('/');
        } else {
            alert('Invalid Credentials')
        }
    }

}

const loginHandler = async e => {
    e.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(username && password){
        const login = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type': 'application/json' }
        })

        if(login.ok){
            document.location.replace('/');
        } else {
            alert('Invalid Credentials');
        }
    }
}

if(window.location.pathname === '/login'){
    document.querySelector('#login').addEventListener('click', loginHandler);
} else if (window.location.pathname === '/signup') {
    document.querySelector('#signup').addEventListener('click', signupHandler);
}