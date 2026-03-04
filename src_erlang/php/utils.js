let cache = {};
const request = (url, params = {}, method = "GET") => {
  let cacheKey = JSON.stringify({ url, params, method });
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  let options = {
    method
  };
  if ("GET" === method) {
    url += "?" + new URLSearchParams(params).toString();
  } else {
    /* options.body = JSON.stringify(params); */
    options.body = typeof params === "string" ? params : JSON.stringify(params);
  }

  const result = fetch(url, options).then((response) => response.json());
  cache[cacheKey] = result;

  return result;
};
const get = (url, params) => request(url, params, "GET");
const post = (url, params) => request(url, params, "POST");

