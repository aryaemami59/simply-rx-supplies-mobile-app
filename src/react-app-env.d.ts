/// <reference types="react-scripts" />

declare module "react-native-fetch-polyfill" {
  export default function fetchPolyfill(input, init) {
    return new Promise<Response>(function (resolve, reject) {
      const request = new Request(input, init);
      const xhr = new XMLHttpRequest();

      /* @patch: timeout */
      if (init && init.timeout) {
        xhr.timeout = init.timeout;
      }
      /* @endpatch */

      xhr.onload = function () {
        const options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || ""),
        };
        options.url =
          "responseURL" in xhr
            ? xhr.responseURL
            : options.headers.get("X-Request-URL");
        const body = "response" in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };

      xhr.ontimeout = function () {
        reject(new TypeError("Network request failed"));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === "include") {
        xhr.withCredentials = true;
      }

      if ("responseType" in xhr && support.blob) {
        xhr.responseType = "blob";
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(
        typeof request._bodyInit === "undefined" ? null : request._bodyInit
      );
    });
  }
}
