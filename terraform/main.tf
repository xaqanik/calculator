terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

resource "google_compute_instance" "app_server" {
  name         = "app-server-instance"
  machine_type = "e2-small"
  zone         = "${var.gcp_region}-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {} # Assigns an ephemeral public IP
  }

  // Add the public key for Ansible to connect
  metadata = {
    ssh-keys = "jenkins:${file("~/.ssh/id_rsa.pub")}"
  }
}

resource "google_compute_firewall" "allow_http" {
  name    = "allow-http-app"
  network = "default"
  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
  source_ranges = ["0.0.0.0/0"]
}