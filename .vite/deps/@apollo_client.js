import {
  require_react
} from "./chunk-QY3QVPNU.js";
import {
  ApolloError,
  PROTOCOL_ERRORS_SYMBOL,
  graphQLResultHasProtocolErrors,
  isApolloError
} from "./chunk-MFUTYN33.js";
import {
  ApolloLink,
  concat,
  empty,
  execute,
  filterOperationVariables,
  from,
  fromError,
  fromPromise,
  split,
  throwServerError,
  toPromise
} from "./chunk-3KOQ4T2F.js";
import {
  AutoCleanedWeakCache,
  Concast,
  DeepMerger,
  DocumentTransform,
  Observable,
  Slot,
  Trie,
  WeakCache,
  __assign,
  __awaiter,
  __extends,
  __generator,
  __rest,
  __spreadArray,
  addTypenameToDocument,
  argumentsObjectFromField,
  asyncMap,
  buildQueryFromSelectionSet,
  cacheSizes,
  canUseAsyncIteratorSymbol,
  canUseLayoutEffect,
  canUseSymbol,
  canUseWeakMap,
  canUseWeakSet,
  canonicalStringify,
  cloneDeep,
  compact,
  createFragmentMap,
  createFulfilledPromise,
  createRejectedPromise,
  dep,
  fixObservableSubclass,
  getApolloCacheMemoryInternals,
  getApolloClientMemoryInternals,
  getDefaultValues,
  getFragmentDefinitions,
  getFragmentFromSelection,
  getFragmentQueryDocument,
  getGraphQLErrorsFromResult,
  getInMemoryCacheMemoryInternals,
  getMainDefinition,
  getOperationDefinition,
  getOperationName,
  getQueryDefinition,
  getStoreKeyName,
  getTypenameFromResult,
  graphQLResultHasError,
  hasClientExports,
  hasDirectives,
  invariant,
  isApolloPayloadResult,
  isArray,
  isDocumentNode,
  isExecutionPatchIncrementalResult,
  isExecutionPatchResult,
  isField,
  isInlineFragment,
  isNonEmptyArray,
  isNonNullObject,
  isReference,
  iterateObserversSafely,
  makeReference,
  makeUniqueId,
  maybe,
  maybeDeepFreeze,
  mergeDeep,
  mergeDeepArray,
  mergeIncrementalData,
  mergeOptions,
  newInvariantError,
  print,
  registerGlobalCache,
  removeClientSetsFromDocument,
  removeDirectivesFromDocument,
  resultKeyNameFromField,
  setVerbosity,
  shouldInclude,
  storeKeyNameFromField,
  stringifyForDisplay,
  version,
  wrap,
  wrapPromiseWithState
} from "./chunk-5UTDYZ6L.js";
import {
  BREAK,
  Kind,
  isSelectionNode,
  parse,
  visit
} from "./chunk-CFQ2ASUW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/rehackt/index.js
var require_rehackt = __commonJS({
  "node_modules/rehackt/index.js"(exports, module) {
    "use strict";
    if (0) {
      module.exports = null;
    }
    module.exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = void 0;
    module.exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = void 0;
    module.exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = void 0;
    Object.assign(module.exports, require_react());
  }
});

// node_modules/@apollo/client/link/http/iterators/async.js
function asyncIterator(source) {
  var _a;
  var iterator = source[Symbol.asyncIterator]();
  return _a = {
    next: function() {
      return iterator.next();
    }
  }, _a[Symbol.asyncIterator] = function() {
    return this;
  }, _a;
}

// node_modules/@apollo/client/link/http/iterators/nodeStream.js
function nodeStreamIterator(stream) {
  var cleanup = null;
  var error = null;
  var done = false;
  var data = [];
  var waiting = [];
  function onData(chunk) {
    if (error)
      return;
    if (waiting.length) {
      var shiftedArr = waiting.shift();
      if (Array.isArray(shiftedArr) && shiftedArr[0]) {
        return shiftedArr[0]({ value: chunk, done: false });
      }
    }
    data.push(chunk);
  }
  function onError(err) {
    error = err;
    var all = waiting.slice();
    all.forEach(function(pair) {
      pair[1](err);
    });
    !cleanup || cleanup();
  }
  function onEnd() {
    done = true;
    var all = waiting.slice();
    all.forEach(function(pair) {
      pair[0]({ value: void 0, done: true });
    });
    !cleanup || cleanup();
  }
  cleanup = function() {
    cleanup = null;
    stream.removeListener("data", onData);
    stream.removeListener("error", onError);
    stream.removeListener("end", onEnd);
    stream.removeListener("finish", onEnd);
    stream.removeListener("close", onEnd);
  };
  stream.on("data", onData);
  stream.on("error", onError);
  stream.on("end", onEnd);
  stream.on("finish", onEnd);
  stream.on("close", onEnd);
  function getNext() {
    return new Promise(function(resolve, reject) {
      if (error)
        return reject(error);
      if (data.length)
        return resolve({ value: data.shift(), done: false });
      if (done)
        return resolve({ value: void 0, done: true });
      waiting.push([resolve, reject]);
    });
  }
  var iterator = {
    next: function() {
      return getNext();
    }
  };
  if (canUseAsyncIteratorSymbol) {
    iterator[Symbol.asyncIterator] = function() {
      return this;
    };
  }
  return iterator;
}

// node_modules/@apollo/client/link/http/iterators/promise.js
function promiseIterator(promise) {
  var resolved = false;
  var iterator = {
    next: function() {
      if (resolved)
        return Promise.resolve({
          value: void 0,
          done: true
        });
      resolved = true;
      return new Promise(function(resolve, reject) {
        promise.then(function(value) {
          resolve({ value, done: false });
        }).catch(reject);
      });
    }
  };
  if (canUseAsyncIteratorSymbol) {
    iterator[Symbol.asyncIterator] = function() {
      return this;
    };
  }
  return iterator;
}

// node_modules/@apollo/client/link/http/iterators/reader.js
function readerIterator(reader) {
  var iterator = {
    next: function() {
      return reader.read();
    }
  };
  if (canUseAsyncIteratorSymbol) {
    iterator[Symbol.asyncIterator] = function() {
      return this;
    };
  }
  return iterator;
}

// node_modules/@apollo/client/link/http/responseIterator.js
function isNodeResponse(value) {
  return !!value.body;
}
function isReadableStream(value) {
  return !!value.getReader;
}
function isAsyncIterableIterator(value) {
  return !!(canUseAsyncIteratorSymbol && value[Symbol.asyncIterator]);
}
function isStreamableBlob(value) {
  return !!value.stream;
}
function isBlob(value) {
  return !!value.arrayBuffer;
}
function isNodeReadableStream(value) {
  return !!value.pipe;
}
function responseIterator(response) {
  var body = response;
  if (isNodeResponse(response))
    body = response.body;
  if (isAsyncIterableIterator(body))
    return asyncIterator(body);
  if (isReadableStream(body))
    return readerIterator(body.getReader());
  if (isStreamableBlob(body)) {
    return readerIterator(body.stream().getReader());
  }
  if (isBlob(body))
    return promiseIterator(body.arrayBuffer());
  if (isNodeReadableStream(body))
    return nodeStreamIterator(body);
  throw new Error("Unknown body type for responseIterator. Please pass a streamable response.");
}

