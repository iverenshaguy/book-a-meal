#!/usr/bin/env bash
# Generate local HTTPS certs with mkcert for webpack-dev-server.
# Requires mkcert: https://github.com/FiloSottile/mkcert
#   macOS: brew install mkcert && mkcert -install
#   Linux: see project README
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CERTS_DIR="$(cd "$SCRIPT_DIR/../certs" && pwd)"

if ! command -v mkcert &> /dev/null; then
  echo "mkcert is not installed. Install it first:"
  echo "  macOS:   brew install mkcert && mkcert -install"
  echo "  Linux:   https://github.com/FiloSottile/mkcert#installation"
  exit 1
fi

mkdir -p "$CERTS_DIR"
mkcert -install
mkcert -cert-file "$CERTS_DIR/server.crt" -key-file "$CERTS_DIR/server.key" localhost 127.0.0.1 book-a-meal.local

echo "Certificates written to $CERTS_DIR/"
echo "  server.crt  (certificate)"
echo "  server.key  (private key)"
echo "Run 'yarn start:dev' and open https://book-a-meal.local:3000"
