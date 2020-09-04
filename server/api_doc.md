# My Wheatfeed App Server
This app has : 
* Spoonacular 3rd party API
* Zomato 3rd party API
* News API 3rd party API
* Google Login OAuth 2
* JSON formatted response

&nbsp;

## endpoints
``` 
- POST /user/register
- POST /user/login
- POST /user/google-login
- POST /zomato
- GET /news
- POST /spoonacular
```


## RESTful endpoints
### POST /user/register

> Create new account

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    name: "user's name",
    email: "user's email",
    password: "user's password"
}
```

_Response (201)_
```
{
    name: "user's name",
    email: "user's email"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "User.password cannot be null"
}
```
_Response (500 - Bad Request)_
```
{
  "message": ["Invalid email format",
              "Password must be at least 6 characters"]
}
```
---
### POST /user/login

> user login

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    "email": "user's email",
    "password": "user's password"
}
```

_Response (200 - OK)_
```
{
  "access_token": "JWT generated token"
}
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

### POST /user/google-login

> user login with google OAuth2

_Request Header_
```
{
  google_access_token: "access token given by google"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    access_token: "JWT generated google payload"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "There was an error. Please try again later. That’s all we know."
}
```
---

### POST /zomato

> search restaurant list with keyword from spoonacular API response

_Request Header_
```
{
  "access_token": "JWT generated token",
  "user-key": "Zomato user key"
}
```

_Request Body_
```
{
  "entity_id": 74,
  "entity_type": "city",
  "q": "keyword from spoonacular response.data"
}
```

_Response (200 - OK)_
```
{
  result: "contains list of restaurants data from q"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Request failed with status code 404"
}
```
### POST /spoonacular

> search recipe from spoonacular

_Request Header_
```
{
  "access_token": "JWT generated token"
}
```

_Request Body_
```
{
    query: "posted keyword",
    ingredients: "posted ingredients",
    maxCalories: "posted maxCalories",
    diet: "posted diet"
}
```

_Response (200 - OK)_
```
{
    data: "list of food data from spoonacular API"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /news

> search recipe from spoonacular

_Request Header_
```
{
  "access_token": "JWT generated token"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    data: "list of news data with culinary keyword"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```