// node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js
var hasOwnProperty = Object.prototype.hasOwnProperty;
function readMultipartBody(response, nextValue) {
  return __awaiter(this, void 0, void 0, function() {
    var decoder, contentType, delimiter, boundaryVal, boundary, buffer, iterator, running, _a, value, done, chunk, searchFrom, bi, message, i, headers, contentType_1, body, result, next;
    var _b, _c;
    var _d;
    return __generator(this, function(_e) {
      switch (_e.label) {
        case 0:
          if (TextDecoder === void 0) {
            throw new Error("TextDecoder must be defined in the environment: please import a polyfill.");
          }
          decoder = new TextDecoder("utf-8");
          contentType = (_d = response.headers) === null || _d === void 0 ? void 0 : _d.get("content-type");
          delimiter = "boundary=";
          boundaryVal = (contentType === null || contentType === void 0 ? void 0 : contentType.includes(delimiter)) ? contentType === null || contentType === void 0 ? void 0 : contentType.substring((contentType === null || contentType === void 0 ? void 0 : contentType.indexOf(delimiter)) + delimiter.length).replace(/['"]/g, "").replace(/\;(.*)/gm, "").trim() : "-";
          boundary = "\r\n--".concat(boundaryVal);
          buffer = "";
          iterator = responseIterator(response);
          running = true;
          _e.label = 1;
        case 1:
          if (!running)
            return [3, 3];
          return [4, iterator.next()];
        case 2:
          _a = _e.sent(), value = _a.value, done = _a.done;
          chunk = typeof value === "string" ? value : decoder.decode(value);
          searchFrom = buffer.length - boundary.length + 1;
          running = !done;
          buffer += chunk;
          bi = buffer.indexOf(boundary, searchFrom);
          while (bi > -1) {
            message = void 0;
            _b = [
              buffer.slice(0, bi),
              buffer.slice(bi + boundary.length)
            ], message = _b[0], buffer = _b[1];
            i = message.indexOf("\r\n\r\n");
            headers = parseHeaders(message.slice(0, i));
            contentType_1 = headers["content-type"];
            if (contentType_1 && contentType_1.toLowerCase().indexOf("application/json") === -1) {
              throw new Error("Unsupported patch content type: application/json is required.");
            }
            body = message.slice(i);
            if (body) {
              result = parseJsonBody(response, body);
              if (Object.keys(result).length > 1 || "data" in result || "incremental" in result || "errors" in result || "payload" in result) {
                if (isApolloPayloadResult(result)) {
                  next = {};
                  if ("payload" in result) {
                    if (Object.keys(result).length === 1 && result.payload === null) {
                      return [
                        2
                        /*return*/
                      ];
                    }
                    next = __assign({}, result.payload);
                  }
                  if ("errors" in result) {
                    next = __assign(__assign({}, next), { extensions: __assign(__assign({}, "extensions" in next ? next.extensions : null), (_c = {}, _c[PROTOCOL_ERRORS_SYMBOL] = result.errors, _c)) });
                  }
                  nextValue(next);
                } else {
                  nextValue(result);
                }
              } else if (
                // If the chunk contains only a "hasNext: false", we can call
                // observer.complete() immediately.
                Object.keys(result).length === 1 && "hasNext" in result && !result.hasNext
              ) {
                return [
                  2
                  /*return*/
                ];
              }
            }
            bi = buffer.indexOf(boundary);
          }
          return [3, 1];
        case 3:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function parseHeaders(headerText) {
  var headersInit = {};
  headerText.split("\n").forEach(function(line) {
    var i = line.indexOf(":");
    if (i > -1) {
      var name_1 = line.slice(0, i).trim().toLowerCase();
      var value = line.slice(i + 1).trim();
      headersInit[name_1] = value;
    }
  });
  return headersInit;
}
function parseJsonBody(response, bodyText) {
  if (response.status >= 300) {
    var getResult = function() {
      try {
        return JSON.parse(bodyText);
      } catch (err) {
        return bodyText;
      }
    };
    throwServerError(response, getResult(), "Response not successful: Received status code ".concat(response.status));
  }
  try {
    return JSON.parse(bodyText);
  } catch (err) {
    var parseError = err;
    parseError.name = "ServerParseError";
    parseError.response = response;
    parseError.statusCode = response.status;
    parseError.bodyText = bodyText;
    throw parseError;
  }
}
function handleError(err, observer) {
  if (err.result && err.result.errors && err.result.data) {
    observer.next(err.result);
  }
  observer.error(err);
}
function parseAndCheckHttpResponse(operations) {
  return function(response) {
    return response.text().then(function(bodyText) {
      return parseJsonBody(response, bodyText);
    }).then(function(result) {
      if (!Array.isArray(result) && !hasOwnProperty.call(result, "data") && !hasOwnProperty.call(result, "errors")) {
        throwServerError(response, result, "Server response was missing for query '".concat(Array.isArray(operations) ? operations.map(function(op) {
          return op.operationName;
        }) : operations.operationName, "'."));
      }
      return result;
    });
  };
}

// node_modules/@apollo/client/link/http/serializeFetchParameter.js
var serializeFetchParameter = function(p, label) {
  var serialized;
  try {
    serialized = JSON.stringify(p);
  } catch (e) {
    var parseError = newInvariantError(39, label, e.message);
    parseError.parseError = e;
    throw parseError;
  }
  return serialized;
};

// node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js
var defaultHttpOptions = {
  includeQuery: true,
  includeExtensions: false,
  preserveHeaderCase: false
};
var defaultHeaders = {
  // headers are case insensitive (https://stackoverflow.com/a/5259004)
  accept: "*/*",
  // The content-type header describes the type of the body of the request, and
  // so it typically only is sent with requests that actually have bodies. One
  // could imagine that Apollo Client would remove this header when constructing
  // a GET request (which has no body), but we historically have not done that.
  // This means that browsers will preflight all Apollo Client requests (even
  // GET requests). Apollo Server's CSRF prevention feature (introduced in
  // AS3.7) takes advantage of this fact and does not block requests with this
  // header. If you want to drop this header from GET requests, then you should
  // probably replace it with a `apollo-require-preflight` header, or servers
  // with CSRF prevention enabled might block your GET request. See
  // https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
  // for more details.
  "content-type": "application/json"
};
var defaultOptions = {
  method: "POST"
};
var fallbackHttpConfig = {
  http: defaultHttpOptions,
  headers: defaultHeaders,
  options: defaultOptions
};
var defaultPrinter = function(ast, printer) {
  return printer(ast);
};
function selectHttpOptionsAndBody(operation, fallbackConfig) {
  var configs = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    configs[_i - 2] = arguments[_i];
  }
  configs.unshift(fallbackConfig);
  return selectHttpOptionsAndBodyInternal.apply(void 0, __spreadArray([
    operation,
    defaultPrinter
  ], configs, false));
}
function selectHttpOptionsAndBodyInternal(operation, printer) {
  var configs = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    configs[_i - 2] = arguments[_i];
  }
  var options = {};
  var http = {};
  configs.forEach(function(config) {
    options = __assign(__assign(__assign({}, options), config.options), { headers: __assign(__assign({}, options.headers), config.headers) });
    if (config.credentials) {
      options.credentials = config.credentials;
    }
    http = __assign(__assign({}, http), config.http);
  });
  if (options.headers) {
    options.headers = removeDuplicateHeaders(options.headers, http.preserveHeaderCase);
  }
  var operationName2 = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
  var body = { operationName: operationName2, variables };
  if (http.includeExtensions)
    body.extensions = extensions;
  if (http.includeQuery)
    body.query = printer(query, print);
  return {
    options,
    body
  };
}
function removeDuplicateHeaders(headers, preserveHeaderCase) {
  if (!preserveHeaderCase) {
    var normalizedHeaders_1 = /* @__PURE__ */ Object.create(null);
    Object.keys(Object(headers)).forEach(function(name) {
      normalizedHeaders_1[name.toLowerCase()] = headers[name];
    });
    return normalizedHeaders_1;
  }
  var headerData = /* @__PURE__ */ Object.create(null);
  Object.keys(Object(headers)).forEach(function(name) {
    headerData[name.toLowerCase()] = {
      originalName: name,
      value: headers[name]
    };
  });
  var normalizedHeaders = /* @__PURE__ */ Object.create(null);
  Object.keys(headerData).forEach(function(name) {
    normalizedHeaders[headerData[name].originalName] = headerData[name].value;
  });
  return normalizedHeaders;
}

// node_modules/@apollo/client/link/http/checkFetcher.js
var checkFetcher = function(fetcher) {
  if (!fetcher && typeof fetch === "undefined") {
    throw newInvariantError(37);
  }
};

// node_modules/@apollo/client/link/http/createSignalIfSupported.js
var createSignalIfSupported = function() {
  if (typeof AbortController === "undefined")
    return { controller: false, signal: false };
  var controller = new AbortController();
  var signal = controller.signal;
  return { controller, signal };
};

// node_modules/@apollo/client/link/http/selectURI.js
var selectURI = function(operation, fallbackURI) {
  var context = operation.getContext();
  var contextURI = context.uri;
  if (contextURI) {
    return contextURI;
  } else if (typeof fallbackURI === "function") {
    return fallbackURI(operation);
  } else {
    return fallbackURI || "/graphql";
  }
};

// node_modules/@apollo/client/link/http/rewriteURIForGET.js
function rewriteURIForGET(chosenURI, body) {
  var queryParams = [];
  var addQueryParam = function(key, value) {
    queryParams.push("".concat(key, "=").concat(encodeURIComponent(value)));
  };
  if ("query" in body) {
    addQueryParam("query", body.query);
  }
  if (body.operationName) {
    addQueryParam("operationName", body.operationName);
  }
  if (body.variables) {
    var serializedVariables = void 0;
    try {
      serializedVariables = serializeFetchParameter(body.variables, "Variables map");
    } catch (parseError) {
      return { parseError };
    }
    addQueryParam("variables", serializedVariables);
  }
  if (body.extensions) {
    var serializedExtensions = void 0;
    try {
      serializedExtensions = serializeFetchParameter(body.extensions, "Extensions map");
    } catch (parseError) {
      return { parseError };
    }
    addQueryParam("extensions", serializedExtensions);
  }
  var fragment = "", preFragment = chosenURI;
  var fragmentStart = chosenURI.indexOf("#");
  if (fragmentStart !== -1) {
    fragment = chosenURI.substr(fragmentStart);
    preFragment = chosenURI.substr(0, fragmentStart);
  }
  var queryParamsPrefix = preFragment.indexOf("?") === -1 ? "?" : "&";
  var newURI = preFragment + queryParamsPrefix + queryParams.join("&") + fragment;
  return { newURI };
}

// node_modules/@apollo/client/link/http/createHttpLink.js
var backupFetch = maybe(function() {
  return fetch;
});
var createHttpLink = function(linkOptions) {
  if (linkOptions === void 0) {
    linkOptions = {};
  }
  var _a = linkOptions.uri, uri = _a === void 0 ? "/graphql" : _a, preferredFetch = linkOptions.fetch, _b = linkOptions.print, print2 = _b === void 0 ? defaultPrinter : _b, includeExtensions = linkOptions.includeExtensions, preserveHeaderCase = linkOptions.preserveHeaderCase, useGETForQueries = linkOptions.useGETForQueries, _c = linkOptions.includeUnusedVariables, includeUnusedVariables = _c === void 0 ? false : _c, requestOptions = __rest(linkOptions, ["uri", "fetch", "print", "includeExtensions", "preserveHeaderCase", "useGETForQueries", "includeUnusedVariables"]);
  if (globalThis.__DEV__ !== false) {
    checkFetcher(preferredFetch || backupFetch);
  }
  var linkConfig = {
    http: { includeExtensions, preserveHeaderCase },
    options: requestOptions.fetchOptions,
    credentials: requestOptions.credentials,
    headers: requestOptions.headers
  };
  return new ApolloLink(function(operation) {
    var chosenURI = selectURI(operation, uri);
    var context = operation.getContext();
    var clientAwarenessHeaders = {};
    if (context.clientAwareness) {
      var _a2 = context.clientAwareness, name_1 = _a2.name, version2 = _a2.version;
      if (name_1) {
        clientAwarenessHeaders["apollographql-client-name"] = name_1;
      }
      if (version2) {
        clientAwarenessHeaders["apollographql-client-version"] = version2;
      }
    }
    var contextHeaders = __assign(__assign({}, clientAwarenessHeaders), context.headers);
    var contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: contextHeaders
    };
    if (hasDirectives(["client"], operation.query)) {
      var transformedQuery = removeClientSetsFromDocument(operation.query);
      if (!transformedQuery) {
        return fromError(new Error("HttpLink: Trying to send a client-only query to the server. To send to the server, ensure a non-client field is added to the query or set the `transformOptions.removeClientFields` option to `true`."));
      }
      operation.query = transformedQuery;
    }
    var _b2 = selectHttpOptionsAndBodyInternal(operation, print2, fallbackHttpConfig, linkConfig, contextConfig), options = _b2.options, body = _b2.body;
    if (body.variables && !includeUnusedVariables) {
      body.variables = filterOperationVariables(body.variables, operation.query);
    }
    var controller;
    if (!options.signal && typeof AbortController !== "undefined") {
      controller = new AbortController();
      options.signal = controller.signal;
    }
    var definitionIsMutation = function(d) {
      return d.kind === "OperationDefinition" && d.operation === "mutation";
    };
    var definitionIsSubscription = function(d) {
      return d.kind === "OperationDefinition" && d.operation === "subscription";
    };
    var isSubscription = definitionIsSubscription(getMainDefinition(operation.query));
    var hasDefer = hasDirectives(["defer"], operation.query);
    if (useGETForQueries && !operation.query.definitions.some(definitionIsMutation)) {
      options.method = "GET";
    }
    if (hasDefer || isSubscription) {
      options.headers = options.headers || {};
      var acceptHeader = "multipart/mixed;";
      if (isSubscription && hasDefer) {
        globalThis.__DEV__ !== false && invariant.warn(38);
      }
      if (isSubscription) {
        acceptHeader += "boundary=graphql;subscriptionSpec=1.0,application/json";
      } else if (hasDefer) {
        acceptHeader += "deferSpec=20220824,application/json";
      }
      options.headers.accept = acceptHeader;
    }
    if (options.method === "GET") {
      var _c2 = rewriteURIForGET(chosenURI, body), newURI = _c2.newURI, parseError = _c2.parseError;
      if (parseError) {
        return fromError(parseError);
      }
      chosenURI = newURI;
    } else {
      try {
        options.body = serializeFetchParameter(body, "Payload");
      } catch (parseError2) {
        return fromError(parseError2);
      }
    }
    return new Observable(function(observer) {
      var currentFetch = preferredFetch || maybe(function() {
        return fetch;
      }) || backupFetch;
      var observerNext = observer.next.bind(observer);
      currentFetch(chosenURI, options).then(function(response) {
        var _a3;
        operation.setContext({ response });
        var ctype = (_a3 = response.headers) === null || _a3 === void 0 ? void 0 : _a3.get("content-type");
        if (ctype !== null && /^multipart\/mixed/i.test(ctype)) {
          return readMultipartBody(response, observerNext);
        } else {
          return parseAndCheckHttpResponse(operation)(response).then(observerNext);
        }
      }).then(function() {
        controller = void 0;
        observer.complete();
      }).catch(function(err) {
        controller = void 0;
        handleError(err, observer);
      });
      return function() {
        if (controller)
          controller.abort();
      };
    });
  });
};

// node_modules/@apollo/client/link/http/HttpLink.js
var HttpLink = (
  /** @class */
  function(_super) {
    __extends(HttpLink2, _super);
    function HttpLink2(options) {
      if (options === void 0) {
        options = {};
      }
      var _this = _super.call(this, createHttpLink(options).request) || this;
      _this.options = options;
      return _this;
    }
    return HttpLink2;
  }(ApolloLink)
);

// node_modules/@wry/equality/lib/index.js
var { toString, hasOwnProperty: hasOwnProperty2 } = Object.prototype;
var fnToStr = Function.prototype.toString;
var previousComparisons = /* @__PURE__ */ new Map();
function equal(a, b) {
  try {
    return check(a, b);
  } finally {
    previousComparisons.clear();
  }
}
var lib_default = equal;
function check(a, b) {
  if (a === b) {
    return true;
  }
  const aTag = toString.call(a);
  const bTag = toString.call(b);
  if (aTag !== bTag) {
    return false;
  }
  switch (aTag) {
    case "[object Array]":
      if (a.length !== b.length)
        return false;
    case "[object Object]": {
      if (previouslyCompared(a, b))
        return true;
      const aKeys = definedKeys(a);
      const bKeys = definedKeys(b);
      const keyCount = aKeys.length;
      if (keyCount !== bKeys.length)
        return false;
      for (let k = 0; k < keyCount; ++k) {
        if (!hasOwnProperty2.call(b, aKeys[k])) {
          return false;
        }
      }
      for (let k = 0; k < keyCount; ++k) {
        const key = aKeys[k];
        if (!check(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    case "[object Error]":
      return a.name === b.name && a.message === b.message;
    case "[object Number]":
      if (a !== a)
        return b !== b;
    case "[object Boolean]":
    case "[object Date]":
      return +a === +b;
    case "[object RegExp]":
    case "[object String]":
      return a == `${b}`;
    case "[object Map]":
    case "[object Set]": {
      if (a.size !== b.size)
        return false;
      if (previouslyCompared(a, b))
        return true;
      const aIterator = a.entries();
      const isMap = aTag === "[object Map]";
      while (true) {
        const info = aIterator.next();
        if (info.done)
          break;
        const [aKey, aValue] = info.value;
        if (!b.has(aKey)) {
          return false;
        }
        if (isMap && !check(aValue, b.get(aKey))) {
          return false;
        }
      }
      return true;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      a = new Uint8Array(a);
      b = new Uint8Array(b);
    case "[object DataView]": {
      let len = a.byteLength;
      if (len === b.byteLength) {
        while (len-- && a[len] === b[len]) {
        }
      }
      return len === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      const aCode = fnToStr.call(a);
      if (aCode !== fnToStr.call(b)) {
        return false;
      }
      return !endsWith(aCode, nativeCodeSuffix);
    }
  }
  return false;
}
function definedKeys(obj) {
  return Object.keys(obj).filter(isDefinedKey, obj);
}
function isDefinedKey(key) {
  return this[key] !== void 0;
}
var nativeCodeSuffix = "{ [native code] }";
function endsWith(full, suffix) {
  const fromIndex = full.length - suffix.length;
  return fromIndex >= 0 && full.indexOf(suffix, fromIndex) === fromIndex;
}
function previouslyCompared(a, b) {
  let bSet = previousComparisons.get(a);
  if (bSet) {
    if (bSet.has(b))
      return true;
  } else {
    previousComparisons.set(a, bSet = /* @__PURE__ */ new Set());
  }
  bSet.add(b);
  return false;
}

// node_modules/@apollo/client/core/equalByQuery.js
function equalByQuery(query, _a, _b, variables) {
  var aData = _a.data, aRest = __rest(_a, ["data"]);
  var bData = _b.data, bRest = __rest(_b, ["data"]);
  return lib_default(aRest, bRest) && equalBySelectionSet(getMainDefinition(query).selectionSet, aData, bData, {
    fragmentMap: createFragmentMap(getFragmentDefinitions(query)),
    variables
  });
}
function equalBySelectionSet(selectionSet, aResult, bResult, context) {
  if (aResult === bResult) {
    return true;
  }
  var seenSelections = /* @__PURE__ */ new Set();
  return selectionSet.selections.every(function(selection) {
    if (seenSelections.has(selection))
      return true;
    seenSelections.add(selection);
    if (!shouldInclude(selection, context.variables))
      return true;
    if (selectionHasNonreactiveDirective(selection))
      return true;
    if (isField(selection)) {
      var resultKey = resultKeyNameFromField(selection);
      var aResultChild = aResult && aResult[resultKey];
      var bResultChild = bResult && bResult[resultKey];
      var childSelectionSet = selection.selectionSet;
      if (!childSelectionSet) {
        return lib_default(aResultChild, bResultChild);
      }
      var aChildIsArray = Array.isArray(aResultChild);
      var bChildIsArray = Array.isArray(bResultChild);
      if (aChildIsArray !== bChildIsArray)
        return false;
      if (aChildIsArray && bChildIsArray) {
        var length_1 = aResultChild.length;
        if (bResultChild.length !== length_1) {
          return false;
        }
        for (var i = 0; i < length_1; ++i) {
          if (!equalBySelectionSet(childSelectionSet, aResultChild[i], bResultChild[i], context)) {
            return false;
          }
        }
        return true;
      }
      return equalBySelectionSet(childSelectionSet, aResultChild, bResultChild, context);
    } else {
      var fragment = getFragmentFromSelection(selection, context.fragmentMap);
      if (fragment) {
        if (selectionHasNonreactiveDirective(fragment))
          return true;
        return equalBySelectionSet(
          fragment.selectionSet,
          // Notice that we reuse the same aResult and bResult values here,
          // since the fragment ...spread does not specify a field name, but
          // consists of multiple fields (within the fragment's selection set)
          // that should be applied to the current result value(s).
          aResult,
          bResult,
          context
        );
      }
    }
  });
}
function selectionHasNonreactiveDirective(selection) {
  return !!selection.directives && selection.directives.some(directiveIsNonreactive);
}
function directiveIsNonreactive(dir) {
  return dir.name.value === "nonreactive";
}

// node_modules/@apollo/client/cache/core/cache.js
var ApolloCache = (
  /** @class */
  function() {
    function ApolloCache2() {
      this.assumeImmutableResults = false;
      this.getFragmentDoc = wrap(getFragmentQueryDocument, {
        max: cacheSizes["cache.fragmentQueryDocuments"] || 1e3,
        cache: WeakCache
      });
    }
    ApolloCache2.prototype.batch = function(options) {
      var _this = this;
      var optimisticId = typeof options.optimistic === "string" ? options.optimistic : options.optimistic === false ? null : void 0;
      var updateResult;
      this.performTransaction(function() {
        return updateResult = options.update(_this);
      }, optimisticId);
      return updateResult;
    };
    ApolloCache2.prototype.recordOptimisticTransaction = function(transaction, optimisticId) {
      this.performTransaction(transaction, optimisticId);
    };
    ApolloCache2.prototype.transformDocument = function(document) {
      return document;
    };
    ApolloCache2.prototype.transformForLink = function(document) {
      return document;
    };
    ApolloCache2.prototype.identify = function(object) {
      return;
    };
    ApolloCache2.prototype.gc = function() {
      return [];
    };
    ApolloCache2.prototype.modify = function(options) {
      return false;
    };
    ApolloCache2.prototype.readQuery = function(options, optimistic) {
      if (optimistic === void 0) {
        optimistic = !!options.optimistic;
      }
      return this.read(__assign(__assign({}, options), { rootId: options.id || "ROOT_QUERY", optimistic }));
    };
    ApolloCache2.prototype.watchFragment = function(options) {
      var _this = this;
      var fragment = options.fragment, fragmentName = options.fragmentName, from2 = options.from, _a = options.optimistic, optimistic = _a === void 0 ? true : _a;
      var query = this.getFragmentDoc(fragment, fragmentName);
      var diffOptions = {
        returnPartialData: true,
        id: typeof from2 === "string" ? from2 : this.identify(from2),
        query,
        optimistic
      };
      var latestDiff;
      return new Observable(function(observer) {
        return _this.watch(__assign(__assign({}, diffOptions), { immediate: true, callback: function(diff) {
          if (
            // Always ensure we deliver the first result
            latestDiff && equalByQuery(query, { data: latestDiff === null || latestDiff === void 0 ? void 0 : latestDiff.result }, { data: diff.result })
          ) {
            return;
          }
          var result = {
            data: diff.result,
            complete: !!diff.complete
          };
          if (diff.missing) {
            result.missing = mergeDeepArray(diff.missing.map(function(error) {
              return error.missing;
            }));
          }
          latestDiff = diff;
          observer.next(result);
        } }));
      });
    };
    ApolloCache2.prototype.readFragment = function(options, optimistic) {
      if (optimistic === void 0) {
        optimistic = !!options.optimistic;
      }
      return this.read(__assign(__assign({}, options), { query: this.getFragmentDoc(options.fragment, options.fragmentName), rootId: options.id, optimistic }));
    };
    ApolloCache2.prototype.writeQuery = function(_a) {
      var id = _a.id, data = _a.data, options = __rest(_a, ["id", "data"]);
      return this.write(Object.assign(options, {
        dataId: id || "ROOT_QUERY",
        result: data
      }));
    };
    ApolloCache2.prototype.writeFragment = function(_a) {
      var id = _a.id, data = _a.data, fragment = _a.fragment, fragmentName = _a.fragmentName, options = __rest(_a, ["id", "data", "fragment", "fragmentName"]);
      return this.write(Object.assign(options, {
        query: this.getFragmentDoc(fragment, fragmentName),
        dataId: id,
        result: data
      }));
    };
    ApolloCache2.prototype.updateQuery = function(options, update) {
      return this.batch({
        update: function(cache2) {
          var value = cache2.readQuery(options);
          var data = update(value);
          if (data === void 0 || data === null)
            return value;
          cache2.writeQuery(__assign(__assign({}, options), { data }));
          return data;
        }
      });
    };
    ApolloCache2.prototype.updateFragment = function(options, update) {
      return this.batch({
        update: function(cache2) {
          var value = cache2.readFragment(options);
          var data = update(value);
          if (data === void 0 || data === null)
            return value;
          cache2.writeFragment(__assign(__assign({}, options), { data }));
          return data;
        }
      });
    };
    return ApolloCache2;
  }()
);
if (globalThis.__DEV__ !== false) {
  ApolloCache.prototype.getMemoryInternals = getApolloCacheMemoryInternals;
}

// node_modules/@apollo/client/cache/core/types/Cache.js
var Cache;
/* @__PURE__ */ (function(Cache2) {
})(Cache || (Cache = {}));

// node_modules/@apollo/client/cache/core/types/common.js
var MissingFieldError = (
  /** @class */
  function(_super) {
    __extends(MissingFieldError2, _super);
    function MissingFieldError2(message, path, query, variables) {
      var _a;
      var _this = _super.call(this, message) || this;
      _this.message = message;
      _this.path = path;
      _this.query = query;
      _this.variables = variables;
      if (Array.isArray(_this.path)) {
        _this.missing = _this.message;
        for (var i = _this.path.length - 1; i >= 0; --i) {
          _this.missing = (_a = {}, _a[_this.path[i]] = _this.missing, _a);
        }
      } else {
        _this.missing = _this.path;
      }
      _this.__proto__ = MissingFieldError2.prototype;
      return _this;
    }
    return MissingFieldError2;
  }(Error)
);

// node_modules/@apollo/client/cache/inmemory/helpers.js
var hasOwn = Object.prototype.hasOwnProperty;
function isNullish(value) {
  return value === null || value === void 0;
}
function defaultDataIdFromObject(_a, context) {
  var __typename = _a.__typename, id = _a.id, _id = _a._id;
  if (typeof __typename === "string") {
    if (context) {
      context.keyObject = !isNullish(id) ? { id } : !isNullish(_id) ? { _id } : void 0;
    }
    if (isNullish(id) && !isNullish(_id)) {
      id = _id;
    }
    if (!isNullish(id)) {
      return "".concat(__typename, ":").concat(typeof id === "number" || typeof id === "string" ? id : JSON.stringify(id));
    }
  }
}
var defaultConfig = {
  dataIdFromObject: defaultDataIdFromObject,
  addTypename: true,
  resultCaching: true,
  // Thanks to the shouldCanonizeResults helper, this should be the only line
  // you have to change to reenable canonization by default in the future.
  canonizeResults: false
};
function normalizeConfig(config) {
  return compact(defaultConfig, config);
}
function shouldCanonizeResults(config) {
  var value = config.canonizeResults;
  return value === void 0 ? defaultConfig.canonizeResults : value;
}
function getTypenameFromStoreObject(store, objectOrReference) {
  return isReference(objectOrReference) ? store.get(objectOrReference.__ref, "__typename") : objectOrReference && objectOrReference.__typename;
}
var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
function fieldNameFromStoreName(storeFieldName) {
  var match = storeFieldName.match(TypeOrFieldNameRegExp);
  return match ? match[0] : storeFieldName;
}
function selectionSetMatchesResult(selectionSet, result, variables) {
  if (isNonNullObject(result)) {
    return isArray(result) ? result.every(function(item) {
      return selectionSetMatchesResult(selectionSet, item, variables);
    }) : selectionSet.selections.every(function(field) {
      if (isField(field) && shouldInclude(field, variables)) {
        var key = resultKeyNameFromField(field);
        return hasOwn.call(result, key) && (!field.selectionSet || selectionSetMatchesResult(field.selectionSet, result[key], variables));
      }
      return true;
    });
  }
  return false;
}
function storeValueIsStoreObject(value) {
  return isNonNullObject(value) && !isReference(value) && !isArray(value);
}
function makeProcessedFieldsMerger() {
  return new DeepMerger();
}
function extractFragmentContext(document, fragments) {
  var fragmentMap = createFragmentMap(getFragmentDefinitions(document));
  return {
    fragmentMap,
    lookupFragment: function(name) {
      var def = fragmentMap[name];
      if (!def && fragments) {
        def = fragments.lookup(name);
      }
      return def || null;
    }
  };
}

// node_modules/@apollo/client/cache/inmemory/entityStore.js
var DELETE = /* @__PURE__ */ Object.create(null);
var delModifier = function() {
  return DELETE;
};
var INVALIDATE = /* @__PURE__ */ Object.create(null);
var EntityStore = (
  /** @class */
  function() {
    function EntityStore2(policies, group) {
      var _this = this;
      this.policies = policies;
      this.group = group;
      this.data = /* @__PURE__ */ Object.create(null);
      this.rootIds = /* @__PURE__ */ Object.create(null);
      this.refs = /* @__PURE__ */ Object.create(null);
      this.getFieldValue = function(objectOrReference, storeFieldName) {
        return maybeDeepFreeze(isReference(objectOrReference) ? _this.get(objectOrReference.__ref, storeFieldName) : objectOrReference && objectOrReference[storeFieldName]);
      };
      this.canRead = function(objOrRef) {
        return isReference(objOrRef) ? _this.has(objOrRef.__ref) : typeof objOrRef === "object";
      };
      this.toReference = function(objOrIdOrRef, mergeIntoStore) {
        if (typeof objOrIdOrRef === "string") {
          return makeReference(objOrIdOrRef);
        }
        if (isReference(objOrIdOrRef)) {
          return objOrIdOrRef;
        }
        var id = _this.policies.identify(objOrIdOrRef)[0];
        if (id) {
          var ref = makeReference(id);
          if (mergeIntoStore) {
            _this.merge(id, objOrIdOrRef);
          }
          return ref;
        }
      };
    }
    EntityStore2.prototype.toObject = function() {
      return __assign({}, this.data);
    };
    EntityStore2.prototype.has = function(dataId) {
      return this.lookup(dataId, true) !== void 0;
    };
    EntityStore2.prototype.get = function(dataId, fieldName) {
      this.group.depend(dataId, fieldName);
      if (hasOwn.call(this.data, dataId)) {
        var storeObject = this.data[dataId];
        if (storeObject && hasOwn.call(storeObject, fieldName)) {
          return storeObject[fieldName];
        }
      }
      if (fieldName === "__typename" && hasOwn.call(this.policies.rootTypenamesById, dataId)) {
        return this.policies.rootTypenamesById[dataId];
      }
      if (this instanceof Layer) {
        return this.parent.get(dataId, fieldName);
      }
    };
    EntityStore2.prototype.lookup = function(dataId, dependOnExistence) {
      if (dependOnExistence)
        this.group.depend(dataId, "__exists");
      if (hasOwn.call(this.data, dataId)) {
        return this.data[dataId];
      }
      if (this instanceof Layer) {
        return this.parent.lookup(dataId, dependOnExistence);
      }
      if (this.policies.rootTypenamesById[dataId]) {
        return /* @__PURE__ */ Object.create(null);
      }
    };
    EntityStore2.prototype.merge = function(older, newer) {
      var _this = this;
      var dataId;
      if (isReference(older))
        older = older.__ref;
      if (isReference(newer))
        newer = newer.__ref;
      var existing = typeof older === "string" ? this.lookup(dataId = older) : older;
      var incoming = typeof newer === "string" ? this.lookup(dataId = newer) : newer;
      if (!incoming)
        return;
      invariant(typeof dataId === "string", 1);
      var merged = new DeepMerger(storeObjectReconciler).merge(existing, incoming);
      this.data[dataId] = merged;
      if (merged !== existing) {
        delete this.refs[dataId];
        if (this.group.caching) {
          var fieldsToDirty_1 = /* @__PURE__ */ Object.create(null);
          if (!existing)
            fieldsToDirty_1.__exists = 1;
          Object.keys(incoming).forEach(function(storeFieldName) {
            if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
              fieldsToDirty_1[storeFieldName] = 1;
              var fieldName = fieldNameFromStoreName(storeFieldName);
              if (fieldName !== storeFieldName && !_this.policies.hasKeyArgs(merged.__typename, fieldName)) {
                fieldsToDirty_1[fieldName] = 1;
              }
              if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
                delete merged[storeFieldName];
              }
            }
          });
          if (fieldsToDirty_1.__typename && !(existing && existing.__typename) && // Since we return default root __typename strings
          // automatically from store.get, we don't need to dirty the
          // ROOT_QUERY.__typename field if merged.__typename is equal
          // to the default string (usually "Query").
          this.policies.rootTypenamesById[dataId] === merged.__typename) {
            delete fieldsToDirty_1.__typename;
          }
          Object.keys(fieldsToDirty_1).forEach(function(fieldName) {
            return _this.group.dirty(dataId, fieldName);
          });
        }
      }
    };
    EntityStore2.prototype.modify = function(dataId, fields) {
      var _this = this;
      var storeObject = this.lookup(dataId);
      if (storeObject) {
        var changedFields_1 = /* @__PURE__ */ Object.create(null);
        var needToMerge_1 = false;
        var allDeleted_1 = true;
        var sharedDetails_1 = {
          DELETE,
          INVALIDATE,
          isReference,
          toReference: this.toReference,
          canRead: this.canRead,
          readField: function(fieldNameOrOptions, from2) {
            return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
              fieldName: fieldNameOrOptions,
              from: from2 || makeReference(dataId)
            } : fieldNameOrOptions, { store: _this });
          }
        };
        Object.keys(storeObject).forEach(function(storeFieldName) {
          var fieldName = fieldNameFromStoreName(storeFieldName);
          var fieldValue = storeObject[storeFieldName];
          if (fieldValue === void 0)
            return;
          var modify = typeof fields === "function" ? fields : fields[storeFieldName] || fields[fieldName];
          if (modify) {
            var newValue = modify === delModifier ? DELETE : modify(maybeDeepFreeze(fieldValue), __assign(__assign({}, sharedDetails_1), { fieldName, storeFieldName, storage: _this.getStorage(dataId, storeFieldName) }));
            if (newValue === INVALIDATE) {
              _this.group.dirty(dataId, storeFieldName);
            } else {
              if (newValue === DELETE)
                newValue = void 0;
              if (newValue !== fieldValue) {
                changedFields_1[storeFieldName] = newValue;
                needToMerge_1 = true;
                fieldValue = newValue;
                if (globalThis.__DEV__ !== false) {
                  var checkReference = function(ref) {
                    if (_this.lookup(ref.__ref) === void 0) {
                      globalThis.__DEV__ !== false && invariant.warn(2, ref);
                      return true;
                    }
                  };
                  if (isReference(newValue)) {
                    checkReference(newValue);
                  } else if (Array.isArray(newValue)) {
                    var seenReference = false;
                    var someNonReference = void 0;
                    for (var _i = 0, newValue_1 = newValue; _i < newValue_1.length; _i++) {
                      var value = newValue_1[_i];
                      if (isReference(value)) {
                        seenReference = true;
                        if (checkReference(value))
                          break;
                      } else {
                        if (typeof value === "object" && !!value) {
                          var id = _this.policies.identify(value)[0];
                          if (id) {
                            someNonReference = value;
                          }
                        }
                      }
                      if (seenReference && someNonReference !== void 0) {
                        globalThis.__DEV__ !== false && invariant.warn(3, someNonReference);
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
          if (fieldValue !== void 0) {
            allDeleted_1 = false;
          }
        });
        if (needToMerge_1) {
          this.merge(dataId, changedFields_1);
          if (allDeleted_1) {
            if (this instanceof Layer) {
              this.data[dataId] = void 0;
            } else {
              delete this.data[dataId];
            }
            this.group.dirty(dataId, "__exists");
          }
          return true;
        }
      }
      return false;
    };
    EntityStore2.prototype.delete = function(dataId, fieldName, args) {
      var _a;
      var storeObject = this.lookup(dataId);
      if (storeObject) {
        var typename = this.getFieldValue(storeObject, "__typename");
        var storeFieldName = fieldName && args ? this.policies.getStoreFieldName({ typename, fieldName, args }) : fieldName;
        return this.modify(dataId, storeFieldName ? (_a = {}, _a[storeFieldName] = delModifier, _a) : delModifier);
      }
      return false;
    };
    EntityStore2.prototype.evict = function(options, limit) {
      var evicted = false;
      if (options.id) {
        if (hasOwn.call(this.data, options.id)) {
          evicted = this.delete(options.id, options.fieldName, options.args);
        }
        if (this instanceof Layer && this !== limit) {
          evicted = this.parent.evict(options, limit) || evicted;
        }
        if (options.fieldName || evicted) {
          this.group.dirty(options.id, options.fieldName || "__exists");
        }
      }
      return evicted;
    };
    EntityStore2.prototype.clear = function() {
      this.replace(null);
    };
    EntityStore2.prototype.extract = function() {
      var _this = this;
      var obj = this.toObject();
      var extraRootIds = [];
      this.getRootIdSet().forEach(function(id) {
        if (!hasOwn.call(_this.policies.rootTypenamesById, id)) {
          extraRootIds.push(id);
        }
      });
      if (extraRootIds.length) {
        obj.__META = { extraRootIds: extraRootIds.sort() };
      }
      return obj;
    };
    EntityStore2.prototype.replace = function(newData) {
      var _this = this;
      Object.keys(this.data).forEach(function(dataId) {
        if (!(newData && hasOwn.call(newData, dataId))) {
          _this.delete(dataId);
        }
      });
      if (newData) {
        var __META = newData.__META, rest_1 = __rest(newData, ["__META"]);
        Object.keys(rest_1).forEach(function(dataId) {
          _this.merge(dataId, rest_1[dataId]);
        });
        if (__META) {
          __META.extraRootIds.forEach(this.retain, this);
        }
      }
    };
    EntityStore2.prototype.retain = function(rootId) {
      return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
    };
    EntityStore2.prototype.release = function(rootId) {
      if (this.rootIds[rootId] > 0) {
        var count = --this.rootIds[rootId];
        if (!count)
          delete this.rootIds[rootId];
        return count;
      }
      return 0;
    };
    EntityStore2.prototype.getRootIdSet = function(ids) {
      if (ids === void 0) {
        ids = /* @__PURE__ */ new Set();
      }
      Object.keys(this.rootIds).forEach(ids.add, ids);
      if (this instanceof Layer) {
        this.parent.getRootIdSet(ids);
      } else {
        Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
      }
      return ids;
    };
    EntityStore2.prototype.gc = function() {
      var _this = this;
      var ids = this.getRootIdSet();
      var snapshot = this.toObject();
      ids.forEach(function(id) {
        if (hasOwn.call(snapshot, id)) {
          Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
          delete snapshot[id];
        }
      });
      var idsToRemove = Object.keys(snapshot);
      if (idsToRemove.length) {
        var root_1 = this;
        while (root_1 instanceof Layer)
          root_1 = root_1.parent;
        idsToRemove.forEach(function(id) {
          return root_1.delete(id);
        });
      }
      return idsToRemove;
    };
    EntityStore2.prototype.findChildRefIds = function(dataId) {
      if (!hasOwn.call(this.refs, dataId)) {
        var found_1 = this.refs[dataId] = /* @__PURE__ */ Object.create(null);
        var root = this.data[dataId];
        if (!root)
          return found_1;
        var workSet_1 = /* @__PURE__ */ new Set([root]);
        workSet_1.forEach(function(obj) {
          if (isReference(obj)) {
            found_1[obj.__ref] = true;
          }
          if (isNonNullObject(obj)) {
            Object.keys(obj).forEach(function(key) {
              var child = obj[key];
              if (isNonNullObject(child)) {
                workSet_1.add(child);
              }
            });
          }
        });
      }
      return this.refs[dataId];
    };
    EntityStore2.prototype.makeCacheKey = function() {
      return this.group.keyMaker.lookupArray(arguments);
    };
    return EntityStore2;
  }()
);
var CacheGroup = (
  /** @class */
  function() {
    function CacheGroup2(caching, parent) {
      if (parent === void 0) {
        parent = null;
      }
      this.caching = caching;
      this.parent = parent;
      this.d = null;
      this.resetCaching();
    }
    CacheGroup2.prototype.resetCaching = function() {
      this.d = this.caching ? dep() : null;
      this.keyMaker = new Trie(canUseWeakMap);
    };
    CacheGroup2.prototype.depend = function(dataId, storeFieldName) {
      if (this.d) {
        this.d(makeDepKey(dataId, storeFieldName));
        var fieldName = fieldNameFromStoreName(storeFieldName);
        if (fieldName !== storeFieldName) {
          this.d(makeDepKey(dataId, fieldName));
        }
        if (this.parent) {
          this.parent.depend(dataId, storeFieldName);
        }
      }
    };
    CacheGroup2.prototype.dirty = function(dataId, storeFieldName) {
      if (this.d) {
        this.d.dirty(
          makeDepKey(dataId, storeFieldName),
          // When storeFieldName === "__exists", that means the entity identified
          // by dataId has either disappeared from the cache or was newly added,
          // so the result caching system would do well to "forget everything it
          // knows" about that object. To achieve that kind of invalidation, we
          // not only dirty the associated result cache entry, but also remove it
          // completely from the dependency graph. For the optimism implementation
          // details, see https://github.com/benjamn/optimism/pull/195.
          storeFieldName === "__exists" ? "forget" : "setDirty"
        );
      }
    };
    return CacheGroup2;
  }()
);
function makeDepKey(dataId, storeFieldName) {
  return storeFieldName + "#" + dataId;
}
function maybeDependOnExistenceOfEntity(store, entityId) {
  if (supportsResultCaching(store)) {
    store.group.depend(entityId, "__exists");
  }
}
(function(EntityStore2) {
  var Root = (
    /** @class */
    function(_super) {
      __extends(Root2, _super);
      function Root2(_a) {
        var policies = _a.policies, _b = _a.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a.seed;
        var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
        _this.stump = new Stump(_this);
        _this.storageTrie = new Trie(canUseWeakMap);
        if (seed)
          _this.replace(seed);
        return _this;
      }
      Root2.prototype.addLayer = function(layerId, replay) {
        return this.stump.addLayer(layerId, replay);
      };
      Root2.prototype.removeLayer = function() {
        return this;
      };
      Root2.prototype.getStorage = function() {
        return this.storageTrie.lookupArray(arguments);
      };
      return Root2;
    }(EntityStore2)
  );
  EntityStore2.Root = Root;
})(EntityStore || (EntityStore = {}));
var Layer = (
  /** @class */
  function(_super) {
    __extends(Layer2, _super);
    function Layer2(id, parent, replay, group) {
      var _this = _super.call(this, parent.policies, group) || this;
      _this.id = id;
      _this.parent = parent;
      _this.replay = replay;
      _this.group = group;
      replay(_this);
      return _this;
    }
    Layer2.prototype.addLayer = function(layerId, replay) {
      return new Layer2(layerId, this, replay, this.group);
    };
    Layer2.prototype.removeLayer = function(layerId) {
      var _this = this;
      var parent = this.parent.removeLayer(layerId);
      if (layerId === this.id) {
        if (this.group.caching) {
          Object.keys(this.data).forEach(function(dataId) {
            var ownStoreObject = _this.data[dataId];
            var parentStoreObject = parent["lookup"](dataId);
            if (!parentStoreObject) {
              _this.delete(dataId);
            } else if (!ownStoreObject) {
              _this.group.dirty(dataId, "__exists");
              Object.keys(parentStoreObject).forEach(function(storeFieldName) {
                _this.group.dirty(dataId, storeFieldName);
              });
            } else if (ownStoreObject !== parentStoreObject) {
              Object.keys(ownStoreObject).forEach(function(storeFieldName) {
                if (!equal(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                  _this.group.dirty(dataId, storeFieldName);
                }
              });
            }
          });
        }
        return parent;
      }
      if (parent === this.parent)
        return this;
      return parent.addLayer(this.id, this.replay);
    };
    Layer2.prototype.toObject = function() {
      return __assign(__assign({}, this.parent.toObject()), this.data);
    };
    Layer2.prototype.findChildRefIds = function(dataId) {
      var fromParent = this.parent.findChildRefIds(dataId);
      return hasOwn.call(this.data, dataId) ? __assign(__assign({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
    };
    Layer2.prototype.getStorage = function() {
      var p = this.parent;
      while (p.parent)
        p = p.parent;
      return p.getStorage.apply(
        p,
        // @ts-expect-error
        arguments
      );
    };
    return Layer2;
  }(EntityStore)
);
var Stump = (
  /** @class */
  function(_super) {
    __extends(Stump2, _super);
    function Stump2(root) {
      return _super.call(this, "EntityStore.Stump", root, function() {
      }, new CacheGroup(root.group.caching, root.group)) || this;
    }
    Stump2.prototype.removeLayer = function() {
      return this;
    };
    Stump2.prototype.merge = function(older, newer) {
      return this.parent.merge(older, newer);
    };
    return Stump2;
  }(Layer)
);
function storeObjectReconciler(existingObject, incomingObject, property) {
  var existingValue = existingObject[property];
  var incomingValue = incomingObject[property];
  return equal(existingValue, incomingValue) ? existingValue : incomingValue;
}
function supportsResultCaching(store) {
  return !!(store instanceof EntityStore && store.group.caching);
}

// node_modules/@apollo/client/cache/inmemory/object-canon.js
function shallowCopy(value) {
  if (isNonNullObject(value)) {
    return isArray(value) ? value.slice(0) : __assign({ __proto__: Object.getPrototypeOf(value) }, value);
  }
  return value;
}
var ObjectCanon = (
  /** @class */
  function() {
    function ObjectCanon2() {
      this.known = new (canUseWeakSet ? WeakSet : Set)();
      this.pool = new Trie(canUseWeakMap);
      this.passes = /* @__PURE__ */ new WeakMap();
      this.keysByJSON = /* @__PURE__ */ new Map();
      this.empty = this.admit({});
    }
    ObjectCanon2.prototype.isKnown = function(value) {
      return isNonNullObject(value) && this.known.has(value);
    };
    ObjectCanon2.prototype.pass = function(value) {
      if (isNonNullObject(value)) {
        var copy = shallowCopy(value);
        this.passes.set(copy, value);
        return copy;
      }
      return value;
    };
    ObjectCanon2.prototype.admit = function(value) {
      var _this = this;
      if (isNonNullObject(value)) {
        var original = this.passes.get(value);
        if (original)
          return original;
        var proto = Object.getPrototypeOf(value);
        switch (proto) {
          case Array.prototype: {
            if (this.known.has(value))
              return value;
            var array = value.map(this.admit, this);
            var node = this.pool.lookupArray(array);
            if (!node.array) {
              this.known.add(node.array = array);
              if (globalThis.__DEV__ !== false) {
                Object.freeze(array);
              }
            }
            return node.array;
          }
          case null:
          case Object.prototype: {
            if (this.known.has(value))
              return value;
            var proto_1 = Object.getPrototypeOf(value);
            var array_1 = [proto_1];
            var keys = this.sortedKeys(value);
            array_1.push(keys.json);
            var firstValueIndex_1 = array_1.length;
            keys.sorted.forEach(function(key) {
              array_1.push(_this.admit(value[key]));
            });
            var node = this.pool.lookupArray(array_1);
            if (!node.object) {
              var obj_1 = node.object = Object.create(proto_1);
              this.known.add(obj_1);
              keys.sorted.forEach(function(key, i) {
                obj_1[key] = array_1[firstValueIndex_1 + i];
              });
              if (globalThis.__DEV__ !== false) {
                Object.freeze(obj_1);
              }
            }
            return node.object;
          }
        }
      }
      return value;
    };
    ObjectCanon2.prototype.sortedKeys = function(obj) {
      var keys = Object.keys(obj);
      var node = this.pool.lookupArray(keys);
      if (!node.keys) {
        keys.sort();
        var json = JSON.stringify(keys);
        if (!(node.keys = this.keysByJSON.get(json))) {
          this.keysByJSON.set(json, node.keys = { sorted: keys, json });
        }
      }
      return node.keys;
    };
    return ObjectCanon2;
  }()
);

// node_modules/@apollo/client/cache/inmemory/readFromStore.js
function execSelectionSetKeyArgs(options) {
  return [
    options.selectionSet,
    options.objectOrReference,
    options.context,
    // We split out this property so we can pass different values
    // independently without modifying options.context itself.
    options.context.canonizeResults
  ];
}
var StoreReader = (
  /** @class */
  function() {
    function StoreReader2(config) {
      var _this = this;
      this.knownResults = new (canUseWeakMap ? WeakMap : Map)();
      this.config = compact(config, {
        addTypename: config.addTypename !== false,
        canonizeResults: shouldCanonizeResults(config)
      });
      this.canon = config.canon || new ObjectCanon();
      this.executeSelectionSet = wrap(function(options) {
        var _a;
        var canonizeResults = options.context.canonizeResults;
        var peekArgs = execSelectionSetKeyArgs(options);
        peekArgs[3] = !canonizeResults;
        var other = (_a = _this.executeSelectionSet).peek.apply(_a, peekArgs);
        if (other) {
          if (canonizeResults) {
            return __assign(__assign({}, other), {
              // If we previously read this result without canonizing it, we can
              // reuse that result simply by canonizing it now.
              result: _this.canon.admit(other.result)
            });
          }
          return other;
        }
        maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
        return _this.execSelectionSetImpl(options);
      }, {
        max: this.config.resultCacheMaxSize || cacheSizes["inMemoryCache.executeSelectionSet"] || 5e4,
        keyArgs: execSelectionSetKeyArgs,
        // Note that the parameters of makeCacheKey are determined by the
        // array returned by keyArgs.
        makeCacheKey: function(selectionSet, parent, context, canonizeResults) {
          if (supportsResultCaching(context.store)) {
            return context.store.makeCacheKey(selectionSet, isReference(parent) ? parent.__ref : parent, context.varString, canonizeResults);
          }
        }
      });
      this.executeSubSelectedArray = wrap(function(options) {
        maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
        return _this.execSubSelectedArrayImpl(options);
      }, {
        max: this.config.resultCacheMaxSize || cacheSizes["inMemoryCache.executeSubSelectedArray"] || 1e4,
        makeCacheKey: function(_a) {
          var field = _a.field, array = _a.array, context = _a.context;
          if (supportsResultCaching(context.store)) {
            return context.store.makeCacheKey(field, array, context.varString);
          }
        }
      });
    }
    StoreReader2.prototype.resetCanon = function() {
      this.canon = new ObjectCanon();
    };
    StoreReader2.prototype.diffQueryAgainstStore = function(_a) {
      var store = _a.store, query = _a.query, _b = _a.rootId, rootId = _b === void 0 ? "ROOT_QUERY" : _b, variables = _a.variables, _c = _a.returnPartialData, returnPartialData = _c === void 0 ? true : _c, _d = _a.canonizeResults, canonizeResults = _d === void 0 ? this.config.canonizeResults : _d;
      var policies = this.config.cache.policies;
      variables = __assign(__assign({}, getDefaultValues(getQueryDefinition(query))), variables);
      var rootRef = makeReference(rootId);
      var execResult = this.executeSelectionSet({
        selectionSet: getMainDefinition(query).selectionSet,
        objectOrReference: rootRef,
        enclosingRef: rootRef,
        context: __assign({ store, query, policies, variables, varString: canonicalStringify(variables), canonizeResults }, extractFragmentContext(query, this.config.fragments))
      });
      var missing;
      if (execResult.missing) {
        missing = [
          new MissingFieldError(firstMissing(execResult.missing), execResult.missing, query, variables)
        ];
        if (!returnPartialData) {
          throw missing[0];
        }
      }
      return {
        result: execResult.result,
        complete: !missing,
        missing
      };
    };
    StoreReader2.prototype.isFresh = function(result, parent, selectionSet, context) {
      if (supportsResultCaching(context.store) && this.knownResults.get(result) === selectionSet) {
        var latest = this.executeSelectionSet.peek(
          selectionSet,
          parent,
          context,
          // If result is canonical, then it could only have been previously
          // cached by the canonizing version of executeSelectionSet, so we can
          // avoid checking both possibilities here.
          this.canon.isKnown(result)
        );
        if (latest && result === latest.result) {
          return true;
        }
      }
      return false;
    };
    StoreReader2.prototype.execSelectionSetImpl = function(_a) {
      var _this = this;
      var selectionSet = _a.selectionSet, objectOrReference = _a.objectOrReference, enclosingRef = _a.enclosingRef, context = _a.context;
      if (isReference(objectOrReference) && !context.policies.rootTypenamesById[objectOrReference.__ref] && !context.store.has(objectOrReference.__ref)) {
        return {
          result: this.canon.empty,
          missing: "Dangling reference to missing ".concat(objectOrReference.__ref, " object")
        };
      }
      var variables = context.variables, policies = context.policies, store = context.store;
      var typename = store.getFieldValue(objectOrReference, "__typename");
      var objectsToMerge = [];
      var missing;
      var missingMerger = new DeepMerger();
      if (this.config.addTypename && typeof typename === "string" && !policies.rootIdsByTypename[typename]) {
        objectsToMerge.push({ __typename: typename });
      }
      function handleMissing(result2, resultName) {
        var _a2;
        if (result2.missing) {
          missing = missingMerger.merge(missing, (_a2 = {}, _a2[resultName] = result2.missing, _a2));
        }
        return result2.result;
      }
      var workSet = new Set(selectionSet.selections);
      workSet.forEach(function(selection) {
        var _a2, _b;
        if (!shouldInclude(selection, variables))
          return;
        if (isField(selection)) {
          var fieldValue = policies.readField({
            fieldName: selection.name.value,
            field: selection,
            variables: context.variables,
            from: objectOrReference
          }, context);
          var resultName = resultKeyNameFromField(selection);
          if (fieldValue === void 0) {
            if (!addTypenameToDocument.added(selection)) {
              missing = missingMerger.merge(missing, (_a2 = {}, _a2[resultName] = "Can't find field '".concat(selection.name.value, "' on ").concat(isReference(objectOrReference) ? objectOrReference.__ref + " object" : "object " + JSON.stringify(objectOrReference, null, 2)), _a2));
            }
          } else if (isArray(fieldValue)) {
            if (fieldValue.length > 0) {
              fieldValue = handleMissing(_this.executeSubSelectedArray({
                field: selection,
                array: fieldValue,
                enclosingRef,
                context
              }), resultName);
            }
          } else if (!selection.selectionSet) {
            if (context.canonizeResults) {
              fieldValue = _this.canon.pass(fieldValue);
            }
          } else if (fieldValue != null) {
            fieldValue = handleMissing(_this.executeSelectionSet({
              selectionSet: selection.selectionSet,
              objectOrReference: fieldValue,
              enclosingRef: isReference(fieldValue) ? fieldValue : enclosingRef,
              context
            }), resultName);
          }
          if (fieldValue !== void 0) {
            objectsToMerge.push((_b = {}, _b[resultName] = fieldValue, _b));
          }
        } else {
          var fragment = getFragmentFromSelection(selection, context.lookupFragment);
          if (!fragment && selection.kind === Kind.FRAGMENT_SPREAD) {
            throw newInvariantError(9, selection.name.value);
          }
          if (fragment && policies.fragmentMatches(fragment, typename)) {
            fragment.selectionSet.selections.forEach(workSet.add, workSet);
          }
        }
      });
      var result = mergeDeepArray(objectsToMerge);
      var finalResult = { result, missing };
      var frozen = context.canonizeResults ? this.canon.admit(finalResult) : maybeDeepFreeze(finalResult);
      if (frozen.result) {
        this.knownResults.set(frozen.result, selectionSet);
      }
      return frozen;
    };
    StoreReader2.prototype.execSubSelectedArrayImpl = function(_a) {
      var _this = this;
      var field = _a.field, array = _a.array, enclosingRef = _a.enclosingRef, context = _a.context;
      var missing;
      var missingMerger = new DeepMerger();
      function handleMissing(childResult, i) {
        var _a2;
        if (childResult.missing) {
          missing = missingMerger.merge(missing, (_a2 = {}, _a2[i] = childResult.missing, _a2));
        }
        return childResult.result;
      }
      if (field.selectionSet) {
        array = array.filter(context.store.canRead);
      }
      array = array.map(function(item, i) {
        if (item === null) {
          return null;
        }
        if (isArray(item)) {
          return handleMissing(_this.executeSubSelectedArray({
            field,
            array: item,
            enclosingRef,
            context
          }), i);
        }
        if (field.selectionSet) {
          return handleMissing(_this.executeSelectionSet({
            selectionSet: field.selectionSet,
            objectOrReference: item,
            enclosingRef: isReference(item) ? item : enclosingRef,
            context
          }), i);
        }
        if (globalThis.__DEV__ !== false) {
          assertSelectionSetForIdValue(context.store, field, item);
        }
        return item;
      });
      return {
        result: context.canonizeResults ? this.canon.admit(array) : array,
        missing
      };
    };
    return StoreReader2;
  }()
);
function firstMissing(tree) {
  try {
    JSON.stringify(tree, function(_, value) {
      if (typeof value === "string")
        throw value;
      return value;
    });
  } catch (result) {
    return result;
  }
}
function assertSelectionSetForIdValue(store, field, fieldValue) {
  if (!field.selectionSet) {
    var workSet_1 = /* @__PURE__ */ new Set([fieldValue]);
    workSet_1.forEach(function(value) {
      if (isNonNullObject(value)) {
        invariant(
          !isReference(value),
          10,
          getTypenameFromStoreObject(store, value),
          field.name.value
        );
        Object.values(value).forEach(workSet_1.add, workSet_1);
      }
    });
  }
}

// node_modules/@apollo/client/cache/inmemory/reactiveVars.js
var cacheSlot = new Slot();
var cacheInfoMap = /* @__PURE__ */ new WeakMap();
function getCacheInfo(cache2) {
  var info = cacheInfoMap.get(cache2);
  if (!info) {
    cacheInfoMap.set(cache2, info = {
      vars: /* @__PURE__ */ new Set(),
      dep: dep()
    });
  }
  return info;
}
function forgetCache(cache2) {
  getCacheInfo(cache2).vars.forEach(function(rv) {
    return rv.forgetCache(cache2);
  });
}
function recallCache(cache2) {
  getCacheInfo(cache2).vars.forEach(function(rv) {
    return rv.attachCache(cache2);
  });
}
function makeVar(value) {
  var caches = /* @__PURE__ */ new Set();
  var listeners = /* @__PURE__ */ new Set();
  var rv = function(newValue) {
    if (arguments.length > 0) {
      if (value !== newValue) {
        value = newValue;
        caches.forEach(function(cache3) {
          getCacheInfo(cache3).dep.dirty(rv);
          broadcast(cache3);
        });
        var oldListeners = Array.from(listeners);
        listeners.clear();
        oldListeners.forEach(function(listener) {
          return listener(value);
        });
      }
    } else {
      var cache2 = cacheSlot.getValue();
      if (cache2) {
        attach(cache2);
        getCacheInfo(cache2).dep(rv);
      }
    }
    return value;
  };
  rv.onNextChange = function(listener) {
    listeners.add(listener);
    return function() {
      listeners.delete(listener);
    };
  };
  var attach = rv.attachCache = function(cache2) {
    caches.add(cache2);
    getCacheInfo(cache2).vars.add(rv);
    return rv;
  };
  rv.forgetCache = function(cache2) {
    return caches.delete(cache2);
  };
  return rv;
}
function broadcast(cache2) {
  if (cache2.broadcastWatches) {
    cache2.broadcastWatches();
  }
}

// node_modules/@apollo/client/cache/inmemory/key-extractor.js
var specifierInfoCache = /* @__PURE__ */ Object.create(null);
function lookupSpecifierInfo(spec) {
  var cacheKey = JSON.stringify(spec);
  return specifierInfoCache[cacheKey] || (specifierInfoCache[cacheKey] = /* @__PURE__ */ Object.create(null));
}
function keyFieldsFnFromSpecifier(specifier) {
  var info = lookupSpecifierInfo(specifier);
  return info.keyFieldsFn || (info.keyFieldsFn = function(object, context) {
    var extract = function(from2, key) {
      return context.readField(key, from2);
    };
    var keyObject = context.keyObject = collectSpecifierPaths(specifier, function(schemaKeyPath) {
      var extracted = extractKeyPath(
        context.storeObject,
        schemaKeyPath,
        // Using context.readField to extract paths from context.storeObject
        // allows the extraction to see through Reference objects and respect
        // custom read functions.
        extract
      );
      if (extracted === void 0 && object !== context.storeObject && hasOwn.call(object, schemaKeyPath[0])) {
        extracted = extractKeyPath(object, schemaKeyPath, extractKey);
      }
      invariant(extracted !== void 0, 4, schemaKeyPath.join("."), object);
      return extracted;
    });
    return "".concat(context.typename, ":").concat(JSON.stringify(keyObject));
  });
}
function keyArgsFnFromSpecifier(specifier) {
  var info = lookupSpecifierInfo(specifier);
  return info.keyArgsFn || (info.keyArgsFn = function(args, _a) {
    var field = _a.field, variables = _a.variables, fieldName = _a.fieldName;
    var collected = collectSpecifierPaths(specifier, function(keyPath) {
      var firstKey = keyPath[0];
      var firstChar = firstKey.charAt(0);
      if (firstChar === "@") {
        if (field && isNonEmptyArray(field.directives)) {
          var directiveName_1 = firstKey.slice(1);
          var d = field.directives.find(function(d2) {
            return d2.name.value === directiveName_1;
          });
          var directiveArgs = d && argumentsObjectFromField(d, variables);
          return directiveArgs && extractKeyPath(
            directiveArgs,
            // If keyPath.length === 1, this code calls extractKeyPath with an
            // empty path, which works because it uses directiveArgs as the
            // extracted value.
            keyPath.slice(1)
          );
        }
        return;
      }
      if (firstChar === "$") {
        var variableName = firstKey.slice(1);
        if (variables && hasOwn.call(variables, variableName)) {
          var varKeyPath = keyPath.slice(0);
          varKeyPath[0] = variableName;
          return extractKeyPath(variables, varKeyPath);
        }
        return;
      }
      if (args) {
        return extractKeyPath(args, keyPath);
      }
    });
    var suffix = JSON.stringify(collected);
    if (args || suffix !== "{}") {
      fieldName += ":" + suffix;
    }
    return fieldName;
  });
}
function collectSpecifierPaths(specifier, extractor) {
  var merger = new DeepMerger();
  return getSpecifierPaths(specifier).reduce(function(collected, path) {
    var _a;
    var toMerge = extractor(path);
    if (toMerge !== void 0) {
      for (var i = path.length - 1; i >= 0; --i) {
        toMerge = (_a = {}, _a[path[i]] = toMerge, _a);
      }
      collected = merger.merge(collected, toMerge);
    }
    return collected;
  }, /* @__PURE__ */ Object.create(null));
}
function getSpecifierPaths(spec) {
  var info = lookupSpecifierInfo(spec);
  if (!info.paths) {
    var paths_1 = info.paths = [];
    var currentPath_1 = [];
    spec.forEach(function(s, i) {
      if (isArray(s)) {
        getSpecifierPaths(s).forEach(function(p) {
          return paths_1.push(currentPath_1.concat(p));
        });
        currentPath_1.length = 0;
      } else {
        currentPath_1.push(s);
        if (!isArray(spec[i + 1])) {
          paths_1.push(currentPath_1.slice(0));
          currentPath_1.length = 0;
        }
      }
    });
  }
  return info.paths;
}
function extractKey(object, key) {
  return object[key];
}
function extractKeyPath(object, path, extract) {
  extract = extract || extractKey;
  return normalize(path.reduce(function reducer(obj, key) {
    return isArray(obj) ? obj.map(function(child) {
      return reducer(child, key);
    }) : obj && extract(obj, key);
  }, object));
}
function normalize(value) {
  if (isNonNullObject(value)) {
    if (isArray(value)) {
      return value.map(normalize);
    }
    return collectSpecifierPaths(Object.keys(value).sort(), function(path) {
      return extractKeyPath(value, path);
    });
  }
  return value;
}

// node_modules/@apollo/client/cache/inmemory/policies.js
function argsFromFieldSpecifier(spec) {
  return spec.args !== void 0 ? spec.args : spec.field ? argumentsObjectFromField(spec.field, spec.variables) : null;
}
var nullKeyFieldsFn = function() {
  return void 0;
};
var simpleKeyArgsFn = function(_args, context) {
  return context.fieldName;
};
var mergeTrueFn = function(existing, incoming, _a) {
  var mergeObjects = _a.mergeObjects;
  return mergeObjects(existing, incoming);
};
var mergeFalseFn = function(_, incoming) {
  return incoming;
};
var Policies = (
  /** @class */
  function() {
    function Policies2(config) {
      this.config = config;
      this.typePolicies = /* @__PURE__ */ Object.create(null);
      this.toBeAdded = /* @__PURE__ */ Object.create(null);
      this.supertypeMap = /* @__PURE__ */ new Map();
      this.fuzzySubtypes = /* @__PURE__ */ new Map();
      this.rootIdsByTypename = /* @__PURE__ */ Object.create(null);
      this.rootTypenamesById = /* @__PURE__ */ Object.create(null);
      this.usingPossibleTypes = false;
      this.config = __assign({ dataIdFromObject: defaultDataIdFromObject }, config);
      this.cache = this.config.cache;
      this.setRootTypename("Query");
      this.setRootTypename("Mutation");
      this.setRootTypename("Subscription");
      if (config.possibleTypes) {
        this.addPossibleTypes(config.possibleTypes);
      }
      if (config.typePolicies) {
        this.addTypePolicies(config.typePolicies);
      }
    }
    Policies2.prototype.identify = function(object, partialContext) {
      var _a;
      var policies = this;
      var typename = partialContext && (partialContext.typename || ((_a = partialContext.storeObject) === null || _a === void 0 ? void 0 : _a.__typename)) || object.__typename;
      if (typename === this.rootTypenamesById.ROOT_QUERY) {
        return ["ROOT_QUERY"];
      }
      var storeObject = partialContext && partialContext.storeObject || object;
      var context = __assign(__assign({}, partialContext), { typename, storeObject, readField: partialContext && partialContext.readField || function() {
        var options = normalizeReadFieldOptions(arguments, storeObject);
        return policies.readField(options, {
          store: policies.cache["data"],
          variables: options.variables
        });
      } });
      var id;
      var policy = typename && this.getTypePolicy(typename);
      var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
      while (keyFn) {
        var specifierOrId = keyFn(__assign(__assign({}, object), storeObject), context);
        if (isArray(specifierOrId)) {
          keyFn = keyFieldsFnFromSpecifier(specifierOrId);
        } else {
          id = specifierOrId;
          break;
        }
      }
      id = id ? String(id) : void 0;
      return context.keyObject ? [id, context.keyObject] : [id];
    };
    Policies2.prototype.addTypePolicies = function(typePolicies) {
      var _this = this;
      Object.keys(typePolicies).forEach(function(typename) {
        var _a = typePolicies[typename], queryType = _a.queryType, mutationType = _a.mutationType, subscriptionType = _a.subscriptionType, incoming = __rest(_a, ["queryType", "mutationType", "subscriptionType"]);
        if (queryType)
          _this.setRootTypename("Query", typename);
        if (mutationType)
          _this.setRootTypename("Mutation", typename);
        if (subscriptionType)
          _this.setRootTypename("Subscription", typename);
        if (hasOwn.call(_this.toBeAdded, typename)) {
          _this.toBeAdded[typename].push(incoming);
        } else {
          _this.toBeAdded[typename] = [incoming];
        }
      });
    };
    Policies2.prototype.updateTypePolicy = function(typename, incoming) {
      var _this = this;
      var existing = this.getTypePolicy(typename);
      var keyFields = incoming.keyFields, fields = incoming.fields;
      function setMerge(existing2, merge) {
        existing2.merge = typeof merge === "function" ? merge : merge === true ? mergeTrueFn : merge === false ? mergeFalseFn : existing2.merge;
      }
      setMerge(existing, incoming.merge);
      existing.keyFn = // Pass false to disable normalization for this typename.
      keyFields === false ? nullKeyFieldsFn : isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) : typeof keyFields === "function" ? keyFields : existing.keyFn;
      if (fields) {
        Object.keys(fields).forEach(function(fieldName) {
          var existing2 = _this.getFieldPolicy(typename, fieldName, true);
          var incoming2 = fields[fieldName];
          if (typeof incoming2 === "function") {
            existing2.read = incoming2;
          } else {
            var keyArgs = incoming2.keyArgs, read = incoming2.read, merge = incoming2.merge;
            existing2.keyFn = // Pass false to disable argument-based differentiation of
            // field identities.
            keyArgs === false ? simpleKeyArgsFn : isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) : typeof keyArgs === "function" ? keyArgs : existing2.keyFn;
            if (typeof read === "function") {
              existing2.read = read;
            }
            setMerge(existing2, merge);
          }
          if (existing2.read && existing2.merge) {
            existing2.keyFn = existing2.keyFn || simpleKeyArgsFn;
          }
        });
      }
    };
    Policies2.prototype.setRootTypename = function(which, typename) {
      if (typename === void 0) {
        typename = which;
      }
      var rootId = "ROOT_" + which.toUpperCase();
      var old = this.rootTypenamesById[rootId];
      if (typename !== old) {
        invariant(!old || old === which, 5, which);
        if (old)
          delete this.rootIdsByTypename[old];
        this.rootIdsByTypename[typename] = rootId;
        this.rootTypenamesById[rootId] = typename;
      }
    };
    Policies2.prototype.addPossibleTypes = function(possibleTypes) {
      var _this = this;
      this.usingPossibleTypes = true;
      Object.keys(possibleTypes).forEach(function(supertype) {
        _this.getSupertypeSet(supertype, true);
        possibleTypes[supertype].forEach(function(subtype) {
          _this.getSupertypeSet(subtype, true).add(supertype);
          var match = subtype.match(TypeOrFieldNameRegExp);
          if (!match || match[0] !== subtype) {
            _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
          }
        });
      });
    };
    Policies2.prototype.getTypePolicy = function(typename) {
      var _this = this;
      if (!hasOwn.call(this.typePolicies, typename)) {
        var policy_1 = this.typePolicies[typename] = /* @__PURE__ */ Object.create(null);
        policy_1.fields = /* @__PURE__ */ Object.create(null);
        var supertypes_1 = this.supertypeMap.get(typename);
        if (!supertypes_1 && this.fuzzySubtypes.size) {
          supertypes_1 = this.getSupertypeSet(typename, true);
          this.fuzzySubtypes.forEach(function(regExp, fuzzy) {
            if (regExp.test(typename)) {
              var fuzzySupertypes = _this.supertypeMap.get(fuzzy);
              if (fuzzySupertypes) {
                fuzzySupertypes.forEach(function(supertype) {
                  return supertypes_1.add(supertype);
                });
              }
            }
          });
        }
        if (supertypes_1 && supertypes_1.size) {
          supertypes_1.forEach(function(supertype) {
            var _a = _this.getTypePolicy(supertype), fields = _a.fields, rest = __rest(_a, ["fields"]);
            Object.assign(policy_1, rest);
            Object.assign(policy_1.fields, fields);
          });
        }
      }
      var inbox = this.toBeAdded[typename];
      if (inbox && inbox.length) {
        inbox.splice(0).forEach(function(policy) {
          _this.updateTypePolicy(typename, policy);
        });
      }
      return this.typePolicies[typename];
    };
    Policies2.prototype.getFieldPolicy = function(typename, fieldName, createIfMissing) {
      if (typename) {
        var fieldPolicies = this.getTypePolicy(typename).fields;
        return fieldPolicies[fieldName] || createIfMissing && (fieldPolicies[fieldName] = /* @__PURE__ */ Object.create(null));
      }
    };
    Policies2.prototype.getSupertypeSet = function(subtype, createIfMissing) {
      var supertypeSet = this.supertypeMap.get(subtype);
      if (!supertypeSet && createIfMissing) {
        this.supertypeMap.set(subtype, supertypeSet = /* @__PURE__ */ new Set());
      }
      return supertypeSet;
    };
    Policies2.prototype.fragmentMatches = function(fragment, typename, result, variables) {
      var _this = this;
      if (!fragment.typeCondition)
        return true;
      if (!typename)
        return false;
      var supertype = fragment.typeCondition.name.value;
      if (typename === supertype)
        return true;
      if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
        var typenameSupertypeSet = this.getSupertypeSet(typename, true);
        var workQueue_1 = [typenameSupertypeSet];
        var maybeEnqueue_1 = function(subtype) {
          var supertypeSet2 = _this.getSupertypeSet(subtype, false);
          if (supertypeSet2 && supertypeSet2.size && workQueue_1.indexOf(supertypeSet2) < 0) {
            workQueue_1.push(supertypeSet2);
          }
        };
        var needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
        var checkingFuzzySubtypes = false;
        for (var i = 0; i < workQueue_1.length; ++i) {
          var supertypeSet = workQueue_1[i];
          if (supertypeSet.has(supertype)) {
            if (!typenameSupertypeSet.has(supertype)) {
              if (checkingFuzzySubtypes) {
                globalThis.__DEV__ !== false && invariant.warn(6, typename, supertype);
              }
              typenameSupertypeSet.add(supertype);
            }
            return true;
          }
          supertypeSet.forEach(maybeEnqueue_1);
          if (needToCheckFuzzySubtypes && // Start checking fuzzy subtypes only after exhausting all
          // non-fuzzy subtypes (after the final iteration of the loop).
          i === workQueue_1.length - 1 && // We could wait to compare fragment.selectionSet to result
          // after we verify the supertype, but this check is often less
          // expensive than that search, and we will have to do the
          // comparison anyway whenever we find a potential match.
          selectionSetMatchesResult(fragment.selectionSet, result, variables)) {
            needToCheckFuzzySubtypes = false;
            checkingFuzzySubtypes = true;
            this.fuzzySubtypes.forEach(function(regExp, fuzzyString) {
              var match = typename.match(regExp);
              if (match && match[0] === typename) {
                maybeEnqueue_1(fuzzyString);
              }
            });
          }
        }
      }
      return false;
    };
    Policies2.prototype.hasKeyArgs = function(typename, fieldName) {
      var policy = this.getFieldPolicy(typename, fieldName, false);
      return !!(policy && policy.keyFn);
    };
    Policies2.prototype.getStoreFieldName = function(fieldSpec) {
      var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
      var policy = this.getFieldPolicy(typename, fieldName, false);
      var storeFieldName;
      var keyFn = policy && policy.keyFn;
      if (keyFn && typename) {
        var context = {
          typename,
          fieldName,
          field: fieldSpec.field || null,
          variables: fieldSpec.variables
        };
        var args = argsFromFieldSpecifier(fieldSpec);
        while (keyFn) {
          var specifierOrString = keyFn(args, context);
          if (isArray(specifierOrString)) {
            keyFn = keyArgsFnFromSpecifier(specifierOrString);
          } else {
            storeFieldName = specifierOrString || fieldName;
            break;
          }
        }
      }
      if (storeFieldName === void 0) {
        storeFieldName = fieldSpec.field ? storeKeyNameFromField(fieldSpec.field, fieldSpec.variables) : getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
      }
      if (storeFieldName === false) {
        return fieldName;
      }
      return fieldName === fieldNameFromStoreName(storeFieldName) ? storeFieldName : fieldName + ":" + storeFieldName;
    };
    Policies2.prototype.readField = function(options, context) {
      var objectOrReference = options.from;
      if (!objectOrReference)
        return;
      var nameOrField = options.field || options.fieldName;
      if (!nameOrField)
        return;
      if (options.typename === void 0) {
        var typename = context.store.getFieldValue(objectOrReference, "__typename");
        if (typename)
          options.typename = typename;
      }
      var storeFieldName = this.getStoreFieldName(options);
      var fieldName = fieldNameFromStoreName(storeFieldName);
      var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
      var policy = this.getFieldPolicy(options.typename, fieldName, false);
      var read = policy && policy.read;
      if (read) {
        var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage(isReference(objectOrReference) ? objectOrReference.__ref : objectOrReference, storeFieldName));
        return cacheSlot.withValue(this.cache, read, [
          existing,
          readOptions
        ]);
      }
      return existing;
    };
    Policies2.prototype.getReadFunction = function(typename, fieldName) {
      var policy = this.getFieldPolicy(typename, fieldName, false);
      return policy && policy.read;
    };
    Policies2.prototype.getMergeFunction = function(parentTypename, fieldName, childTypename) {
      var policy = this.getFieldPolicy(parentTypename, fieldName, false);
      var merge = policy && policy.merge;
      if (!merge && childTypename) {
        policy = this.getTypePolicy(childTypename);
        merge = policy && policy.merge;
      }
      return merge;
    };
    Policies2.prototype.runMergeFunction = function(existing, incoming, _a, context, storage) {
      var field = _a.field, typename = _a.typename, merge = _a.merge;
      if (merge === mergeTrueFn) {
        return makeMergeObjectsFunction(context.store)(existing, incoming);
      }
      if (merge === mergeFalseFn) {
        return incoming;
      }
      if (context.overwrite) {
        existing = void 0;
      }
      return merge(existing, incoming, makeFieldFunctionOptions(
        this,
        // Unlike options.readField for read functions, we do not fall
        // back to the current object if no foreignObjOrRef is provided,
        // because it's not clear what the current object should be for
        // merge functions: the (possibly undefined) existing object, or
        // the incoming object? If you think your merge function needs
        // to read sibling fields in order to produce a new value for
        // the current field, you might want to rethink your strategy,
        // because that's a recipe for making merge behavior sensitive
        // to the order in which fields are written into the cache.
        // However, readField(name, ref) is useful for merge functions
        // that need to deduplicate child objects and references.
        void 0,
        {
          typename,
          fieldName: field.name.value,
          field,
          variables: context.variables
        },
        context,
        storage || /* @__PURE__ */ Object.create(null)
      ));
    };
    return Policies2;
  }()
);
function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
  var storeFieldName = policies.getStoreFieldName(fieldSpec);
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var variables = fieldSpec.variables || context.variables;
  var _a = context.store, toReference = _a.toReference, canRead = _a.canRead;
  return {
    args: argsFromFieldSpecifier(fieldSpec),
    field: fieldSpec.field || null,
    fieldName,
    storeFieldName,
    variables,
    isReference,
    toReference,
    storage,
    cache: policies.cache,
    canRead,
    readField: function() {
      return policies.readField(normalizeReadFieldOptions(arguments, objectOrReference, variables), context);
    },
    mergeObjects: makeMergeObjectsFunction(context.store)
  };
}
function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
  var fieldNameOrOptions = readFieldArgs[0], from2 = readFieldArgs[1], argc = readFieldArgs.length;
  var options;
  if (typeof fieldNameOrOptions === "string") {
    options = {
      fieldName: fieldNameOrOptions,
      // Default to objectOrReference only when no second argument was
      // passed for the from parameter, not when undefined is explicitly
      // passed as the second argument.
      from: argc > 1 ? from2 : objectOrReference
    };
  } else {
    options = __assign({}, fieldNameOrOptions);
    if (!hasOwn.call(options, "from")) {
      options.from = objectOrReference;
    }
  }
  if (globalThis.__DEV__ !== false && options.from === void 0) {
    globalThis.__DEV__ !== false && invariant.warn(7, stringifyForDisplay(Array.from(readFieldArgs)));
  }
  if (void 0 === options.variables) {
    options.variables = variables;
  }
  return options;
}
function makeMergeObjectsFunction(store) {
  return function mergeObjects(existing, incoming) {
    if (isArray(existing) || isArray(incoming)) {
      throw newInvariantError(8);
    }
    if (isNonNullObject(existing) && isNonNullObject(incoming)) {
      var eType = store.getFieldValue(existing, "__typename");
      var iType = store.getFieldValue(incoming, "__typename");
      var typesDiffer = eType && iType && eType !== iType;
      if (typesDiffer) {
        return incoming;
      }
      if (isReference(existing) && storeValueIsStoreObject(incoming)) {
        store.merge(existing.__ref, incoming);
        return existing;
      }
      if (storeValueIsStoreObject(existing) && isReference(incoming)) {
        store.merge(existing, incoming.__ref);
        return incoming;
      }
      if (storeValueIsStoreObject(existing) && storeValueIsStoreObject(incoming)) {
        return __assign(__assign({}, existing), incoming);
      }
    }
    return incoming;
  };
}

// node_modules/@apollo/client/cache/inmemory/writeToStore.js
function getContextFlavor(context, clientOnly, deferred) {
  var key = "".concat(clientOnly).concat(deferred);
  var flavored = context.flavors.get(key);
  if (!flavored) {
    context.flavors.set(key, flavored = context.clientOnly === clientOnly && context.deferred === deferred ? context : __assign(__assign({}, context), { clientOnly, deferred }));
  }
  return flavored;
}
var StoreWriter = (
  /** @class */
  function() {
    function StoreWriter2(cache2, reader, fragments) {
      this.cache = cache2;
      this.reader = reader;
      this.fragments = fragments;
    }
    StoreWriter2.prototype.writeToStore = function(store, _a) {
      var _this = this;
      var query = _a.query, result = _a.result, dataId = _a.dataId, variables = _a.variables, overwrite = _a.overwrite;
      var operationDefinition = getOperationDefinition(query);
      var merger = makeProcessedFieldsMerger();
      variables = __assign(__assign({}, getDefaultValues(operationDefinition)), variables);
      var context = __assign(__assign({ store, written: /* @__PURE__ */ Object.create(null), merge: function(existing, incoming) {
        return merger.merge(existing, incoming);
      }, variables, varString: canonicalStringify(variables) }, extractFragmentContext(query, this.fragments)), { overwrite: !!overwrite, incomingById: /* @__PURE__ */ new Map(), clientOnly: false, deferred: false, flavors: /* @__PURE__ */ new Map() });
      var ref = this.processSelectionSet({
        result: result || /* @__PURE__ */ Object.create(null),
        dataId,
        selectionSet: operationDefinition.selectionSet,
        mergeTree: { map: /* @__PURE__ */ new Map() },
        context
      });
      if (!isReference(ref)) {
        throw newInvariantError(11, result);
      }
      context.incomingById.forEach(function(_a2, dataId2) {
        var storeObject = _a2.storeObject, mergeTree = _a2.mergeTree, fieldNodeSet = _a2.fieldNodeSet;
        var entityRef = makeReference(dataId2);
        if (mergeTree && mergeTree.map.size) {
          var applied = _this.applyMerges(mergeTree, entityRef, storeObject, context);
          if (isReference(applied)) {
            return;
          }
          storeObject = applied;
        }
        if (globalThis.__DEV__ !== false && !context.overwrite) {
          var fieldsWithSelectionSets_1 = /* @__PURE__ */ Object.create(null);
          fieldNodeSet.forEach(function(field) {
            if (field.selectionSet) {
              fieldsWithSelectionSets_1[field.name.value] = true;
            }
          });
          var hasSelectionSet_1 = function(storeFieldName) {
            return fieldsWithSelectionSets_1[fieldNameFromStoreName(storeFieldName)] === true;
          };
          var hasMergeFunction_1 = function(storeFieldName) {
            var childTree = mergeTree && mergeTree.map.get(storeFieldName);
            return Boolean(childTree && childTree.info && childTree.info.merge);
          };
          Object.keys(storeObject).forEach(function(storeFieldName) {
            if (hasSelectionSet_1(storeFieldName) && !hasMergeFunction_1(storeFieldName)) {
              warnAboutDataLoss(entityRef, storeObject, storeFieldName, context.store);
            }
          });
        }
        store.merge(dataId2, storeObject);
      });
      store.retain(ref.__ref);
      return ref;
    };
    StoreWriter2.prototype.processSelectionSet = function(_a) {
      var _this = this;
      var dataId = _a.dataId, result = _a.result, selectionSet = _a.selectionSet, context = _a.context, mergeTree = _a.mergeTree;
      var policies = this.cache.policies;
      var incoming = /* @__PURE__ */ Object.create(null);
      var typename = dataId && policies.rootTypenamesById[dataId] || getTypenameFromResult(result, selectionSet, context.fragmentMap) || dataId && context.store.get(dataId, "__typename");
      if ("string" === typeof typename) {
        incoming.__typename = typename;
      }
      var readField = function() {
        var options = normalizeReadFieldOptions(arguments, incoming, context.variables);
        if (isReference(options.from)) {
          var info = context.incomingById.get(options.from.__ref);
          if (info) {
            var result_1 = policies.readField(__assign(__assign({}, options), { from: info.storeObject }), context);
            if (result_1 !== void 0) {
              return result_1;
            }
          }
        }
        return policies.readField(options, context);
      };
      var fieldNodeSet = /* @__PURE__ */ new Set();
      this.flattenFields(
        selectionSet,
        result,
        // This WriteContext will be the default context value for fields returned
        // by the flattenFields method, but some fields may be assigned a modified
        // context, depending on the presence of @client and other directives.
        context,
        typename
      ).forEach(function(context2, field) {
        var _a2;
        var resultFieldKey = resultKeyNameFromField(field);
        var value = result[resultFieldKey];
        fieldNodeSet.add(field);
        if (value !== void 0) {
          var storeFieldName = policies.getStoreFieldName({
            typename,
            fieldName: field.name.value,
            field,
            variables: context2.variables
          });
          var childTree = getChildMergeTree(mergeTree, storeFieldName);
          var incomingValue = _this.processFieldValue(
            value,
            field,
            // Reset context.clientOnly and context.deferred to their default
            // values before processing nested selection sets.
            field.selectionSet ? getContextFlavor(context2, false, false) : context2,
            childTree
          );
          var childTypename = void 0;
          if (field.selectionSet && (isReference(incomingValue) || storeValueIsStoreObject(incomingValue))) {
            childTypename = readField("__typename", incomingValue);
          }
          var merge = policies.getMergeFunction(typename, field.name.value, childTypename);
          if (merge) {
            childTree.info = {
              // TODO Check compatibility against any existing childTree.field?
              field,
              typename,
              merge
            };
          } else {
            maybeRecycleChildMergeTree(mergeTree, storeFieldName);
          }
          incoming = context2.merge(incoming, (_a2 = {}, _a2[storeFieldName] = incomingValue, _a2));
        } else if (globalThis.__DEV__ !== false && !context2.clientOnly && !context2.deferred && !addTypenameToDocument.added(field) && // If the field has a read function, it may be a synthetic field or
        // provide a default value, so its absence from the written data should
        // not be cause for alarm.
        !policies.getReadFunction(typename, field.name.value)) {
          globalThis.__DEV__ !== false && invariant.error(12, resultKeyNameFromField(field), result);
        }
      });
      try {
        var _b = policies.identify(result, {
          typename,
          selectionSet,
          fragmentMap: context.fragmentMap,
          storeObject: incoming,
          readField
        }), id = _b[0], keyObject = _b[1];
        dataId = dataId || id;
        if (keyObject) {
          incoming = context.merge(incoming, keyObject);
        }
      } catch (e) {
        if (!dataId)
          throw e;
      }
      if ("string" === typeof dataId) {
        var dataRef = makeReference(dataId);
        var sets = context.written[dataId] || (context.written[dataId] = []);
        if (sets.indexOf(selectionSet) >= 0)
          return dataRef;
        sets.push(selectionSet);
        if (this.reader && this.reader.isFresh(result, dataRef, selectionSet, context)) {
          return dataRef;
        }
        var previous_1 = context.incomingById.get(dataId);
        if (previous_1) {
          previous_1.storeObject = context.merge(previous_1.storeObject, incoming);
          previous_1.mergeTree = mergeMergeTrees(previous_1.mergeTree, mergeTree);
          fieldNodeSet.forEach(function(field) {
            return previous_1.fieldNodeSet.add(field);
          });
        } else {
          context.incomingById.set(dataId, {
            storeObject: incoming,
            // Save a reference to mergeTree only if it is not empty, because
            // empty MergeTrees may be recycled by maybeRecycleChildMergeTree and
            // reused for entirely different parts of the result tree.
            mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
            fieldNodeSet
          });
        }
        return dataRef;
      }
      return incoming;
    };
    StoreWriter2.prototype.processFieldValue = function(value, field, context, mergeTree) {
      var _this = this;
      if (!field.selectionSet || value === null) {
        return globalThis.__DEV__ !== false ? cloneDeep(value) : value;
      }
      if (isArray(value)) {
        return value.map(function(item, i) {
          var value2 = _this.processFieldValue(item, field, context, getChildMergeTree(mergeTree, i));
          maybeRecycleChildMergeTree(mergeTree, i);
          return value2;
        });
      }
      return this.processSelectionSet({
        result: value,
        selectionSet: field.selectionSet,
        context,
        mergeTree
      });
    };
    StoreWriter2.prototype.flattenFields = function(selectionSet, result, context, typename) {
      if (typename === void 0) {
        typename = getTypenameFromResult(result, selectionSet, context.fragmentMap);
      }
      var fieldMap = /* @__PURE__ */ new Map();
      var policies = this.cache.policies;
      var limitingTrie = new Trie(false);
      (function flatten(selectionSet2, inheritedContext) {
        var visitedNode = limitingTrie.lookup(
          selectionSet2,
          // Because we take inheritedClientOnly and inheritedDeferred into
          // consideration here (in addition to selectionSet), it's possible for
          // the same selection set to be flattened more than once, if it appears
          // in the query with different @client and/or @directive configurations.
          inheritedContext.clientOnly,
          inheritedContext.deferred
        );
        if (visitedNode.visited)
          return;
        visitedNode.visited = true;
        selectionSet2.selections.forEach(function(selection) {
          if (!shouldInclude(selection, context.variables))
            return;
          var clientOnly = inheritedContext.clientOnly, deferred = inheritedContext.deferred;
          if (
            // Since the presence of @client or @defer on this field can only
            // cause clientOnly or deferred to become true, we can skip the
            // forEach loop if both clientOnly and deferred are already true.
            !(clientOnly && deferred) && isNonEmptyArray(selection.directives)
          ) {
            selection.directives.forEach(function(dir) {
              var name = dir.name.value;
              if (name === "client")
                clientOnly = true;
              if (name === "defer") {
                var args = argumentsObjectFromField(dir, context.variables);
                if (!args || args.if !== false) {
                  deferred = true;
                }
              }
            });
          }
          if (isField(selection)) {
            var existing = fieldMap.get(selection);
            if (existing) {
              clientOnly = clientOnly && existing.clientOnly;
              deferred = deferred && existing.deferred;
            }
            fieldMap.set(selection, getContextFlavor(context, clientOnly, deferred));
          } else {
            var fragment = getFragmentFromSelection(selection, context.lookupFragment);
            if (!fragment && selection.kind === Kind.FRAGMENT_SPREAD) {
              throw newInvariantError(13, selection.name.value);
            }
            if (fragment && policies.fragmentMatches(fragment, typename, result, context.variables)) {
              flatten(fragment.selectionSet, getContextFlavor(context, clientOnly, deferred));
            }
          }
        });
      })(selectionSet, context);
      return fieldMap;
    };
    StoreWriter2.prototype.applyMerges = function(mergeTree, existing, incoming, context, getStorageArgs) {
      var _a;
      var _this = this;
      if (mergeTree.map.size && !isReference(incoming)) {
        var e_1 = (
          // Items in the same position in different arrays are not
          // necessarily related to each other, so when incoming is an array
          // we process its elements as if there was no existing data.
          !isArray(incoming) && // Likewise, existing must be either a Reference or a StoreObject
          // in order for its fields to be safe to merge with the fields of
          // the incoming object.
          (isReference(existing) || storeValueIsStoreObject(existing)) ? existing : void 0
        );
        var i_1 = incoming;
        if (e_1 && !getStorageArgs) {
          getStorageArgs = [isReference(e_1) ? e_1.__ref : e_1];
        }
        var changedFields_1;
        var getValue_1 = function(from2, name) {
          return isArray(from2) ? typeof name === "number" ? from2[name] : void 0 : context.store.getFieldValue(from2, String(name));
        };
        mergeTree.map.forEach(function(childTree, storeFieldName) {
          var eVal = getValue_1(e_1, storeFieldName);
          var iVal = getValue_1(i_1, storeFieldName);
          if (void 0 === iVal)
            return;
          if (getStorageArgs) {
            getStorageArgs.push(storeFieldName);
          }
          var aVal = _this.applyMerges(childTree, eVal, iVal, context, getStorageArgs);
          if (aVal !== iVal) {
            changedFields_1 = changedFields_1 || /* @__PURE__ */ new Map();
            changedFields_1.set(storeFieldName, aVal);
          }
          if (getStorageArgs) {
            invariant(getStorageArgs.pop() === storeFieldName);
          }
        });
        if (changedFields_1) {
          incoming = isArray(i_1) ? i_1.slice(0) : __assign({}, i_1);
          changedFields_1.forEach(function(value, name) {
            incoming[name] = value;
          });
        }
      }
      if (mergeTree.info) {
        return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context, getStorageArgs && (_a = context.store).getStorage.apply(_a, getStorageArgs));
      }
      return incoming;
    };
    return StoreWriter2;
  }()
);
var emptyMergeTreePool = [];
function getChildMergeTree(_a, name) {
  var map = _a.map;
  if (!map.has(name)) {
    map.set(name, emptyMergeTreePool.pop() || { map: /* @__PURE__ */ new Map() });
  }
  return map.get(name);
}
function mergeMergeTrees(left, right) {
  if (left === right || !right || mergeTreeIsEmpty(right))
    return left;
  if (!left || mergeTreeIsEmpty(left))
    return right;
  var info = left.info && right.info ? __assign(__assign({}, left.info), right.info) : left.info || right.info;
  var needToMergeMaps = left.map.size && right.map.size;
  var map = needToMergeMaps ? /* @__PURE__ */ new Map() : left.map.size ? left.map : right.map;
  var merged = { info, map };
  if (needToMergeMaps) {
    var remainingRightKeys_1 = new Set(right.map.keys());
    left.map.forEach(function(leftTree, key) {
      merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
      remainingRightKeys_1.delete(key);
    });
    remainingRightKeys_1.forEach(function(key) {
      merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
    });
  }
  return merged;
}
function mergeTreeIsEmpty(tree) {
  return !tree || !(tree.info || tree.map.size);
}
function maybeRecycleChildMergeTree(_a, name) {
  var map = _a.map;
  var childTree = map.get(name);
  if (childTree && mergeTreeIsEmpty(childTree)) {
    emptyMergeTreePool.push(childTree);
    map.delete(name);
  }
}
var warnings = /* @__PURE__ */ new Set();
function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
  var getChild = function(objOrRef) {
    var child = store.getFieldValue(objOrRef, storeFieldName);
    return typeof child === "object" && child;
  };
  var existing = getChild(existingRef);
  if (!existing)
    return;
  var incoming = getChild(incomingObj);
  if (!incoming)
    return;
  if (isReference(existing))
    return;
  if (equal(existing, incoming))
    return;
  if (Object.keys(existing).every(function(key) {
    return store.getFieldValue(incoming, key) !== void 0;
  })) {
    return;
  }
  var parentType = store.getFieldValue(existingRef, "__typename") || store.getFieldValue(incomingObj, "__typename");
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var typeDotName = "".concat(parentType, ".").concat(fieldName);
  if (warnings.has(typeDotName))
    return;
  warnings.add(typeDotName);
  var childTypenames = [];
  if (!isArray(existing) && !isArray(incoming)) {
    [existing, incoming].forEach(function(child) {
      var typename = store.getFieldValue(child, "__typename");
      if (typeof typename === "string" && !childTypenames.includes(typename)) {
        childTypenames.push(typename);
      }
    });
  }
  globalThis.__DEV__ !== false && invariant.warn(14, fieldName, parentType, childTypenames.length ? "either ensure all objects of type " + childTypenames.join(" and ") + " have an ID or a custom merge function, or " : "", typeDotName, __assign({}, existing), __assign({}, incoming));
}

// node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
var InMemoryCache = (
  /** @class */
  function(_super) {
    __extends(InMemoryCache2, _super);
    function InMemoryCache2(config) {
      if (config === void 0) {
        config = {};
      }
      var _this = _super.call(this) || this;
      _this.watches = /* @__PURE__ */ new Set();
      _this.addTypenameTransform = new DocumentTransform(addTypenameToDocument);
      _this.assumeImmutableResults = true;
      _this.makeVar = makeVar;
      _this.txCount = 0;
      _this.config = normalizeConfig(config);
      _this.addTypename = !!_this.config.addTypename;
      _this.policies = new Policies({
        cache: _this,
        dataIdFromObject: _this.config.dataIdFromObject,
        possibleTypes: _this.config.possibleTypes,
        typePolicies: _this.config.typePolicies
      });
      _this.init();
      return _this;
    }
    InMemoryCache2.prototype.init = function() {
      var rootStore = this.data = new EntityStore.Root({
        policies: this.policies,
        resultCaching: this.config.resultCaching
      });
      this.optimisticData = rootStore.stump;
      this.resetResultCache();
    };
    InMemoryCache2.prototype.resetResultCache = function(resetResultIdentities) {
      var _this = this;
      var previousReader = this.storeReader;
      var fragments = this.config.fragments;
      this.storeWriter = new StoreWriter(this, this.storeReader = new StoreReader({
        cache: this,
        addTypename: this.addTypename,
        resultCacheMaxSize: this.config.resultCacheMaxSize,
        canonizeResults: shouldCanonizeResults(this.config),
        canon: resetResultIdentities ? void 0 : previousReader && previousReader.canon,
        fragments
      }), fragments);
      this.maybeBroadcastWatch = wrap(function(c, options) {
        return _this.broadcastWatch(c, options);
      }, {
        max: this.config.resultCacheMaxSize || cacheSizes["inMemoryCache.maybeBroadcastWatch"] || 5e3,
        makeCacheKey: function(c) {
          var store = c.optimistic ? _this.optimisticData : _this.data;
          if (supportsResultCaching(store)) {
            var optimistic = c.optimistic, id = c.id, variables = c.variables;
            return store.makeCacheKey(
              c.query,
              // Different watches can have the same query, optimistic
              // status, rootId, and variables, but if their callbacks are
              // different, the (identical) result needs to be delivered to
              // each distinct callback. The easiest way to achieve that
              // separation is to include c.callback in the cache key for
              // maybeBroadcastWatch calls. See issue #5733.
              c.callback,
              canonicalStringify({ optimistic, id, variables })
            );
          }
        }
      });
      (/* @__PURE__ */ new Set([this.data.group, this.optimisticData.group])).forEach(function(group) {
        return group.resetCaching();
      });
    };
    InMemoryCache2.prototype.restore = function(data) {
      this.init();
      if (data)
        this.data.replace(data);
      return this;
    };
    InMemoryCache2.prototype.extract = function(optimistic) {
      if (optimistic === void 0) {
        optimistic = false;
      }
      return (optimistic ? this.optimisticData : this.data).extract();
    };
    InMemoryCache2.prototype.read = function(options) {
      var _a = options.returnPartialData, returnPartialData = _a === void 0 ? false : _a;
      try {
        return this.storeReader.diffQueryAgainstStore(__assign(__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData })).result || null;
      } catch (e) {
        if (e instanceof MissingFieldError) {
          return null;
        }
        throw e;
      }
    };
    InMemoryCache2.prototype.write = function(options) {
      try {
        ++this.txCount;
        return this.storeWriter.writeToStore(this.data, options);
      } finally {
        if (!--this.txCount && options.broadcast !== false) {
          this.broadcastWatches();
        }
      }
    };
    InMemoryCache2.prototype.modify = function(options) {
      if (hasOwn.call(options, "id") && !options.id) {
        return false;
      }
      var store = options.optimistic ? this.optimisticData : this.data;
      try {
        ++this.txCount;
        return store.modify(options.id || "ROOT_QUERY", options.fields);
      } finally {
        if (!--this.txCount && options.broadcast !== false) {
          this.broadcastWatches();
        }
      }
    };
    InMemoryCache2.prototype.diff = function(options) {
      return this.storeReader.diffQueryAgainstStore(__assign(__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, rootId: options.id || "ROOT_QUERY", config: this.config }));
    };
    InMemoryCache2.prototype.watch = function(watch) {
      var _this = this;
      if (!this.watches.size) {
        recallCache(this);
      }
      this.watches.add(watch);
      if (watch.immediate) {
        this.maybeBroadcastWatch(watch);
      }
      return function() {
        if (_this.watches.delete(watch) && !_this.watches.size) {
          forgetCache(_this);
        }
        _this.maybeBroadcastWatch.forget(watch);
      };
    };
    InMemoryCache2.prototype.gc = function(options) {
      var _a;
      canonicalStringify.reset();
      print.reset();
      this.addTypenameTransform.resetCache();
      (_a = this.config.fragments) === null || _a === void 0 ? void 0 : _a.resetCaches();
      var ids = this.optimisticData.gc();
      if (options && !this.txCount) {
        if (options.resetResultCache) {
          this.resetResultCache(options.resetResultIdentities);
        } else if (options.resetResultIdentities) {
          this.storeReader.resetCanon();
        }
      }
      return ids;
    };
    InMemoryCache2.prototype.retain = function(rootId, optimistic) {
      return (optimistic ? this.optimisticData : this.data).retain(rootId);
    };
    InMemoryCache2.prototype.release = function(rootId, optimistic) {
      return (optimistic ? this.optimisticData : this.data).release(rootId);
    };
    InMemoryCache2.prototype.identify = function(object) {
      if (isReference(object))
        return object.__ref;
      try {
        return this.policies.identify(object)[0];
      } catch (e) {
        globalThis.__DEV__ !== false && invariant.warn(e);
      }
    };
    InMemoryCache2.prototype.evict = function(options) {
      if (!options.id) {
        if (hasOwn.call(options, "id")) {
          return false;
        }
        options = __assign(__assign({}, options), { id: "ROOT_QUERY" });
      }
      try {
        ++this.txCount;
        return this.optimisticData.evict(options, this.data);
      } finally {
        if (!--this.txCount && options.broadcast !== false) {
          this.broadcastWatches();
        }
      }
    };
    InMemoryCache2.prototype.reset = function(options) {
      var _this = this;
      this.init();
      canonicalStringify.reset();
      if (options && options.discardWatches) {
        this.watches.forEach(function(watch) {
          return _this.maybeBroadcastWatch.forget(watch);
        });
        this.watches.clear();
        forgetCache(this);
      } else {
        this.broadcastWatches();
      }
      return Promise.resolve();
    };
    InMemoryCache2.prototype.removeOptimistic = function(idToRemove) {
      var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
      if (newOptimisticData !== this.optimisticData) {
        this.optimisticData = newOptimisticData;
        this.broadcastWatches();
      }
    };
    InMemoryCache2.prototype.batch = function(options) {
      var _this = this;
      var update = options.update, _a = options.optimistic, optimistic = _a === void 0 ? true : _a, removeOptimistic = options.removeOptimistic, onWatchUpdated = options.onWatchUpdated;
      var updateResult;
      var perform = function(layer) {
        var _a2 = _this, data = _a2.data, optimisticData = _a2.optimisticData;
        ++_this.txCount;
        if (layer) {
          _this.data = _this.optimisticData = layer;
        }
        try {
          return updateResult = update(_this);
        } finally {
          --_this.txCount;
          _this.data = data;
          _this.optimisticData = optimisticData;
        }
      };
      var alreadyDirty = /* @__PURE__ */ new Set();
      if (onWatchUpdated && !this.txCount) {
        this.broadcastWatches(__assign(__assign({}, options), { onWatchUpdated: function(watch) {
          alreadyDirty.add(watch);
          return false;
        } }));
      }
      if (typeof optimistic === "string") {
        this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
      } else if (optimistic === false) {
        perform(this.data);
      } else {
        perform();
      }
      if (typeof removeOptimistic === "string") {
        this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
      }
      if (onWatchUpdated && alreadyDirty.size) {
        this.broadcastWatches(__assign(__assign({}, options), { onWatchUpdated: function(watch, diff) {
          var result = onWatchUpdated.call(this, watch, diff);
          if (result !== false) {
            alreadyDirty.delete(watch);
          }
          return result;
        } }));
        if (alreadyDirty.size) {
          alreadyDirty.forEach(function(watch) {
            return _this.maybeBroadcastWatch.dirty(watch);
          });
        }
      } else {
        this.broadcastWatches(options);
      }
      return updateResult;
    };
    InMemoryCache2.prototype.performTransaction = function(update, optimisticId) {
      return this.batch({
        update,
        optimistic: optimisticId || optimisticId !== null
      });
    };
    InMemoryCache2.prototype.transformDocument = function(document) {
      return this.addTypenameToDocument(this.addFragmentsToDocument(document));
    };
    InMemoryCache2.prototype.broadcastWatches = function(options) {
      var _this = this;
      if (!this.txCount) {
        this.watches.forEach(function(c) {
          return _this.maybeBroadcastWatch(c, options);
        });
      }
    };
    InMemoryCache2.prototype.addFragmentsToDocument = function(document) {
      var fragments = this.config.fragments;
      return fragments ? fragments.transform(document) : document;
    };
    InMemoryCache2.prototype.addTypenameToDocument = function(document) {
      if (this.addTypename) {
        return this.addTypenameTransform.transformDocument(document);
      }
      return document;
    };
    InMemoryCache2.prototype.broadcastWatch = function(c, options) {
      var lastDiff = c.lastDiff;
      var diff = this.diff(c);
      if (options) {
        if (c.optimistic && typeof options.optimistic === "string") {
          diff.fromOptimisticTransaction = true;
        }
        if (options.onWatchUpdated && options.onWatchUpdated.call(this, c, diff, lastDiff) === false) {
          return;
        }
      }
      if (!lastDiff || !equal(lastDiff.result, diff.result)) {
        c.callback(c.lastDiff = diff, lastDiff);
      }
    };
    return InMemoryCache2;
  }(ApolloCache)
);
if (globalThis.__DEV__ !== false) {
  InMemoryCache.prototype.getMemoryInternals = getInMemoryCacheMemoryInternals;
}

// node_modules/@apollo/client/cache/inmemory/fragmentRegistry.js
var FragmentRegistry = (
  /** @class */
  function() {
    function FragmentRegistry2() {
      var fragments = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fragments[_i] = arguments[_i];
      }
      this.registry = /* @__PURE__ */ Object.create(null);
      this.resetCaches();
      if (fragments.length) {
        this.register.apply(this, fragments);
      }
    }
    FragmentRegistry2.prototype.register = function() {
      var _this = this;
      var fragments = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fragments[_i] = arguments[_i];
      }
      var definitions = /* @__PURE__ */ new Map();
      fragments.forEach(function(doc) {
        getFragmentDefinitions(doc).forEach(function(node) {
          definitions.set(node.name.value, node);
        });
      });
      definitions.forEach(function(node, name) {
        if (node !== _this.registry[name]) {
          _this.registry[name] = node;
          _this.invalidate(name);
        }
      });
      return this;
    };
    FragmentRegistry2.prototype.invalidate = function(name) {
    };
    FragmentRegistry2.prototype.resetCaches = function() {
      var proto = FragmentRegistry2.prototype;
      this.invalidate = (this.lookup = wrap(proto.lookup.bind(this), {
        makeCacheKey: function(arg) {
          return arg;
        },
        max: cacheSizes["fragmentRegistry.lookup"] || 1e3
      })).dirty;
      this.transform = wrap(proto.transform.bind(this), {
        cache: WeakCache,
        max: cacheSizes["fragmentRegistry.transform"] || 2e3
      });
      this.findFragmentSpreads = wrap(proto.findFragmentSpreads.bind(this), {
        cache: WeakCache,
        max: cacheSizes["fragmentRegistry.findFragmentSpreads"] || 4e3
      });
    };
    FragmentRegistry2.prototype.lookup = function(fragmentName) {
      return this.registry[fragmentName] || null;
    };
    FragmentRegistry2.prototype.transform = function(document) {
      var _this = this;
      var defined = /* @__PURE__ */ new Map();
      getFragmentDefinitions(document).forEach(function(def) {
        defined.set(def.name.value, def);
      });
      var unbound = /* @__PURE__ */ new Set();
      var enqueue = function(spreadName) {
        if (!defined.has(spreadName)) {
          unbound.add(spreadName);
        }
      };
      var enqueueChildSpreads = function(node) {
        return Object.keys(_this.findFragmentSpreads(node)).forEach(enqueue);
      };
      enqueueChildSpreads(document);
      var missing = [];
      var map = /* @__PURE__ */ Object.create(null);
      unbound.forEach(function(fragmentName) {
        var knownFragmentDef = defined.get(fragmentName);
        if (knownFragmentDef) {
          enqueueChildSpreads(map[fragmentName] = knownFragmentDef);
        } else {
          missing.push(fragmentName);
          var def = _this.lookup(fragmentName);
          if (def) {
            enqueueChildSpreads(map[fragmentName] = def);
          }
        }
      });
      if (missing.length) {
        var defsToAppend_1 = [];
        missing.forEach(function(name) {
          var def = map[name];
          if (def) {
            defsToAppend_1.push(def);
          }
        });
        if (defsToAppend_1.length) {
          document = __assign(__assign({}, document), { definitions: document.definitions.concat(defsToAppend_1) });
        }
      }
      return document;
    };
    FragmentRegistry2.prototype.findFragmentSpreads = function(root) {
      var spreads = /* @__PURE__ */ Object.create(null);
      visit(root, {
        FragmentSpread: function(node) {
          spreads[node.name.value] = node;
        }
      });
      return spreads;
    };
    return FragmentRegistry2;
  }()
);

// node_modules/@apollo/client/core/networkStatus.js
var NetworkStatus;
(function(NetworkStatus2) {
  NetworkStatus2[NetworkStatus2["loading"] = 1] = "loading";
  NetworkStatus2[NetworkStatus2["setVariables"] = 2] = "setVariables";
  NetworkStatus2[NetworkStatus2["fetchMore"] = 3] = "fetchMore";
  NetworkStatus2[NetworkStatus2["refetch"] = 4] = "refetch";
  NetworkStatus2[NetworkStatus2["poll"] = 6] = "poll";
  NetworkStatus2[NetworkStatus2["ready"] = 7] = "ready";
  NetworkStatus2[NetworkStatus2["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
  return networkStatus ? networkStatus < 7 : false;
}
function isNetworkRequestSettled(networkStatus) {
  return networkStatus === 7 || networkStatus === 8;
}

// node_modules/@apollo/client/core/ObservableQuery.js
var assign = Object.assign;
var hasOwnProperty3 = Object.hasOwnProperty;
var ObservableQuery = (
  /** @class */
  function(_super) {
    __extends(ObservableQuery2, _super);
    function ObservableQuery2(_a) {
      var queryManager = _a.queryManager, queryInfo = _a.queryInfo, options = _a.options;
      var _this = _super.call(this, function(observer) {
        try {
          var subObserver = observer._subscription._observer;
          if (subObserver && !subObserver.error) {
            subObserver.error = defaultSubscriptionObserverErrorCallback;
          }
        } catch (_a2) {
        }
        var first = !_this.observers.size;
        _this.observers.add(observer);
        var last = _this.last;
        if (last && last.error) {
          observer.error && observer.error(last.error);
        } else if (last && last.result) {
          observer.next && observer.next(last.result);
        }
        if (first) {
          _this.reobserve().catch(function() {
          });
        }
        return function() {
          if (_this.observers.delete(observer) && !_this.observers.size) {
            _this.tearDownQuery();
          }
        };
      }) || this;
      _this.observers = /* @__PURE__ */ new Set();
      _this.subscriptions = /* @__PURE__ */ new Set();
      _this.queryInfo = queryInfo;
      _this.queryManager = queryManager;
      _this.waitForOwnResult = skipCacheDataFor(options.fetchPolicy);
      _this.isTornDown = false;
      var _b = queryManager.defaultOptions.watchQuery, _c = _b === void 0 ? {} : _b, _d = _c.fetchPolicy, defaultFetchPolicy = _d === void 0 ? "cache-first" : _d;
      var _e = options.fetchPolicy, fetchPolicy = _e === void 0 ? defaultFetchPolicy : _e, _f = options.initialFetchPolicy, initialFetchPolicy = _f === void 0 ? fetchPolicy === "standby" ? defaultFetchPolicy : fetchPolicy : _f;
      _this.options = __assign(__assign({}, options), {
        // Remember the initial options.fetchPolicy so we can revert back to this
        // policy when variables change. This information can also be specified
        // (or overridden) by providing options.initialFetchPolicy explicitly.
        initialFetchPolicy,
        // This ensures this.options.fetchPolicy always has a string value, in
        // case options.fetchPolicy was not provided.
        fetchPolicy
      });
      _this.queryId = queryInfo.queryId || queryManager.generateQueryId();
      var opDef = getOperationDefinition(_this.query);
      _this.queryName = opDef && opDef.name && opDef.name.value;
      return _this;
    }
    Object.defineProperty(ObservableQuery2.prototype, "query", {
      // The `query` computed property will always reflect the document transformed
      // by the last run query. `this.options.query` will always reflect the raw
      // untransformed query to ensure document transforms with runtime conditionals
      // are run on the original document.
      get: function() {
        return this.lastQuery || this.options.query;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ObservableQuery2.prototype, "variables", {
      // Computed shorthand for this.options.variables, preserved for
      // backwards compatibility.
      /**
       * An object containing the variables that were provided for the query.
       */
      get: function() {
        return this.options.variables;
      },
      enumerable: false,
      configurable: true
    });
    ObservableQuery2.prototype.result = function() {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var observer = {
          next: function(result) {
            resolve(result);
            _this.observers.delete(observer);
            if (!_this.observers.size) {
              _this.queryManager.removeQuery(_this.queryId);
            }
            setTimeout(function() {
              subscription.unsubscribe();
            }, 0);
          },
          error: reject
        };
        var subscription = _this.subscribe(observer);
      });
    };
    ObservableQuery2.prototype.resetDiff = function() {
      this.queryInfo.resetDiff();
    };
    ObservableQuery2.prototype.getCurrentResult = function(saveAsLastResult) {
      if (saveAsLastResult === void 0) {
        saveAsLastResult = true;
      }
      var lastResult = this.getLastResult(true);
      var networkStatus = this.queryInfo.networkStatus || lastResult && lastResult.networkStatus || NetworkStatus.ready;
      var result = __assign(__assign({}, lastResult), { loading: isNetworkRequestInFlight(networkStatus), networkStatus });
      var _a = this.options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a;
      if (
        // These fetch policies should never deliver data from the cache, unless
        // redelivering a previously delivered result.
        skipCacheDataFor(fetchPolicy) || // If this.options.query has @client(always: true) fields, we cannot
        // trust diff.result, since it was read from the cache without running
        // local resolvers (and it's too late to run resolvers now, since we must
        // return a result synchronously).
        this.queryManager.getDocumentInfo(this.query).hasForcedResolvers
      ) {
      } else if (this.waitForOwnResult) {
        this.queryInfo["updateWatch"]();
      } else {
        var diff = this.queryInfo.getDiff();
        if (diff.complete || this.options.returnPartialData) {
          result.data = diff.result;
        }
        if (equal(result.data, {})) {
          result.data = void 0;
        }
        if (diff.complete) {
          delete result.partial;
          if (diff.complete && result.networkStatus === NetworkStatus.loading && (fetchPolicy === "cache-first" || fetchPolicy === "cache-only")) {
            result.networkStatus = NetworkStatus.ready;
            result.loading = false;
          }
        } else {
          result.partial = true;
        }
        if (globalThis.__DEV__ !== false && !diff.complete && !this.options.partialRefetch && !result.loading && !result.data && !result.error) {
          logMissingFieldErrors(diff.missing);
        }
      }
      if (saveAsLastResult) {
        this.updateLastResult(result);
      }
      return result;
    };
    ObservableQuery2.prototype.isDifferentFromLastResult = function(newResult, variables) {
      if (!this.last) {
        return true;
      }
      var resultIsDifferent = this.queryManager.getDocumentInfo(this.query).hasNonreactiveDirective ? !equalByQuery(this.query, this.last.result, newResult, this.variables) : !equal(this.last.result, newResult);
      return resultIsDifferent || variables && !equal(this.last.variables, variables);
    };
    ObservableQuery2.prototype.getLast = function(key, variablesMustMatch) {
      var last = this.last;
      if (last && last[key] && (!variablesMustMatch || equal(last.variables, this.variables))) {
        return last[key];
      }
    };
    ObservableQuery2.prototype.getLastResult = function(variablesMustMatch) {
      return this.getLast("result", variablesMustMatch);
    };
    ObservableQuery2.prototype.getLastError = function(variablesMustMatch) {
      return this.getLast("error", variablesMustMatch);
    };
    ObservableQuery2.prototype.resetLastResults = function() {
      delete this.last;
      this.isTornDown = false;
    };
    ObservableQuery2.prototype.resetQueryStoreErrors = function() {
      this.queryManager.resetErrors(this.queryId);
    };
    ObservableQuery2.prototype.refetch = function(variables) {
      var _a;
      var reobserveOptions = {
        // Always disable polling for refetches.
        pollInterval: 0
      };
      var fetchPolicy = this.options.fetchPolicy;
      if (fetchPolicy === "cache-and-network") {
        reobserveOptions.fetchPolicy = fetchPolicy;
      } else if (fetchPolicy === "no-cache") {
        reobserveOptions.fetchPolicy = "no-cache";
      } else {
        reobserveOptions.fetchPolicy = "network-only";
      }
      if (globalThis.__DEV__ !== false && variables && hasOwnProperty3.call(variables, "variables")) {
        var queryDef = getQueryDefinition(this.query);
        var vars = queryDef.variableDefinitions;
        if (!vars || !vars.some(function(v) {
          return v.variable.name.value === "variables";
        })) {
          globalThis.__DEV__ !== false && invariant.warn(
            20,
            variables,
            ((_a = queryDef.name) === null || _a === void 0 ? void 0 : _a.value) || queryDef
          );
        }
      }
      if (variables && !equal(this.options.variables, variables)) {
        reobserveOptions.variables = this.options.variables = __assign(__assign({}, this.options.variables), variables);
      }
      this.queryInfo.resetLastWrite();
      return this.reobserve(reobserveOptions, NetworkStatus.refetch);
    };
    ObservableQuery2.prototype.fetchMore = function(fetchMoreOptions) {
      var _this = this;
      var combinedOptions = __assign(__assign({}, fetchMoreOptions.query ? fetchMoreOptions : __assign(__assign(__assign(__assign({}, this.options), { query: this.options.query }), fetchMoreOptions), { variables: __assign(__assign({}, this.options.variables), fetchMoreOptions.variables) })), {
        // The fetchMore request goes immediately to the network and does
        // not automatically write its result to the cache (hence no-cache
        // instead of network-only), because we allow the caller of
        // fetchMore to provide an updateQuery callback that determines how
        // the data gets written to the cache.
        fetchPolicy: "no-cache"
      });
      combinedOptions.query = this.transformDocument(combinedOptions.query);
      var qid = this.queryManager.generateQueryId();
      this.lastQuery = fetchMoreOptions.query ? this.transformDocument(this.options.query) : combinedOptions.query;
      var queryInfo = this.queryInfo;
      var originalNetworkStatus = queryInfo.networkStatus;
      queryInfo.networkStatus = NetworkStatus.fetchMore;
      if (combinedOptions.notifyOnNetworkStatusChange) {
        this.observe();
      }
      var updatedQuerySet = /* @__PURE__ */ new Set();
      return this.queryManager.fetchQuery(qid, combinedOptions, NetworkStatus.fetchMore).then(function(fetchMoreResult) {
        _this.queryManager.removeQuery(qid);
        if (queryInfo.networkStatus === NetworkStatus.fetchMore) {
          queryInfo.networkStatus = originalNetworkStatus;
        }
        _this.queryManager.cache.batch({
          update: function(cache2) {
            var updateQuery = fetchMoreOptions.updateQuery;
            if (updateQuery) {
              cache2.updateQuery({
                query: _this.query,
                variables: _this.variables,
                returnPartialData: true,
                optimistic: false
              }, function(previous) {
                return updateQuery(previous, {
                  fetchMoreResult: fetchMoreResult.data,
                  variables: combinedOptions.variables
                });
              });
            } else {
              cache2.writeQuery({
                query: combinedOptions.query,
                variables: combinedOptions.variables,
                data: fetchMoreResult.data
              });
            }
          },
          onWatchUpdated: function(watch) {
            updatedQuerySet.add(watch.query);
          }
        });
        return fetchMoreResult;
      }).finally(function() {
        if (!updatedQuerySet.has(_this.query)) {
          reobserveCacheFirst(_this);
        }
      });
    };
    ObservableQuery2.prototype.subscribeToMore = function(options) {
      var _this = this;
      var subscription = this.queryManager.startGraphQLSubscription({
        query: options.document,
        variables: options.variables,
        context: options.context
      }).subscribe({
        next: function(subscriptionData) {
          var updateQuery = options.updateQuery;
          if (updateQuery) {
            _this.updateQuery(function(previous, _a) {
              var variables = _a.variables;
              return updateQuery(previous, {
                subscriptionData,
                variables
              });
            });
          }
        },
        error: function(err) {
          if (options.onError) {
            options.onError(err);
            return;
          }
          globalThis.__DEV__ !== false && invariant.error(21, err);
        }
      });
      this.subscriptions.add(subscription);
      return function() {
        if (_this.subscriptions.delete(subscription)) {
          subscription.unsubscribe();
        }
      };
    };
    ObservableQuery2.prototype.setOptions = function(newOptions) {
      return this.reobserve(newOptions);
    };
    ObservableQuery2.prototype.silentSetOptions = function(newOptions) {
      var mergedOptions = compact(this.options, newOptions || {});
      assign(this.options, mergedOptions);
    };
    ObservableQuery2.prototype.setVariables = function(variables) {
      if (equal(this.variables, variables)) {
        return this.observers.size ? this.result() : Promise.resolve();
      }
      this.options.variables = variables;
      if (!this.observers.size) {
        return Promise.resolve();
      }
      return this.reobserve({
        // Reset options.fetchPolicy to its original value.
        fetchPolicy: this.options.initialFetchPolicy,
        variables
      }, NetworkStatus.setVariables);
    };
    ObservableQuery2.prototype.updateQuery = function(mapFn) {
      var queryManager = this.queryManager;
      var result = queryManager.cache.diff({
        query: this.options.query,
        variables: this.variables,
        returnPartialData: true,
        optimistic: false
      }).result;
      var newResult = mapFn(result, {
        variables: this.variables
      });
      if (newResult) {
        queryManager.cache.writeQuery({
          query: this.options.query,
          data: newResult,
          variables: this.variables
        });
        queryManager.broadcastQueries();
      }
    };
    ObservableQuery2.prototype.startPolling = function(pollInterval) {
      this.options.pollInterval = pollInterval;
      this.updatePolling();
    };
    ObservableQuery2.prototype.stopPolling = function() {
      this.options.pollInterval = 0;
      this.updatePolling();
    };
    ObservableQuery2.prototype.applyNextFetchPolicy = function(reason, options) {
      if (options.nextFetchPolicy) {
        var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a, _b = options.initialFetchPolicy, initialFetchPolicy = _b === void 0 ? fetchPolicy : _b;
        if (fetchPolicy === "standby") {
        } else if (typeof options.nextFetchPolicy === "function") {
          options.fetchPolicy = options.nextFetchPolicy(fetchPolicy, {
            reason,
            options,
            observable: this,
            initialFetchPolicy
          });
        } else if (reason === "variables-changed") {
          options.fetchPolicy = initialFetchPolicy;
        } else {
          options.fetchPolicy = options.nextFetchPolicy;
        }
      }
      return options.fetchPolicy;
    };
    ObservableQuery2.prototype.fetch = function(options, newNetworkStatus, query) {
      this.queryManager.setObservableQuery(this);
      return this.queryManager["fetchConcastWithInfo"](this.queryId, options, newNetworkStatus, query);
    };
    ObservableQuery2.prototype.updatePolling = function() {
      var _this = this;
      if (this.queryManager.ssrMode) {
        return;
      }
      var _a = this, pollingInfo = _a.pollingInfo, pollInterval = _a.options.pollInterval;
      if (!pollInterval || !this.hasObservers()) {
        if (pollingInfo) {
          clearTimeout(pollingInfo.timeout);
          delete this.pollingInfo;
        }
        return;
      }
      if (pollingInfo && pollingInfo.interval === pollInterval) {
        return;
      }
      invariant(pollInterval, 22);
      var info = pollingInfo || (this.pollingInfo = {});
      info.interval = pollInterval;
      var maybeFetch = function() {
        var _a2, _b;
        if (_this.pollingInfo) {
          if (!isNetworkRequestInFlight(_this.queryInfo.networkStatus) && !((_b = (_a2 = _this.options).skipPollAttempt) === null || _b === void 0 ? void 0 : _b.call(_a2))) {
            _this.reobserve({
              // Most fetchPolicy options don't make sense to use in a polling context, as
              // users wouldn't want to be polling the cache directly. However, network-only and
              // no-cache are both useful for when the user wants to control whether or not the
              // polled results are written to the cache.
              fetchPolicy: _this.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only"
            }, NetworkStatus.poll).then(poll, poll);
          } else {
            poll();
          }
        }
      };
      var poll = function() {
        var info2 = _this.pollingInfo;
        if (info2) {
          clearTimeout(info2.timeout);
          info2.timeout = setTimeout(maybeFetch, info2.interval);
        }
      };
      poll();
    };
    ObservableQuery2.prototype.updateLastResult = function(newResult, variables) {
      if (variables === void 0) {
        variables = this.variables;
      }
      var error = this.getLastError();
      if (error && this.last && !equal(variables, this.last.variables)) {
        error = void 0;
      }
      return this.last = __assign({ result: this.queryManager.assumeImmutableResults ? newResult : cloneDeep(newResult), variables }, error ? { error } : null);
    };
    ObservableQuery2.prototype.reobserveAsConcast = function(newOptions, newNetworkStatus) {
      var _this = this;
      this.isTornDown = false;
      var useDisposableConcast = (
        // Refetching uses a disposable Concast to allow refetches using different
        // options/variables, without permanently altering the options of the
        // original ObservableQuery.
        newNetworkStatus === NetworkStatus.refetch || // The fetchMore method does not actually call the reobserve method, but,
        // if it did, it would definitely use a disposable Concast.
        newNetworkStatus === NetworkStatus.fetchMore || // Polling uses a disposable Concast so the polling options (which force
        // fetchPolicy to be "network-only" or "no-cache") won't override the original options.
        newNetworkStatus === NetworkStatus.poll
      );
      var oldVariables = this.options.variables;
      var oldFetchPolicy = this.options.fetchPolicy;
      var mergedOptions = compact(this.options, newOptions || {});
      var options = useDisposableConcast ? (
        // Disposable Concast fetches receive a shallow copy of this.options
        // (merged with newOptions), leaving this.options unmodified.
        mergedOptions
      ) : assign(this.options, mergedOptions);
      var query = this.transformDocument(options.query);
      this.lastQuery = query;
      if (!useDisposableConcast) {
        this.updatePolling();
        if (newOptions && newOptions.variables && !equal(newOptions.variables, oldVariables) && // Don't mess with the fetchPolicy if it's currently "standby".
        options.fetchPolicy !== "standby" && // If we're changing the fetchPolicy anyway, don't try to change it here
        // using applyNextFetchPolicy. The explicit options.fetchPolicy wins.
        options.fetchPolicy === oldFetchPolicy) {
          this.applyNextFetchPolicy("variables-changed", options);
          if (newNetworkStatus === void 0) {
            newNetworkStatus = NetworkStatus.setVariables;
          }
        }
      }
      this.waitForOwnResult && (this.waitForOwnResult = skipCacheDataFor(options.fetchPolicy));
      var finishWaitingForOwnResult = function() {
        if (_this.concast === concast) {
          _this.waitForOwnResult = false;
        }
      };
      var variables = options.variables && __assign({}, options.variables);
      var _a = this.fetch(options, newNetworkStatus, query), concast = _a.concast, fromLink = _a.fromLink;
      var observer = {
        next: function(result) {
          if (equal(_this.variables, variables)) {
            finishWaitingForOwnResult();
            _this.reportResult(result, variables);
          }
        },
        error: function(error) {
          if (equal(_this.variables, variables)) {
            finishWaitingForOwnResult();
            _this.reportError(error, variables);
          }
        }
      };
      if (!useDisposableConcast && (fromLink || !this.concast)) {
        if (this.concast && this.observer) {
          this.concast.removeObserver(this.observer);
        }
        this.concast = concast;
        this.observer = observer;
      }
      concast.addObserver(observer);
      return concast;
    };
    ObservableQuery2.prototype.reobserve = function(newOptions, newNetworkStatus) {
      return this.reobserveAsConcast(newOptions, newNetworkStatus).promise;
    };
    ObservableQuery2.prototype.resubscribeAfterError = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var last = this.last;
      this.resetLastResults();
      var subscription = this.subscribe.apply(this, args);
      this.last = last;
      return subscription;
    };
    ObservableQuery2.prototype.observe = function() {
      this.reportResult(
        // Passing false is important so that this.getCurrentResult doesn't
        // save the fetchMore result as this.lastResult, causing it to be
        // ignored due to the this.isDifferentFromLastResult check in
        // this.reportResult.
        this.getCurrentResult(false),
        this.variables
      );
    };
    ObservableQuery2.prototype.reportResult = function(result, variables) {
      var lastError = this.getLastError();
      var isDifferent = this.isDifferentFromLastResult(result, variables);
      if (lastError || !result.partial || this.options.returnPartialData) {
        this.updateLastResult(result, variables);
      }
      if (lastError || isDifferent) {
        iterateObserversSafely(this.observers, "next", result);
      }
    };
    ObservableQuery2.prototype.reportError = function(error, variables) {
      var errorResult = __assign(__assign({}, this.getLastResult()), { error, errors: error.graphQLErrors, networkStatus: NetworkStatus.error, loading: false });
      this.updateLastResult(errorResult, variables);
      iterateObserversSafely(this.observers, "error", this.last.error = error);
    };
    ObservableQuery2.prototype.hasObservers = function() {
      return this.observers.size > 0;
    };
    ObservableQuery2.prototype.tearDownQuery = function() {
      if (this.isTornDown)
        return;
      if (this.concast && this.observer) {
        this.concast.removeObserver(this.observer);
        delete this.concast;
        delete this.observer;
      }
      this.stopPolling();
      this.subscriptions.forEach(function(sub) {
        return sub.unsubscribe();
      });
      this.subscriptions.clear();
      this.queryManager.stopQuery(this.queryId);
      this.observers.clear();
      this.isTornDown = true;
    };
    ObservableQuery2.prototype.transformDocument = function(document) {
      return this.queryManager.transform(document);
    };
    return ObservableQuery2;
  }(Observable)
);
fixObservableSubclass(ObservableQuery);
function reobserveCacheFirst(obsQuery) {
  var _a = obsQuery.options, fetchPolicy = _a.fetchPolicy, nextFetchPolicy = _a.nextFetchPolicy;
  if (fetchPolicy === "cache-and-network" || fetchPolicy === "network-only") {
    return obsQuery.reobserve({
      fetchPolicy: "cache-first",
      // Use a temporary nextFetchPolicy function that replaces itself with the
      // previous nextFetchPolicy value and returns the original fetchPolicy.
      nextFetchPolicy: function(currentFetchPolicy, context) {
        this.nextFetchPolicy = nextFetchPolicy;
        if (typeof this.nextFetchPolicy === "function") {
          return this.nextFetchPolicy(currentFetchPolicy, context);
        }
        return fetchPolicy;
      }
    });
  }
  return obsQuery.reobserve();
}
function defaultSubscriptionObserverErrorCallback(error) {
  globalThis.__DEV__ !== false && invariant.error(23, error.message, error.stack);
}
function logMissingFieldErrors(missing) {
  if (globalThis.__DEV__ !== false && missing) {
    globalThis.__DEV__ !== false && invariant.debug(24, missing);
  }
}
function skipCacheDataFor(fetchPolicy) {
  return fetchPolicy === "network-only" || fetchPolicy === "no-cache" || fetchPolicy === "standby";
}

// node_modules/@apollo/client/core/LocalState.js
var LocalState = (
  /** @class */
  function() {
    function LocalState2(_a) {
      var cache2 = _a.cache, client = _a.client, resolvers = _a.resolvers, fragmentMatcher = _a.fragmentMatcher;
      this.selectionsToResolveCache = /* @__PURE__ */ new WeakMap();
      this.cache = cache2;
      if (client) {
        this.client = client;
      }
      if (resolvers) {
        this.addResolvers(resolvers);
      }
      if (fragmentMatcher) {
        this.setFragmentMatcher(fragmentMatcher);
      }
    }
    LocalState2.prototype.addResolvers = function(resolvers) {
      var _this = this;
      this.resolvers = this.resolvers || {};
      if (Array.isArray(resolvers)) {
        resolvers.forEach(function(resolverGroup) {
          _this.resolvers = mergeDeep(_this.resolvers, resolverGroup);
        });
      } else {
        this.resolvers = mergeDeep(this.resolvers, resolvers);
      }
    };
    LocalState2.prototype.setResolvers = function(resolvers) {
      this.resolvers = {};
      this.addResolvers(resolvers);
    };
    LocalState2.prototype.getResolvers = function() {
      return this.resolvers || {};
    };
    LocalState2.prototype.runResolvers = function(_a) {
      return __awaiter(this, arguments, void 0, function(_b) {
        var document = _b.document, remoteResult = _b.remoteResult, context = _b.context, variables = _b.variables, _c = _b.onlyRunForcedResolvers, onlyRunForcedResolvers = _c === void 0 ? false : _c;
        return __generator(this, function(_d) {
          if (document) {
            return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function(localResult) {
              return __assign(__assign({}, remoteResult), { data: localResult.result });
            })];
          }
          return [2, remoteResult];
        });
      });
    };
    LocalState2.prototype.setFragmentMatcher = function(fragmentMatcher) {
      this.fragmentMatcher = fragmentMatcher;
    };
    LocalState2.prototype.getFragmentMatcher = function() {
      return this.fragmentMatcher;
    };
    LocalState2.prototype.clientQuery = function(document) {
      if (hasDirectives(["client"], document)) {
        if (this.resolvers) {
          return document;
        }
      }
      return null;
    };
    LocalState2.prototype.serverQuery = function(document) {
      return removeClientSetsFromDocument(document);
    };
    LocalState2.prototype.prepareContext = function(context) {
      var cache2 = this.cache;
      return __assign(__assign({}, context), {
        cache: cache2,
        // Getting an entry's cache key is useful for local state resolvers.
        getCacheKey: function(obj) {
          return cache2.identify(obj);
        }
      });
    };
    LocalState2.prototype.addExportedVariables = function(document_1) {
      return __awaiter(this, arguments, void 0, function(document, variables, context) {
        if (variables === void 0) {
          variables = {};
        }
        if (context === void 0) {
          context = {};
        }
        return __generator(this, function(_a) {
          if (document) {
            return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function(data) {
              return __assign(__assign({}, variables), data.exportedVariables);
            })];
          }
          return [2, __assign({}, variables)];
        });
      });
    };
    LocalState2.prototype.shouldForceResolvers = function(document) {
      var forceResolvers = false;
      visit(document, {
        Directive: {
          enter: function(node) {
            if (node.name.value === "client" && node.arguments) {
              forceResolvers = node.arguments.some(function(arg) {
                return arg.name.value === "always" && arg.value.kind === "BooleanValue" && arg.value.value === true;
              });
              if (forceResolvers) {
                return BREAK;
              }
            }
          }
        }
      });
      return forceResolvers;
    };
    LocalState2.prototype.buildRootValueFromCache = function(document, variables) {
      return this.cache.diff({
        query: buildQueryFromSelectionSet(document),
        variables,
        returnPartialData: true,
        optimistic: false
      }).result;
    };
    LocalState2.prototype.resolveDocument = function(document_1, rootValue_1) {
      return __awaiter(this, arguments, void 0, function(document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
        var mainDefinition, fragments, fragmentMap, selectionsToResolve, definitionOperation, defaultOperationType, _a, cache2, client, execContext, isClientFieldDescendant;
        if (context === void 0) {
          context = {};
        }
        if (variables === void 0) {
          variables = {};
        }
        if (fragmentMatcher === void 0) {
          fragmentMatcher = function() {
            return true;
          };
        }
        if (onlyRunForcedResolvers === void 0) {
          onlyRunForcedResolvers = false;
        }
        return __generator(this, function(_b) {
          mainDefinition = getMainDefinition(document);
          fragments = getFragmentDefinitions(document);
          fragmentMap = createFragmentMap(fragments);
          selectionsToResolve = this.collectSelectionsToResolve(mainDefinition, fragmentMap);
          definitionOperation = mainDefinition.operation;
          defaultOperationType = definitionOperation ? definitionOperation.charAt(0).toUpperCase() + definitionOperation.slice(1) : "Query";
          _a = this, cache2 = _a.cache, client = _a.client;
          execContext = {
            fragmentMap,
            context: __assign(__assign({}, context), { cache: cache2, client }),
            variables,
            fragmentMatcher,
            defaultOperationType,
            exportedVariables: {},
            selectionsToResolve,
            onlyRunForcedResolvers
          };
          isClientFieldDescendant = false;
          return [2, this.resolveSelectionSet(mainDefinition.selectionSet, isClientFieldDescendant, rootValue, execContext).then(function(result) {
            return {
              result,
              exportedVariables: execContext.exportedVariables
            };
          })];
        });
      });
    };
    LocalState2.prototype.resolveSelectionSet = function(selectionSet, isClientFieldDescendant, rootValue, execContext) {
      return __awaiter(this, void 0, void 0, function() {
        var fragmentMap, context, variables, resultsToMerge, execute2;
        var _this = this;
        return __generator(this, function(_a) {
          fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
          resultsToMerge = [rootValue];
          execute2 = function(selection) {
            return __awaiter(_this, void 0, void 0, function() {
              var fragment, typeCondition;
              return __generator(this, function(_a2) {
                if (!isClientFieldDescendant && !execContext.selectionsToResolve.has(selection)) {
                  return [
                    2
                    /*return*/
                  ];
                }
                if (!shouldInclude(selection, variables)) {
                  return [
                    2
                    /*return*/
                  ];
                }
                if (isField(selection)) {
                  return [2, this.resolveField(selection, isClientFieldDescendant, rootValue, execContext).then(function(fieldResult) {
                    var _a3;
                    if (typeof fieldResult !== "undefined") {
                      resultsToMerge.push((_a3 = {}, _a3[resultKeyNameFromField(selection)] = fieldResult, _a3));
                    }
                  })];
                }
                if (isInlineFragment(selection)) {
                  fragment = selection;
                } else {
                  fragment = fragmentMap[selection.name.value];
                  invariant(fragment, 18, selection.name.value);
                }
                if (fragment && fragment.typeCondition) {
                  typeCondition = fragment.typeCondition.name.value;
                  if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                    return [2, this.resolveSelectionSet(fragment.selectionSet, isClientFieldDescendant, rootValue, execContext).then(function(fragmentResult) {
                      resultsToMerge.push(fragmentResult);
                    })];
                  }
                }
                return [
                  2
                  /*return*/
                ];
              });
            });
          };
          return [2, Promise.all(selectionSet.selections.map(execute2)).then(function() {
            return mergeDeepArray(resultsToMerge);
          })];
        });
      });
    };
    LocalState2.prototype.resolveField = function(field, isClientFieldDescendant, rootValue, execContext) {
      return __awaiter(this, void 0, void 0, function() {
        var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
        var _this = this;
        return __generator(this, function(_a) {
          if (!rootValue) {
            return [2, null];
          }
          variables = execContext.variables;
          fieldName = field.name.value;
          aliasedFieldName = resultKeyNameFromField(field);
          aliasUsed = fieldName !== aliasedFieldName;
          defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
          resultPromise = Promise.resolve(defaultResult);
          if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
            resolverType = rootValue.__typename || execContext.defaultOperationType;
            resolverMap = this.resolvers && this.resolvers[resolverType];
            if (resolverMap) {
              resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
              if (resolve) {
                resultPromise = Promise.resolve(
                  // In case the resolve function accesses reactive variables,
                  // set cacheSlot to the current cache instance.
                  cacheSlot.withValue(this.cache, resolve, [
                    rootValue,
                    argumentsObjectFromField(field, variables),
                    execContext.context,
                    { field, fragmentMap: execContext.fragmentMap }
                  ])
                );
              }
            }
          }
          return [2, resultPromise.then(function(result) {
            var _a2, _b;
            if (result === void 0) {
              result = defaultResult;
            }
            if (field.directives) {
              field.directives.forEach(function(directive) {
                if (directive.name.value === "export" && directive.arguments) {
                  directive.arguments.forEach(function(arg) {
                    if (arg.name.value === "as" && arg.value.kind === "StringValue") {
                      execContext.exportedVariables[arg.value.value] = result;
                    }
                  });
                }
              });
            }
            if (!field.selectionSet) {
              return result;
            }
            if (result == null) {
              return result;
            }
            var isClientField = (_b = (_a2 = field.directives) === null || _a2 === void 0 ? void 0 : _a2.some(function(d) {
              return d.name.value === "client";
            })) !== null && _b !== void 0 ? _b : false;
            if (Array.isArray(result)) {
              return _this.resolveSubSelectedArray(field, isClientFieldDescendant || isClientField, result, execContext);
            }
            if (field.selectionSet) {
              return _this.resolveSelectionSet(field.selectionSet, isClientFieldDescendant || isClientField, result, execContext);
            }
          })];
        });
      });
    };
    LocalState2.prototype.resolveSubSelectedArray = function(field, isClientFieldDescendant, result, execContext) {
      var _this = this;
      return Promise.all(result.map(function(item) {
        if (item === null) {
          return null;
        }
        if (Array.isArray(item)) {
          return _this.resolveSubSelectedArray(field, isClientFieldDescendant, item, execContext);
        }
        if (field.selectionSet) {
          return _this.resolveSelectionSet(field.selectionSet, isClientFieldDescendant, item, execContext);
        }
      }));
    };
    LocalState2.prototype.collectSelectionsToResolve = function(mainDefinition, fragmentMap) {
      var isSingleASTNode = function(node) {
        return !Array.isArray(node);
      };
      var selectionsToResolveCache = this.selectionsToResolveCache;
      function collectByDefinition(definitionNode) {
        if (!selectionsToResolveCache.has(definitionNode)) {
          var matches_1 = /* @__PURE__ */ new Set();
          selectionsToResolveCache.set(definitionNode, matches_1);
          visit(definitionNode, {
            Directive: function(node, _, __, ___, ancestors) {
              if (node.name.value === "client") {
                ancestors.forEach(function(node2) {
                  if (isSingleASTNode(node2) && isSelectionNode(node2)) {
                    matches_1.add(node2);
                  }
                });
              }
            },
            FragmentSpread: function(spread, _, __, ___, ancestors) {
              var fragment = fragmentMap[spread.name.value];
              invariant(fragment, 19, spread.name.value);
              var fragmentSelections = collectByDefinition(fragment);
              if (fragmentSelections.size > 0) {
                ancestors.forEach(function(node) {
                  if (isSingleASTNode(node) && isSelectionNode(node)) {
                    matches_1.add(node);
                  }
                });
                matches_1.add(spread);
                fragmentSelections.forEach(function(selection) {
                  matches_1.add(selection);
                });
              }
            }
          });
        }
        return selectionsToResolveCache.get(definitionNode);
      }
      return collectByDefinition(mainDefinition);
    };
    return LocalState2;
  }()
);

// node_modules/@apollo/client/core/QueryInfo.js
var destructiveMethodCounts = new (canUseWeakMap ? WeakMap : Map)();
function wrapDestructiveCacheMethod(cache2, methodName) {
  var original = cache2[methodName];
  if (typeof original === "function") {
    cache2[methodName] = function() {
      destructiveMethodCounts.set(
        cache2,
        // The %1e15 allows the count to wrap around to 0 safely every
        // quadrillion evictions, so there's no risk of overflow. To be
        // clear, this is more of a pedantic principle than something
        // that matters in any conceivable practical scenario.
        (destructiveMethodCounts.get(cache2) + 1) % 1e15
      );
      return original.apply(this, arguments);
    };
  }
}
function cancelNotifyTimeout(info) {
  if (info["notifyTimeout"]) {
    clearTimeout(info["notifyTimeout"]);
    info["notifyTimeout"] = void 0;
  }
}
var QueryInfo = (
  /** @class */
  function() {
    function QueryInfo2(queryManager, queryId) {
      if (queryId === void 0) {
        queryId = queryManager.generateQueryId();
      }
      this.queryId = queryId;
      this.listeners = /* @__PURE__ */ new Set();
      this.document = null;
      this.lastRequestId = 1;
      this.stopped = false;
      this.dirty = false;
      this.observableQuery = null;
      var cache2 = this.cache = queryManager.cache;
      if (!destructiveMethodCounts.has(cache2)) {
        destructiveMethodCounts.set(cache2, 0);
        wrapDestructiveCacheMethod(cache2, "evict");
        wrapDestructiveCacheMethod(cache2, "modify");
        wrapDestructiveCacheMethod(cache2, "reset");
      }
    }
    QueryInfo2.prototype.init = function(query) {
      var networkStatus = query.networkStatus || NetworkStatus.loading;
      if (this.variables && this.networkStatus !== NetworkStatus.loading && !equal(this.variables, query.variables)) {
        networkStatus = NetworkStatus.setVariables;
      }
      if (!equal(query.variables, this.variables)) {
        this.lastDiff = void 0;
      }
      Object.assign(this, {
        document: query.document,
        variables: query.variables,
        networkError: null,
        graphQLErrors: this.graphQLErrors || [],
        networkStatus
      });
      if (query.observableQuery) {
        this.setObservableQuery(query.observableQuery);
      }
      if (query.lastRequestId) {
        this.lastRequestId = query.lastRequestId;
      }
      return this;
    };
    QueryInfo2.prototype.reset = function() {
      cancelNotifyTimeout(this);
      this.dirty = false;
    };
    QueryInfo2.prototype.resetDiff = function() {
      this.lastDiff = void 0;
    };
    QueryInfo2.prototype.getDiff = function() {
      var options = this.getDiffOptions();
      if (this.lastDiff && equal(options, this.lastDiff.options)) {
        return this.lastDiff.diff;
      }
      this.updateWatch(this.variables);
      var oq = this.observableQuery;
      if (oq && oq.options.fetchPolicy === "no-cache") {
        return { complete: false };
      }
      var diff = this.cache.diff(options);
      this.updateLastDiff(diff, options);
      return diff;
    };
    QueryInfo2.prototype.updateLastDiff = function(diff, options) {
      this.lastDiff = diff ? {
        diff,
        options: options || this.getDiffOptions()
      } : void 0;
    };
    QueryInfo2.prototype.getDiffOptions = function(variables) {
      var _a;
      if (variables === void 0) {
        variables = this.variables;
      }
      return {
        query: this.document,
        variables,
        returnPartialData: true,
        optimistic: true,
        canonizeResults: (_a = this.observableQuery) === null || _a === void 0 ? void 0 : _a.options.canonizeResults
      };
    };
    QueryInfo2.prototype.setDiff = function(diff) {
      var _this = this;
      var _a;
      var oldDiff = this.lastDiff && this.lastDiff.diff;
      if (diff && !diff.complete && ((_a = this.observableQuery) === null || _a === void 0 ? void 0 : _a.getLastError())) {
        return;
      }
      this.updateLastDiff(diff);
      if (!this.dirty && !equal(oldDiff && oldDiff.result, diff && diff.result)) {
        this.dirty = true;
        if (!this.notifyTimeout) {
          this.notifyTimeout = setTimeout(function() {
            return _this.notify();
          }, 0);
        }
      }
    };
    QueryInfo2.prototype.setObservableQuery = function(oq) {
      var _this = this;
      if (oq === this.observableQuery)
        return;
      if (this.oqListener) {
        this.listeners.delete(this.oqListener);
      }
      this.observableQuery = oq;
      if (oq) {
        oq["queryInfo"] = this;
        this.listeners.add(this.oqListener = function() {
          var diff = _this.getDiff();
          if (diff.fromOptimisticTransaction) {
            oq["observe"]();
          } else {
            reobserveCacheFirst(oq);
          }
        });
      } else {
        delete this.oqListener;
      }
    };
    QueryInfo2.prototype.notify = function() {
      var _this = this;
      cancelNotifyTimeout(this);
      if (this.shouldNotify()) {
        this.listeners.forEach(function(listener) {
          return listener(_this);
        });
      }
      this.dirty = false;
    };
    QueryInfo2.prototype.shouldNotify = function() {
      if (!this.dirty || !this.listeners.size) {
        return false;
      }
      if (isNetworkRequestInFlight(this.networkStatus) && this.observableQuery) {
        var fetchPolicy = this.observableQuery.options.fetchPolicy;
        if (fetchPolicy !== "cache-only" && fetchPolicy !== "cache-and-network") {
          return false;
        }
      }
      return true;
    };
    QueryInfo2.prototype.stop = function() {
      if (!this.stopped) {
        this.stopped = true;
        this.reset();
        this.cancel();
        this.cancel = QueryInfo2.prototype.cancel;
        var oq = this.observableQuery;
        if (oq)
          oq.stopPolling();
      }
    };
    QueryInfo2.prototype.cancel = function() {
    };
    QueryInfo2.prototype.updateWatch = function(variables) {
      var _this = this;
      if (variables === void 0) {
        variables = this.variables;
      }
      var oq = this.observableQuery;
      if (oq && oq.options.fetchPolicy === "no-cache") {
        return;
      }
      var watchOptions = __assign(__assign({}, this.getDiffOptions(variables)), { watcher: this, callback: function(diff) {
        return _this.setDiff(diff);
      } });
      if (!this.lastWatch || !equal(watchOptions, this.lastWatch)) {
        this.cancel();
        this.cancel = this.cache.watch(this.lastWatch = watchOptions);
      }
    };
    QueryInfo2.prototype.resetLastWrite = function() {
      this.lastWrite = void 0;
    };
    QueryInfo2.prototype.shouldWrite = function(result, variables) {
      var lastWrite = this.lastWrite;
      return !(lastWrite && // If cache.evict has been called since the last time we wrote this
      // data into the cache, there's a chance writing this result into
      // the cache will repair what was evicted.
      lastWrite.dmCount === destructiveMethodCounts.get(this.cache) && equal(variables, lastWrite.variables) && equal(result.data, lastWrite.result.data));
    };
    QueryInfo2.prototype.markResult = function(result, document, options, cacheWriteBehavior) {
      var _this = this;
      var merger = new DeepMerger();
      var graphQLErrors = isNonEmptyArray(result.errors) ? result.errors.slice(0) : [];
      this.reset();
      if ("incremental" in result && isNonEmptyArray(result.incremental)) {
        var mergedData = mergeIncrementalData(this.getDiff().result, result);
        result.data = mergedData;
      } else if ("hasNext" in result && result.hasNext) {
        var diff = this.getDiff();
        result.data = merger.merge(diff.result, result.data);
      }
      this.graphQLErrors = graphQLErrors;
      if (options.fetchPolicy === "no-cache") {
        this.updateLastDiff({ result: result.data, complete: true }, this.getDiffOptions(options.variables));
      } else if (cacheWriteBehavior !== 0) {
        if (shouldWriteResult(result, options.errorPolicy)) {
          this.cache.performTransaction(function(cache2) {
            if (_this.shouldWrite(result, options.variables)) {
              cache2.writeQuery({
                query: document,
                data: result.data,
                variables: options.variables,
                overwrite: cacheWriteBehavior === 1
              });
              _this.lastWrite = {
                result,
                variables: options.variables,
                dmCount: destructiveMethodCounts.get(_this.cache)
              };
            } else {
              if (_this.lastDiff && _this.lastDiff.diff.complete) {
                result.data = _this.lastDiff.diff.result;
                return;
              }
            }
            var diffOptions = _this.getDiffOptions(options.variables);
            var diff2 = cache2.diff(diffOptions);
            if (!_this.stopped && equal(_this.variables, options.variables)) {
              _this.updateWatch(options.variables);
            }
            _this.updateLastDiff(diff2, diffOptions);
            if (diff2.complete) {
              result.data = diff2.result;
            }
          });
        } else {
          this.lastWrite = void 0;
        }
      }
    };
    QueryInfo2.prototype.markReady = function() {
      this.networkError = null;
      return this.networkStatus = NetworkStatus.ready;
    };
    QueryInfo2.prototype.markError = function(error) {
      this.networkStatus = NetworkStatus.error;
      this.lastWrite = void 0;
      this.reset();
      if (error.graphQLErrors) {
        this.graphQLErrors = error.graphQLErrors;
      }
      if (error.networkError) {
        this.networkError = error.networkError;
      }
      return error;
    };
    return QueryInfo2;
  }()
);
function shouldWriteResult(result, errorPolicy) {
  if (errorPolicy === void 0) {
    errorPolicy = "none";
  }
  var ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
  var writeWithErrors = !graphQLResultHasError(result);
  if (!writeWithErrors && ignoreErrors && result.data) {
    writeWithErrors = true;
  }
  return writeWithErrors;
}

// node_modules/@apollo/client/core/QueryManager.js
var hasOwnProperty4 = Object.prototype.hasOwnProperty;
var IGNORE = /* @__PURE__ */ Object.create(null);
var QueryManager = (
  /** @class */
  function() {
    function QueryManager2(_a) {
      var cache2 = _a.cache, link = _a.link, defaultOptions2 = _a.defaultOptions, documentTransform = _a.documentTransform, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, onBroadcast = _a.onBroadcast, _c = _a.ssrMode, ssrMode = _c === void 0 ? false : _c, _d = _a.clientAwareness, clientAwareness = _d === void 0 ? {} : _d, localState = _a.localState, _e = _a.assumeImmutableResults, assumeImmutableResults = _e === void 0 ? !!cache2.assumeImmutableResults : _e, defaultContext = _a.defaultContext;
      var _this = this;
      this.clientAwareness = {};
      this.queries = /* @__PURE__ */ new Map();
      this.fetchCancelFns = /* @__PURE__ */ new Map();
      this.transformCache = new AutoCleanedWeakCache(
        cacheSizes["queryManager.getDocumentInfo"] || 2e3
        /* defaultCacheSizes["queryManager.getDocumentInfo"] */
      );
      this.queryIdCounter = 1;
      this.requestIdCounter = 1;
      this.mutationIdCounter = 1;
      this.inFlightLinkObservables = new Trie(false);
      var defaultDocumentTransform = new DocumentTransform(
        function(document) {
          return _this.cache.transformDocument(document);
        },
        // Allow the apollo cache to manage its own transform caches
        { cache: false }
      );
      this.cache = cache2;
      this.link = link;
      this.defaultOptions = defaultOptions2 || /* @__PURE__ */ Object.create(null);
      this.queryDeduplication = queryDeduplication;
      this.clientAwareness = clientAwareness;
      this.localState = localState || new LocalState({ cache: cache2 });
      this.ssrMode = ssrMode;
      this.assumeImmutableResults = assumeImmutableResults;
      this.documentTransform = documentTransform ? defaultDocumentTransform.concat(documentTransform).concat(defaultDocumentTransform) : defaultDocumentTransform;
      this.defaultContext = defaultContext || /* @__PURE__ */ Object.create(null);
      if (this.onBroadcast = onBroadcast) {
        this.mutationStore = /* @__PURE__ */ Object.create(null);
      }
    }
    QueryManager2.prototype.stop = function() {
      var _this = this;
      this.queries.forEach(function(_info, queryId) {
        _this.stopQueryNoBroadcast(queryId);
      });
      this.cancelPendingFetches(newInvariantError(25));
    };
    QueryManager2.prototype.cancelPendingFetches = function(error) {
      this.fetchCancelFns.forEach(function(cancel) {
        return cancel(error);
      });
      this.fetchCancelFns.clear();
    };
    QueryManager2.prototype.mutate = function(_a) {
      return __awaiter(this, arguments, void 0, function(_b) {
        var mutationId, hasClientExports2, mutationStoreValue, isOptimistic, self;
        var _c, _d;
        var mutation = _b.mutation, variables = _b.variables, optimisticResponse = _b.optimisticResponse, updateQueries = _b.updateQueries, _e = _b.refetchQueries, refetchQueries = _e === void 0 ? [] : _e, _f = _b.awaitRefetchQueries, awaitRefetchQueries = _f === void 0 ? false : _f, updateWithProxyFn = _b.update, onQueryUpdated = _b.onQueryUpdated, _g = _b.fetchPolicy, fetchPolicy = _g === void 0 ? ((_c = this.defaultOptions.mutate) === null || _c === void 0 ? void 0 : _c.fetchPolicy) || "network-only" : _g, _h = _b.errorPolicy, errorPolicy = _h === void 0 ? ((_d = this.defaultOptions.mutate) === null || _d === void 0 ? void 0 : _d.errorPolicy) || "none" : _h, keepRootFields = _b.keepRootFields, context = _b.context;
        return __generator(this, function(_j) {
          switch (_j.label) {
            case 0:
              invariant(mutation, 26);
              invariant(fetchPolicy === "network-only" || fetchPolicy === "no-cache", 27);
              mutationId = this.generateMutationId();
              mutation = this.cache.transformForLink(this.transform(mutation));
              hasClientExports2 = this.getDocumentInfo(mutation).hasClientExports;
              variables = this.getVariables(mutation, variables);
              if (!hasClientExports2)
                return [3, 2];
              return [4, this.localState.addExportedVariables(mutation, variables, context)];
            case 1:
              variables = _j.sent();
              _j.label = 2;
            case 2:
              mutationStoreValue = this.mutationStore && (this.mutationStore[mutationId] = {
                mutation,
                variables,
                loading: true,
                error: null
              });
              isOptimistic = optimisticResponse && this.markMutationOptimistic(optimisticResponse, {
                mutationId,
                document: mutation,
                variables,
                fetchPolicy,
                errorPolicy,
                context,
                updateQueries,
                update: updateWithProxyFn,
                keepRootFields
              });
              this.broadcastQueries();
              self = this;
              return [2, new Promise(function(resolve, reject) {
                return asyncMap(self.getObservableFromLink(mutation, __assign(__assign({}, context), { optimisticResponse: isOptimistic ? optimisticResponse : void 0 }), variables, false), function(result) {
                  if (graphQLResultHasError(result) && errorPolicy === "none") {
                    throw new ApolloError({
                      graphQLErrors: getGraphQLErrorsFromResult(result)
                    });
                  }
                  if (mutationStoreValue) {
                    mutationStoreValue.loading = false;
                    mutationStoreValue.error = null;
                  }
                  var storeResult = __assign({}, result);
                  if (typeof refetchQueries === "function") {
                    refetchQueries = refetchQueries(storeResult);
                  }
                  if (errorPolicy === "ignore" && graphQLResultHasError(storeResult)) {
                    delete storeResult.errors;
                  }
                  return self.markMutationResult({
                    mutationId,
                    result: storeResult,
                    document: mutation,
                    variables,
                    fetchPolicy,
                    errorPolicy,
                    context,
                    update: updateWithProxyFn,
                    updateQueries,
                    awaitRefetchQueries,
                    refetchQueries,
                    removeOptimistic: isOptimistic ? mutationId : void 0,
                    onQueryUpdated,
                    keepRootFields
                  });
                }).subscribe({
                  next: function(storeResult) {
                    self.broadcastQueries();
                    if (!("hasNext" in storeResult) || storeResult.hasNext === false) {
                      resolve(storeResult);
                    }
                  },
                  error: function(err) {
                    if (mutationStoreValue) {
                      mutationStoreValue.loading = false;
                      mutationStoreValue.error = err;
                    }
                    if (isOptimistic) {
                      self.cache.removeOptimistic(mutationId);
                    }
                    self.broadcastQueries();
                    reject(err instanceof ApolloError ? err : new ApolloError({
                      networkError: err
                    }));
                  }
                });
              })];
          }
        });
      });
    };
    QueryManager2.prototype.markMutationResult = function(mutation, cache2) {
      var _this = this;
      if (cache2 === void 0) {
        cache2 = this.cache;
      }
      var result = mutation.result;
      var cacheWrites = [];
      var skipCache = mutation.fetchPolicy === "no-cache";
      if (!skipCache && shouldWriteResult(result, mutation.errorPolicy)) {
        if (!isExecutionPatchIncrementalResult(result)) {
          cacheWrites.push({
            result: result.data,
            dataId: "ROOT_MUTATION",
            query: mutation.document,
            variables: mutation.variables
          });
        }
        if (isExecutionPatchIncrementalResult(result) && isNonEmptyArray(result.incremental)) {
          var diff = cache2.diff({
            id: "ROOT_MUTATION",
            // The cache complains if passed a mutation where it expects a
            // query, so we transform mutations and subscriptions to queries
            // (only once, thanks to this.transformCache).
            query: this.getDocumentInfo(mutation.document).asQuery,
            variables: mutation.variables,
            optimistic: false,
            returnPartialData: true
          });
          var mergedData = void 0;
          if (diff.result) {
            mergedData = mergeIncrementalData(diff.result, result);
          }
          if (typeof mergedData !== "undefined") {
            result.data = mergedData;
            cacheWrites.push({
              result: mergedData,
              dataId: "ROOT_MUTATION",
              query: mutation.document,
              variables: mutation.variables
            });
          }
        }
        var updateQueries_1 = mutation.updateQueries;
        if (updateQueries_1) {
          this.queries.forEach(function(_a, queryId) {
            var observableQuery = _a.observableQuery;
            var queryName = observableQuery && observableQuery.queryName;
            if (!queryName || !hasOwnProperty4.call(updateQueries_1, queryName)) {
              return;
            }
            var updater = updateQueries_1[queryName];
            var _b = _this.queries.get(queryId), document = _b.document, variables = _b.variables;
            var _c = cache2.diff({
              query: document,
              variables,
              returnPartialData: true,
              optimistic: false
            }), currentQueryResult = _c.result, complete = _c.complete;
            if (complete && currentQueryResult) {
              var nextQueryResult = updater(currentQueryResult, {
                mutationResult: result,
                queryName: document && getOperationName(document) || void 0,
                queryVariables: variables
              });
              if (nextQueryResult) {
                cacheWrites.push({
                  result: nextQueryResult,
                  dataId: "ROOT_QUERY",
                  query: document,
                  variables
                });
              }
            }
          });
        }
      }
      if (cacheWrites.length > 0 || (mutation.refetchQueries || "").length > 0 || mutation.update || mutation.onQueryUpdated || mutation.removeOptimistic) {
        var results_1 = [];
        this.refetchQueries({
          updateCache: function(cache3) {
            if (!skipCache) {
              cacheWrites.forEach(function(write) {
                return cache3.write(write);
              });
            }
            var update = mutation.update;
            var isFinalResult = !isExecutionPatchResult(result) || isExecutionPatchIncrementalResult(result) && !result.hasNext;
            if (update) {
              if (!skipCache) {
                var diff2 = cache3.diff({
                  id: "ROOT_MUTATION",
                  // The cache complains if passed a mutation where it expects a
                  // query, so we transform mutations and subscriptions to queries
                  // (only once, thanks to this.transformCache).
                  query: _this.getDocumentInfo(mutation.document).asQuery,
                  variables: mutation.variables,
                  optimistic: false,
                  returnPartialData: true
                });
                if (diff2.complete) {
                  result = __assign(__assign({}, result), { data: diff2.result });
                  if ("incremental" in result) {
                    delete result.incremental;
                  }
                  if ("hasNext" in result) {
                    delete result.hasNext;
                  }
                }
              }
              if (isFinalResult) {
                update(cache3, result, {
                  context: mutation.context,
                  variables: mutation.variables
                });
              }
            }
            if (!skipCache && !mutation.keepRootFields && isFinalResult) {
              cache3.modify({
                id: "ROOT_MUTATION",
                fields: function(value, _a) {
                  var fieldName = _a.fieldName, DELETE2 = _a.DELETE;
                  return fieldName === "__typename" ? value : DELETE2;
                }
              });
            }
          },
          include: mutation.refetchQueries,
          // Write the final mutation.result to the root layer of the cache.
          optimistic: false,
          // Remove the corresponding optimistic layer at the same time as we
          // write the final non-optimistic result.
          removeOptimistic: mutation.removeOptimistic,
          // Let the caller of client.mutate optionally determine the refetching
          // behavior for watched queries after the mutation.update function runs.
          // If no onQueryUpdated function was provided for this mutation, pass
          // null instead of undefined to disable the default refetching behavior.
          onQueryUpdated: mutation.onQueryUpdated || null
        }).forEach(function(result2) {
          return results_1.push(result2);
        });
        if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
          return Promise.all(results_1).then(function() {
            return result;
          });
        }
      }
      return Promise.resolve(result);
    };
    QueryManager2.prototype.markMutationOptimistic = function(optimisticResponse, mutation) {
      var _this = this;
      var data = typeof optimisticResponse === "function" ? optimisticResponse(mutation.variables, { IGNORE }) : optimisticResponse;
      if (data === IGNORE) {
        return false;
      }
      this.cache.recordOptimisticTransaction(function(cache2) {
        try {
          _this.markMutationResult(__assign(__assign({}, mutation), { result: { data } }), cache2);
        } catch (error) {
          globalThis.__DEV__ !== false && invariant.error(error);
        }
      }, mutation.mutationId);
      return true;
    };
    QueryManager2.prototype.fetchQuery = function(queryId, options, networkStatus) {
      return this.fetchConcastWithInfo(queryId, options, networkStatus).concast.promise;
    };
    QueryManager2.prototype.getQueryStore = function() {
      var store = /* @__PURE__ */ Object.create(null);
      this.queries.forEach(function(info, queryId) {
        store[queryId] = {
          variables: info.variables,
          networkStatus: info.networkStatus,
          networkError: info.networkError,
          graphQLErrors: info.graphQLErrors
        };
      });
      return store;
    };
    QueryManager2.prototype.resetErrors = function(queryId) {
      var queryInfo = this.queries.get(queryId);
      if (queryInfo) {
        queryInfo.networkError = void 0;
        queryInfo.graphQLErrors = [];
      }
    };
    QueryManager2.prototype.transform = function(document) {
      return this.documentTransform.transformDocument(document);
    };
    QueryManager2.prototype.getDocumentInfo = function(document) {
      var transformCache = this.transformCache;
      if (!transformCache.has(document)) {
        var cacheEntry = {
          // TODO These three calls (hasClientExports, shouldForceResolvers, and
          // usesNonreactiveDirective) are performing independent full traversals
          // of the transformed document. We should consider merging these
          // traversals into a single pass in the future, though the work is
          // cached after the first time.
          hasClientExports: hasClientExports(document),
          hasForcedResolvers: this.localState.shouldForceResolvers(document),
          hasNonreactiveDirective: hasDirectives(["nonreactive"], document),
          clientQuery: this.localState.clientQuery(document),
          serverQuery: removeDirectivesFromDocument([
            { name: "client", remove: true },
            { name: "connection" },
            { name: "nonreactive" }
          ], document),
          defaultVars: getDefaultValues(getOperationDefinition(document)),
          // Transform any mutation or subscription operations to query operations
          // so we can read/write them from/to the cache.
          asQuery: __assign(__assign({}, document), { definitions: document.definitions.map(function(def) {
            if (def.kind === "OperationDefinition" && def.operation !== "query") {
              return __assign(__assign({}, def), { operation: "query" });
            }
            return def;
          }) })
        };
        transformCache.set(document, cacheEntry);
      }
      return transformCache.get(document);
    };
    QueryManager2.prototype.getVariables = function(document, variables) {
      return __assign(__assign({}, this.getDocumentInfo(document).defaultVars), variables);
    };
    QueryManager2.prototype.watchQuery = function(options) {
      var query = this.transform(options.query);
      options = __assign(__assign({}, options), { variables: this.getVariables(query, options.variables) });
      if (typeof options.notifyOnNetworkStatusChange === "undefined") {
        options.notifyOnNetworkStatusChange = false;
      }
      var queryInfo = new QueryInfo(this);
      var observable = new ObservableQuery({
        queryManager: this,
        queryInfo,
        options
      });
      observable["lastQuery"] = query;
      this.queries.set(observable.queryId, queryInfo);
      queryInfo.init({
        document: query,
        observableQuery: observable,
        variables: observable.variables
      });
      return observable;
    };
    QueryManager2.prototype.query = function(options, queryId) {
      var _this = this;
      if (queryId === void 0) {
        queryId = this.generateQueryId();
      }
      invariant(options.query, 28);
      invariant(options.query.kind === "Document", 29);
      invariant(!options.returnPartialData, 30);
      invariant(!options.pollInterval, 31);
      return this.fetchQuery(queryId, __assign(__assign({}, options), { query: this.transform(options.query) })).finally(function() {
        return _this.stopQuery(queryId);
      });
    };
    QueryManager2.prototype.generateQueryId = function() {
      return String(this.queryIdCounter++);
    };
    QueryManager2.prototype.generateRequestId = function() {
      return this.requestIdCounter++;
    };
    QueryManager2.prototype.generateMutationId = function() {
      return String(this.mutationIdCounter++);
    };
    QueryManager2.prototype.stopQueryInStore = function(queryId) {
      this.stopQueryInStoreNoBroadcast(queryId);
      this.broadcastQueries();
    };
    QueryManager2.prototype.stopQueryInStoreNoBroadcast = function(queryId) {
      var queryInfo = this.queries.get(queryId);
      if (queryInfo)
        queryInfo.stop();
    };
    QueryManager2.prototype.clearStore = function(options) {
      if (options === void 0) {
        options = {
          discardWatches: true
        };
      }
      this.cancelPendingFetches(newInvariantError(32));
      this.queries.forEach(function(queryInfo) {
        if (queryInfo.observableQuery) {
          queryInfo.networkStatus = NetworkStatus.loading;
        } else {
          queryInfo.stop();
        }
      });
      if (this.mutationStore) {
        this.mutationStore = /* @__PURE__ */ Object.create(null);
      }
      return this.cache.reset(options);
    };
    QueryManager2.prototype.getObservableQueries = function(include) {
      var _this = this;
      if (include === void 0) {
        include = "active";
      }
      var queries = /* @__PURE__ */ new Map();
      var queryNamesAndDocs = /* @__PURE__ */ new Map();
      var legacyQueryOptions = /* @__PURE__ */ new Set();
      if (Array.isArray(include)) {
        include.forEach(function(desc) {
          if (typeof desc === "string") {
            queryNamesAndDocs.set(desc, false);
          } else if (isDocumentNode(desc)) {
            queryNamesAndDocs.set(_this.transform(desc), false);
          } else if (isNonNullObject(desc) && desc.query) {
            legacyQueryOptions.add(desc);
          }
        });
      }
      this.queries.forEach(function(_a, queryId) {
        var oq = _a.observableQuery, document = _a.document;
        if (oq) {
          if (include === "all") {
            queries.set(queryId, oq);
            return;
          }
          var queryName = oq.queryName, fetchPolicy = oq.options.fetchPolicy;
          if (fetchPolicy === "standby" || include === "active" && !oq.hasObservers()) {
            return;
          }
          if (include === "active" || queryName && queryNamesAndDocs.has(queryName) || document && queryNamesAndDocs.has(document)) {
            queries.set(queryId, oq);
            if (queryName)
              queryNamesAndDocs.set(queryName, true);
            if (document)
              queryNamesAndDocs.set(document, true);
          }
        }
      });
      if (legacyQueryOptions.size) {
        legacyQueryOptions.forEach(function(options) {
          var queryId = makeUniqueId("legacyOneTimeQuery");
          var queryInfo = _this.getQuery(queryId).init({
            document: options.query,
            variables: options.variables
          });
          var oq = new ObservableQuery({
            queryManager: _this,
            queryInfo,
            options: __assign(__assign({}, options), { fetchPolicy: "network-only" })
          });
          invariant(oq.queryId === queryId);
          queryInfo.setObservableQuery(oq);
          queries.set(queryId, oq);
        });
      }
      if (globalThis.__DEV__ !== false && queryNamesAndDocs.size) {
        queryNamesAndDocs.forEach(function(included, nameOrDoc) {
          if (!included) {
            globalThis.__DEV__ !== false && invariant.warn(typeof nameOrDoc === "string" ? 33 : 34, nameOrDoc);
          }
        });
      }
      return queries;
    };
    QueryManager2.prototype.reFetchObservableQueries = function(includeStandby) {
      var _this = this;
      if (includeStandby === void 0) {
        includeStandby = false;
      }
      var observableQueryPromises = [];
      this.getObservableQueries(includeStandby ? "all" : "active").forEach(function(observableQuery, queryId) {
        var fetchPolicy = observableQuery.options.fetchPolicy;
        observableQuery.resetLastResults();
        if (includeStandby || fetchPolicy !== "standby" && fetchPolicy !== "cache-only") {
          observableQueryPromises.push(observableQuery.refetch());
        }
        _this.getQuery(queryId).setDiff(null);
      });
      this.broadcastQueries();
      return Promise.all(observableQueryPromises);
    };
    QueryManager2.prototype.setObservableQuery = function(observableQuery) {
      this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
    };
    QueryManager2.prototype.startGraphQLSubscription = function(_a) {
      var _this = this;
      var query = _a.query, fetchPolicy = _a.fetchPolicy, _b = _a.errorPolicy, errorPolicy = _b === void 0 ? "none" : _b, variables = _a.variables, _c = _a.context, context = _c === void 0 ? {} : _c;
      query = this.transform(query);
      variables = this.getVariables(query, variables);
      var makeObservable = function(variables2) {
        return _this.getObservableFromLink(query, context, variables2).map(function(result) {
          if (fetchPolicy !== "no-cache") {
            if (shouldWriteResult(result, errorPolicy)) {
              _this.cache.write({
                query,
                result: result.data,
                dataId: "ROOT_SUBSCRIPTION",
                variables: variables2
              });
            }
            _this.broadcastQueries();
          }
          var hasErrors = graphQLResultHasError(result);
          var hasProtocolErrors = graphQLResultHasProtocolErrors(result);
          if (hasErrors || hasProtocolErrors) {
            var errors = {};
            if (hasErrors) {
              errors.graphQLErrors = result.errors;
            }
            if (hasProtocolErrors) {
              errors.protocolErrors = result.extensions[PROTOCOL_ERRORS_SYMBOL];
            }
            if (errorPolicy === "none" || hasProtocolErrors) {
              throw new ApolloError(errors);
            }
          }
          if (errorPolicy === "ignore") {
            delete result.errors;
          }
          return result;
        });
      };
      if (this.getDocumentInfo(query).hasClientExports) {
        var observablePromise_1 = this.localState.addExportedVariables(query, variables, context).then(makeObservable);
        return new Observable(function(observer) {
          var sub = null;
          observablePromise_1.then(function(observable) {
            return sub = observable.subscribe(observer);
          }, observer.error);
          return function() {
            return sub && sub.unsubscribe();
          };
        });
      }
      return makeObservable(variables);
    };
    QueryManager2.prototype.stopQuery = function(queryId) {
      this.stopQueryNoBroadcast(queryId);
      this.broadcastQueries();
    };
    QueryManager2.prototype.stopQueryNoBroadcast = function(queryId) {
      this.stopQueryInStoreNoBroadcast(queryId);
      this.removeQuery(queryId);
    };
    QueryManager2.prototype.removeQuery = function(queryId) {
      this.fetchCancelFns.delete(queryId);
      if (this.queries.has(queryId)) {
        this.getQuery(queryId).stop();
        this.queries.delete(queryId);
      }
    };
    QueryManager2.prototype.broadcastQueries = function() {
      if (this.onBroadcast)
        this.onBroadcast();
      this.queries.forEach(function(info) {
        return info.notify();
      });
    };
    QueryManager2.prototype.getLocalState = function() {
      return this.localState;
    };
    QueryManager2.prototype.getObservableFromLink = function(query, context, variables, deduplication) {
      var _this = this;
      var _a;
      if (deduplication === void 0) {
        deduplication = (_a = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a !== void 0 ? _a : this.queryDeduplication;
      }
      var observable;
      var _b = this.getDocumentInfo(query), serverQuery = _b.serverQuery, clientQuery = _b.clientQuery;
      if (serverQuery) {
        var _c = this, inFlightLinkObservables_1 = _c.inFlightLinkObservables, link = _c.link;
        var operation = {
          query: serverQuery,
          variables,
          operationName: getOperationName(serverQuery) || void 0,
          context: this.prepareContext(__assign(__assign({}, context), { forceFetch: !deduplication }))
        };
        context = operation.context;
        if (deduplication) {
          var printedServerQuery_1 = print(serverQuery);
          var varJson_1 = canonicalStringify(variables);
          var entry = inFlightLinkObservables_1.lookup(printedServerQuery_1, varJson_1);
          observable = entry.observable;
          if (!observable) {
            var concast = new Concast([
              execute(link, operation)
            ]);
            observable = entry.observable = concast;
            concast.beforeNext(function() {
              inFlightLinkObservables_1.remove(printedServerQuery_1, varJson_1);
            });
          }
        } else {
          observable = new Concast([
            execute(link, operation)
          ]);
        }
      } else {
        observable = new Concast([Observable.of({ data: {} })]);
        context = this.prepareContext(context);
      }
      if (clientQuery) {
        observable = asyncMap(observable, function(result) {
          return _this.localState.runResolvers({
            document: clientQuery,
            remoteResult: result,
            context,
            variables
          });
        });
      }
      return observable;
    };
    QueryManager2.prototype.getResultsFromLink = function(queryInfo, cacheWriteBehavior, options) {
      var requestId = queryInfo.lastRequestId = this.generateRequestId();
      var linkDocument = this.cache.transformForLink(options.query);
      return asyncMap(this.getObservableFromLink(linkDocument, options.context, options.variables), function(result) {
        var graphQLErrors = getGraphQLErrorsFromResult(result);
        var hasErrors = graphQLErrors.length > 0;
        if (requestId >= queryInfo.lastRequestId) {
          if (hasErrors && options.errorPolicy === "none") {
            throw queryInfo.markError(new ApolloError({
              graphQLErrors
            }));
          }
          queryInfo.markResult(result, linkDocument, options, cacheWriteBehavior);
          queryInfo.markReady();
        }
        var aqr = {
          data: result.data,
          loading: false,
          networkStatus: NetworkStatus.ready
        };
        if (hasErrors && options.errorPolicy !== "ignore") {
          aqr.errors = graphQLErrors;
          aqr.networkStatus = NetworkStatus.error;
        }
        return aqr;
      }, function(networkError) {
        var error = isApolloError(networkError) ? networkError : new ApolloError({ networkError });
        if (requestId >= queryInfo.lastRequestId) {
          queryInfo.markError(error);
        }
        throw error;
      });
    };
    QueryManager2.prototype.fetchConcastWithInfo = function(queryId, options, networkStatus, query) {
      var _this = this;
      if (networkStatus === void 0) {
        networkStatus = NetworkStatus.loading;
      }
      if (query === void 0) {
        query = options.query;
      }
      var variables = this.getVariables(query, options.variables);
      var queryInfo = this.getQuery(queryId);
      var defaults = this.defaultOptions.watchQuery;
      var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? defaults && defaults.fetchPolicy || "cache-first" : _a, _b = options.errorPolicy, errorPolicy = _b === void 0 ? defaults && defaults.errorPolicy || "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
      var normalized = Object.assign({}, options, {
        query,
        variables,
        fetchPolicy,
        errorPolicy,
        returnPartialData,
        notifyOnNetworkStatusChange,
        context
      });
      var fromVariables = function(variables2) {
        normalized.variables = variables2;
        var sourcesWithInfo2 = _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
        if (
          // If we're in standby, postpone advancing options.fetchPolicy using
          // applyNextFetchPolicy.
          normalized.fetchPolicy !== "standby" && // The "standby" policy currently returns [] from fetchQueryByPolicy, so
          // this is another way to detect when nothing was done/fetched.
          sourcesWithInfo2.sources.length > 0 && queryInfo.observableQuery
        ) {
          queryInfo.observableQuery["applyNextFetchPolicy"]("after-fetch", options);
        }
        return sourcesWithInfo2;
      };
      var cleanupCancelFn = function() {
        return _this.fetchCancelFns.delete(queryId);
      };
      this.fetchCancelFns.set(queryId, function(reason) {
        cleanupCancelFn();
        setTimeout(function() {
          return concast.cancel(reason);
        });
      });
      var concast, containsDataFromLink;
      if (this.getDocumentInfo(normalized.query).hasClientExports) {
        concast = new Concast(this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables).then(function(sourcesWithInfo2) {
          return sourcesWithInfo2.sources;
        }));
        containsDataFromLink = true;
      } else {
        var sourcesWithInfo = fromVariables(normalized.variables);
        containsDataFromLink = sourcesWithInfo.fromLink;
        concast = new Concast(sourcesWithInfo.sources);
      }
      concast.promise.then(cleanupCancelFn, cleanupCancelFn);
      return {
        concast,
        fromLink: containsDataFromLink
      };
    };
    QueryManager2.prototype.refetchQueries = function(_a) {
      var _this = this;
      var updateCache = _a.updateCache, include = _a.include, _b = _a.optimistic, optimistic = _b === void 0 ? false : _b, _c = _a.removeOptimistic, removeOptimistic = _c === void 0 ? optimistic ? makeUniqueId("refetchQueries") : void 0 : _c, onQueryUpdated = _a.onQueryUpdated;
      var includedQueriesById = /* @__PURE__ */ new Map();
      if (include) {
        this.getObservableQueries(include).forEach(function(oq, queryId) {
          includedQueriesById.set(queryId, {
            oq,
            lastDiff: _this.getQuery(queryId).getDiff()
          });
        });
      }
      var results = /* @__PURE__ */ new Map();
      if (updateCache) {
        this.cache.batch({
          update: updateCache,
          // Since you can perform any combination of cache reads and/or writes in
          // the cache.batch update function, its optimistic option can be either
          // a boolean or a string, representing three distinct modes of
          // operation:
          //
          // * false: read/write only the root layer
          // * true: read/write the topmost layer
          // * string: read/write a fresh optimistic layer with that ID string
          //
          // When typeof optimistic === "string", a new optimistic layer will be
          // temporarily created within cache.batch with that string as its ID. If
          // we then pass that same string as the removeOptimistic option, we can
          // make cache.batch immediately remove the optimistic layer after
          // running the updateCache function, triggering only one broadcast.
          //
          // However, the refetchQueries method accepts only true or false for its
          // optimistic option (not string). We interpret true to mean a temporary
          // optimistic layer should be created, to allow efficiently rolling back
          // the effect of the updateCache function, which involves passing a
          // string instead of true as the optimistic option to cache.batch, when
          // refetchQueries receives optimistic: true.
          //
          // In other words, we are deliberately not supporting the use case of
          // writing to an *existing* optimistic layer (using the refetchQueries
          // updateCache function), since that would potentially interfere with
          // other optimistic updates in progress. Instead, you can read/write
          // only the root layer by passing optimistic: false to refetchQueries,
          // or you can read/write a brand new optimistic layer that will be
          // automatically removed by passing optimistic: true.
          optimistic: optimistic && removeOptimistic || false,
          // The removeOptimistic option can also be provided by itself, even if
          // optimistic === false, to remove some previously-added optimistic
          // layer safely and efficiently, like we do in markMutationResult.
          //
          // If an explicit removeOptimistic string is provided with optimistic:
          // true, the removeOptimistic string will determine the ID of the
          // temporary optimistic layer, in case that ever matters.
          removeOptimistic,
          onWatchUpdated: function(watch, diff, lastDiff) {
            var oq = watch.watcher instanceof QueryInfo && watch.watcher.observableQuery;
            if (oq) {
              if (onQueryUpdated) {
                includedQueriesById.delete(oq.queryId);
                var result = onQueryUpdated(oq, diff, lastDiff);
                if (result === true) {
                  result = oq.refetch();
                }
                if (result !== false) {
                  results.set(oq, result);
                }
                return result;
              }
              if (onQueryUpdated !== null) {
                includedQueriesById.set(oq.queryId, { oq, lastDiff, diff });
              }
            }
          }
        });
      }
      if (includedQueriesById.size) {
        includedQueriesById.forEach(function(_a2, queryId) {
          var oq = _a2.oq, lastDiff = _a2.lastDiff, diff = _a2.diff;
          var result;
          if (onQueryUpdated) {
            if (!diff) {
              var info = oq["queryInfo"];
              info.reset();
              diff = info.getDiff();
            }
            result = onQueryUpdated(oq, diff, lastDiff);
          }
          if (!onQueryUpdated || result === true) {
            result = oq.refetch();
          }
          if (result !== false) {
            results.set(oq, result);
          }
          if (queryId.indexOf("legacyOneTimeQuery") >= 0) {
            _this.stopQueryNoBroadcast(queryId);
          }
        });
      }
      if (removeOptimistic) {
        this.cache.removeOptimistic(removeOptimistic);
      }
      return results;
    };
    QueryManager2.prototype.fetchQueryByPolicy = function(queryInfo, _a, networkStatus) {
      var _this = this;
      var query = _a.query, variables = _a.variables, fetchPolicy = _a.fetchPolicy, refetchWritePolicy = _a.refetchWritePolicy, errorPolicy = _a.errorPolicy, returnPartialData = _a.returnPartialData, context = _a.context, notifyOnNetworkStatusChange = _a.notifyOnNetworkStatusChange;
      var oldNetworkStatus = queryInfo.networkStatus;
      queryInfo.init({
        document: query,
        variables,
        networkStatus
      });
      var readCache = function() {
        return queryInfo.getDiff();
      };
      var resultsFromCache = function(diff2, networkStatus2) {
        if (networkStatus2 === void 0) {
          networkStatus2 = queryInfo.networkStatus || NetworkStatus.loading;
        }
        var data = diff2.result;
        if (globalThis.__DEV__ !== false && !returnPartialData && !equal(data, {})) {
          logMissingFieldErrors(diff2.missing);
        }
        var fromData = function(data2) {
          return Observable.of(__assign({ data: data2, loading: isNetworkRequestInFlight(networkStatus2), networkStatus: networkStatus2 }, diff2.complete ? null : { partial: true }));
        };
        if (data && _this.getDocumentInfo(query).hasForcedResolvers) {
          return _this.localState.runResolvers({
            document: query,
            remoteResult: { data },
            context,
            variables,
            onlyRunForcedResolvers: true
          }).then(function(resolved) {
            return fromData(resolved.data || void 0);
          });
        }
        if (errorPolicy === "none" && networkStatus2 === NetworkStatus.refetch && Array.isArray(diff2.missing)) {
          return fromData(void 0);
        }
        return fromData(data);
      };
      var cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 : networkStatus === NetworkStatus.refetch && refetchWritePolicy !== "merge" ? 1 : 2;
      var resultsFromLink = function() {
        return _this.getResultsFromLink(queryInfo, cacheWriteBehavior, {
          query,
          variables,
          context,
          fetchPolicy,
          errorPolicy
        });
      };
      var shouldNotify = notifyOnNetworkStatusChange && typeof oldNetworkStatus === "number" && oldNetworkStatus !== networkStatus && isNetworkRequestInFlight(networkStatus);
      switch (fetchPolicy) {
        default:
        case "cache-first": {
          var diff = readCache();
          if (diff.complete) {
            return {
              fromLink: false,
              sources: [resultsFromCache(diff, queryInfo.markReady())]
            };
          }
          if (returnPartialData || shouldNotify) {
            return {
              fromLink: true,
              sources: [resultsFromCache(diff), resultsFromLink()]
            };
          }
          return { fromLink: true, sources: [resultsFromLink()] };
        }
        case "cache-and-network": {
          var diff = readCache();
          if (diff.complete || returnPartialData || shouldNotify) {
            return {
              fromLink: true,
              sources: [resultsFromCache(diff), resultsFromLink()]
            };
          }
          return { fromLink: true, sources: [resultsFromLink()] };
        }
        case "cache-only":
          return {
            fromLink: false,
            sources: [resultsFromCache(readCache(), queryInfo.markReady())]
          };
        case "network-only":
          if (shouldNotify) {
            return {
              fromLink: true,
              sources: [resultsFromCache(readCache()), resultsFromLink()]
            };
          }
          return { fromLink: true, sources: [resultsFromLink()] };
        case "no-cache":
          if (shouldNotify) {
            return {
              fromLink: true,
              // Note that queryInfo.getDiff() for no-cache queries does not call
              // cache.diff, but instead returns a { complete: false } stub result
              // when there is no queryInfo.diff already defined.
              sources: [resultsFromCache(queryInfo.getDiff()), resultsFromLink()]
            };
          }
          return { fromLink: true, sources: [resultsFromLink()] };
        case "standby":
          return { fromLink: false, sources: [] };
      }
    };
    QueryManager2.prototype.getQuery = function(queryId) {
      if (queryId && !this.queries.has(queryId)) {
        this.queries.set(queryId, new QueryInfo(this, queryId));
      }
      return this.queries.get(queryId);
    };
    QueryManager2.prototype.prepareContext = function(context) {
      if (context === void 0) {
        context = {};
      }
      var newContext = this.localState.prepareContext(context);
      return __assign(__assign(__assign({}, this.defaultContext), newContext), { clientAwareness: this.clientAwareness });
    };
    return QueryManager2;
  }()
);

