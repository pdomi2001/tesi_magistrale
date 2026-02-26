let cache = {};
const request = (url, params = {}, method = "GET", customHeaders = {}) => {
  let cacheKey = JSON.stringify({ url, params, method });
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // Definiamo le opzioni base inclusi gli headers
  let options = {
    method,
    headers: {
      "Content-Type": "application/json", // Default per API moderne
      ...customHeaders
    }
  };  if ("GET" === method) {
    url += "?" + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  const result = fetch(url, options).then((response) => response.json());
  cache[cacheKey] = result;

  return result;
};
const get = (url, params, headers) => request(url, params, "GET", headers);
const post = (url, params, headers) => request(url, params, "POST", headers);

