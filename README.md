# How to deploy a react app cloud foundary

**Step 1 :**
First we need to add a `start` script on the `package.json` file.

```Json
 "scripts": {
		"dev": "vite --port 5001 --strictPort --host",
		"build": "tsc && vite build",
		"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
		"preview": "vite preview --port 5001 --strictPort --host",
		"start": "vite preview --port 5001 --strictPort --host"
 }
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

**Optional Step (Only if you get an error saying `missing Staticfile`) :**

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

## Running with docker

To run the app as production version just follow the steps below

**Step 1 :**
create a file called `Dockerfile` on the root of your project and paste this code

```dockerfile
#base image
FROM node:20-alpine

#create a group called app and a user called app
RUN addgroup app && adduser -S -G app app

#switch to user
USER app

#create a working directory
WORKDIR /app

#copy package.json and package-lock.json to the root of the docker's root directory
COPY package*.json ./

#switch to root user
USER root

#take the ownership of the "app" from the user so user cannot modify anything
RUN chown -R app:app .

#switch to user
USER app

#installl all the depenancy
RUN npm install

#copy everything
COPY . .

#expose 5001 port
EXPOSE 5001

#start production server. If you wish to run dev server just replace the "start" with "dev"
CMD ["npm", "run", "start"]
```

**Step 2 :**

create `.dockerignore` file. like `.gitignore` file it will ignore the files or directories from copying that ius mentioned on this file. In my case i want to exclude the node_modules folder. so i will add the `node_modules` in the `.dockerignore`.

```dockerfile
node_modules
```

**Step 3 :**

```bash
docker build -t pcf_frontend .

```

**Step 2 :**

```bash
docker run -p 5001:5001 pcf_frontend
```

It should run the production server for you.

If you wist to start dev server instead, follow the steps below

**Step 1 :**
create `Dockerfile` in the root of your project and add this in it

```dockerfile
#base image
FROM node:20-alpine

#create a group called app and a user called app
RUN addgroup app && adduser -S -G app app

#switch to user
USER app

#create a working directory
WORKDIR /app

#copy package.json and package-lock.json to the root of the docker's root directory
COPY package*.json ./

#switch to root user
USER root

#take the ownership of the "app" from the user so user cannot modify anything
RUN chown -R app:app .

#switch to user
USER app

#installl all the depenancy
RUN npm install

#copy everything
COPY . .

#expose 5001 port
EXPOSE 5001

#start dev server. If you wish to run production server just replace the "dev" with "start"
CMD ["npm", "run", "dev"]
```

**Step 2 :**
create `.dockerignore` file. like `.gitignore` file it will ignore the files or directories from copying that ius mentioned on this file. In my case i want to exclude the node_modules folder. so i will add the `node_modules` in the `.dockerignore`.

```dockerfile
node_modules
```

**Step 3 :**
Let's build the image

```bash
docker build -t pcf_frontend .
```

**Step 4 :**
In this step if you just start the dev server like shown in the production version it will still work, but it won't reflect if you change automatically you have to maually build the image again and run it, Which i very inefficient. So we need to create a persistance volume for the node_modules and for the source code and we need the link the docker with the current directory where our source code located. Let's see how can we do that.

```bash
docker run -p 5001:5001 -v "$(pwd):/app" -v /app/node_modules pcf_frontend
```

It should start your dev sever and it should immediately reflect the changes you made on you source code

## Happy coding😎😎