// node_modules/@apollo/client/core/ApolloClient.js
var hasSuggestedDevtools = false;
var ApolloClient = (
  /** @class */
  function() {
    function ApolloClient2(options) {
      var _this = this;
      this.resetStoreCallbacks = [];
      this.clearStoreCallbacks = [];
      if (!options.cache) {
        throw newInvariantError(15);
      }
      var uri = options.uri, credentials = options.credentials, headers = options.headers, cache2 = options.cache, documentTransform = options.documentTransform, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.connectToDevTools, connectToDevTools = _c === void 0 ? typeof window === "object" && !window.__APOLLO_CLIENT__ && globalThis.__DEV__ !== false : _c, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d, defaultOptions2 = options.defaultOptions, defaultContext = options.defaultContext, _e = options.assumeImmutableResults, assumeImmutableResults = _e === void 0 ? cache2.assumeImmutableResults : _e, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version;
      var link = options.link;
      if (!link) {
        link = uri ? new HttpLink({ uri, credentials, headers }) : ApolloLink.empty();
      }
      this.link = link;
      this.cache = cache2;
      this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
      this.queryDeduplication = queryDeduplication;
      this.defaultOptions = defaultOptions2 || /* @__PURE__ */ Object.create(null);
      this.typeDefs = typeDefs;
      if (ssrForceFetchDelay) {
        setTimeout(function() {
          return _this.disableNetworkFetches = false;
        }, ssrForceFetchDelay);
      }
      this.watchQuery = this.watchQuery.bind(this);
      this.query = this.query.bind(this);
      this.mutate = this.mutate.bind(this);
      this.watchFragment = this.watchFragment.bind(this);
      this.resetStore = this.resetStore.bind(this);
      this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
      this.version = version;
      this.localState = new LocalState({
        cache: cache2,
        client: this,
        resolvers,
        fragmentMatcher
      });
      this.queryManager = new QueryManager({
        cache: this.cache,
        link: this.link,
        defaultOptions: this.defaultOptions,
        defaultContext,
        documentTransform,
        queryDeduplication,
        ssrMode,
        clientAwareness: {
          name: clientAwarenessName,
          version: clientAwarenessVersion
        },
        localState: this.localState,
        assumeImmutableResults,
        onBroadcast: connectToDevTools ? function() {
          if (_this.devToolsHookCb) {
            _this.devToolsHookCb({
              action: {},
              state: {
                queries: _this.queryManager.getQueryStore(),
                mutations: _this.queryManager.mutationStore || {}
              },
              dataWithOptimisticResults: _this.cache.extract(true)
            });
          }
        } : void 0
      });
      if (connectToDevTools)
        this.connectToDevTools();
    }
    ApolloClient2.prototype.connectToDevTools = function() {
      if (typeof window === "object") {
        var windowWithDevTools = window;
        var devtoolsSymbol = Symbol.for("apollo.devtools");
        (windowWithDevTools[devtoolsSymbol] = windowWithDevTools[devtoolsSymbol] || []).push(this);
        windowWithDevTools.__APOLLO_CLIENT__ = this;
      }
      if (!hasSuggestedDevtools && globalThis.__DEV__ !== false) {
        hasSuggestedDevtools = true;
        setTimeout(function() {
          if (typeof window !== "undefined" && window.document && window.top === window.self && !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ && /^(https?|file):$/.test(window.location.protocol)) {
            var nav = window.navigator;
            var ua = nav && nav.userAgent;
            var url = void 0;
            if (typeof ua === "string") {
              if (ua.indexOf("Chrome/") > -1) {
                url = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
              } else if (ua.indexOf("Firefox/") > -1) {
                url = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
              }
            }
            if (url) {
              globalThis.__DEV__ !== false && invariant.log("Download the Apollo DevTools for a better development experience: %s", url);
            }
          }
        }, 1e4);
      }
    };
    Object.defineProperty(ApolloClient2.prototype, "documentTransform", {
      /**
       * The `DocumentTransform` used to modify GraphQL documents before a request
       * is made. If a custom `DocumentTransform` is not provided, this will be the
       * default document transform.
       */
      get: function() {
        return this.queryManager.documentTransform;
      },
      enumerable: false,
      configurable: true
    });
    ApolloClient2.prototype.stop = function() {
      this.queryManager.stop();
    };
    ApolloClient2.prototype.watchQuery = function(options) {
      if (this.defaultOptions.watchQuery) {
        options = mergeOptions(this.defaultOptions.watchQuery, options);
      }
      if (this.disableNetworkFetches && (options.fetchPolicy === "network-only" || options.fetchPolicy === "cache-and-network")) {
        options = __assign(__assign({}, options), { fetchPolicy: "cache-first" });
      }
      return this.queryManager.watchQuery(options);
    };
    ApolloClient2.prototype.query = function(options) {
      if (this.defaultOptions.query) {
        options = mergeOptions(this.defaultOptions.query, options);
      }
      invariant(options.fetchPolicy !== "cache-and-network", 16);
      if (this.disableNetworkFetches && options.fetchPolicy === "network-only") {
        options = __assign(__assign({}, options), { fetchPolicy: "cache-first" });
      }
      return this.queryManager.query(options);
    };
    ApolloClient2.prototype.mutate = function(options) {
      if (this.defaultOptions.mutate) {
        options = mergeOptions(this.defaultOptions.mutate, options);
      }
      return this.queryManager.mutate(options);
    };
    ApolloClient2.prototype.subscribe = function(options) {
      return this.queryManager.startGraphQLSubscription(options);
    };
    ApolloClient2.prototype.readQuery = function(options, optimistic) {
      if (optimistic === void 0) {
        optimistic = false;
      }
      return this.cache.readQuery(options, optimistic);
    };
    ApolloClient2.prototype.watchFragment = function(options) {
      return this.cache.watchFragment(options);
    };
    ApolloClient2.prototype.readFragment = function(options, optimistic) {
      if (optimistic === void 0) {
        optimistic = false;
      }
      return this.cache.readFragment(options, optimistic);
    };
    ApolloClient2.prototype.writeQuery = function(options) {
      var ref = this.cache.writeQuery(options);
      if (options.broadcast !== false) {
        this.queryManager.broadcastQueries();
      }
      return ref;
    };
    ApolloClient2.prototype.writeFragment = function(options) {
      var ref = this.cache.writeFragment(options);
      if (options.broadcast !== false) {
        this.queryManager.broadcastQueries();
      }
      return ref;
    };
    ApolloClient2.prototype.__actionHookForDevTools = function(cb) {
      this.devToolsHookCb = cb;
    };
    ApolloClient2.prototype.__requestRaw = function(payload) {
      return execute(this.link, payload);
    };
    ApolloClient2.prototype.resetStore = function() {
      var _this = this;
      return Promise.resolve().then(function() {
        return _this.queryManager.clearStore({
          discardWatches: false
        });
      }).then(function() {
        return Promise.all(_this.resetStoreCallbacks.map(function(fn) {
          return fn();
        }));
      }).then(function() {
        return _this.reFetchObservableQueries();
      });
    };
    ApolloClient2.prototype.clearStore = function() {
      var _this = this;
      return Promise.resolve().then(function() {
        return _this.queryManager.clearStore({
          discardWatches: true
        });
      }).then(function() {
        return Promise.all(_this.clearStoreCallbacks.map(function(fn) {
          return fn();
        }));
      });
    };
    ApolloClient2.prototype.onResetStore = function(cb) {
      var _this = this;
      this.resetStoreCallbacks.push(cb);
      return function() {
        _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function(c) {
          return c !== cb;
        });
      };
    };
    ApolloClient2.prototype.onClearStore = function(cb) {
      var _this = this;
      this.clearStoreCallbacks.push(cb);
      return function() {
        _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function(c) {
          return c !== cb;
        });
      };
    };
    ApolloClient2.prototype.reFetchObservableQueries = function(includeStandby) {
      return this.queryManager.reFetchObservableQueries(includeStandby);
    };
    ApolloClient2.prototype.refetchQueries = function(options) {
      var map = this.queryManager.refetchQueries(options);
      var queries = [];
      var results = [];
      map.forEach(function(result2, obsQuery) {
        queries.push(obsQuery);
        results.push(result2);
      });
      var result = Promise.all(results);
      result.queries = queries;
      result.results = results;
      result.catch(function(error) {
        globalThis.__DEV__ !== false && invariant.debug(17, error);
      });
      return result;
    };
    ApolloClient2.prototype.getObservableQueries = function(include) {
      if (include === void 0) {
        include = "active";
      }
      return this.queryManager.getObservableQueries(include);
    };
    ApolloClient2.prototype.extract = function(optimistic) {
      return this.cache.extract(optimistic);
    };
    ApolloClient2.prototype.restore = function(serializedState) {
      return this.cache.restore(serializedState);
    };
    ApolloClient2.prototype.addResolvers = function(resolvers) {
      this.localState.addResolvers(resolvers);
    };
    ApolloClient2.prototype.setResolvers = function(resolvers) {
      this.localState.setResolvers(resolvers);
    };
    ApolloClient2.prototype.getResolvers = function() {
      return this.localState.getResolvers();
    };
    ApolloClient2.prototype.setLocalStateFragmentMatcher = function(fragmentMatcher) {
      this.localState.setFragmentMatcher(fragmentMatcher);
    };
    ApolloClient2.prototype.setLink = function(newLink) {
      this.link = this.queryManager.link = newLink;
    };
    Object.defineProperty(ApolloClient2.prototype, "defaultContext", {
      get: function() {
        return this.queryManager.defaultContext;
      },
      enumerable: false,
      configurable: true
    });
    return ApolloClient2;
  }()
);
if (globalThis.__DEV__ !== false) {
  ApolloClient.prototype.getMemoryInternals = getApolloClientMemoryInternals;
}

