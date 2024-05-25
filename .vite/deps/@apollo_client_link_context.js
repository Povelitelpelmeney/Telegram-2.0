import {
  ApolloLink
} from "./chunk-3KOQ4T2F.js";
import {
  Observable,
  __rest
} from "./chunk-5UTDYZ6L.js";
import "./chunk-CFQ2ASUW.js";
import "./chunk-LQ2VYIYD.js";

// node_modules/@apollo/client/link/context/index.js
function setContext(setter) {
  return new ApolloLink(function(operation, forward) {
    var request = __rest(operation, []);
    return new Observable(function(observer) {
      var handle;
      var closed = false;
      Promise.resolve(request).then(function(req) {
        return setter(req, operation.getContext());
      }).then(operation.setContext).then(function() {
        if (closed)
          return;
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        });
      }).catch(observer.error.bind(observer));
      return function() {
        closed = true;
        if (handle)
          handle.unsubscribe();
      };
    });
  });
}
export {
  setContext
};
//# sourceMappingURL=@apollo_client_link_context.js.map
