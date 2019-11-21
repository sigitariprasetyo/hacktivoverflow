# hacktivoverflow

------

## 1.  HOST

```json
http://localhost:3000/
```

## 2. ROUTES

- ### User

  | Method | Routes          | Description                 |
  | :----- | :-------------- | --------------------------- |
  | POST   | /users/register | - Register new User         |
  | POST   | /users/login    | - Login user                |
  | POST   | /users/gsignin  | - Login with google account |
  

## 3. Code's Status

- ### Success Code's

  | Code Status | Description |
  | ----------- | ----------- |
  | 200         | - Success   |
  | 201         | - Created   |

- ### Error Code's

  | Code Status | Description                          | Response                                                     |
  | :---------: | ------------------------------------ | ------------------------------------------------------------ |
  |     400     | - Bad Request / ValidationError      | {  "username / email / password required" }, { "email / password wrong" } |
  |     401     | - Unauthorization / Unauthentication | { "You are not Authorized!" }                                |
  |     404     | - Not Found                          | { "Article Not Found!" }                                     |
  |     500     | - Internal server error              | { "Articles is not defined" }                                |

  

## 4. DETAIL REQUEST

- ## Register User

  Create / regisrer new User and wil returns username and token.

  - **URL**

    /users/register

  - **Method:**

    `POST`

  - **URL Params**

    none

  - **Data Body**

    ```json
    username=[string] requited
    email=[string] required
    password=[string] required
    ```

  - **Success Response:**

    - **Code:** 201 <br />
      **Content:** 

      ```json
      {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZDFkNDczZTg0NTFlYM0NTNhY2YiLCJpYXQiOjE1NzI2NTU1NzJ9.GngLxAU58OB-xYojmtawCLfhf5F-LbS6hWfJOXYMoLM",
        "username": "user"
      }
      ```

  - **Sample Input:**

    ```JSON
    {
      "username": "user",
        "email": "user@gmail.com"
      "password": "123456"
    }
    ```
  
- ## Login User

  Login uers and will returns data Token and Username.

  - **URL**

    /users/login

  - **Method:**

    `POST`

  - **URL Params**

    none

  - **Data Body**

    ```
    identity=[string] required
    password=[string] required
    ```

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
          "username": "user",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzlmODMwZjVhZWE2MTJmOWZiZGRjYiIsImlhdCI6MTU3MzUxNzQzNywiZXhwIjoxNTczNTIxMDM3fQ.JSFgtIL898yRYg_SmdF135EfekcRo4NdCHWTTRRnAwQ",
          "email": "users@mail.com"
      }
      ```
      

  - **Sample Input:**
  
  ```JSON
    {
      "identity": "user@gmail.com",
        "password": "123456"
    }
  ```
  