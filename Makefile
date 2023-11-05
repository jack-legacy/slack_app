.PHONY: app

TMP_CONTAINER_NAME := tmp_container
APP_CONTAINER_NAME := app_container

IMAGE_NAME := node
IMAGE_VERSION := 20.9.0

WORKDIR := /app

# define standard colors
ifneq (,$(findstring xterm,${TERM}))
	BLACK        := $(shell tput -Txterm setaf 0)
	RED          := $(shell tput -Txterm setaf 1)
	GREEN        := $(shell tput -Txterm setaf 2)
	YELLOW       := $(shell tput -Txterm setaf 3)
	LIGHTPURPLE  := $(shell tput -Txterm setaf 4)
	PURPLE       := $(shell tput -Txterm setaf 5)
	BLUE         := $(shell tput -Txterm setaf 6)
	WHITE        := $(shell tput -Txterm setaf 7)
	RESET := $(shell tput -Txterm sgr0)
else
	BLACK        := ""
	RED          := ""
	GREEN        := ""
	YELLOW       := ""
	LIGHTPURPLE  := ""
	PURPLE       := ""
	BLUE         := ""
	WHITE        := ""
	RESET        := ""
endif

## Server
app: node_modules ## Run server with docker
	docker run --rm -it --init -v ${CURDIR}:${WORKDIR} --env-file=.env -p 3000:3000 -w ${WORKDIR} --name ${APP_CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_VERSION} npm start
node_modules: package.json package-lock.json
	docker run --rm -it --init -v ${CURDIR}:${WORKDIR} --env-file=.env -w ${WORKDIR} ${IMAGE_NAME}:${IMAGE_VERSION} npm ci

## Attach
attach: ## Attach to running container
	docker exec -it ${APP_CONTAINER_NAME} bash

## Help:
help: ## Show this help.
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = "## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-30s${GREEN}%s${RESET}\n", substr($$1, 1, length($$1)-2), $$2} \
		else if (/^## .*$$/) {printf "  ${LIGHTPURPLE}%s${RESET}\n", $$2} \
		}' $(MAKEFILE_LIST)
