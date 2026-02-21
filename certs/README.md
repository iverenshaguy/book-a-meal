# Local HTTPS certificates

Certificates in this folder are used by the webpack dev server so the app runs over **https://book-a-meal.local:3000**.

## One-time setup

1. **Point the hostname at your machine** (once per machine). Add to `/etc/hosts`:
   ```
   127.0.0.1   book-a-meal.local
   ```

2. Install **mkcert**:  
   - macOS: `brew install mkcert`  
   - Linux: see [mkcert](https://github.com/FiloSottile/mkcert#installation)

3. Install the local CA (once per machine):  
   `mkcert -install`

4. Generate certs for this project:  
   `yarn generate-certs`

This creates `server.crt` and `server.key` in this directory. They are gitignored; each developer (and CI) can generate their own.

## Running the app with HTTPS

After generating certs, start the dev server:

```bash
yarn dev
```

The app opens at **https://book-a-meal.local:3000**. If the cert files are missing, the dev server still runs over HTTP (and will open the default URL).
