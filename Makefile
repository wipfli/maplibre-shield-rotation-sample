DC_OPTS ?= --rm --user=$(shell id -u):$(shell id -g)

OMT_HOST := http://$(firstword $(subst :, ,$(subst tcp://,,$(DOCKER_HOST))) localhost)
export OMT_HOST

TPORT ?= 8080
export TPORT

run: start-tileserver
	python3 -m http.server 1776

start-tileserver: shutdown
	@echo " "
	@echo "***********************************************************"
	@echo "* "
	@echo "* Download/refresh maptiler/tileserver-gl docker image"
	@echo "* see documentation: https://github.com/maptiler/tileserver-gl"
	@echo "* "
	@echo "***********************************************************"
	@echo " "
	docker pull maptiler/tileserver-gl
	@echo " "
	@echo "***********************************************************"
	@echo "* "
	@echo "* Start maptiler/tileserver-gl "
	@echo "*       ----------------------------> check $(OMT_HOST):$(TPORT) "
	@echo "* "
	@echo "***********************************************************"
	@echo " "
	docker run -d $(DC_OPTS) -it --name tileserver-gl -v $$(pwd)/data:/data -p $(TPORT):$(TPORT) maptiler/tileserver-gl --port $(TPORT)

shutdown:
	docker stop tileserver-gl || true
