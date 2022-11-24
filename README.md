# uploader

Uploader is simple file upload service  based on [Hussein Nasser's Building an upload backend service with No libraries, No forms, just vanilla JS with progress)](https://www.youtube.com/watch?v=Ix-c2X7dlks) with some additional changes added to understand the concept behind file uploading process. As of now this will support only single image file but this can be later modified to support more file type. The selected file is sent to the server as chunks and later the file is pushed to cloudinary.

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

```

## References
#### [UI reference](https://codepen.io/uixmat/pen/yadZXv)

## Guidelines
#### [Contribution guidelines](https://github.com/iathul/uploader/blob/master/CONTRIBUTING.md)