// node_modules/graphql-tag/lib/index.js
var docCache = /* @__PURE__ */ new Map();
var fragmentSourceMap = /* @__PURE__ */ new Map();
var printFragmentWarnings = true;
var experimentalFragmentVariables = false;
function normalize2(string) {
  return string.replace(/[\s,]+/g, " ").trim();
}
function cacheKeyFromLoc(loc) {
  return normalize2(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
  var seenKeys = /* @__PURE__ */ new Set();
  var definitions = [];
  ast.definitions.forEach(function(fragmentDefinition) {
    if (fragmentDefinition.kind === "FragmentDefinition") {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
      var sourceKeySet = fragmentSourceMap.get(fragmentName);
      if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }
      } else if (!sourceKeySet) {
        fragmentSourceMap.set(fragmentName, sourceKeySet = /* @__PURE__ */ new Set());
      }
      sourceKeySet.add(sourceKey);
      if (!seenKeys.has(sourceKey)) {
        seenKeys.add(sourceKey);
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  });
  return __assign(__assign({}, ast), { definitions });
}
function stripLoc(doc) {
  var workSet = new Set(doc.definitions);
  workSet.forEach(function(node) {
    if (node.loc)
      delete node.loc;
    Object.keys(node).forEach(function(key) {
      var value = node[key];
      if (value && typeof value === "object") {
        workSet.add(value);
      }
    });
  });
  var loc = doc.loc;
  if (loc) {
    delete loc.startToken;
    delete loc.endToken;
  }
  return doc;
}
function parseDocument(source) {
  var cacheKey = normalize2(source);
  if (!docCache.has(cacheKey)) {
    var parsed = parse(source, {
      experimentalFragmentVariables,
      allowLegacyFragmentVariables: experimentalFragmentVariables
    });
    if (!parsed || parsed.kind !== "Document") {
      throw new Error("Not a valid GraphQL document.");
    }
    docCache.set(cacheKey, stripLoc(processFragments(parsed)));
  }
  return docCache.get(cacheKey);
}
function gql(literals) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (typeof literals === "string") {
    literals = [literals];
  }
  var result = literals[0];
  args.forEach(function(arg, i) {
    if (arg && arg.kind === "Document") {
      result += arg.loc.source.body;
    } else {
      result += arg;
    }
    result += literals[i + 1];
  });
  return parseDocument(result);
}
function resetCaches() {
  docCache.clear();
  fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
  printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}
