# List of Areas to edit

## Backend

### Tesing routes with fetch
/*
const { csrfToken } = await fetch('/api/csrf/restore').then(res => res.json());

console.log(typeof csrfToken);
console.log(csrfToken);

fetch('/api/session', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken
    }
  })
  .then(res => res.json())
  .then(data => console.log(data));
*/

### .env
- Go through and edit as needed

### csrf
- cookieName in doubleCsrf options

### database
- If there is an error when migrating, check your migration file and make changes.
- If there is no error when migrating, but you want to change the migration file afterwards, undo the migration first, change the file, then migrate again.

- If there is an error with seeding, check your seed file and make changes.\
- If there is no error in seeding but you want to change the seed file, remember to undo the seed first, change the file, then seed again.



## Frontend
