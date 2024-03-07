# How to deploy a react app cloud foundary

**Step 1 :**
First we need to add a `start` script on the `package.json` file.

```Json
 "scripts": {
  "dev": "vite --port 5001 --strictPort",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview --port 5001 --strictPort",
  "start": "vite preview --port 5001 --strictPort"
 },
```

This start script is required to run the app on the cloud foundary. Otherwise you will get an error saying `start script not found`

**Step 2 :**
Now we need to bulid the project. I'm using `pnpm` so I will run `pnpm run build`. It will create `dist` folder on the root of your project.

**Step 3 :**
Now we need to create a `manifest.yml` file on the root of the project

```yml
applications:
  # name of your application. It will visible on your instance
  - name: process-control-flow-v2
    #   How many instance you want of your application
    instances: 1
    # Add name of your buildpack of provide a link of your buildpack
    buildpack: https://github.com/cloudfoundry/staticfile-buildpack.git
    # Define how much memory you want for your instance
    memory: 256M
    # Location of your build file
    path: ./dist/
```

**Optional (Only if you get an error saying `missing Staticfile`)**
Now we need to add a file in the root of the `dist` called `Staticfile` and we need to add this `pushstate: enabled` in this file.

**Step 3 :**
Now we need to login into your cloud foundary account. Open your terminal and run the following commands

```bash
cf login
#Now it will ask for your email address
youremail@domain.com
#now it will ask for your password
mysecretpassword
```

Note: Make sure you have installed cf on your computer

**Step 5 :**
Now all we need to run is `cf push` . It will take a few minutes and it should return you a status of you application. Now go to you account and check if its running.

## Happy coding😎😎
