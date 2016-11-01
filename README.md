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
At startup, the server will access the embedded NoSQL datastore and index all the books. This might take some time (up to 3 minutes for a database with 1 Million books).
For this reason the project comes with a pre-generated database with only 1000 records.


#### Wait! where are my 1 Million books then? ####

No worries. If you want to enjoy browing through 1 Million books you can just generate a new DB! The project comes with a generator script.
Just run it:

```
npm run generate
```

...and take a cup of coffee. the generation should take about 2-3 minutes (on a fairly recent machine).
After that, you can start the server again; The indexing process will obviously take some time (the aforementioned 2-3 minutes) and then you'll be ready to fly


