import {
  ApolloError
} from "./chunk-MFUTYN33.js";
import {
  ApolloLink
} from "./chunk-3KOQ4T2F.js";
import {
  Observable,
  __assign,
  __extends,
  isNonNullObject,
  print
} from "./chunk-5UTDYZ6L.js";
import "./chunk-CFQ2ASUW.js";
import "./chunk-LQ2VYIYD.js";

// node_modules/@apollo/client/link/subscriptions/index.js
function isLikeCloseEvent(val) {
  return isNonNullObject(val) && "code" in val && "reason" in val;
}
function isLikeErrorEvent(err) {
  var _a;
  return isNonNullObject(err) && ((_a = err.target) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.CLOSED;
}
var GraphQLWsLink = (
  /** @class */
  function(_super) {
    __extends(GraphQLWsLink2, _super);
    function GraphQLWsLink2(client) {
      var _this = _super.call(this) || this;
      _this.client = client;
      return _this;
    }
    GraphQLWsLink2.prototype.request = function(operation) {
      var _this = this;
      return new Observable(function(observer) {
        return _this.client.subscribe(__assign(__assign({}, operation), { query: print(operation.query) }), {
          next: observer.next.bind(observer),
          complete: observer.complete.bind(observer),
          error: function(err) {
            if (err instanceof Error) {
              return observer.error(err);
            }
            var likeClose = isLikeCloseEvent(err);
            if (likeClose || isLikeErrorEvent(err)) {
              return observer.error(
                // reason will be available on clean closes
                new Error("Socket closed".concat(likeClose ? " with event ".concat(err.code) : "").concat(likeClose ? " ".concat(err.reason) : ""))
              );
            }
            return observer.error(new ApolloError({
              graphQLErrors: Array.isArray(err) ? err : [err]
            }));
          }
        });
      });
    };
    return GraphQLWsLink2;
  }(ApolloLink)
);
export {
  GraphQLWsLink
};
//# sourceMappingURL=@apollo_client_link_subscriptions.js.map
