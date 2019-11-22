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
  

- **Question**

  | Method | Authentication | Authorization | Routes                 | Description              |
  | ------ | -------------- | ------------- | ---------------------- | ------------------------ |
  | GET    | -              | -             | /question              | -Get All Questions       |
  | GET    | -              | -             | /question/search       | -Search question by tag  |
  | GET    | -              | -             | /question/detail/:id   | -Find onequestion        |
  | GET    | -              | -             | /question/trending     | -Get 5 top Tranding tags |
  | GET    | -              | -             | /question/getQuote     | -Get random quote        |
  | GET    | Yes            | -             | /question/myQuestion   | -get my questions        |
  | POST   | Yes            | -             | /question              | -Post question           |
  | PATCH  | Yes            | -             | /question/upVote/:id   | -Up Vote question        |
  | PATCH  | Yes            | -             | /question/downVote/:id | -Down Vote question      |
  | PATCH  | Yes            | Yes           | /question/update/:id   | -Update question         |
  | DELETE | Yes            | Yes           | /question/delete/:id   | -Delete uqestion         |


- **Answer**

  | Method | Authentication | Authorization | Routes                 | Description              |
  | ------ | -------------- | ------------- | ---------------------- | ------------------------ |
  | GET    | -              | -             | /answer/getAll/:idQuestion              | -Get All answer Questions       |
  | POST   | Yes            | -             | /addAnswer/:id             | -Post question answer          |
  | PATCH  | Yes            | -             | /answer/upVote/:id   | -Up Vote answer        |
  | PATCH  | Yes            | -             | /answer/downVote/:id | -Down Vote answer      |
  | DELETE | Yes            | Yes           | /question/delete/:id   | -Delete answer         |


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

    ```
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
- ## Get All Questions

  Get all questions.

  - **URL**

    /question

  - **Method:**

    `GET`

  - **URL Params**

    none

  - **Data Body**
    none

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
        "upVotes": [
            "5dd4053893c7ed179401e257"
        ],
        "downVotes": [],
        "answers": [
            {
                "upVotes": [],
                "downVotes": [],
                "_id": "5dd65d52203854383bc56c2f",
                "userId": "5dd4053893c7ed179401e257",
                "questionId": "5dd65c61c0944c1b5757f8d1",
                "answer": "sadwq",
                "createdAt": "2019-11-21T09:48:02.288Z",
                "updatedAt": "2019-11-21T09:48:02.288Z",
                "__v": 0
            }
        ],
        "tags": [
            "mongodb",
            "aggregation-mongodb"
        ],
        "_id": "5dd65c61c0944c1b5757f8d1",
        "userId": {
            "_id": "5dd4053893c7ed179401e257",
            "username": "sigit"
        },
        "title": "Count tags in tag array in a mongodb document inside a collection",
        "description": "<p style=\"margin-bottom: 1em; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif;",
        "createdAt": "2019-11-21T09:44:01.942Z",
        "updatedAt": "2019-11-21T09:48:10.410Z",
        "__v": 0
      }
      ```

