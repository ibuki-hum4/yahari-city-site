variable "VERSION" {
  default = "latest"
}

group "default" {
  targets = ["app", "migrator"]
}

target "app" {
  target = "runner"
  tags   = ["docker.io/kemar1/yahari-city:${VERSION}", "docker.io/kemar1/yahari-city:latest"]
}

target "migrator" {
  target = "migrator"
  tags   = ["docker.io/kemar1/yahari-city-migrate:${VERSION}", "docker.io/kemar1/yahari-city-migrate:latest"]
}
