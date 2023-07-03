# hostel-backend

clone the repository 
```bash
git clone https://github.com/muhammedsamal/hostel-backend
```
change the directory
```bash
cd hostel-backend
```
install packages
```bash
npm i
```
run
```bash
npm start
```

# Authentication

>http://localhost:8080/api/auth/student/signup
##### POST
```json
{
	"name": "john",
	"email": "john@gmail.com",
	"password": "12345678"
}
```
#####  output
```json
{
    "result": {
        "name": "john",
        "email": "john@gmail.com",
        "password": "$2a$10$6UtoeobAivfX4WY5tU.OU.gBKk/mPpM8AZnLLd4L1oGMalEx2iSSO",
        "isAdmin": false,
        "_id": "64a18c0d449ec7f0db22d53e",
        "createdAt": "2023-07-02T14:39:09.726Z",
        "updatedAt": "2023-07-02T14:39:09.726Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NGExOGMwZDQ0OWVjN2YwZGIyMmQ1M2UiLCJpYXQiOjE2ODgzMDg3NDksImV4cCI6MTY4ODMxMjM0OX0.Peg5K88jZN_15CUPotyzQ5JLCitOKi0XGgm7fzAbg7c"
}
```

>http://localhost:8080/api/auth/student/signin
##### POST
```json
{
	"email": "john@gmail.com",
	"password": "12345678"
}
```
#### output
```json
{
    "result": {
        "_id": "64a18c0d449ec7f0db22d53e",
        "name": "john",
        "email": "john@gmail.com",
        "password": "$2a$10$6UtoeobAivfX4WY5tU.OU.gBKk/mPpM8AZnLLd4L1oGMalEx2iSSO",
        "isAdmin": false,
        "createdAt": "2023-07-02T14:39:09.726Z",
        "updatedAt": "2023-07-02T14:39:09.726Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NGExOGMwZDQ0OWVjN2YwZGIyMmQ1M2UiLCJpYXQiOjE2ODgzMDg4MDMsImV4cCI6MTY4ODMxMjQwM30.Xgh6hKvbBq0UubvGjBEo9BYZ22J4LHoP0kcwm2BN_Gc"
}
```

# Mess
#### POST
>http://localhost:8080/api/mess/request-messoff
```json
{
	"student":  "64a18563d11471f64ce51402",
	"leaving_date":  "2023-07-10",
	"return_date":  "2023-07-12"
}
```
output
```json
{
    "message": "mess off request sent successfully"
}
```

#### GET
>http://localhost:8080/api/mess/count-messoff
```json
{
	"student":  "64a18563d11471f64ce51402"
}
```
output
```json
{
    "list": [
        {
            "_id": "64a18cc6449ec7f0db22d541",
            "student": "64a18563d11471f64ce51402",
            "leaving_date": "2023-07-10T00:00:00.000Z",
            "return_date": "2023-07-12T00:00:00.000Z",
            "status": "pending",
            "request_date": "2023-07-02T14:42:14.536Z",
            "__v": 0
        }
    ],
    "approved": 0
}
```
#### GET
>http://localhost:8080/api/mess/list-messoff

output
```json
{
	"list":  [],
	"approved":  0,
	"rejected":  0
}
```

#### PUT
>http://localhost:8080/api/mess/update-messoff
```json
{
	"id":  "64a18cc6449ec7f0db22d541",
	"status":  "approved"
}
```

output

```json
{
    "messOff": {
        "_id": "64a18cc6449ec7f0db22d541",
        "student": "64a18563d11471f64ce51402",
        "leaving_date": "2023-07-10T00:00:00.000Z",
        "return_date": "2023-07-12T00:00:00.000Z",
        "status": "approved",
        "request_date": "2023-07-02T14:42:14.536Z",
        "__v": 0
    }
}
```
