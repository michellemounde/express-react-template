# List of Areas to edit

## Backend

### Tesing routes with fetch
/*
const { csrfToken } = await fetch('/api/csrf/restore').then(res => res.json());

console.log(typeof csrfToken);
console.log(csrfToken);

fetch('/api/test', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken
    },
    body: JSON.stringify({ hello: 'world' })
  })
  .then(res => res.json())
  .then(data => console.log(data));
*/

### .env
- Go through and edit as needed

### csrf
- cookieName in doubleCsrf options



## Frontend