var extras = {
  gql,
  resetCaches,
  disableFragmentWarnings,
  enableExperimentalFragmentVariables,
  disableExperimentalFragmentVariables
};
(function(gql_1) {
  gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
})(gql || (gql = {}));
gql["default"] = gql;

// node_modules/@apollo/client/core/index.js
setVerbosity(globalThis.__DEV__ !== false ? "log" : "silent");

// node_modules/@apollo/client/react/context/ApolloConsumer.js
var React2 = __toESM(require_rehackt(), 1);

// node_modules/@apollo/client/react/context/ApolloContext.js
var React = __toESM(require_rehackt(), 1);
var contextKey = canUseSymbol ? Symbol.for("__APOLLO_CONTEXT__") : "__APOLLO_CONTEXT__";
function getApolloContext() {
  invariant("createContext" in React, 45);
  var context = React.createContext[contextKey];
  if (!context) {
    Object.defineProperty(React.createContext, contextKey, {
      value: context = React.createContext({}),
      enumerable: false,
      writable: false,
      configurable: true
    });
    context.displayName = "ApolloContext";
  }
  return context;
}
var resetApolloContext = getApolloContext;

// node_modules/@apollo/client/react/context/ApolloConsumer.js
var ApolloConsumer = function(props) {
  var ApolloContext = getApolloContext();
  return React2.createElement(ApolloContext.Consumer, null, function(context) {
    invariant(context && context.client, 44);
    return props.children(context.client);
  });
};

