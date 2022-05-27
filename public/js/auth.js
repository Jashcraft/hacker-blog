const signupButton = document.querySelector('#signup');
const emailEl = document.querySelector('#email');
const usernameEl = document.querySelector('#username');
const passwordEl = document.querySelector('#password');

const signupHandler = async (e) => {
    e.preventDefault();
    const username = usernameEl.value.trim();
    const password = passwordEl.value.trim();
    const email = passwordEl.value.trim();
    if(username && password && email){
        const signupConfirmed = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, password, email})
        })

        if(signupConfirmed.ok){
            document.location.replace('/');
        } else {
            alert('Invalid Credentials')
        }
    }

}

signupButton.addEventListener('click', signupHandler)