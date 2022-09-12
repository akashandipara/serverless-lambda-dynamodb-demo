## Steps:
```
 - create env file from .env.example file and set env variables
 - npm install
 - To run socket server:
    ==> ts-node-esm src/index.ts
    ==> open browser and call the localhost request; port = 8088
```

### Deployment

```
$ serverless deploy
```


### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Altername Way:

```
serverless offline start
```

To Run socket.io server:
```
ts-node-esm index.ts
```


## API Endpoints:

### Hosted Api Gateway end-points to test:
 - create user: POST | https://r7ns5tacf0.execute-api.us-east-1.amazonaws.com/user/register 
 - list users:  GET | https://r7ns5tacf0.execute-api.us-east-1.amazonaws.com/user/list 
 - get user by emailId:  GET | https://r7ns5tacf0.execute-api.us-east-1.amazonaws.com/user/{email}
 - list message board:  GET | https://r7ns5tacf0.execute-api.us-east-1.amazonaws.com/messageBoard/list
 - create message board: POST | https://r7ns5tacf0.execute-api.us-east-1.amazonaws.com/messageBoard/create
 - add post message:   POST | https://r7ns5tacf0.execute-api.us-east-1.amazonaws.com/postMessage/create


### To test api end-points in local environment using serverless-offline plugin:

- create user:  POST | http://localhost:3000/user/register
- list users:   GET  | http://localhost:3000/user/list  
- get user by emailId:  GET  | http://localhost:3000/user/{email} 
- create message board:   POST | http://localhost:3000/messageBoard/create 
- list message board:   GET  | http://localhost:3000/messageBoard/list 
- add post message: POST | http://localhost:3000/postMessage/create