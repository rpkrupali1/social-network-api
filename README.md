# Social Network Api

This repository contains the code to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

# Table of contents

- [Technologies Used](#technologies-used)
- [Run Instructions](#run-instructions)
- [Application Details](#application-details)
- [Walkthrough Videos](#walkthrough-videos)
- [Test Instructions](#test-instructions)
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

| Feature          | Routes                                             |
| :--------------- | :------------------------------------------------- |
| Add User         | `POST` http://localhost:3001/api/users             |
| Get All Users    | `GET` http://localhost:3001/api/users              |
| Get Single Users | `GET` http://localhost:3001/api/users/{user_id}    |
| Update User      | `PUT` http://localhost:3001/api/users/{user_id}    |
| Delete User      | `DELETE` http://localhost:3001/api/users/{user_id} |

\*\* When you delete user, all thoughts associated with that users will also be deleted.

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

#### Friends

Another user can be linked as a friend
| Feature | Routes |
| :--- | :--- |
| Add Friend | `POST` http://localhost:3001/api/users/{user_id}/friends/{friends_user_id} |
| Remove Friend | `DELETE` http://localhost:3001/api/users/{user_id}/friends/{friends_user_id} |

Sample response when friend is added: You will see friend and friend count for that user. This will also be reflected in get user response.

```Json
{
	"_id": "62450a0caf20e63bafed687f",
	"username": "kp2",
	"email": "updatedKp@test.com",
	"thoughts": [
		"62450aa9af20e63bafed6884",
		"62450aafaf20e63bafed6887"
	],
	"friends": [
		"62450a05af20e63bafed687d"
	],
	"__v": 0,
	"friendCount": 1
}
```

#### Thoughts

User can share their thoughts with below routes:
| Feature | Routes |
| :--------------- | :------------------------------------------------- |
| Create Thought | `POST` http://localhost:3001/api/thoughts |
| Get All Thughts | `GET` http://localhost:3001/api/thoughts/ |
| Get Single Thought | `GET` http://localhost:3001/api/thoughts/{thought_id} |
| Update Thought | `PUT` http://localhost:3001/api/thoughts/{thought_id}|
| Delete User | `DELETE` http://localhost:3001/api/thoughts/{thought_id} |

Create Thought request sample

```Json
{
	"thoughtText": "Dream is not the the thing that you see in sleep but is that Thing that does not let you sleep",
	"username": "krupali",
	"userId":"62450a0caf20e63bafed687f"
}
```

Create Thought response sample after it is associated to user:

```Json
{
	"_id": "62450a0caf20e63bafed687f",
	"username": "kp2",
	"email": "updatedKp@test.com",
	"thoughts": [
		"62450aa9af20e63bafed6884"
	],
	"friends": [],
	"__v": 0,
	"friendCount": 0
}
```

Get Thoughts response sample:

```Json
[
	{
		"_id": "62450aafaf20e63bafed6887",
		"thoughtText": "Follow your dreams",
		"createdAt": "March 30th, 2022 at 8:50 pm",
		"username": "dreamAchiever",
		"userId": "62450a0caf20e63bafed687f",
		"reactions": [],
		"reactionCount": 0
	}
]
```

#### Reactions

User can react to thoughts by any user
| Feature | Routes |
| :--- | :--- |
| Add Reaction | `POST` http://localhost:3001/api/thoughts/{thought_id}/reactions |
| Remove Reaction | `DELETE` http://localhost:3001/api/thoughts/{thought_id}/reactions/{reaction_id} |

Add reaction request sample

```Json
{
	"reactionBody" : "👍",
	"username": "dan"
}
```

Add reaction response sample: All associated response for that thought will be returned

```Json
{
	"_id": "62450aa9af20e63bafed6884",
	"thoughtText": "Dream is not the the thing that you see in sleep but is that Thing that does not let you sleep",
	"createdAt": "March 30th, 2022 at 8:50 pm",
	"username": "krupali",
	"userId": "62450a0caf20e63bafed687f",
	"reactions": [
		{
			"reactionBody": "It's right, for dreams, we dont have to sleep ",
			"username": "day-dreamer",
			"createdAt": "March 30th, 2022 at 9:03 pm",
			"_id": "62450c3ad7aa8116ed5f9bd3",
			"reactionId": "62450c3ad7aa8116ed5f9bd4"
		},
		{
			"reactionBody": "👍",
			"username": "dan",
			"createdAt": "March 30th, 2022 at 9:03 pm",
			"_id": "62450c41d7aa8116ed5f9bd6",
			"reactionId": "62450c41d7aa8116ed5f9bd7"
		}
	],
	"__v": 0,
	"reactionCount": 2
}
```

## Walkthrough Videos

User calls

https://user-images.githubusercontent.com/38411252/161318693-4f9c8b39-7cac-437a-921a-ddc20a18bec0.mp4

Friends calls

https://user-images.githubusercontent.com/38411252/161318677-d6c3328c-9953-4176-85ab-3c788caa5f72.mp4

Thought calls

https://user-images.githubusercontent.com/38411252/161318668-f917ad89-d1d9-45a6-b56e-2454fab1383e.mp4

Reactions calls

https://user-images.githubusercontent.com/38411252/161318632-12b8bd47-c74d-4f32-aed6-0bc5cc1bcce1.mp4

Delete Calls

https://user-images.githubusercontent.com/38411252/161318663-99b10dd5-ef57-49e8-aba4-9b82107e0372.mp4

## Test Instructions

If you would like to test, then use `Insomnia` collection given [here](./Assets/Insomnia_2022-04-01.json)

## Contributor

![](https://img.shields.io/badge/Created%20by-Krupali%20Pilgulwar-blue?style=for-the-badge)
