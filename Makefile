CONTAINER_NAME=ibooks
IMAGE_NAME=eugeneware/ibooks

deploy:
	(docker stop ${CONTAINER_NAME} 2>/dev/null || echo "No container to stop") && \
	(docker rm -f -v ${CONTAINER_NAME} 2>/dev/null || echo "No container to remove") && \
	(docker rmi -f ${IMAGE_NAME} 2>/dev/null || echo "No image to remove")  && \
	docker build -t ${IMAGE_NAME} . && \
	docker run --restart=always -d --name=${CONTAINER_NAME} --env-file=./ENV ${IMAGE_NAME}

start:
	docker start ${CONTAINER_NAME}

stop:
	docker stop ${CONTAINER_NAME}

restart: stop start

open:
	open http://`cat ./ENV | grep VIRTUAL_HOST | cut -d '=' -f 2`

logs:
	docker logs -f ${CONTAINER_NAME}

destroy:
	(docker stop ${CONTAINER_NAME} 2>/dev/null || echo "No container to stop") && \
	(docker rm -f -v ${CONTAINER_NAME} 2>/dev/null || echo "No container to remove") && \
	(docker rmi -f ${IMAGE_NAME} 2>/dev/null || echo "No image to remove")

.PHONY: deploy logs destroy open start stop restart
