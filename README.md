
0. Make sure you have docker installed and running.
Url: https://docs.docker.com/engine/install/

1. Start a Standalone Chrome Docker Container.
```
docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-chrome:latest
```
Source: https://hub.docker.com/r/selenium/standalone-chrome/

2. Install npm dependencies
```
npm install
```

3. Run test command.
```
npm run test
```

4. Screenshot of the tests output:
[Screenshot 2023-06-04 173541.png](./Screenshot%202023-06-04%20173541.png)
