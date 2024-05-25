import {
  Observable,
  __assign,
  getOperationName,
  invariant,
  newInvariantError
} from "./chunk-5UTDYZ6L.js";
import {
  visit
} from "./chunk-CFQ2ASUW.js";

// node_modules/@apollo/client/link/utils/fromError.js
function fromError(errorValue) {
  return new Observable(function(observer) {
    observer.error(errorValue);
  });
}

// node_modules/@apollo/client/link/utils/toPromise.js
function toPromise(observable) {
  var completed = false;
  return new Promise(function(resolve, reject) {
    observable.subscribe({
      next: function(data) {
        if (completed) {
          globalThis.__DEV__ !== false && invariant.warn(42);
        } else {
          completed = true;
          resolve(data);
        }
      },
      error: reject
    });
  });
}

// node_modules/@apollo/client/link/utils/fromPromise.js
function fromPromise(promise) {
  return new Observable(function(observer) {
    promise.then(function(value) {
      observer.next(value);
      observer.complete();
    }).catch(observer.error.bind(observer));
  });
}

// node_modules/@apollo/client/link/utils/throwServerError.js
var throwServerError = function(response, result, message) {
  var error = new Error(message);
  error.name = "ServerError";
  error.response = response;
  error.statusCode = response.status;
  error.result = result;
  throw error;
};

// node_modules/@apollo/client/link/utils/validateOperation.js
function validateOperation(operation) {
  var OPERATION_FIELDS = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ];
  for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
    var key = _a[_i];
    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw newInvariantError(43, key);
    }
  }
  return operation;
}

// node_modules/@apollo/client/link/utils/createOperation.js
function createOperation(starting, operation) {
  var context = __assign({}, starting);
  var setContext = function(next) {
    if (typeof next === "function") {
      context = __assign(__assign({}, context), next(context));
    } else {
      context = __assign(__assign({}, context), next);
    }
  };
  var getContext = function() {
    return __assign({}, context);
  };
  Object.defineProperty(operation, "setContext", {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, "getContext", {
    enumerable: false,
    value: getContext
  });
  return operation;
}

// node_modules/@apollo/client/link/utils/transformOperation.js
function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };
  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== "string" ? getOperationName(transformedOperation.query) || void 0 : "";
  }
  return transformedOperation;
}

// node_modules/@apollo/client/link/utils/filterOperationVariables.js
function filterOperationVariables(variables, query) {
  var result = __assign({}, variables);
  var unusedNames = new Set(Object.keys(variables));
  visit(query, {
    Variable: function(node, _key, parent) {
      if (parent && parent.kind !== "VariableDefinition") {
        unusedNames.delete(node.name.value);
      }
    }
  });
  unusedNames.forEach(function(name) {
    delete result[name];
  });
  return result;
}

// node_modules/@apollo/client/link/core/ApolloLink.js
function passthrough(op, forward) {
  return forward ? forward(op) : Observable.of();
}
function toLink(handler) {
  return typeof handler === "function" ? new ApolloLink(handler) : handler;
}
function isTerminating(link) {
  return link.request.length <= 1;
}
var ApolloLink = (
  /** @class */
  function() {
    function ApolloLink2(request) {
      if (request)
        this.request = request;
    }
    ApolloLink2.empty = function() {
      return new ApolloLink2(function() {
        return Observable.of();
      });
    };
    ApolloLink2.from = function(links) {
      if (links.length === 0)
        return ApolloLink2.empty();
      return links.map(toLink).reduce(function(x, y) {
        return x.concat(y);
      });
    };
    ApolloLink2.split = function(test, left, right) {
      var leftLink = toLink(left);
      var rightLink = toLink(right || new ApolloLink2(passthrough));
      var ret;
      if (isTerminating(leftLink) && isTerminating(rightLink)) {
        ret = new ApolloLink2(function(operation) {
          return test(operation) ? leftLink.request(operation) || Observable.of() : rightLink.request(operation) || Observable.of();
        });
      } else {
        ret = new ApolloLink2(function(operation, forward) {
          return test(operation) ? leftLink.request(operation, forward) || Observable.of() : rightLink.request(operation, forward) || Observable.of();
        });
      }
      return Object.assign(ret, { left: leftLink, right: rightLink });
    };
    ApolloLink2.execute = function(link, operation) {
      return link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable.of();
    };
    ApolloLink2.concat = function(first, second) {
      var firstLink = toLink(first);
      if (isTerminating(firstLink)) {
        globalThis.__DEV__ !== false && invariant.warn(35, firstLink);
        return firstLink;
      }
      var nextLink = toLink(second);
      var ret;
      if (isTerminating(nextLink)) {
        ret = new ApolloLink2(function(operation) {
          return firstLink.request(operation, function(op) {
            return nextLink.request(op) || Observable.of();
          }) || Observable.of();
        });
      } else {
        ret = new ApolloLink2(function(operation, forward) {
          return firstLink.request(operation, function(op) {
            return nextLink.request(op, forward) || Observable.of();
          }) || Observable.of();
        });
      }
      return Object.assign(ret, { left: firstLink, right: nextLink });
    };
    ApolloLink2.prototype.split = function(test, left, right) {
      return this.concat(ApolloLink2.split(test, left, right || new ApolloLink2(passthrough)));
    };
    ApolloLink2.prototype.concat = function(next) {
      return ApolloLink2.concat(this, next);
    };
    ApolloLink2.prototype.request = function(operation, forward) {
      throw newInvariantError(36);
    };
    ApolloLink2.prototype.onError = function(error, observer) {
      if (observer && observer.error) {
        observer.error(error);
        return false;
      }
      throw error;
    };
    ApolloLink2.prototype.setOnError = function(fn) {
      this.onError = fn;
      return this;
    };
    return ApolloLink2;
  }()
);

// node_modules/@apollo/client/link/core/empty.js
var empty = ApolloLink.empty;

// node_modules/@apollo/client/link/core/from.js
var from = ApolloLink.from;

// node_modules/@apollo/client/link/core/split.js
var split = ApolloLink.split;

// node_modules/@apollo/client/link/core/concat.js
var concat = ApolloLink.concat;

// node_modules/@apollo/client/link/core/execute.js
var execute = ApolloLink.execute;

export {
  fromError,
  toPromise,
  fromPromise,
  throwServerError,
  filterOperationVariables,
  ApolloLink,
  empty,
  from,
  split,
  concat,
  execute
};
//# sourceMappingURL=chunk-3KOQ4T2F.js.map
