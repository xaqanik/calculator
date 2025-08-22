# backend.tf
# This file configures the remote backend.
# The actual bucket name is passed dynamically from the CI pipeline
# using the `-backend-config` flag during `terraform init`.

terraform {
  backend "gcs" {
    # The bucket name will be provided by the CI pipeline
    # The prefix keeps the state file organized within the bucket.
    prefix = "terraform/state"
  }
}