// node_modules/@apollo/client/react/context/ApolloProvider.js
var React3 = __toESM(require_rehackt(), 1);
var ApolloProvider = function(_a) {
  var client = _a.client, children = _a.children;
  var ApolloContext = getApolloContext();
  var parentContext = React3.useContext(ApolloContext);
  var context = React3.useMemo(function() {
    return __assign(__assign({}, parentContext), { client: client || parentContext.client });
  }, [parentContext, client]);
  invariant(context.client, 46);
  return React3.createElement(ApolloContext.Provider, { value: context }, children);
};

// node_modules/@apollo/client/react/hooks/useApolloClient.js
var React4 = __toESM(require_rehackt(), 1);
function useApolloClient(override) {
  var context = React4.useContext(getApolloContext());
  var client = override || context.client;
  invariant(!!client, 49);
  return client;
}

// node_modules/@apollo/client/react/hooks/useLazyQuery.js
var React12 = __toESM(require_rehackt(), 1);

// node_modules/@apollo/client/react/hooks/useQuery.js
var React11 = __toESM(require_rehackt(), 1);

// node_modules/@apollo/client/react/hooks/useSyncExternalStore.js
var React5 = __toESM(require_rehackt(), 1);
var didWarnUncachedGetSnapshot = false;
var uSESKey = "useSyncExternalStore";
var realHook = React5[uSESKey];
var useSyncExternalStore = realHook || function(subscribe, getSnapshot, getServerSnapshot) {
  var value = getSnapshot();
  if (
    // DEVIATION: Using __DEV__
    globalThis.__DEV__ !== false && !didWarnUncachedGetSnapshot && // DEVIATION: Not using Object.is because we know our snapshots will never
    // be exotic primitive values like NaN, which is !== itself.
    value !== getSnapshot()
  ) {
    didWarnUncachedGetSnapshot = true;
    globalThis.__DEV__ !== false && invariant.error(58);
  }
  var _a = React5.useState({
    inst: { value, getSnapshot }
  }), inst = _a[0].inst, forceUpdate = _a[1];
  if (canUseLayoutEffect) {
    React5.useLayoutEffect(function() {
      Object.assign(inst, { value, getSnapshot });
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    }, [subscribe, value, getSnapshot]);
  } else {
    Object.assign(inst, { value, getSnapshot });
  }
  React5.useEffect(function() {
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }
    return subscribe(function handleStoreChange() {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    });
  }, [subscribe]);
  return value;
};
function checkIfSnapshotChanged(_a) {
  var value = _a.value, getSnapshot = _a.getSnapshot;
  try {
    return value !== getSnapshot();
  } catch (_b) {
    return true;
  }
}

