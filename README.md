TechTest - A simple Books browsing/querying with 1 Million records
==========================================================================

### Screenshots ###

![ScreenShot](/README/casumo-books.jpg?raw=true)

### Technologies Used ###

- React 15.4
- Redux
- BabelJS 
- Webpack
- Express (I HAD to have a backend)
- Node Fibers
- TingoDB (embedded NoSQL datastore)
- Mocha/Chai/Sinon (the usual suspects) for a glimple of testing

### Features ###

- It does what it states on the tin: it allows you to browse (by category and author gender) through an embedded database with 1 Million books
- Includes a generator script that allows you to create a new Database with random generated content (author names, book titles, rating...)
- Express server with open API (open the browser and just hit http://localhost:8080/api/category/all as an example)
- basic responsive interface (I didn't spend too much on this)
- definitely NOT production ready :p


### How to run this project ###

I'm assuming that node and npm are already installed in the development machine.
After cloning the project, just run npm install:

```
npm install
```

You're almost ready to go!
You can start the server just running the following command:

```
npm start
```

This will run the unit tests and start the server.
At startup, the server will access the embedded NoSQL datastore and index all the books. This might take some time with a 1 Million books DB (around 3 minutes).
For this reason the project comes with a pre-generated database with only 10000 records, that keeps the indexing time down to a few seconds.


#### Wait! where are my 1 Million books then? ####

No worries. If you want to enjoy browing through 1 Million books you can just generate a new DB! The project comes with a generator script.
Just run it:

```
npm run generate <optional number of books to generate>
```

If the number of books to generate is not provided, the script will generate 1.000.000 books. 
In that case...take a cup of coffee. the generation should take about 2-3 minutes (on a fairly recent machine).

After that, you can start the server again; The indexing process at startup will now take much more time (the aforementioned 2-3 minutes) and then you'll be ready to fly


