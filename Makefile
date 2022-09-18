build:
	docker build -t scrummy .

docker-run:
	docker run --rm -ti -p 80:80 scrummy

cut-tag:
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)