// node_modules/@apollo/client/react/parser/index.js
var DocumentType;
(function(DocumentType2) {
  DocumentType2[DocumentType2["Query"] = 0] = "Query";
  DocumentType2[DocumentType2["Mutation"] = 1] = "Mutation";
  DocumentType2[DocumentType2["Subscription"] = 2] = "Subscription";
})(DocumentType || (DocumentType = {}));
var cache;
function operationName(type) {
  var name;
  switch (type) {
    case DocumentType.Query:
      name = "Query";
      break;
    case DocumentType.Mutation:
      name = "Mutation";
      break;
    case DocumentType.Subscription:
      name = "Subscription";
      break;
  }
  return name;
}
function parser(document) {
  if (!cache) {
    cache = new AutoCleanedWeakCache(
      cacheSizes.parser || 1e3
      /* defaultCacheSizes.parser */
    );
  }
  var cached = cache.get(document);
  if (cached)
    return cached;
  var variables, type, name;
  invariant(!!document && !!document.kind, 60, document);
  var fragments = [];
  var queries = [];
  var mutations = [];
  var subscriptions = [];
  for (var _i = 0, _a = document.definitions; _i < _a.length; _i++) {
    var x = _a[_i];
    if (x.kind === "FragmentDefinition") {
      fragments.push(x);
      continue;
    }
    if (x.kind === "OperationDefinition") {
      switch (x.operation) {
        case "query":
          queries.push(x);
          break;
        case "mutation":
          mutations.push(x);
          break;
        case "subscription":
          subscriptions.push(x);
          break;
      }
    }
  }
  invariant(!fragments.length || queries.length || mutations.length || subscriptions.length, 61);
  invariant(
    queries.length + mutations.length + subscriptions.length <= 1,
    62,
    document,
    queries.length,
    subscriptions.length,
    mutations.length
  );
  type = queries.length ? DocumentType.Query : DocumentType.Mutation;
  if (!queries.length && !mutations.length)
    type = DocumentType.Subscription;
  var definitions = queries.length ? queries : mutations.length ? mutations : subscriptions;
  invariant(definitions.length === 1, 63, document, definitions.length);
  var definition = definitions[0];
  variables = definition.variableDefinitions || [];
  if (definition.name && definition.name.kind === "Name") {
    name = definition.name.value;
  } else {
    name = "data";
  }
  var payload = { name, type, variables };
  cache.set(document, payload);
  return payload;
}
parser.resetCache = function() {
  cache = void 0;
};
if (globalThis.__DEV__ !== false) {
  registerGlobalCache("parser", function() {
    return cache ? cache.size : 0;
  });
}
function verifyDocumentType(document, type) {
  var operation = parser(document);
  var requiredOperationName = operationName(type);
  var usedOperationName = operationName(operation.type);
  invariant(
    operation.type === type,
    64,
    requiredOperationName,
    requiredOperationName,
    usedOperationName
  );
}

// node_modules/@apollo/client/react/hooks/internal/useDeepMemo.js
var React6 = __toESM(require_rehackt(), 1);
function useDeepMemo(memoFn, deps) {
  var ref = React6.useRef();
  if (!ref.current || !equal(ref.current.deps, deps)) {
    ref.current = { value: memoFn(), deps };
  }
  return ref.current.value;
}

// node_modules/@apollo/client/react/hooks/internal/useIsomorphicLayoutEffect.js
var React7 = __toESM(require_rehackt(), 1);

// node_modules/@apollo/client/react/hooks/internal/useRenderGuard.js
var React8 = __toESM(require_rehackt(), 1);
function getRenderDispatcher() {
  var _a, _b;
  return (_b = (_a = React8.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _a === void 0 ? void 0 : _a.ReactCurrentDispatcher) === null || _b === void 0 ? void 0 : _b.current;
}
var RenderDispatcher = null;
function useRenderGuard() {
  RenderDispatcher = getRenderDispatcher();
  return React8.useCallback(function() {
    return RenderDispatcher != null && RenderDispatcher === getRenderDispatcher();
  }, []);
}

// node_modules/@apollo/client/react/hooks/internal/useLazyRef.js
var React9 = __toESM(require_rehackt(), 1);
var INIT = {};
function useLazyRef(getInitialValue) {
  var ref = React9.useRef(INIT);
  if (ref.current === INIT) {
    ref.current = getInitialValue();
  }
  return ref;
}

// node_modules/@apollo/client/react/hooks/internal/__use.js
var React10 = __toESM(require_rehackt(), 1);
var useKey = "use";
var realHook2 = React10[useKey];
var __use = realHook2 || function __use2(promise) {
  var statefulPromise = wrapPromiseWithState(promise);
  switch (statefulPromise.status) {
    case "pending":
      throw statefulPromise;
    case "rejected":
      throw statefulPromise.reason;
    case "fulfilled":
      return statefulPromise.value;
  }
};

// node_modules/@apollo/client/react/hooks/internal/wrapHook.js
var wrapperSymbol = Symbol.for("apollo.hook.wrappers");
function wrapHook(hookName, useHook, clientOrObsQuery) {
  var queryManager = clientOrObsQuery["queryManager"];
  var wrappers = queryManager && queryManager[wrapperSymbol];
  var wrapper = wrappers && wrappers[hookName];
  return wrapper ? wrapper(useHook) : useHook;
}

// node_modules/@apollo/client/react/hooks/useQuery.js
var hasOwnProperty5 = Object.prototype.hasOwnProperty;
function useQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  return wrapHook("useQuery", _useQuery, useApolloClient(options && options.client))(query, options);
}
function _useQuery(query, options) {
  return useInternalState(useApolloClient(options.client), query).useQuery(options);
}
function useInternalState(client, query) {
  var stateRef = React11.useRef();
  if (!stateRef.current || client !== stateRef.current.client || query !== stateRef.current.query) {
    stateRef.current = new InternalState(client, query, stateRef.current);
  }
  var state = stateRef.current;
  state.forceUpdateState = React11.useReducer(function(tick) {
    return tick + 1;
  }, 0)[1];
  return state;
}
var InternalState = (
  /** @class */
  function() {
    function InternalState2(client, query, previous) {
      var _this = this;
      this.client = client;
      this.query = query;
      this.forceUpdate = function() {
        return _this.forceUpdateState();
      };
      this.ssrDisabledResult = maybeDeepFreeze({
        loading: true,
        data: void 0,
        error: void 0,
        networkStatus: NetworkStatus.loading
      });
      this.skipStandbyResult = maybeDeepFreeze({
        loading: false,
        data: void 0,
        error: void 0,
        networkStatus: NetworkStatus.ready
      });
      this.toQueryResultCache = new (canUseWeakMap ? WeakMap : Map)();
      verifyDocumentType(query, DocumentType.Query);
      var previousResult = previous && previous.result;
      var previousData = previousResult && previousResult.data;
      if (previousData) {
        this.previousData = previousData;
      }
    }
    InternalState2.prototype.forceUpdateState = function() {
      globalThis.__DEV__ !== false && invariant.warn(51);
    };
    InternalState2.prototype.executeQuery = function(options) {
      var _this = this;
      var _a;
      if (options.query) {
        Object.assign(this, { query: options.query });
      }
      this.watchQueryOptions = this.createWatchQueryOptions(this.queryHookOptions = options);
      var concast = this.observable.reobserveAsConcast(this.getObsQueryOptions());
      this.previousData = ((_a = this.result) === null || _a === void 0 ? void 0 : _a.data) || this.previousData;
      this.result = void 0;
      this.forceUpdate();
      return new Promise(function(resolve) {
        var result;
        concast.subscribe({
          next: function(value) {
            result = value;
          },
          error: function() {
            resolve(_this.toQueryResult(_this.observable.getCurrentResult()));
          },
          complete: function() {
            resolve(_this.toQueryResult(result));
          }
        });
      });
    };
    InternalState2.prototype.useQuery = function(options) {
      var _this = this;
      this.renderPromises = React11.useContext(getApolloContext()).renderPromises;
      this.useOptions(options);
      var obsQuery = this.useObservableQuery();
      var result = useSyncExternalStore(React11.useCallback(function(handleStoreChange) {
        if (_this.renderPromises) {
          return function() {
          };
        }
        _this.forceUpdate = handleStoreChange;
        var onNext = function() {
          var previousResult = _this.result;
          var result2 = obsQuery.getCurrentResult();
          if (previousResult && previousResult.loading === result2.loading && previousResult.networkStatus === result2.networkStatus && equal(previousResult.data, result2.data)) {
            return;
          }
          _this.setResult(result2);
        };
        var onError = function(error) {
          subscription.unsubscribe();
          subscription = obsQuery.resubscribeAfterError(onNext, onError);
          if (!hasOwnProperty5.call(error, "graphQLErrors")) {
            throw error;
          }
          var previousResult = _this.result;
          if (!previousResult || previousResult && previousResult.loading || !equal(error, previousResult.error)) {
            _this.setResult({
              data: previousResult && previousResult.data,
              error,
              loading: false,
              networkStatus: NetworkStatus.error
            });
          }
        };
        var subscription = obsQuery.subscribe(onNext, onError);
        return function() {
          setTimeout(function() {
            return subscription.unsubscribe();
          });
          _this.forceUpdate = function() {
            return _this.forceUpdateState();
          };
        };
      }, [
        // We memoize the subscribe function using useCallback and the following
        // dependency keys, because the subscribe function reference is all that
        // useSyncExternalStore uses internally as a dependency key for the
        // useEffect ultimately responsible for the subscription, so we are
        // effectively passing this dependency array to that useEffect buried
        // inside useSyncExternalStore, as desired.
        obsQuery,
        this.renderPromises,
        this.client.disableNetworkFetches
      ]), function() {
        return _this.getCurrentResult();
      }, function() {
        return _this.getCurrentResult();
      });
      this.unsafeHandlePartialRefetch(result);
      return this.toQueryResult(result);
    };
    InternalState2.prototype.useOptions = function(options) {
      var _a;
      var watchQueryOptions = this.createWatchQueryOptions(this.queryHookOptions = options);
      var currentWatchQueryOptions = this.watchQueryOptions;
      if (!equal(watchQueryOptions, currentWatchQueryOptions)) {
        this.watchQueryOptions = watchQueryOptions;
        if (currentWatchQueryOptions && this.observable) {
          this.observable.reobserve(this.getObsQueryOptions());
          this.previousData = ((_a = this.result) === null || _a === void 0 ? void 0 : _a.data) || this.previousData;
          this.result = void 0;
        }
      }
      this.onCompleted = options.onCompleted || InternalState2.prototype.onCompleted;
      this.onError = options.onError || InternalState2.prototype.onError;
      if ((this.renderPromises || this.client.disableNetworkFetches) && this.queryHookOptions.ssr === false && !this.queryHookOptions.skip) {
        this.result = this.ssrDisabledResult;
      } else if (this.queryHookOptions.skip || this.watchQueryOptions.fetchPolicy === "standby") {
        this.result = this.skipStandbyResult;
      } else if (this.result === this.ssrDisabledResult || this.result === this.skipStandbyResult) {
        this.result = void 0;
      }
    };
    InternalState2.prototype.getObsQueryOptions = function() {
      var toMerge = [];
      var globalDefaults = this.client.defaultOptions.watchQuery;
      if (globalDefaults)
        toMerge.push(globalDefaults);
      if (this.queryHookOptions.defaultOptions) {
        toMerge.push(this.queryHookOptions.defaultOptions);
      }
      toMerge.push(compact(this.observable && this.observable.options, this.watchQueryOptions));
      return toMerge.reduce(mergeOptions);
    };
    InternalState2.prototype.createWatchQueryOptions = function(_a) {
      var _b;
      if (_a === void 0) {
        _a = {};
      }
      var skip = _a.skip, ssr = _a.ssr, onCompleted = _a.onCompleted, onError = _a.onError, defaultOptions2 = _a.defaultOptions, otherOptions = __rest(_a, ["skip", "ssr", "onCompleted", "onError", "defaultOptions"]);
      var watchQueryOptions = Object.assign(otherOptions, { query: this.query });
      if (this.renderPromises && (watchQueryOptions.fetchPolicy === "network-only" || watchQueryOptions.fetchPolicy === "cache-and-network")) {
        watchQueryOptions.fetchPolicy = "cache-first";
      }
      if (!watchQueryOptions.variables) {
        watchQueryOptions.variables = {};
      }
      if (skip) {
        var _c = watchQueryOptions.fetchPolicy, fetchPolicy = _c === void 0 ? this.getDefaultFetchPolicy() : _c, _d = watchQueryOptions.initialFetchPolicy, initialFetchPolicy = _d === void 0 ? fetchPolicy : _d;
        Object.assign(watchQueryOptions, {
          initialFetchPolicy,
          fetchPolicy: "standby"
        });
      } else if (!watchQueryOptions.fetchPolicy) {
        watchQueryOptions.fetchPolicy = ((_b = this.observable) === null || _b === void 0 ? void 0 : _b.options.initialFetchPolicy) || this.getDefaultFetchPolicy();
      }
      return watchQueryOptions;
    };
    InternalState2.prototype.getDefaultFetchPolicy = function() {
      var _a, _b;
      return ((_a = this.queryHookOptions.defaultOptions) === null || _a === void 0 ? void 0 : _a.fetchPolicy) || ((_b = this.client.defaultOptions.watchQuery) === null || _b === void 0 ? void 0 : _b.fetchPolicy) || "cache-first";
    };
    InternalState2.prototype.onCompleted = function(data) {
    };
    InternalState2.prototype.onError = function(error) {
    };
    InternalState2.prototype.useObservableQuery = function() {
      var obsQuery = this.observable = this.renderPromises && this.renderPromises.getSSRObservable(this.watchQueryOptions) || this.observable || // Reuse this.observable if possible (and not SSR)
      this.client.watchQuery(this.getObsQueryOptions());
      this.obsQueryFields = React11.useMemo(function() {
        return {
          refetch: obsQuery.refetch.bind(obsQuery),
          reobserve: obsQuery.reobserve.bind(obsQuery),
          fetchMore: obsQuery.fetchMore.bind(obsQuery),
          updateQuery: obsQuery.updateQuery.bind(obsQuery),
          startPolling: obsQuery.startPolling.bind(obsQuery),
          stopPolling: obsQuery.stopPolling.bind(obsQuery),
          subscribeToMore: obsQuery.subscribeToMore.bind(obsQuery)
        };
      }, [obsQuery]);
      var ssrAllowed = !(this.queryHookOptions.ssr === false || this.queryHookOptions.skip);
      if (this.renderPromises && ssrAllowed) {
        this.renderPromises.registerSSRObservable(obsQuery);
        if (obsQuery.getCurrentResult().loading) {
          this.renderPromises.addObservableQueryPromise(obsQuery);
        }
      }
      return obsQuery;
    };
    InternalState2.prototype.setResult = function(nextResult) {
      var previousResult = this.result;
      if (previousResult && previousResult.data) {
        this.previousData = previousResult.data;
      }
      this.result = nextResult;
      this.forceUpdate();
      this.handleErrorOrCompleted(nextResult, previousResult);
    };
    InternalState2.prototype.handleErrorOrCompleted = function(result, previousResult) {
      var _this = this;
      if (!result.loading) {
        var error_1 = this.toApolloError(result);
        Promise.resolve().then(function() {
          if (error_1) {
            _this.onError(error_1);
          } else if (result.data && (previousResult === null || previousResult === void 0 ? void 0 : previousResult.networkStatus) !== result.networkStatus && result.networkStatus === NetworkStatus.ready) {
            _this.onCompleted(result.data);
          }
        }).catch(function(error) {
          globalThis.__DEV__ !== false && invariant.warn(error);
        });
      }
    };
    InternalState2.prototype.toApolloError = function(result) {
      return isNonEmptyArray(result.errors) ? new ApolloError({ graphQLErrors: result.errors }) : result.error;
    };
    InternalState2.prototype.getCurrentResult = function() {
      if (!this.result) {
        this.handleErrorOrCompleted(this.result = this.observable.getCurrentResult());
      }
      return this.result;
    };
    InternalState2.prototype.toQueryResult = function(result) {
      var queryResult = this.toQueryResultCache.get(result);
      if (queryResult)
        return queryResult;
      var data = result.data, partial = result.partial, resultWithoutPartial = __rest(result, ["data", "partial"]);
      this.toQueryResultCache.set(result, queryResult = __assign(__assign(__assign({ data }, resultWithoutPartial), this.obsQueryFields), { client: this.client, observable: this.observable, variables: this.observable.variables, called: !this.queryHookOptions.skip, previousData: this.previousData }));
      if (!queryResult.error && isNonEmptyArray(result.errors)) {
        queryResult.error = new ApolloError({ graphQLErrors: result.errors });
      }
      return queryResult;
    };
    InternalState2.prototype.unsafeHandlePartialRefetch = function(result) {
      if (result.partial && this.queryHookOptions.partialRefetch && !result.loading && (!result.data || Object.keys(result.data).length === 0) && this.observable.options.fetchPolicy !== "cache-only") {
        Object.assign(result, {
          loading: true,
          networkStatus: NetworkStatus.refetch
        });
        this.observable.refetch();
      }
    };
    return InternalState2;
  }()
);

// node_modules/@apollo/client/react/hooks/useLazyQuery.js
var EAGER_METHODS = [
  "refetch",
  "reobserve",
  "fetchMore",
  "updateQuery",
  "startPolling",
  "subscribeToMore"
];
function useLazyQuery(query, options) {
  var _a;
  var execOptionsRef = React12.useRef();
  var optionsRef = React12.useRef();
  var queryRef = React12.useRef();
  var merged = mergeOptions(options, execOptionsRef.current || {});
  var document = (_a = merged === null || merged === void 0 ? void 0 : merged.query) !== null && _a !== void 0 ? _a : query;
  optionsRef.current = options;
  queryRef.current = document;
  var internalState = useInternalState(useApolloClient(options && options.client), document);
  var useQueryResult = internalState.useQuery(__assign(__assign({}, merged), { skip: !execOptionsRef.current }));
  var initialFetchPolicy = useQueryResult.observable.options.initialFetchPolicy || internalState.getDefaultFetchPolicy();
  var result = Object.assign(useQueryResult, {
    called: !!execOptionsRef.current
  });
  var eagerMethods = React12.useMemo(function() {
    var eagerMethods2 = {};
    var _loop_1 = function(key2) {
      var method = result[key2];
      eagerMethods2[key2] = function() {
        if (!execOptionsRef.current) {
          execOptionsRef.current = /* @__PURE__ */ Object.create(null);
          internalState.forceUpdateState();
        }
        return method.apply(this, arguments);
      };
    };
    for (var _i = 0, EAGER_METHODS_1 = EAGER_METHODS; _i < EAGER_METHODS_1.length; _i++) {
      var key = EAGER_METHODS_1[_i];
      _loop_1(key);
    }
    return eagerMethods2;
  }, []);
  Object.assign(result, eagerMethods);
  var execute2 = React12.useCallback(function(executeOptions) {
    execOptionsRef.current = executeOptions ? __assign(__assign({}, executeOptions), { fetchPolicy: executeOptions.fetchPolicy || initialFetchPolicy }) : {
      fetchPolicy: initialFetchPolicy
    };
    var options2 = mergeOptions(optionsRef.current, __assign({ query: queryRef.current }, execOptionsRef.current));
    var promise = internalState.executeQuery(__assign(__assign({}, options2), { skip: false })).then(function(queryResult) {
      return Object.assign(queryResult, eagerMethods);
    });
    promise.catch(function() {
    });
    return promise;
  }, []);
  return [execute2, result];
}

