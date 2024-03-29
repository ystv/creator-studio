# creator-studio

This app is supposed to replace the current "watch admin" interface and make it more accessible to people.

## Developing

Run `yarn install` to get all the dependencies installed. Configure the `.env` file with the parameters listed below (likely want to set `SECURITY_TYPE` to `NONE` for local dev). Then run `yarn start`.

Since this is very dependant on HTTP APIs you will need to either change your hosts file (`/etc/hosts` on Linux), since CORS will become an issue if you try to use creator-studio by IP address, to a un-used subdomain with a running web-api instance available on the same domain (can be run local or remote). i.e. you could set `local.ystv.co.uk` pointing to `127.0.0.1` and have the web-api endpoint set to `api.ystv.co.uk` (remote) or `local.ystv.co.uk:8081` (local). This will allow you to use the domain's web-auth instance since cookies are shared across the entire domain.

The other option is to add a `"proxy"` key to the `package.json`, with a value of a local web-api instance and set the web-api base URL to `localhost:3000`. Which allows you to avoid CORS, but limits you to only areas which is pure web-api.

When in "production" mode (`SECURITY_TYPE = OAUTH`), it will use the official endpoints so an easy way to use the production token as well is modify your `/etc/hosts` and use a generic ystv sub-domain and point that at your localhost so your browser will then use the official token but you are still running creation-studio locally.

## .env files

You should have the following records for it to be functional:

- `REACT_APP_API_BASEURL` - A [web-api](https://github.com/ystv/web-api) instance.
- `REACT_APP_SECURITY_TYPE` - Either `OAUTH` (in production) or `NONE` (local development).
- `REACT_APP_SECURITY_BASEURL` - A [web-auth](https://github.com/ystv/web-auth) instance.
- `REACT_APP_UPLOAD_ENDPOINT` - A [tusd](https://github.com/tus/tusd) instance.
- `REACT_APP_MYTV_BASEURL` - A [MyTV](https://github.com/ystv/my-tv) instance.

When developing create a `.env.local` in order to override the default. You will need to restart the development server if any changes to the environment files do occur.

## Autogenerated things

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If developing on Firefox, please be aware a CORS issue will occur if attempting to upload, use Chrome as an alternative to bypass this issue.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
