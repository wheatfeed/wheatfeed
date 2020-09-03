const beforeLogin = () => {
    $('#login').show()
    $('#main-menu').hide()
}

const afterLogin = () => {
    $('#login').hide()
    $('#main-menu').show()
}

const loginForm = () => {
    $('#main-menu').hide()
    $('#login-form').show()
    $('#register-form').hide()
    $('#toggle-login').hide()
    $('#toggle-regist').show()
}

const registerForm = () => {
    $('#main-menu').hide()
    $('#login-form').hide()
    $('#register-form').show()
    $('#toggle-login').show()
    $('#toggle-regist').hide()
}

const login = (event) => {
    event.preventDefault()
    const email = $('#email').val()
    const password = $('#login-pass').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/user/login',
        data: {
            email,
            password
        }
    })
        .done(res => {
            localStorage.setItem('access_token', res.access_token)
            afterLogin()
        })
        .fail(err => {
            console.log(err)
        })
}

const register = (event) => {
    event.preventDefault()
    const email = $('#regist-email').val()
    const password = $('#regist-pass').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/user/register',
        data: {
            email,
            password
        }
    })
        .done(res => {
            loginForm()
        })
        .fail(err => {
            console.log(err)
        })
}

const news = (event) => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3001/news',
    })
        .done(res => {
            res.data.forEach(data => {
                $('#news-list').append(`
                    
                            ${data.urlToImage === null ? '' : `
                            <div class="card col s4 m4 6">
                        <div class="card-image">
                            <img src="${data.urlToImage}">
                        </div>
                        <div class="card-content">
                            <p>${data.description}</p>
                        </div>
                        <div class="card-action">
                            <a href="${data.url}">Read More</a>
                        </div>
                    </div>
                            `}
                            
            `)
            })
        })
        .fail(err => {
            console.log(err)
        })
}

$(document).ready(() => {
    news()

    if (localStorage.getItem('access_token')) {
        afterLogin()
    } else {
        loginForm()
    }

    $('#toggle-login').click(loginForm)
    $('#toggle-regist').click(registerForm)
    $('#formLogin').submit(login)
    $('#formRegister').submit(register)
})