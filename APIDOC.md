# *app.js* API Documentation
This API enables basic user management functionalities, including user registration and login,
allowing for a simple yet effective way of managing user access and authentication.

## *User Registration*
**Request Format:** *localhost:8000/register*

**Request Type:** *POST*

**Returned Data Format**: Plain Text

**Description:** *Registers a new user by accepting a username and a password. It ensures that the
password is entered correctly by requiring it to be entered the same twice.*


**Example Request:** *As if done in thunderClient: localhost:8000/register
body -> form: username=johndoe
password=12345
re-enter-password=12345*

**Example Response:**
*Fill in example response in the ticks*

```
success
```

**Error Handling:**
*Password Mismatch: Status Code: 400
Response: error - passwords do not match*

## *User Login*
**Request Format:** *localhost:8000/login*

**Request Type:** *POST*

**Returned Data Format**: Plain Text

**Description:** *Allows users to log in by verifying their username and password against existing
records - from when they register (note this goes away once the page has been refreshed)*

**Example Request:** *As if done in thunderClient: localhost:8000/login
body -> form: username=johndoe
password=12345

**Example Response:**
*Fill in example response in the {}*

```
success
```

**Error Handling:**
*Incorrect Credentials:
Status Code: 400
Response: error - username or password is incorrect*
