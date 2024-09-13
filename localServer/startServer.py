import http.server
import ssl
import socketserver

# Define the port on which the server will listen
PORT = 4443  # HTTPS default is 443, but we use 4443 to avoid permission issues
DOMAIN = '0.0.0.0'

# Handler to serve HTTP requests (can use SimpleHTTPRequestHandler for static files)
Handler = http.server.SimpleHTTPRequestHandler

# Create the HTTP server instance
httpd = socketserver.TCPServer((f'{DOMAIN}', PORT), Handler)

# Wrap the server with SSL, using the generated certificate and private key
httpd.socket = ssl.wrap_socket(httpd.socket,
                               keyfile="server.pem",  # Path to the key file
                               certfile="server.pem",  # Path to the certificate file
                               server_side=True)

print(f"Serving on https://{DOMAIN}:{PORT}")
httpd.serve_forever()