- ## Seach Questions

  Search question by tag.

  - **URL**

    /question/search

  - **Method:**

    `GET`

  - **URL Params**
    ```json
    ?q=tag
    ```

  - **Data Body**
    none

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
        "upVotes": [
            "5dd4053893c7ed179401e257"
        ],
        "downVotes": [],
        "answers": [
            {
                "upVotes": [],
                "downVotes": [],
                "_id": "5dd65d52203854383bc56c2f",
                "userId": "5dd4053893c7ed179401e257",
                "questionId": "5dd65c61c0944c1b5757f8d1",
                "answer": "sadwq",
                "createdAt": "2019-11-21T09:48:02.288Z",
                "updatedAt": "2019-11-21T09:48:02.288Z",
                "__v": 0
            }
        ],
        "tags": [
            "mongodb",
            "aggregation-mongodb"
        ],
        "_id": "5dd65c61c0944c1b5757f8d1",
        "userId": {
            "_id": "5dd4053893c7ed179401e257",
            "username": "sigit"
        },
        "title": "Count tags in tag array in a mongodb document inside a collection",
        "description": "<p style=\"margin-bottom: 1em; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif;",
        "createdAt": "2019-11-21T09:44:01.942Z",
        "updatedAt": "2019-11-21T09:48:10.410Z",
        "__v": 0
      }
      ```

- ## Get Detail Question

  Get detail question.

  - **URL**

    /question/detail/:id

  - **Method:**

    `GET`

  - **URL Params**
    none

  - **Data Body**
    none

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
        "upVotes": [
            "5dd4053893c7ed179401e257"
        ],
        "downVotes": [],
        "answers": [
            {
                "upVotes": [],
                "downVotes": [],
                "_id": "5dd65d52203854383bc56c2f",
                "userId": "5dd4053893c7ed179401e257",
                "questionId": "5dd65c61c0944c1b5757f8d1",
                "answer": "sadwq",
                "createdAt": "2019-11-21T09:48:02.288Z",
                "updatedAt": "2019-11-21T09:48:02.288Z",
                "__v": 0
            }
        ],
        "tags": [
            "mongodb",
            "aggregation-mongodb"
        ],
        "_id": "5dd65c61c0944c1b5757f8d1",
        "userId": {
            "_id": "5dd4053893c7ed179401e257",
            "username": "sigit"
        },
        "title": "Count tags in tag array in a mongodb document inside a collection",
        "description": "<p style=\"margin-bottom: 1em; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif;",
        "createdAt": "2019-11-21T09:44:01.942Z",
        "updatedAt": "2019-11-21T09:48:10.410Z",
        "__v": 0
      }
      ```

