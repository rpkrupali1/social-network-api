# Social Network Api

This repository contains the code to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

# Table of contents

- [Technologies Used](#technologies-used)
- [Run Instructions](#run-instructions)
- [Application Details](#application-details)
- [Test Instructions](#test-instructions)
- [More Information](#more-information)
- [Contributors](#contributor)
- [License](#license)

## Technologies Used
![](https://img.shields.io/badge/Database-MongoDB-yellow?style=flat-square&logo=mongoDB)  
![](https://img.shields.io/badge/npm%20package-express-orange?style=flat-square&logo=npm) 
![](https://img.shields.io/badge/npm%20package-mongoose-cyan?style=flat-square&logo=npm) 
![](https://img.shields.io/badge/npm%20package-moment-%3CCOLOR%3E?style=flat-square&logo=npm)

We are using MongoDB as it is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data.

## Run Instructions
To start the server, run `npm start` in your command line

## Application Details

### User Story
    AS A social media startup
    I WANT an API for my social network that uses a NoSQL database
    SO THAT my website can handle large amounts of unstructured data

### Acceptance Criteria
    GIVEN a social network API
    WHEN I enter the command to invoke the application
    THEN my server is started and the Mongoose models are synced to the MongoDB database
    WHEN I open API GET routes in Insomnia for users and thoughts
    THEN the data for each of these routes is displayed in a formatted JSON
    WHEN I test API POST, PUT, and DELETE routes in Insomnia
    THEN I am able to successfully create, update, and delete users and thoughts in my database
    WHEN I test API POST and DELETE routes in Insomnia
    THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

### API Routes
#### Users
| Feature | Routes |
| :--- | :--- | 
| Add User | `POST` http://localhost:3001/api/users |
| Get All Users | `GET` http://localhost:3001/api/users |
| Get Single Users | `GET` http://localhost:3001/api/users/{user_id} |
| Update User | `PUT` http://localhost:3001/api/users/{user_id} |
| Delete User | `DELETE` http://localhost:3001/api/users/{user_id} |

User Create Sample request body:
```Json
{
    "username": "kp2",
    "email":"kptest2@test.com"
}
```
User Create Sample response body:
```Json
{
	"username": "kp2",
	"email": "kptest2@test.com",
	"thoughts": [],
	"friends": [],
	"_id": "62450a0caf20e63bafed687f",
	"__v": 0,
	"friendCount": 0
}
```
## Test Instructions
If you would like to test, then use `Insomnia` collection given here

## Contributor

![](https://img.shields.io/badge/Created%20by-Krupali%20Pilgulwar-blue?style=for-the-badge) 
