# Smart Testing in React

## Goal
The goal of this exercise is to learn how to testing things in React with Jest and Enzyme. There are thousands of tutorials online but there's no better way to learn than hacking it yourself.

## Requirements
You need to be comfortable writing JavaScript (ES6: Module system, class, JS context vs scope, arrow functions).
You need to have `node` (at least version 4.4.5) and git installed in your computer.

## Getting started:

Clone [this repository](https://github.com/fsdevlondon/smart_testing_react) and run `npm test` or `yarn test`

You can view the app running `npm start` or `yarn start`

`git clone https://github.com/fsdevlondon/smart_testing_react`
`smart_testing_react`
`npm install  or  yarn install`

Now you can run your application by running: `npm start  or  yarn start`

And do de exercises with testing by running: `npm test  or  yarn test`

## Exercise
1. Finish all tests in Components folder, here you will use a lot the Snapshot testing feature.
    - Test user 'clicks' in: AppNavDrawer, Login, Logout, Main, UserList, WorkshopList.

2. Finish the tests for all methods in the API folder, here you will learn to Mock.
    - It's nice if you use Async - Await.
    - Get help of the testUtils, you will find a mock build for that.

3. Finish the tests in Containers folder.
    - Remember to test as a "Component" and a "Connected component".
    - Do not forget to mock props, context and methods used by the components.

4. How you will test config/Routes ? Try it!

5. If you know Redux, feel free to have a look how we test Actions and Reducers Folders.


## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).
