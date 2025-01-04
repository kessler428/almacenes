const baseUrl = import.meta.env.VITE_API_URL;

const fetchSinToken = (endpoint, data, method = "GET") => {

  const url = `${baseUrl}/${endpoint}`;
  
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; 
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });
  }
};

const fileUploadFetch = (endpoint, name, file, method) => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  const formData = new FormData();
  formData.append(name, file.uploadedFiles);

  return fetch(url, {
    method,
    headers: {
      Authorization: token,
    },
    body: formData,
  });
};


export { fetchSinToken, fetchConToken, fileUploadFetch };