- ## Get Trending Question

  Get trending question.

  - **URL**

    /question/trending

  - **Method:**

    `GET`

  - **URL Params**
    none

  - **Data Body**
    none

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      [
        {
            "_id": "mongodb",
            "count": 2
        },
        {
            "_id": "aggregation-mongodb",
            "count": 2
        },
        {
            "_id": "query-mongodb",
            "count": 1
        }
      ]
      ```

- ## Get My Question

  Get My question.

  - **URL**

    /question/myQuestion

  - **Method:**

    `GET`

  - **URL Params**
    none

  - **Data Body**
    none
  
  - **Headers**
    ```json
      "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
    ```

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
        "upVotes": [
            "5dd4053893c7ed179401e257"
        ],
        "downVotes": [],
        "answers": [
            {
                "upVotes": [],
                "downVotes": [],
                "_id": "5dd65d52203854383bc56c2f",
                "userId": "5dd4053893c7ed179401e257",
                "questionId": "5dd65c61c0944c1b5757f8d1",
                "answer": "sadwq",
                "createdAt": "2019-11-21T09:48:02.288Z",
                "updatedAt": "2019-11-21T09:48:02.288Z",
                "__v": 0
            }
        ],
        "tags": [
            "mongodb",
            "aggregation-mongodb"
        ],
        "_id": "5dd65c61c0944c1b5757f8d1",
        "userId": {
            "_id": "5dd4053893c7ed179401e257",
            "username": "sigit"
        },
        "title": "Count tags in tag array in a mongodb document inside a collection",
        "description": "<p style=\"margin-bottom: 1em; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif;",
        "createdAt": "2019-11-21T09:44:01.942Z",
        "updatedAt": "2019-11-21T09:48:10.410Z",
        "__v": 0
      }
      ```

  - ## Add Question

    Add question.

    - **URL**

      /question

    - **Method:**

      `POST`

    - **URL Params**
      none

    - **Data Body**
      ```
        title = [string] requited
        description = [string] required
        tags = [string] required
      ```
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 201 <br />
        **Content:** 

        ```json
        {
          "upVotes": [
              "5dd4053893c7ed179401e257"
          ],
          "downVotes": [],
          "answers": [
              {
                  "upVotes": [],
                  "downVotes": [],
                  "_id": "5dd65d52203854383bc56c2f",
                  "userId": "5dd4053893c7ed179401e257",
                  "questionId": "5dd65c61c0944c1b5757f8d1",
                  "answer": "sadwq",
                  "createdAt": "2019-11-21T09:48:02.288Z",
                  "updatedAt": "2019-11-21T09:48:02.288Z",
                  "__v": 0
              }
          ],
          "tags": [
              "mongodb",
              "aggregation-mongodb"
          ],
          "_id": "5dd65c61c0944c1b5757f8d1",
          "userId": {
              "_id": "5dd4053893c7ed179401e257",
              "username": "sigit"
          },
          "title": "Count tags in tag array in a mongodb document inside a collection",
          "description": "<p style=\"margin-bottom: 1em; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif;",
          "createdAt": "2019-11-21T09:44:01.942Z",
          "updatedAt": "2019-11-21T09:48:10.410Z",
          "__v": 0
        }
        ```

  - ## Up Vote Question

    Up Vote Question.

    - **URL**

      /question/upVote/:id

    - **Method:**

      `PATCH`

    - **URL Params**
      none

    - **Data Body**
      none
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        {
          "msg": "Success Upvote!"
        }
        ```

  - ## Down Vote Question

    Down Vote Question.

    - **URL**

      /question/downVote/:id

    - **Method:**

      `PATCH`

    - **URL Params**
      none

    - **Data Body**
      none
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        {
          "msg": "Cancel Upvote!"
        }
        ```

  - ## Delete Question

    Delete Question.

    - **URL**

      /question/delete/:id

    - **Method:**

      `DELETE`

    - **URL Params**
      none

    - **Data Body**
      none
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        {
          "msg": "Succes Delete!"
        }
        ```

  - ## Get Question answer

    Get Question answer.

    - **URL**
      /answer/getAll/:idQuestion

    - **Method:**

      `GET`

    - **URL Params**
      ```
        /answer/getAll/5dd65c61c0944c1b5757f8d1
      ```

    - **Data Body**
      none
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        [
          {
              "upVotes": [],
              "downVotes": [],
              "_id": "5dd65d52203854383bc56c2f",
              "userId": {
                  "_id": "5dd4053893c7ed179401e257",
                  "username": "sigit"
              },
              "questionId": "5dd65c61c0944c1b5757f8d1",
              "answer": "sadwq",
              "createdAt": "2019-11-21T09:48:02.288Z",
              "updatedAt": "2019-11-21T09:48:02.288Z",
              "__v": 0
          }
        ]
        ```

  - ## Add Answer

    Add Answer.

    - **URL**

      /addAnswer/:id

    - **Method:**

      `POST`

    - **URL Params**
      none

    - **Data Body**
      ```
        answer = [string] requited
      ```
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 201 <br />
        **Content:** 

        ```json
        {
          "upVotes": [],
          "downVotes": [],
          "_id": "5dd72c5d61b03130f599e759",
          "userId": {
              "_id": "5dd4053893c7ed179401e257",
              "username": "sigit"
          },
          "questionId": "5dd65c61c0944c1b5757f8d1",
          "answer": "inin untuk test add answer!",
          "createdAt": "2019-11-22T00:31:25.530Z",
          "updatedAt": "2019-11-22T00:31:25.530Z",
          "__v": 0
        }
        ```

  - ## Up Vote Answer

    Up Vote Answer.

    - **URL**

      /answer/upVote/:id

    - **Method:**

      `PATCH`

    - **URL Params**
      none

    - **Data Body**
      none
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        {
          "msg": "Success Upvote!"
        }
        ```

  - ## Down Vote Answer

    Down Vote Answer.

    - **URL**

      /answer/downVote/:id

    - **Method:**

      `PATCH`

    - **URL Params**
      none

    - **Data Body**
      none
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        {
          "msg": "Cancel Upvote!"
        }
        ```

  - ## Delete Answer

    Delete Answer.

    - **URL**

      /answer/delete/:id

    - **Method:**

      `DELETE`

    - **URL Params**
      none

    - **Data Body**
      none
    
    - **Headers**
      ```json
        "token": "jkn32kn34uhn43423lk2kjr2h332j3j22j2jn3kjn32kj2nk3jeh3kjr5kuffm"
      ```

    - **Success Response:**

      - **Code:** 200 <br />
        **Content:** 

        ```json
        {
          "msg": "Succes Delete!"
        }
        ```