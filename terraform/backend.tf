terraform {
  backend "gcs" {
    bucket  = "trerraform191090"
    prefix  = "prod/terraform.tfstate"
  }
}