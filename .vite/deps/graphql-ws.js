import {
  GraphQLError,
  execute,
  getOperationAST,
  parse,
  subscribe,
  validate
} from "./chunk-CFQ2ASUW.js";
import "./chunk-LQ2VYIYD.js";

// node_modules/graphql-ws/lib/utils.mjs
function extendedTypeof(val) {
  if (val === null) {
    return "null";
  }
  if (Array.isArray(val)) {
    return "array";
  }
  return typeof val;
}
function isObject(val) {
  return extendedTypeof(val) === "object";
}
function isAsyncIterable(val) {
  return typeof Object(val)[Symbol.asyncIterator] === "function";
}
function isAsyncGenerator(val) {
  return isObject(val) && typeof Object(val)[Symbol.asyncIterator] === "function" && typeof val.return === "function";
}
function areGraphQLErrors(obj) {
  return Array.isArray(obj) && // must be at least one error
  obj.length > 0 && // error has at least a message
  obj.every((ob) => "message" in ob);
}
function limitCloseReason(reason, whenTooLong) {
  return reason.length < 124 ? reason : whenTooLong;
}

// node_modules/graphql-ws/lib/common.mjs
var GRAPHQL_TRANSPORT_WS_PROTOCOL = "graphql-transport-ws";
var DEPRECATED_GRAPHQL_WS_PROTOCOL = "graphql-ws";
var CloseCode;
(function(CloseCode2) {
  CloseCode2[CloseCode2["InternalServerError"] = 4500] = "InternalServerError";
  CloseCode2[CloseCode2["InternalClientError"] = 4005] = "InternalClientError";
  CloseCode2[CloseCode2["BadRequest"] = 4400] = "BadRequest";
  CloseCode2[CloseCode2["BadResponse"] = 4004] = "BadResponse";
  CloseCode2[CloseCode2["Unauthorized"] = 4401] = "Unauthorized";
  CloseCode2[CloseCode2["Forbidden"] = 4403] = "Forbidden";
  CloseCode2[CloseCode2["SubprotocolNotAcceptable"] = 4406] = "SubprotocolNotAcceptable";
  CloseCode2[CloseCode2["ConnectionInitialisationTimeout"] = 4408] = "ConnectionInitialisationTimeout";
  CloseCode2[CloseCode2["ConnectionAcknowledgementTimeout"] = 4504] = "ConnectionAcknowledgementTimeout";
  CloseCode2[CloseCode2["SubscriberAlreadyExists"] = 4409] = "SubscriberAlreadyExists";
  CloseCode2[CloseCode2["TooManyInitialisationRequests"] = 4429] = "TooManyInitialisationRequests";
})(CloseCode || (CloseCode = {}));
var MessageType;
(function(MessageType2) {
  MessageType2["ConnectionInit"] = "connection_init";
  MessageType2["ConnectionAck"] = "connection_ack";
  MessageType2["Ping"] = "ping";
  MessageType2["Pong"] = "pong";
  MessageType2["Subscribe"] = "subscribe";
  MessageType2["Next"] = "next";
  MessageType2["Error"] = "error";
  MessageType2["Complete"] = "complete";
})(MessageType || (MessageType = {}));
function validateMessage(val) {
  if (!isObject(val)) {
    throw new Error(`Message is expected to be an object, but got ${extendedTypeof(val)}`);
  }
  if (!val.type) {
    throw new Error(`Message is missing the 'type' property`);
  }
  if (typeof val.type !== "string") {
    throw new Error(`Message is expects the 'type' property to be a string, but got ${extendedTypeof(val.type)}`);
  }
  switch (val.type) {
    case MessageType.ConnectionInit:
    case MessageType.ConnectionAck:
    case MessageType.Ping:
    case MessageType.Pong: {
      if (val.payload != null && !isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object or nullish or missing, but got "${val.payload}"`);
      }
      break;
    }
    case MessageType.Subscribe: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
      }
      if (typeof val.payload.query !== "string") {
        throw new Error(`"${val.type}" message payload expects the 'query' property to be a string, but got ${extendedTypeof(val.payload.query)}`);
      }
      if (val.payload.variables != null && !isObject(val.payload.variables)) {
        throw new Error(`"${val.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.variables)}`);
      }
      if (val.payload.operationName != null && extendedTypeof(val.payload.operationName) !== "string") {
        throw new Error(`"${val.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${extendedTypeof(val.payload.operationName)}`);
      }
      if (val.payload.extensions != null && !isObject(val.payload.extensions)) {
        throw new Error(`"${val.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.extensions)}`);
      }
      break;
    }
    case MessageType.Next: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
      }
      break;
    }
    case MessageType.Error: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!areGraphQLErrors(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(val.payload)}`);
      }
      break;
    }
    case MessageType.Complete: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      break;
    }
    default:
      throw new Error(`Invalid message 'type' property "${val.type}"`);
  }
  return val;
}
function isMessage(val) {
  try {
    validateMessage(val);
    return true;
  } catch (_a) {
    return false;
  }
}
function parseMessage(data, reviver) {
  return validateMessage(typeof data === "string" ? JSON.parse(data, reviver) : data);
}
function stringifyMessage(msg, replacer) {
  validateMessage(msg);
  return JSON.stringify(msg, replacer);
}

// node_modules/graphql-ws/lib/client.mjs
var __await = function(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};
var __asyncGenerator = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
function createClient(options) {
  const {
    url,
    connectionParams,
    lazy = true,
    onNonLazyError = console.error,
    lazyCloseTimeout: lazyCloseTimeoutMs = 0,
    keepAlive = 0,
    disablePong,
    connectionAckWaitTimeout = 0,
    retryAttempts = 5,
    retryWait = async function randomisedExponentialBackoff(retries2) {
      let retryDelay = 1e3;
      for (let i = 0; i < retries2; i++) {
        retryDelay *= 2;
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelay + // add random timeout from 300ms to 3s
      Math.floor(Math.random() * (3e3 - 300) + 300)));
    },
    shouldRetry = isLikeCloseEvent,
    isFatalConnectionProblem,
    on,
    webSocketImpl,
    /**
     * Generates a v4 UUID to be used as the ID using `Math`
     * as the random number generator. Supply your own generator
     * in case you need more uniqueness.
     *
     * Reference: https://gist.github.com/jed/982883
     */
    generateID = function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    },
    jsonMessageReplacer: replacer,
    jsonMessageReviver: reviver
  } = options;
  let ws;
  if (webSocketImpl) {
    if (!isWebSocket(webSocketImpl)) {
      throw new Error("Invalid WebSocket implementation provided");
    }
    ws = webSocketImpl;
  } else if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || // @ts-expect-error: Support more browsers
    global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || // @ts-expect-error: Support more browsers
    window.MozWebSocket;
  }
  if (!ws)
    throw new Error("WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`");
  const WebSocketImpl = ws;
  const emitter = (() => {
    const message = /* @__PURE__ */ (() => {
      const listeners2 = {};
      return {
        on(id, listener) {
          listeners2[id] = listener;
          return () => {
            delete listeners2[id];
          };
        },
        emit(message2) {
          var _a;
          if ("id" in message2)
            (_a = listeners2[message2.id]) === null || _a === void 0 ? void 0 : _a.call(listeners2, message2);
        }
      };
    })();
    const listeners = {
      connecting: (on === null || on === void 0 ? void 0 : on.connecting) ? [on.connecting] : [],
      opened: (on === null || on === void 0 ? void 0 : on.opened) ? [on.opened] : [],
      connected: (on === null || on === void 0 ? void 0 : on.connected) ? [on.connected] : [],
      ping: (on === null || on === void 0 ? void 0 : on.ping) ? [on.ping] : [],
      pong: (on === null || on === void 0 ? void 0 : on.pong) ? [on.pong] : [],
      message: (on === null || on === void 0 ? void 0 : on.message) ? [message.emit, on.message] : [message.emit],
      closed: (on === null || on === void 0 ? void 0 : on.closed) ? [on.closed] : [],
      error: (on === null || on === void 0 ? void 0 : on.error) ? [on.error] : []
    };
    return {
      onMessage: message.on,
      on(event, listener) {
        const l = listeners[event];
        l.push(listener);
        return () => {
          l.splice(l.indexOf(listener), 1);
        };
      },
      emit(event, ...args) {
        for (const listener of [...listeners[event]]) {
          listener(...args);
        }
      }
    };
  })();
  function errorOrClosed(cb) {
    const listening = [
      // errors are fatal and more critical than close events, throw them first
      emitter.on("error", (err) => {
        listening.forEach((unlisten) => unlisten());
        cb(err);
      }),
      // closes can be graceful and not fatal, throw them second (if error didnt throw)
      emitter.on("closed", (event) => {
        listening.forEach((unlisten) => unlisten());
        cb(event);
      })
    ];
  }
  let connecting, locks = 0, lazyCloseTimeout, retrying = false, retries = 0, disposed = false;
  async function connect() {
    clearTimeout(lazyCloseTimeout);
    const [socket, throwOnClose] = await (connecting !== null && connecting !== void 0 ? connecting : connecting = new Promise((connected, denied) => (async () => {
      if (retrying) {
        await retryWait(retries);
        if (!locks) {
          connecting = void 0;
          return denied({ code: 1e3, reason: "All Subscriptions Gone" });
        }
        retries++;
      }
      emitter.emit("connecting", retrying);
      const socket2 = new WebSocketImpl(typeof url === "function" ? await url() : url, GRAPHQL_TRANSPORT_WS_PROTOCOL);
      let connectionAckTimeout, queuedPing;
      function enqueuePing() {
        if (isFinite(keepAlive) && keepAlive > 0) {
          clearTimeout(queuedPing);
          queuedPing = setTimeout(() => {
            if (socket2.readyState === WebSocketImpl.OPEN) {
              socket2.send(stringifyMessage({ type: MessageType.Ping }));
              emitter.emit("ping", false, void 0);
            }
          }, keepAlive);
        }
      }
      errorOrClosed((errOrEvent) => {
        connecting = void 0;
        clearTimeout(connectionAckTimeout);
        clearTimeout(queuedPing);
        denied(errOrEvent);
        if (errOrEvent instanceof TerminatedCloseEvent) {
          socket2.close(4499, "Terminated");
          socket2.onerror = null;
          socket2.onclose = null;
        }
      });
      socket2.onerror = (err) => emitter.emit("error", err);
      socket2.onclose = (event) => emitter.emit("closed", event);
      socket2.onopen = async () => {
        try {
          emitter.emit("opened", socket2);
          const payload = typeof connectionParams === "function" ? await connectionParams() : connectionParams;
          if (socket2.readyState !== WebSocketImpl.OPEN)
            return;
          socket2.send(stringifyMessage(payload ? {
            type: MessageType.ConnectionInit,
            payload
          } : {
            type: MessageType.ConnectionInit
            // payload is completely absent if not provided
          }, replacer));
          if (isFinite(connectionAckWaitTimeout) && connectionAckWaitTimeout > 0) {
            connectionAckTimeout = setTimeout(() => {
              socket2.close(CloseCode.ConnectionAcknowledgementTimeout, "Connection acknowledgement timeout");
            }, connectionAckWaitTimeout);
          }
          enqueuePing();
        } catch (err) {
          emitter.emit("error", err);
          socket2.close(CloseCode.InternalClientError, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Internal client error"));
        }
      };
      let acknowledged = false;
      socket2.onmessage = ({ data }) => {
        try {
          const message = parseMessage(data, reviver);
          emitter.emit("message", message);
          if (message.type === "ping" || message.type === "pong") {
            emitter.emit(message.type, true, message.payload);
            if (message.type === "pong") {
              enqueuePing();
            } else if (!disablePong) {
              socket2.send(stringifyMessage(message.payload ? {
                type: MessageType.Pong,
                payload: message.payload
              } : {
                type: MessageType.Pong
                // payload is completely absent if not provided
              }));
              emitter.emit("pong", false, message.payload);
            }
            return;
          }
          if (acknowledged)
            return;
          if (message.type !== MessageType.ConnectionAck)
            throw new Error(`First message cannot be of type ${message.type}`);
          clearTimeout(connectionAckTimeout);
          acknowledged = true;
          emitter.emit("connected", socket2, message.payload, retrying);
          retrying = false;
          retries = 0;
          connected([
            socket2,
            new Promise((_, reject) => errorOrClosed(reject))
          ]);
        } catch (err) {
          socket2.onmessage = null;
          emitter.emit("error", err);
          socket2.close(CloseCode.BadResponse, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Bad response"));
        }
      };
    })()));
    if (socket.readyState === WebSocketImpl.CLOSING)
      await throwOnClose;
    let release = () => {
    };
    const released = new Promise((resolve) => release = resolve);
    return [
      socket,
      release,
      Promise.race([
        // wait for
        released.then(() => {
          if (!locks) {
            const complete = () => socket.close(1e3, "Normal Closure");
            if (isFinite(lazyCloseTimeoutMs) && lazyCloseTimeoutMs > 0) {
              lazyCloseTimeout = setTimeout(() => {
                if (socket.readyState === WebSocketImpl.OPEN)
                  complete();
              }, lazyCloseTimeoutMs);
            } else {
              complete();
            }
          }
        }),
        // or
        throwOnClose
      ])
    ];
  }
  function shouldRetryConnectOrThrow(errOrCloseEvent) {
    if (isLikeCloseEvent(errOrCloseEvent) && (isFatalInternalCloseCode(errOrCloseEvent.code) || [
      CloseCode.InternalServerError,
      CloseCode.InternalClientError,
      CloseCode.BadRequest,
      CloseCode.BadResponse,
      CloseCode.Unauthorized,
      // CloseCode.Forbidden, might grant access out after retry
      CloseCode.SubprotocolNotAcceptable,
      // CloseCode.ConnectionInitialisationTimeout, might not time out after retry
      // CloseCode.ConnectionAcknowledgementTimeout, might not time out after retry
      CloseCode.SubscriberAlreadyExists,
      CloseCode.TooManyInitialisationRequests
      // 4499, // Terminated, probably because the socket froze, we want to retry
    ].includes(errOrCloseEvent.code)))
      throw errOrCloseEvent;
    if (disposed)
      return false;
    if (isLikeCloseEvent(errOrCloseEvent) && errOrCloseEvent.code === 1e3)
      return locks > 0;
    if (!retryAttempts || retries >= retryAttempts)
      throw errOrCloseEvent;
    if (!shouldRetry(errOrCloseEvent))
      throw errOrCloseEvent;
    if (isFatalConnectionProblem === null || isFatalConnectionProblem === void 0 ? void 0 : isFatalConnectionProblem(errOrCloseEvent))
      throw errOrCloseEvent;
    return retrying = true;
  }
  if (!lazy) {
    (async () => {
      locks++;
      for (; ; ) {
        try {
          const [, , throwOnClose] = await connect();
          await throwOnClose;
        } catch (errOrCloseEvent) {
          try {
            if (!shouldRetryConnectOrThrow(errOrCloseEvent))
              return;
          } catch (errOrCloseEvent2) {
            return onNonLazyError === null || onNonLazyError === void 0 ? void 0 : onNonLazyError(errOrCloseEvent2);
          }
        }
      }
    })();
  }
  function subscribe2(payload, sink) {
    const id = generateID(payload);
    let done = false, errored = false, releaser = () => {
      locks--;
      done = true;
    };
    (async () => {
      locks++;
      for (; ; ) {
        try {
          const [socket, release, waitForReleaseOrThrowOnClose] = await connect();
          if (done)
            return release();
          const unlisten = emitter.onMessage(id, (message) => {
            switch (message.type) {
              case MessageType.Next: {
                sink.next(message.payload);
                return;
              }
              case MessageType.Error: {
                errored = true, done = true;
                sink.error(message.payload);
                releaser();
                return;
              }
              case MessageType.Complete: {
                done = true;
                releaser();
                return;
              }
            }
          });
          socket.send(stringifyMessage({
            id,
            type: MessageType.Subscribe,
            payload
          }, replacer));
          releaser = () => {
            if (!done && socket.readyState === WebSocketImpl.OPEN)
              socket.send(stringifyMessage({
                id,
                type: MessageType.Complete
              }, replacer));
            locks--;
            done = true;
            release();
          };
          await waitForReleaseOrThrowOnClose.finally(unlisten);
          return;
        } catch (errOrCloseEvent) {
          if (!shouldRetryConnectOrThrow(errOrCloseEvent))
            return;
        }
      }
    })().then(() => {
      if (!errored)
        sink.complete();
    }).catch((err) => {
      sink.error(err);
    });
    return () => {
      if (!done)
        releaser();
    };
  }
  return {
    on: emitter.on,
    subscribe: subscribe2,
    iterate(request) {
      const pending = [];
      const deferred = {
        done: false,
        error: null,
        resolve: () => {
        }
      };
      const dispose = subscribe2(request, {
        next(val) {
          pending.push(val);
          deferred.resolve();
        },
        error(err) {
          deferred.done = true;
          deferred.error = err;
          deferred.resolve();
        },
        complete() {
          deferred.done = true;
          deferred.resolve();
        }
      });
      const iterator = function iterator2() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
          for (; ; ) {
            if (!pending.length) {
              yield __await(new Promise((resolve) => deferred.resolve = resolve));
            }
            while (pending.length) {
              yield yield __await(pending.shift());
            }
            if (deferred.error) {
              throw deferred.error;
            }
            if (deferred.done) {
              return yield __await(void 0);
            }
          }
        });
      }();
      iterator.throw = async (err) => {
        if (!deferred.done) {
          deferred.done = true;
          deferred.error = err;
          deferred.resolve();
        }
        return { done: true, value: void 0 };
      };
      iterator.return = async () => {
        dispose();
        return { done: true, value: void 0 };
      };
      return iterator;
    },
    async dispose() {
      disposed = true;
      if (connecting) {
        const [socket] = await connecting;
        socket.close(1e3, "Normal Closure");
      }
    },
    terminate() {
      if (connecting) {
        emitter.emit("closed", new TerminatedCloseEvent());
      }
    }
  };
}
var TerminatedCloseEvent = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "TerminatedCloseEvent";
    this.message = "4499: Terminated";
    this.code = 4499;
    this.reason = "Terminated";
    this.wasClean = false;
  }
};
function isLikeCloseEvent(val) {
  return isObject(val) && "code" in val && "reason" in val;
}
function isFatalInternalCloseCode(code) {
  if ([
    1e3,
    1001,
    1006,
    1005,
    1012,
    1013,
    1014
    // Bad Gateway
  ].includes(code))
    return false;
  return code >= 1e3 && code <= 1999;
}
function isWebSocket(val) {
  return typeof val === "function" && "constructor" in val && "CLOSED" in val && "CLOSING" in val && "CONNECTING" in val && "OPEN" in val;
}

