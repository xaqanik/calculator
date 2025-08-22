# outputs.tf

# Output the public IP address of the instance
output "instance_ip" {
  description = "The public IP address of the deployed VM instance."
  value       = google_compute_instance.app_instance.network_interface[0].access_config[0].nat_ip
}
