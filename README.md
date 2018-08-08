# quizer-backend
Quiz Web app about food waste! Tracks user login and quiz completion! Frontend is served by backend!


# Run locally:
> Requires node and MongoDB
1. Clone repo locally
2. Run `npm run mongod` or `yarn mongod` to host a local Mongo DB
3. Run `npm run build-frontend` or `yarn build-frontend` to build frontend.
4. In Postman, send both requests in it: https://www.getpostman.com/collections/14b3e57e457b1a524915
    > Keep login info for your use!
5. Run `npm run local` of `yarn local` to start server that connects to DB and serves frontend.
6. Go to `localhost:3001`, login with key generated from postman to try it out!

# Screenshots
Welcome Screen (after login):
![Welcome Screen](/screenshots/welcome-screen.png?raw=true "Welcome Screen")

Basic Quiz Walkthrough (after login):
![Basic Quiz Walkthrough](/screenshots/food-waste-quiz.gif?raw=true "Basic Quiz Walkthrough")