// node_modules/graphql-ws/lib/server.mjs
var __asyncValues = function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
function makeServer(options) {
  const {
    schema,
    context,
    roots,
    validate: validate2,
    execute: execute2,
    subscribe: subscribe2,
    connectionInitWaitTimeout = 3e3,
    // 3 seconds
    onConnect,
    onDisconnect,
    onClose,
    onSubscribe,
    onOperation,
    onNext,
    onError,
    onComplete,
    jsonMessageReviver: reviver,
    jsonMessageReplacer: replacer
  } = options;
  return {
    opened(socket, extra) {
      const ctx = {
        connectionInitReceived: false,
        acknowledged: false,
        subscriptions: {},
        extra
      };
      if (socket.protocol !== GRAPHQL_TRANSPORT_WS_PROTOCOL) {
        socket.close(CloseCode.SubprotocolNotAcceptable, "Subprotocol not acceptable");
        return async (code, reason) => {
          await (onClose === null || onClose === void 0 ? void 0 : onClose(ctx, code, reason));
        };
      }
      const connectionInitWait = connectionInitWaitTimeout > 0 && isFinite(connectionInitWaitTimeout) ? setTimeout(() => {
        if (!ctx.connectionInitReceived)
          socket.close(CloseCode.ConnectionInitialisationTimeout, "Connection initialisation timeout");
      }, connectionInitWaitTimeout) : null;
      socket.onMessage(async function onMessage(data) {
        var _a, e_1, _b, _c;
        var _d;
        let message;
        try {
          message = parseMessage(data, reviver);
        } catch (err) {
          return socket.close(CloseCode.BadRequest, "Invalid message received");
        }
        switch (message.type) {
          case MessageType.ConnectionInit: {
            if (ctx.connectionInitReceived)
              return socket.close(CloseCode.TooManyInitialisationRequests, "Too many initialisation requests");
            ctx.connectionInitReceived = true;
            if (isObject(message.payload))
              ctx.connectionParams = message.payload;
            const permittedOrPayload = await (onConnect === null || onConnect === void 0 ? void 0 : onConnect(ctx));
            if (permittedOrPayload === false)
              return socket.close(CloseCode.Forbidden, "Forbidden");
            ctx.acknowledged = true;
            await socket.send(stringifyMessage(isObject(permittedOrPayload) ? {
              type: MessageType.ConnectionAck,
              payload: permittedOrPayload
            } : {
              type: MessageType.ConnectionAck
              // payload is completely absent if not provided
            }, replacer));
            return;
          }
          case MessageType.Ping: {
            if (socket.onPing)
              return await socket.onPing(message.payload);
            await socket.send(stringifyMessage(message.payload ? { type: MessageType.Pong, payload: message.payload } : {
              type: MessageType.Pong
              // payload is completely absent if not provided
            }));
            return;
          }
          case MessageType.Pong:
            return await ((_d = socket.onPong) === null || _d === void 0 ? void 0 : _d.call(socket, message.payload));
          case MessageType.Subscribe: {
            if (!ctx.acknowledged)
              return socket.close(CloseCode.Unauthorized, "Unauthorized");
            const { id, payload } = message;
            if (id in ctx.subscriptions)
              return socket.close(CloseCode.SubscriberAlreadyExists, `Subscriber for ${id} already exists`);
            ctx.subscriptions[id] = null;
            const emit = {
              next: async (result, args) => {
                let nextMessage = {
                  id,
                  type: MessageType.Next,
                  payload: result
                };
                const maybeResult = await (onNext === null || onNext === void 0 ? void 0 : onNext(ctx, nextMessage, args, result));
                if (maybeResult)
                  nextMessage = Object.assign(Object.assign({}, nextMessage), { payload: maybeResult });
                await socket.send(stringifyMessage(nextMessage, replacer));
              },
              error: async (errors) => {
                let errorMessage = {
                  id,
                  type: MessageType.Error,
                  payload: errors
                };
                const maybeErrors = await (onError === null || onError === void 0 ? void 0 : onError(ctx, errorMessage, errors));
                if (maybeErrors)
                  errorMessage = Object.assign(Object.assign({}, errorMessage), { payload: maybeErrors });
                await socket.send(stringifyMessage(errorMessage, replacer));
              },
              complete: async (notifyClient) => {
                const completeMessage = {
                  id,
                  type: MessageType.Complete
                };
                await (onComplete === null || onComplete === void 0 ? void 0 : onComplete(ctx, completeMessage));
                if (notifyClient)
                  await socket.send(stringifyMessage(completeMessage, replacer));
              }
            };
            try {
              let execArgs;
              const maybeExecArgsOrErrors = await (onSubscribe === null || onSubscribe === void 0 ? void 0 : onSubscribe(ctx, message));
              if (maybeExecArgsOrErrors) {
                if (areGraphQLErrors(maybeExecArgsOrErrors))
                  return id in ctx.subscriptions ? await emit.error(maybeExecArgsOrErrors) : void 0;
                else if (Array.isArray(maybeExecArgsOrErrors))
                  throw new Error("Invalid return value from onSubscribe hook, expected an array of GraphQLError objects");
                execArgs = maybeExecArgsOrErrors;
              } else {
                if (!schema)
                  throw new Error("The GraphQL schema is not provided");
                const args = {
                  operationName: payload.operationName,
                  document: parse(payload.query),
                  variableValues: payload.variables
                };
                execArgs = Object.assign(Object.assign({}, args), { schema: typeof schema === "function" ? await schema(ctx, message, args) : schema });
                const validationErrors = (validate2 !== null && validate2 !== void 0 ? validate2 : validate)(execArgs.schema, execArgs.document);
                if (validationErrors.length > 0)
                  return id in ctx.subscriptions ? await emit.error(validationErrors) : void 0;
              }
              const operationAST = getOperationAST(execArgs.document, execArgs.operationName);
              if (!operationAST)
                return id in ctx.subscriptions ? await emit.error([
                  new GraphQLError("Unable to identify operation")
                ]) : void 0;
              if (!("rootValue" in execArgs))
                execArgs.rootValue = roots === null || roots === void 0 ? void 0 : roots[operationAST.operation];
              if (!("contextValue" in execArgs))
                execArgs.contextValue = typeof context === "function" ? await context(ctx, message, execArgs) : context;
              let operationResult;
              if (operationAST.operation === "subscription")
                operationResult = await (subscribe2 !== null && subscribe2 !== void 0 ? subscribe2 : subscribe)(execArgs);
              else
                operationResult = await (execute2 !== null && execute2 !== void 0 ? execute2 : execute)(execArgs);
              const maybeResult = await (onOperation === null || onOperation === void 0 ? void 0 : onOperation(ctx, message, execArgs, operationResult));
              if (maybeResult)
                operationResult = maybeResult;
              if (isAsyncIterable(operationResult)) {
                if (!(id in ctx.subscriptions)) {
                  if (isAsyncGenerator(operationResult))
                    operationResult.return(void 0);
                } else {
                  ctx.subscriptions[id] = operationResult;
                  try {
                    for (var _e = true, operationResult_1 = __asyncValues(operationResult), operationResult_1_1; operationResult_1_1 = await operationResult_1.next(), _a = operationResult_1_1.done, !_a; _e = true) {
                      _c = operationResult_1_1.value;
                      _e = false;
                      const result = _c;
                      await emit.next(result, execArgs);
                    }
                  } catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                  } finally {
                    try {
                      if (!_e && !_a && (_b = operationResult_1.return))
                        await _b.call(operationResult_1);
                    } finally {
                      if (e_1)
                        throw e_1.error;
                    }
                  }
                }
              } else {
                if (id in ctx.subscriptions)
                  await emit.next(operationResult, execArgs);
              }
              await emit.complete(id in ctx.subscriptions);
            } finally {
              delete ctx.subscriptions[id];
            }
            return;
          }
          case MessageType.Complete: {
            const subscription = ctx.subscriptions[message.id];
            delete ctx.subscriptions[message.id];
            if (isAsyncGenerator(subscription))
              await subscription.return(void 0);
            return;
          }
          default:
            throw new Error(`Unexpected message of type ${message.type} received`);
        }
      });
      return async (code, reason) => {
        if (connectionInitWait)
          clearTimeout(connectionInitWait);
        const subs = Object.assign({}, ctx.subscriptions);
        ctx.subscriptions = {};
        await Promise.all(Object.values(subs).filter(isAsyncGenerator).map((sub) => sub.return(void 0)));
        if (ctx.acknowledged)
          await (onDisconnect === null || onDisconnect === void 0 ? void 0 : onDisconnect(ctx, code, reason));
        await (onClose === null || onClose === void 0 ? void 0 : onClose(ctx, code, reason));
      };
    }
  };
}
function handleProtocols(protocols) {
  switch (true) {
    case (protocols instanceof Set && protocols.has(GRAPHQL_TRANSPORT_WS_PROTOCOL)):
    case (Array.isArray(protocols) && protocols.includes(GRAPHQL_TRANSPORT_WS_PROTOCOL)):
    case (typeof protocols === "string" && protocols.split(",").map((p) => p.trim()).includes(GRAPHQL_TRANSPORT_WS_PROTOCOL)):
      return GRAPHQL_TRANSPORT_WS_PROTOCOL;
    default:
      return false;
  }
}
export {
  CloseCode,
  DEPRECATED_GRAPHQL_WS_PROTOCOL,
  GRAPHQL_TRANSPORT_WS_PROTOCOL,
  MessageType,
  TerminatedCloseEvent,
  createClient,
  handleProtocols,
  isMessage,
  makeServer,
  parseMessage,
  stringifyMessage,
  validateMessage
};
//# sourceMappingURL=graphql-ws.js.map
