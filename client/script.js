$(".dropdown-trigger").dropdown();
$(document).ready(function(){
    $('select').formSelect();
  });
  
const afterLogin = () => {
    $('#login').hide()
    $('#main-menu').show()
}

const loginForm = () => {
    $('#login').show()
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
    $('#error-login').empty()
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
            $('#search-result').empty()
            $('#restaurant-result').empty()
        })
        .fail(err => {
            $('#error-login').append(`${err.responseJSON.err.message}`)
        })
}

const register = (event) => {
    event.preventDefault()
    const email = $('#regist-email').val()
    const password = $('#regist-pass').val()
    $('#error-register').empty()

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
            // console.log(err)
            $('#error-register').append(`${err.responseJSON.err.errors[0].message}`)
        })
}

const news = (event) => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3001/news',
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(res => {
            res.data.forEach(data => {
                $('#news-list').append(`
                    ${data.urlToImage === null ? '' : `
                        <div class="card col s3" style="margin:3em;">
                            <div class="card-image">
                                <img src="${data.urlToImage}" style="height:20em;">
                            </div>
                            <div class="card-content">
                                <p style="height: 5em;">${data.description}</p>
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

const spoonify = (event) => {
    event.preventDefault()
    const query = $('#query').val()
    const ingredients = $('#ingredients').val()
    const maxCalories = $('#maxCalories').val()
    const diet = $('#diet').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/spoonacular',
        data: {
            query,
            ingredients,
            maxCalories,
            diet
        },
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(res => {
            // console.log(res);
            $('#news-list').hide()
            $('#restaurant-result').empty()
            if(res.results.length < 1) {
                $('#search-result').append(`
                <div style="text-align:center;">
                    <h3>Food Not Found</h3>
                </div>
                `)
            } else {
                res.results.forEach(data => {
                    $('#search-result').append(`
                        <div class="card col s3" style="margin:3em;">
                            <div class="card-image">
                                <img src="${data.image}" style="height:20em;">
                            </div>
                            <div class="card-content">
                                <p style="height: 5em; ">${data.title}</p>
                                <a href="#" data-title='${data.title}' onclick="restaurant(event)">Search For The Restaurant</a>
                            </div>
                            
                        </div>
                    `)
                })
            }
        })
        .fail(err => {
            console.log(err)
        })
}

const restaurant = () => {
    event.preventDefault()

    const keyword = event.srcElement.dataset.title
    console.log(keyword)

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/zomato',
        data: {
            keyword
        },
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(res => {
            console.log(res);
            
            $('#search-result').empty()
            res.result.restaurants.forEach((el) => {
                $('#restaurant-result').append(`
                    <div class="card col s3" style="margin:3em;">
                        <div class="card-image">
                            <img src="${el.restaurant.thumb}" style="height:20em;">
                        </div>
                        <div class="card-content">
                            <p style="height: 5em;">${el.restaurant.name}</p>
                            <a href="${el.restaurant.url}" target="_blank">Go To The Restaurant Website</a>
                            <p style="height: 5em;">${el.restaurant.location.address}</p>
                        </div>
                        
                    </div>
                `)
            })
        })
        .fail(err => {
            console.log(err)
        })
}

const logout = (event) => {
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    loginForm()
}

function onSignIn(googleUser) {
    // mengambil akses token google setiap kali sudah sign in
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token, '>>> google id token');
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/user/google-login',
        headers : {
            google_access_token
        }
    })
        .done((res) => {
            // console.log(res);
            localStorage.setItem('access_token', res.access_token)
            afterLogin()
            $('#search-result').empty()
            $('#restaurant-result').empty()
        })
        .fail((err) => {
            console.log(err);
        })
}

$(document).ready(() => {
    if (localStorage.getItem('access_token')) {
        afterLogin()
        news()
    } else {
        loginForm()
    }

    $('#toggle-login').click(loginForm)
    $('#toggle-regist').click(registerForm)
    $('#logout').click(logout)

    $('#formLogin').submit(login)
    $('#formRegister').submit(register)
    $('#form-search').submit(spoonify)
})