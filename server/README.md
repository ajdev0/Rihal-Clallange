# seed data

run cmd

- mongoimport --db "rihal-challenge" --collection countries --drop --file data/seed/countries.json --jsonArray

- mongoimport --db rihal-challenge --collection classes --drop --file data/seed/classes.json --jsonArray

- mongoimport --db rihal-challenge --collection students --drop --file data/seed/students.json --jsonArray

- mongoimport --db rihal-challenge --collection users --drop --file data/seed/users.json --jsonArray

## Jwt Private Key

run cmd

- export rihal_jwtPrivateKey=mySecureKey

# Admin Login

Email : abraradam@gmail.com
password : Abrar099@
