# Docker Compose Nodejs, MongoDB, Angular, nginx example

## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MongoDB and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

## Housekeeping with docker
If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```

To stop all containers, reclaim space
```bash
docker stop $(docker ps -qa)
docker system prune -af --volumes
```


When you are running docker-compose and is faced with issues, then you can try to individually attack the problem by inspecting each individual images that you are trying to build and their associated configuration files. Go inside the folder related to the said image.
```bash
$ docker build -t meanweb-nginx --no-cache .
$ docker run -p 4200:80 meanweb-nginx   
```
