type ImageType = "apng" | "avif" | "gif" | "jpeg" | "png" | "svg+xml" | "webp";
type Base64<T extends ImageType> = `data:image/${T};base64,${string}`;
type APNGBase64 = Base64<"apng">;
type AVIFBase64 = Base64<"avif">;
type GIFBase64 = Base64<"gif">;
type JPEGBase64 = Base64<"jpeg">;
type PNGBase64 = Base64<"png">;
type SVGBase64 = Base64<"svg+xml">;
type WEBPBase64 = Base64<"webp">;

type Meta = {
  key: string;
  val: string;
};

type User = {
  image?: Base64;
  login: string;
  meta: Meta[];
  name: string;
};

enum ChatType {
  CHANNEL,
  GROUP,
  PRIVATE,
}

type Chat = {
  id: string;
  type: ChatType;
  image?: Base64;
  meta: Meta[];
  name: string;
  owner: User;
};

type Message = {
  id: string;
  createdAt: string;
  createdBy: User;
  meta: Meta[];
  text: string;
};

type Event = MessageEvent;

type MessageEvent = {
  chat: Chat;
  message: Message;
};
