# uploader

Uploader is simple file upload application developed to understand the concept behind file uploading process. The selected file sent to the server as chunks and later the file is pushed to cloudinary.

### Run uploader

Clone the project  **uploader**

Move to uploader directory.

```text
cd uploader

```

Install dependencies

```text
npm install

```

Setup environment varibles

- `cp .env.sample .env`, and modify as required. You need a cloudinary account and its api credentials  to push the image to cloudinary. [Create a cloudinary account](https://cloudinary.com/users/register_free).

Run uploader

```text
npm start or npm run dev

```

uploader will be running  at

```text
localhost: PORT
