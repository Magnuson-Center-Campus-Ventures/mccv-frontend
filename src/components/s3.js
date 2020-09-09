
function getSignedRequest(file) {
  const fileName = encodeURIComponent(file.name);
  // hit our own server to get a signed s3 url
  return axios.get(`${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`);
}

function uploadFileToS3(signedRequest, file, url) {
  return new Promise((fulfill, reject) => {
    axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } }).then((response) => {
      fulfill(url);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function uploadImage(file) {
  return getSignedRequest(file).then((response) => {
    return uploadFileToS3(response.data.signedRequest, file, response.data.url);
  });
}