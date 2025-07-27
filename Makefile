.PHONY: help dev build deploy clean install

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start development server with live reload
	npm start

build: ## Build the site for production
	npm run build
	npm run build:css

deploy: build ## Build and prepare for deployment
	touch _site/.nojekyll

clean: ## Clean build directory
	rm -rf _site

install: ## Install dependencies
	npm ci

test: build ## Test the production build locally
	cd _site && python3 -m http.server 8000