// node_modules/@apollo/client/react/hooks/useMutation.js
var React13 = __toESM(require_rehackt(), 1);
function useMutation(mutation, options) {
  var client = useApolloClient(options === null || options === void 0 ? void 0 : options.client);
  verifyDocumentType(mutation, DocumentType.Mutation);
  var _a = React13.useState({
    called: false,
    loading: false,
    client
  }), result = _a[0], setResult = _a[1];
  var ref = React13.useRef({
    result,
    mutationId: 0,
    isMounted: true,
    client,
    mutation,
    options
  });
  {
    Object.assign(ref.current, { client, options, mutation });
  }
  var execute2 = React13.useCallback(function(executeOptions) {
    if (executeOptions === void 0) {
      executeOptions = {};
    }
    var _a2 = ref.current, options2 = _a2.options, mutation2 = _a2.mutation;
    var baseOptions = __assign(__assign({}, options2), { mutation: mutation2 });
    var client2 = executeOptions.client || ref.current.client;
    if (!ref.current.result.loading && !baseOptions.ignoreResults && ref.current.isMounted) {
      setResult(ref.current.result = {
        loading: true,
        error: void 0,
        data: void 0,
        called: true,
        client: client2
      });
    }
    var mutationId = ++ref.current.mutationId;
    var clientOptions = mergeOptions(baseOptions, executeOptions);
    return client2.mutate(clientOptions).then(function(response) {
      var _a3, _b;
      var data = response.data, errors = response.errors;
      var error = errors && errors.length > 0 ? new ApolloError({ graphQLErrors: errors }) : void 0;
      var onError = executeOptions.onError || ((_a3 = ref.current.options) === null || _a3 === void 0 ? void 0 : _a3.onError);
      if (error && onError) {
        onError(error, clientOptions);
      }
      if (mutationId === ref.current.mutationId && !clientOptions.ignoreResults) {
        var result_1 = {
          called: true,
          loading: false,
          data,
          error,
          client: client2
        };
        if (ref.current.isMounted && !equal(ref.current.result, result_1)) {
          setResult(ref.current.result = result_1);
        }
      }
      var onCompleted = executeOptions.onCompleted || ((_b = ref.current.options) === null || _b === void 0 ? void 0 : _b.onCompleted);
      if (!error) {
        onCompleted === null || onCompleted === void 0 ? void 0 : onCompleted(response.data, clientOptions);
      }
      return response;
    }).catch(function(error) {
      var _a3;
      if (mutationId === ref.current.mutationId && ref.current.isMounted) {
        var result_2 = {
          loading: false,
          error,
          data: void 0,
          called: true,
          client: client2
        };
        if (!equal(ref.current.result, result_2)) {
          setResult(ref.current.result = result_2);
        }
      }
      var onError = executeOptions.onError || ((_a3 = ref.current.options) === null || _a3 === void 0 ? void 0 : _a3.onError);
      if (onError) {
        onError(error, clientOptions);
        return { data: void 0, errors: error };
      }
      throw error;
    });
  }, []);
  var reset = React13.useCallback(function() {
    if (ref.current.isMounted) {
      var result_3 = { called: false, loading: false, client };
      Object.assign(ref.current, { mutationId: 0, result: result_3 });
      setResult(result_3);
    }
  }, []);
  React13.useEffect(function() {
    ref.current.isMounted = true;
    return function() {
      ref.current.isMounted = false;
    };
  }, []);
  return [execute2, __assign({ reset }, result)];
}

// node_modules/@apollo/client/react/hooks/useSubscription.js
var React14 = __toESM(require_rehackt(), 1);
function useSubscription(subscription, options) {
  var hasIssuedDeprecationWarningRef = React14.useRef(false);
  var client = useApolloClient(options === null || options === void 0 ? void 0 : options.client);
  verifyDocumentType(subscription, DocumentType.Subscription);
  var _a = React14.useState({
    loading: !(options === null || options === void 0 ? void 0 : options.skip),
    error: void 0,
    data: void 0,
    variables: options === null || options === void 0 ? void 0 : options.variables
  }), result = _a[0], setResult = _a[1];
  if (!hasIssuedDeprecationWarningRef.current) {
    hasIssuedDeprecationWarningRef.current = true;
    if (options === null || options === void 0 ? void 0 : options.onSubscriptionData) {
      globalThis.__DEV__ !== false && invariant.warn(options.onData ? 52 : 53);
    }
    if (options === null || options === void 0 ? void 0 : options.onSubscriptionComplete) {
      globalThis.__DEV__ !== false && invariant.warn(options.onComplete ? 54 : 55);
    }
  }
  var _b = React14.useState(function() {
    if (options === null || options === void 0 ? void 0 : options.skip) {
      return null;
    }
    return client.subscribe({
      query: subscription,
      variables: options === null || options === void 0 ? void 0 : options.variables,
      fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
      context: options === null || options === void 0 ? void 0 : options.context
    });
  }), observable = _b[0], setObservable = _b[1];
  var canResetObservableRef = React14.useRef(false);
  React14.useEffect(function() {
    return function() {
      canResetObservableRef.current = true;
    };
  }, []);
  var ref = React14.useRef({ client, subscription, options });
  React14.useEffect(function() {
    var _a2, _b2, _c, _d;
    var shouldResubscribe = options === null || options === void 0 ? void 0 : options.shouldResubscribe;
    if (typeof shouldResubscribe === "function") {
      shouldResubscribe = !!shouldResubscribe(options);
    }
    if (options === null || options === void 0 ? void 0 : options.skip) {
      if (!(options === null || options === void 0 ? void 0 : options.skip) !== !((_a2 = ref.current.options) === null || _a2 === void 0 ? void 0 : _a2.skip) || canResetObservableRef.current) {
        setResult({
          loading: false,
          data: void 0,
          error: void 0,
          variables: options === null || options === void 0 ? void 0 : options.variables
        });
        setObservable(null);
        canResetObservableRef.current = false;
      }
    } else if (shouldResubscribe !== false && (client !== ref.current.client || subscription !== ref.current.subscription || (options === null || options === void 0 ? void 0 : options.fetchPolicy) !== ((_b2 = ref.current.options) === null || _b2 === void 0 ? void 0 : _b2.fetchPolicy) || !(options === null || options === void 0 ? void 0 : options.skip) !== !((_c = ref.current.options) === null || _c === void 0 ? void 0 : _c.skip) || !equal(options === null || options === void 0 ? void 0 : options.variables, (_d = ref.current.options) === null || _d === void 0 ? void 0 : _d.variables)) || canResetObservableRef.current) {
      setResult({
        loading: true,
        data: void 0,
        error: void 0,
        variables: options === null || options === void 0 ? void 0 : options.variables
      });
      setObservable(client.subscribe({
        query: subscription,
        variables: options === null || options === void 0 ? void 0 : options.variables,
        fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
        context: options === null || options === void 0 ? void 0 : options.context
      }));
      canResetObservableRef.current = false;
    }
    Object.assign(ref.current, { client, subscription, options });
  }, [client, subscription, options, canResetObservableRef.current]);
  React14.useEffect(function() {
    if (!observable) {
      return;
    }
    var subscriptionStopped = false;
    var subscription2 = observable.subscribe({
      next: function(fetchResult) {
        var _a2, _b2;
        if (subscriptionStopped) {
          return;
        }
        var result2 = {
          loading: false,
          // TODO: fetchResult.data can be null but SubscriptionResult.data
          // expects TData | undefined only
          data: fetchResult.data,
          error: void 0,
          variables: options === null || options === void 0 ? void 0 : options.variables
        };
        setResult(result2);
        if ((_a2 = ref.current.options) === null || _a2 === void 0 ? void 0 : _a2.onData) {
          ref.current.options.onData({
            client,
            data: result2
          });
        } else if ((_b2 = ref.current.options) === null || _b2 === void 0 ? void 0 : _b2.onSubscriptionData) {
          ref.current.options.onSubscriptionData({
            client,
            subscriptionData: result2
          });
        }
      },
      error: function(error) {
        var _a2, _b2;
        if (!subscriptionStopped) {
          setResult({
            loading: false,
            data: void 0,
            error,
            variables: options === null || options === void 0 ? void 0 : options.variables
          });
          (_b2 = (_a2 = ref.current.options) === null || _a2 === void 0 ? void 0 : _a2.onError) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, error);
        }
      },
      complete: function() {
        var _a2, _b2;
        if (!subscriptionStopped) {
          if ((_a2 = ref.current.options) === null || _a2 === void 0 ? void 0 : _a2.onComplete) {
            ref.current.options.onComplete();
          } else if ((_b2 = ref.current.options) === null || _b2 === void 0 ? void 0 : _b2.onSubscriptionComplete) {
            ref.current.options.onSubscriptionComplete();
          }
        }
      }
    });
    return function() {
      subscriptionStopped = true;
      setTimeout(function() {
        subscription2.unsubscribe();
      });
    };
  }, [observable]);
  return result;
}

// node_modules/@apollo/client/react/hooks/useReactiveVar.js
var React15 = __toESM(require_rehackt(), 1);
function useReactiveVar(rv) {
  return useSyncExternalStore(React15.useCallback(function(update) {
    return rv.onNextChange(function onNext() {
      update();
      rv.onNextChange(onNext);
    });
  }, [rv]), rv, rv);
}

// node_modules/@apollo/client/react/hooks/useFragment.js
var React16 = __toESM(require_rehackt(), 1);
function useFragment(options) {
  return wrapHook("useFragment", _useFragment, useApolloClient(options.client))(options);
}
function _useFragment(options) {
  var cache2 = useApolloClient(options.client).cache;
  var diffOptions = useDeepMemo(function() {
    var fragment = options.fragment, fragmentName = options.fragmentName, from2 = options.from, _a = options.optimistic, optimistic = _a === void 0 ? true : _a, rest = __rest(options, ["fragment", "fragmentName", "from", "optimistic"]);
    return __assign(__assign({}, rest), { returnPartialData: true, id: typeof from2 === "string" ? from2 : cache2.identify(from2), query: cache2["getFragmentDoc"](fragment, fragmentName), optimistic });
  }, [options]);
  var resultRef = useLazyRef(function() {
    return diffToResult(cache2.diff(diffOptions));
  });
  var stableOptions = useDeepMemo(function() {
    return options;
  }, [options]);
  React16.useMemo(function() {
    resultRef.current = diffToResult(cache2.diff(diffOptions));
  }, [diffOptions, cache2]);
  var getSnapshot = React16.useCallback(function() {
    return resultRef.current;
  }, []);
  return useSyncExternalStore(React16.useCallback(function(forceUpdate) {
    var lastTimeout = 0;
    var subscription = cache2.watchFragment(stableOptions).subscribe({
      next: function(result) {
        if (lib_default(result, resultRef.current))
          return;
        resultRef.current = result;
        clearTimeout(lastTimeout);
        lastTimeout = setTimeout(forceUpdate);
      }
    });
    return function() {
      subscription.unsubscribe();
      clearTimeout(lastTimeout);
    };
  }, [cache2, stableOptions]), getSnapshot, getSnapshot);
}
function diffToResult(diff) {
  var result = {
    data: diff.result,
    complete: !!diff.complete
  };
  if (diff.missing) {
    result.missing = mergeDeepArray(diff.missing.map(function(error) {
      return error.missing;
    }));
  }
  return result;
}

// node_modules/@apollo/client/react/hooks/useSuspenseQuery.js
var React17 = __toESM(require_rehackt(), 1);

// node_modules/@apollo/client/react/internal/cache/QueryReference.js
var QUERY_REFERENCE_SYMBOL = Symbol();
var PROMISE_SYMBOL = Symbol();
function wrapQueryRef(internalQueryRef) {
  var _a;
  var ref = (_a = {
    toPromise: function() {
      return getWrappedPromise(ref).then(function() {
        return ref;
      });
    }
  }, _a[QUERY_REFERENCE_SYMBOL] = internalQueryRef, _a[PROMISE_SYMBOL] = internalQueryRef.promise, _a);
  return ref;
}
function assertWrappedQueryRef(queryRef) {
  invariant(!queryRef || QUERY_REFERENCE_SYMBOL in queryRef, 59);
}
function getWrappedPromise(queryRef) {
  var internalQueryRef = unwrapQueryRef(queryRef);
  return internalQueryRef.promise.status === "fulfilled" ? internalQueryRef.promise : queryRef[PROMISE_SYMBOL];
}
function unwrapQueryRef(queryRef) {
  return queryRef[QUERY_REFERENCE_SYMBOL];
}
function updateWrappedQueryRef(queryRef, promise) {
  queryRef[PROMISE_SYMBOL] = promise;
}
var OBSERVED_CHANGED_OPTIONS = [
  "canonizeResults",
  "context",
  "errorPolicy",
  "fetchPolicy",
  "refetchWritePolicy",
  "returnPartialData"
];
var InternalQueryReference = (
  /** @class */
  function() {
    function InternalQueryReference2(observable, options) {
      var _this = this;
      this.key = {};
      this.listeners = /* @__PURE__ */ new Set();
      this.references = 0;
      this.softReferences = 0;
      this.handleNext = this.handleNext.bind(this);
      this.handleError = this.handleError.bind(this);
      this.dispose = this.dispose.bind(this);
      this.observable = observable;
      if (options.onDispose) {
        this.onDispose = options.onDispose;
      }
      this.setResult();
      this.subscribeToQuery();
      var startDisposeTimer = function() {
        var _a;
        if (!_this.references) {
          _this.autoDisposeTimeoutId = setTimeout(_this.dispose, (_a = options.autoDisposeTimeoutMs) !== null && _a !== void 0 ? _a : 3e4);
        }
      };
      this.promise.then(startDisposeTimer, startDisposeTimer);
    }
    Object.defineProperty(InternalQueryReference2.prototype, "disposed", {
      get: function() {
        return this.subscription.closed;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(InternalQueryReference2.prototype, "watchQueryOptions", {
      get: function() {
        return this.observable.options;
      },
      enumerable: false,
      configurable: true
    });
    InternalQueryReference2.prototype.reinitialize = function() {
      var observable = this.observable;
      var originalFetchPolicy = this.watchQueryOptions.fetchPolicy;
      var avoidNetworkRequests = originalFetchPolicy === "no-cache" || originalFetchPolicy === "standby";
      try {
        if (avoidNetworkRequests) {
          observable.silentSetOptions({ fetchPolicy: "standby" });
        } else {
          observable.resetLastResults();
          observable.silentSetOptions({ fetchPolicy: "cache-first" });
        }
        this.subscribeToQuery();
        if (avoidNetworkRequests) {
          return;
        }
        observable.resetDiff();
        this.setResult();
      } finally {
        observable.silentSetOptions({ fetchPolicy: originalFetchPolicy });
      }
    };
    InternalQueryReference2.prototype.retain = function() {
      var _this = this;
      this.references++;
      clearTimeout(this.autoDisposeTimeoutId);
      var disposed = false;
      return function() {
        if (disposed) {
          return;
        }
        disposed = true;
        _this.references--;
        setTimeout(function() {
          if (!_this.references) {
            _this.dispose();
          }
        });
      };
    };
    InternalQueryReference2.prototype.softRetain = function() {
      var _this = this;
      this.softReferences++;
      var disposed = false;
      return function() {
        if (disposed) {
          return;
        }
        disposed = true;
        _this.softReferences--;
        setTimeout(function() {
          if (!_this.softReferences && !_this.references) {
            _this.dispose();
          }
        });
      };
    };
    InternalQueryReference2.prototype.didChangeOptions = function(watchQueryOptions) {
      var _this = this;
      return OBSERVED_CHANGED_OPTIONS.some(function(option) {
        return option in watchQueryOptions && !equal(_this.watchQueryOptions[option], watchQueryOptions[option]);
      });
    };
    InternalQueryReference2.prototype.applyOptions = function(watchQueryOptions) {
      var _a = this.watchQueryOptions, currentFetchPolicy = _a.fetchPolicy, currentCanonizeResults = _a.canonizeResults;
      if (currentFetchPolicy === "standby" && currentFetchPolicy !== watchQueryOptions.fetchPolicy) {
        this.initiateFetch(this.observable.reobserve(watchQueryOptions));
      } else {
        this.observable.silentSetOptions(watchQueryOptions);
        if (currentCanonizeResults !== watchQueryOptions.canonizeResults) {
          this.result = __assign(__assign({}, this.result), this.observable.getCurrentResult());
          this.promise = createFulfilledPromise(this.result);
        }
      }
      return this.promise;
    };
    InternalQueryReference2.prototype.listen = function(listener) {
      var _this = this;
      this.listeners.add(listener);
      return function() {
        _this.listeners.delete(listener);
      };
    };
    InternalQueryReference2.prototype.refetch = function(variables) {
      return this.initiateFetch(this.observable.refetch(variables));
    };
    InternalQueryReference2.prototype.fetchMore = function(options) {
      return this.initiateFetch(this.observable.fetchMore(options));
    };
    InternalQueryReference2.prototype.dispose = function() {
      this.subscription.unsubscribe();
      this.onDispose();
    };
    InternalQueryReference2.prototype.onDispose = function() {
    };
    InternalQueryReference2.prototype.handleNext = function(result) {
      var _a;
      switch (this.promise.status) {
        case "pending": {
          if (result.data === void 0) {
            result.data = this.result.data;
          }
          this.result = result;
          (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, result);
          break;
        }
        default: {
          if (result.data === this.result.data && result.networkStatus === this.result.networkStatus) {
            return;
          }
          if (result.data === void 0) {
            result.data = this.result.data;
          }
          this.result = result;
          this.promise = createFulfilledPromise(result);
          this.deliver(this.promise);
          break;
        }
      }
    };
    InternalQueryReference2.prototype.handleError = function(error) {
      var _a;
      this.subscription.unsubscribe();
      this.subscription = this.observable.resubscribeAfterError(this.handleNext, this.handleError);
      switch (this.promise.status) {
        case "pending": {
          (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, error);
          break;
        }
        default: {
          this.promise = createRejectedPromise(error);
          this.deliver(this.promise);
        }
      }
    };
    InternalQueryReference2.prototype.deliver = function(promise) {
      this.listeners.forEach(function(listener) {
        return listener(promise);
      });
    };
    InternalQueryReference2.prototype.initiateFetch = function(returnedPromise) {
      var _this = this;
      this.promise = this.createPendingPromise();
      this.promise.catch(function() {
      });
      returnedPromise.then(function() {
        setTimeout(function() {
          var _a;
          if (_this.promise.status === "pending") {
            _this.result = _this.observable.getCurrentResult();
            (_a = _this.resolve) === null || _a === void 0 ? void 0 : _a.call(_this, _this.result);
          }
        });
      }).catch(function() {
      });
      return returnedPromise;
    };
    InternalQueryReference2.prototype.subscribeToQuery = function() {
      var _this = this;
      this.subscription = this.observable.filter(function(result) {
        return !equal(result.data, {}) && !equal(result, _this.result);
      }).subscribe(this.handleNext, this.handleError);
    };
    InternalQueryReference2.prototype.setResult = function() {
      var result = this.observable.getCurrentResult(false);
      if (equal(result, this.result)) {
        return;
      }
      this.result = result;
      this.promise = result.data && (!result.partial || this.watchQueryOptions.returnPartialData) ? createFulfilledPromise(result) : this.createPendingPromise();
    };
    InternalQueryReference2.prototype.createPendingPromise = function() {
      var _this = this;
      return wrapPromiseWithState(new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      }));
    };
    return InternalQueryReference2;
  }()
);

// node_modules/@apollo/client/react/internal/cache/SuspenseCache.js
var SuspenseCache = (
  /** @class */
  function() {
    function SuspenseCache2(options) {
      if (options === void 0) {
        options = /* @__PURE__ */ Object.create(null);
      }
      this.queryRefs = new Trie(canUseWeakMap);
      this.options = options;
    }
    SuspenseCache2.prototype.getQueryRef = function(cacheKey, createObservable) {
      var ref = this.queryRefs.lookupArray(cacheKey);
      if (!ref.current) {
        ref.current = new InternalQueryReference(createObservable(), {
          autoDisposeTimeoutMs: this.options.autoDisposeTimeoutMs,
          onDispose: function() {
            delete ref.current;
          }
        });
      }
      return ref.current;
    };
    SuspenseCache2.prototype.add = function(cacheKey, queryRef) {
      var ref = this.queryRefs.lookupArray(cacheKey);
      ref.current = queryRef;
    };
    return SuspenseCache2;
  }()
);

// node_modules/@apollo/client/react/internal/cache/getSuspenseCache.js
var suspenseCacheSymbol = Symbol.for("apollo.suspenseCache");
function getSuspenseCache(client) {
  var _a;
  if (!client[suspenseCacheSymbol]) {
    client[suspenseCacheSymbol] = new SuspenseCache((_a = client.defaultOptions.react) === null || _a === void 0 ? void 0 : _a.suspense);
  }
  return client[suspenseCacheSymbol];
}

// node_modules/@apollo/client/react/hooks/constants.js
var skipToken = Symbol.for("apollo.skipToken");

// node_modules/@apollo/client/react/hooks/useSuspenseQuery.js
function useSuspenseQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  return wrapHook("useSuspenseQuery", _useSuspenseQuery, useApolloClient(typeof options === "object" ? options.client : void 0))(query, options);
}
function _useSuspenseQuery(query, options) {
  var client = useApolloClient(options.client);
  var suspenseCache = getSuspenseCache(client);
  var watchQueryOptions = useWatchQueryOptions({
    client,
    query,
    options
  });
  var fetchPolicy = watchQueryOptions.fetchPolicy, variables = watchQueryOptions.variables;
  var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
  var cacheKey = __spreadArray([
    query,
    canonicalStringify(variables)
  ], [].concat(queryKey), true);
  var queryRef = suspenseCache.getQueryRef(cacheKey, function() {
    return client.watchQuery(watchQueryOptions);
  });
  var _b = React17.useState([queryRef.key, queryRef.promise]), current = _b[0], setPromise = _b[1];
  if (current[0] !== queryRef.key) {
    current[0] = queryRef.key;
    current[1] = queryRef.promise;
  }
  var promise = current[1];
  if (queryRef.didChangeOptions(watchQueryOptions)) {
    current[1] = promise = queryRef.applyOptions(watchQueryOptions);
  }
  React17.useEffect(function() {
    var dispose = queryRef.retain();
    var removeListener = queryRef.listen(function(promise2) {
      setPromise([queryRef.key, promise2]);
    });
    return function() {
      removeListener();
      dispose();
    };
  }, [queryRef]);
  var skipResult = React17.useMemo(function() {
    var error = toApolloError(queryRef.result);
    return {
      loading: false,
      data: queryRef.result.data,
      networkStatus: error ? NetworkStatus.error : NetworkStatus.ready,
      error
    };
  }, [queryRef.result]);
  var result = fetchPolicy === "standby" ? skipResult : __use(promise);
  var fetchMore = React17.useCallback(function(options2) {
    var promise2 = queryRef.fetchMore(options2);
    setPromise([queryRef.key, queryRef.promise]);
    return promise2;
  }, [queryRef]);
  var refetch = React17.useCallback(function(variables2) {
    var promise2 = queryRef.refetch(variables2);
    setPromise([queryRef.key, queryRef.promise]);
    return promise2;
  }, [queryRef]);
  var subscribeToMore = React17.useCallback(function(options2) {
    return queryRef.observable.subscribeToMore(options2);
  }, [queryRef]);
  return React17.useMemo(function() {
    return {
      client,
      data: result.data,
      error: toApolloError(result),
      networkStatus: result.networkStatus,
      fetchMore,
      refetch,
      subscribeToMore
    };
  }, [client, fetchMore, refetch, result, subscribeToMore]);
}
function validateOptions(options) {
  var query = options.query, fetchPolicy = options.fetchPolicy, returnPartialData = options.returnPartialData;
  verifyDocumentType(query, DocumentType.Query);
  validateFetchPolicy(fetchPolicy);
  validatePartialDataReturn(fetchPolicy, returnPartialData);
}
function validateFetchPolicy(fetchPolicy) {
  if (fetchPolicy === void 0) {
    fetchPolicy = "cache-first";
  }
  var supportedFetchPolicies = [
    "cache-first",
    "network-only",
    "no-cache",
    "cache-and-network"
  ];
  invariant(supportedFetchPolicies.includes(fetchPolicy), 56, fetchPolicy);
}
function validatePartialDataReturn(fetchPolicy, returnPartialData) {
  if (fetchPolicy === "no-cache" && returnPartialData) {
    globalThis.__DEV__ !== false && invariant.warn(57);
  }
}
function toApolloError(result) {
  return isNonEmptyArray(result.errors) ? new ApolloError({ graphQLErrors: result.errors }) : result.error;
}
function useWatchQueryOptions(_a) {
  var client = _a.client, query = _a.query, options = _a.options;
  return useDeepMemo(function() {
    var _a2;
    if (options === skipToken) {
      return { query, fetchPolicy: "standby" };
    }
    var fetchPolicy = options.fetchPolicy || ((_a2 = client.defaultOptions.watchQuery) === null || _a2 === void 0 ? void 0 : _a2.fetchPolicy) || "cache-first";
    var watchQueryOptions = __assign(__assign({}, options), { fetchPolicy, query, notifyOnNetworkStatusChange: false, nextFetchPolicy: void 0 });
    if (globalThis.__DEV__ !== false) {
      validateOptions(watchQueryOptions);
    }
    if (options.skip) {
      watchQueryOptions.fetchPolicy = "standby";
    }
    return watchQueryOptions;
  }, [client, options, query]);
}

// node_modules/@apollo/client/react/hooks/useBackgroundQuery.js
var React18 = __toESM(require_rehackt(), 1);
function useBackgroundQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  return wrapHook("useBackgroundQuery", _useBackgroundQuery, useApolloClient(typeof options === "object" ? options.client : void 0))(query, options);
}
function _useBackgroundQuery(query, options) {
  var client = useApolloClient(options.client);
  var suspenseCache = getSuspenseCache(client);
  var watchQueryOptions = useWatchQueryOptions({ client, query, options });
  var fetchPolicy = watchQueryOptions.fetchPolicy, variables = watchQueryOptions.variables;
  var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
  var didFetchResult = React18.useRef(fetchPolicy !== "standby");
  didFetchResult.current || (didFetchResult.current = fetchPolicy !== "standby");
  var cacheKey = __spreadArray([
    query,
    canonicalStringify(variables)
  ], [].concat(queryKey), true);
  var queryRef = suspenseCache.getQueryRef(cacheKey, function() {
    return client.watchQuery(watchQueryOptions);
  });
  var _b = React18.useState(wrapQueryRef(queryRef)), wrappedQueryRef = _b[0], setWrappedQueryRef = _b[1];
  if (unwrapQueryRef(wrappedQueryRef) !== queryRef) {
    setWrappedQueryRef(wrapQueryRef(queryRef));
  }
  if (queryRef.didChangeOptions(watchQueryOptions)) {
    var promise = queryRef.applyOptions(watchQueryOptions);
    updateWrappedQueryRef(wrappedQueryRef, promise);
  }
  React18.useEffect(function() {
    var id = setTimeout(function() {
      if (queryRef.disposed) {
        suspenseCache.add(cacheKey, queryRef);
      }
    });
    return function() {
      return clearTimeout(id);
    };
  });
  var fetchMore = React18.useCallback(function(options2) {
    var promise2 = queryRef.fetchMore(options2);
    setWrappedQueryRef(wrapQueryRef(queryRef));
    return promise2;
  }, [queryRef]);
  var refetch = React18.useCallback(function(variables2) {
    var promise2 = queryRef.refetch(variables2);
    setWrappedQueryRef(wrapQueryRef(queryRef));
    return promise2;
  }, [queryRef]);
  React18.useEffect(function() {
    return queryRef.softRetain();
  }, [queryRef]);
  return [
    didFetchResult.current ? wrappedQueryRef : void 0,
    { fetchMore, refetch }
  ];
}

// node_modules/@apollo/client/react/hooks/useLoadableQuery.js
var React19 = __toESM(require_rehackt(), 1);
function useLoadableQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  var client = useApolloClient(options.client);
  var suspenseCache = getSuspenseCache(client);
  var watchQueryOptions = useWatchQueryOptions({ client, query, options });
  var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
  var _b = React19.useState(null), queryRef = _b[0], setQueryRef = _b[1];
  assertWrappedQueryRef(queryRef);
  var internalQueryRef = queryRef && unwrapQueryRef(queryRef);
  if (queryRef && (internalQueryRef === null || internalQueryRef === void 0 ? void 0 : internalQueryRef.didChangeOptions(watchQueryOptions))) {
    var promise = internalQueryRef.applyOptions(watchQueryOptions);
    updateWrappedQueryRef(queryRef, promise);
  }
  var calledDuringRender = useRenderGuard();
  var fetchMore = React19.useCallback(function(options2) {
    if (!internalQueryRef) {
      throw new Error("The query has not been loaded. Please load the query.");
    }
    var promise2 = internalQueryRef.fetchMore(options2);
    setQueryRef(wrapQueryRef(internalQueryRef));
    return promise2;
  }, [internalQueryRef]);
  var refetch = React19.useCallback(function(options2) {
    if (!internalQueryRef) {
      throw new Error("The query has not been loaded. Please load the query.");
    }
    var promise2 = internalQueryRef.refetch(options2);
    setQueryRef(wrapQueryRef(internalQueryRef));
    return promise2;
  }, [internalQueryRef]);
  var loadQuery = React19.useCallback(function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    invariant(!calledDuringRender(), 50);
    var variables = args[0];
    var cacheKey = __spreadArray([
      query,
      canonicalStringify(variables)
    ], [].concat(queryKey), true);
    var queryRef2 = suspenseCache.getQueryRef(cacheKey, function() {
      return client.watchQuery(__assign(__assign({}, watchQueryOptions), { variables }));
    });
    setQueryRef(wrapQueryRef(queryRef2));
  }, [query, queryKey, suspenseCache, watchQueryOptions, calledDuringRender]);
  var reset = React19.useCallback(function() {
    setQueryRef(null);
  }, [queryRef]);
  return [loadQuery, queryRef, { fetchMore, refetch, reset }];
}

// node_modules/@apollo/client/react/hooks/useQueryRefHandlers.js
var React20 = __toESM(require_rehackt(), 1);
function useQueryRefHandlers(queryRef) {
  var unwrapped = unwrapQueryRef(queryRef);
  return wrapHook("useQueryRefHandlers", _useQueryRefHandlers, unwrapped ? unwrapped["observable"] : useApolloClient())(queryRef);
}
function _useQueryRefHandlers(queryRef) {
  assertWrappedQueryRef(queryRef);
  var _a = React20.useState(queryRef), previousQueryRef = _a[0], setPreviousQueryRef = _a[1];
  var _b = React20.useState(queryRef), wrappedQueryRef = _b[0], setWrappedQueryRef = _b[1];
  var internalQueryRef = unwrapQueryRef(queryRef);
  if (previousQueryRef !== queryRef) {
    setPreviousQueryRef(queryRef);
    setWrappedQueryRef(queryRef);
  } else {
    updateWrappedQueryRef(queryRef, getWrappedPromise(wrappedQueryRef));
  }
  var refetch = React20.useCallback(function(variables) {
    var promise = internalQueryRef.refetch(variables);
    setWrappedQueryRef(wrapQueryRef(internalQueryRef));
    return promise;
  }, [internalQueryRef]);
  var fetchMore = React20.useCallback(function(options) {
    var promise = internalQueryRef.fetchMore(options);
    setWrappedQueryRef(wrapQueryRef(internalQueryRef));
    return promise;
  }, [internalQueryRef]);
  return { refetch, fetchMore };
}

// node_modules/@apollo/client/react/hooks/useReadQuery.js
var React21 = __toESM(require_rehackt(), 1);
function useReadQuery(queryRef) {
  var unwrapped = unwrapQueryRef(queryRef);
  return wrapHook("useReadQuery", _useReadQuery, unwrapped ? unwrapped["observable"] : useApolloClient())(queryRef);
}
function _useReadQuery(queryRef) {
  assertWrappedQueryRef(queryRef);
  var internalQueryRef = React21.useMemo(function() {
    return unwrapQueryRef(queryRef);
  }, [queryRef]);
  var getPromise = React21.useCallback(function() {
    return getWrappedPromise(queryRef);
  }, [queryRef]);
  if (internalQueryRef.disposed) {
    internalQueryRef.reinitialize();
    updateWrappedQueryRef(queryRef, internalQueryRef.promise);
  }
  React21.useEffect(function() {
    return internalQueryRef.retain();
  }, [internalQueryRef]);
  var promise = useSyncExternalStore(React21.useCallback(function(forceUpdate) {
    return internalQueryRef.listen(function(promise2) {
      updateWrappedQueryRef(queryRef, promise2);
      forceUpdate();
    });
  }, [internalQueryRef]), getPromise, getPromise);
  var result = __use(promise);
  return React21.useMemo(function() {
    return {
      data: result.data,
      networkStatus: result.networkStatus,
      error: toApolloError(result)
    };
  }, [result]);
}

// node_modules/@apollo/client/react/query-preloader/createQueryPreloader.js
function createQueryPreloader(client) {
  return function preloadQuery(query, options) {
    var _a, _b;
    if (options === void 0) {
      options = /* @__PURE__ */ Object.create(null);
    }
    var queryRef = new InternalQueryReference(client.watchQuery(__assign(__assign({}, options), { query })), {
      autoDisposeTimeoutMs: (_b = (_a = client.defaultOptions.react) === null || _a === void 0 ? void 0 : _a.suspense) === null || _b === void 0 ? void 0 : _b.autoDisposeTimeoutMs
    });
    return wrapQueryRef(queryRef);
  };
}
export {
  ApolloCache,
  ApolloClient,
  ApolloConsumer,
  ApolloError,
  ApolloLink,
  ApolloProvider,
  Cache,
  DocumentTransform,
  DocumentType,
  HttpLink,
  InMemoryCache,
  MissingFieldError,
  NetworkStatus,
  Observable,
  ObservableQuery,
  checkFetcher,
  concat,
  createHttpLink,
  createQueryPreloader,
  createSignalIfSupported,
  defaultDataIdFromObject,
  defaultPrinter,
  disableExperimentalFragmentVariables,
  disableFragmentWarnings,
  empty,
  enableExperimentalFragmentVariables,
  execute,
  fallbackHttpConfig,
  from,
  fromError,
  fromPromise,
  getApolloContext,
  gql,
  isApolloError,
  isNetworkRequestSettled,
  isReference,
  makeReference,
  makeVar,
  mergeOptions,
  operationName,
  parseAndCheckHttpResponse,
  parser,
  resetApolloContext,
  resetCaches,
  rewriteURIForGET,
  selectHttpOptionsAndBody,
  selectHttpOptionsAndBodyInternal,
  selectURI,
  serializeFetchParameter,
  setVerbosity as setLogVerbosity,
  skipToken,
  split,
  throwServerError,
  toPromise,
  useApolloClient,
  useBackgroundQuery,
  useFragment,
  useLazyQuery,
  useLoadableQuery,
  useMutation,
  useQuery,
  useQueryRefHandlers,
  useReactiveVar,
  useReadQuery,
  useSubscription,
  useSuspenseQuery
};
//# sourceMappingURL=@apollo_client.js.map
