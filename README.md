# Archiver (WIP)

This project's meant to be a way for me to archive websites. 

The aim is to archive screenshots, PDFs, and simplified articles (using Mozilla's Readability project).

## Configuration

Default configuration settings are stored in `default.config.yml`. They can be overridden in a file with the same structure called `config.yml`. The default config is stored in git, whereas your local config is not.

Plans exist to provide another level of config via environment variables.

## Dependencies

- [micro](https://github.com/zeit/micro) for node to create microservices
- [puppeteer](https://github.com/GoogleChrome/puppeteer) from Google to access headless Chrome
- [yaml-config-loader](https://github.com/tizzo/yaml-config-loader) provides hierarchical config loading
