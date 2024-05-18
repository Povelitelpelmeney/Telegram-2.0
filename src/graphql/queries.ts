import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      image
      login
      meta {
        key
        val
      }
      name
    }
  }
`;

export const SIGNIN = gql`
  query SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password)
  }
`;

export const REGISTER = gql`
  mutation Register($login: String!, $password: String!, $name: String!) {
    register(login: $login, password: $password, name: $name) {
      login
      name
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($type: ChatType!, $name: String!, $members: [String!]!) {
    createChat(type: $type, members: $members, name: $name) {
      type
      name
      owner {
        image
        name
      }
    }
  }
`;

export const INVITE_USER = gql`
  mutation InviteUser($chatId: ID!, $login: String!) {
    inviteUser(login: $login, chatId: $chatId)
  }
`;

export const KICK_USER = gql`
  mutation KickeUser($chatId: ID!, $login: String!) {
    kickUser(login: $login, chatId: $chatId)
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($id: ID!) {
    deleteChat(id: $id)
  }
`;

export const CHATS = gql`
  query Chats($offset: Int = 0, $first: Int = 10) {
    chats(offset: $offset, first: $first) {
      id
      type
      image
      messages(first: 1) {
        createdAt
        createdBy {
          image
          name
        }
        text
      }
      name
    }
  }
`;

export const CHAT = gql`
  query Chat($id: ID!) {
    chat(id: $id) {
      id
      type
      image
      meta {
        ...metaField
      }
      name
      owner {
        image
        login
        meta {
          ...metaField
        }
        name
      }
    }
  }

  fragment metaField on Meta {
    key
    val
  }
`;

export const PINNED = gql`
  query Pinned($ch)
`;

export const USER = gql`
  query User($login: String!) {
    user(login: $login) {
      image
      login
      meta {
        key
        val
      }
      name
    }
  }
`;

export const USERS = gql`
  query Users($offset: Int = 0, $fisrt: Int = 10) {
    users(offset: $offset, first: $fisrt) {
      image
      login
      meta {
        key
        val
      }
      name
    }
  }
`;

// Все запросы (кроме register) для всех mutation должны выполняться с переданным
// заголовком Authorization для того, чтобы успешно выполниться.

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: ID!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text) {
      id
      createdAt
      createdBy {
        name
        image
      }
      text
      meta {
        key
        val
      }
    }
  }
`;

export const EDIT_MESSAGE = gql`
  mutation EditMessage($chatId: ID!, $messageId: ID!, $text: String!) {
    editMessage(chatId: $chatId, messageId: $messageId, text: $text) {
      id
      createdAt
      createdBy {
        name
        image
      }
      text
      meta {
        key
        val
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($chatId: ID!, $messageId: ID!) {
    deleteMessage(chatId: $chatId, messageId: $messageId)
  }
`;

export const UPSERT_MESSAGE_META = gql`
  mutation UpsertMessageMeta(
    $chatId: ID!
    $messageId: ID!
    $key: String!
    $val: String!
  ) {
    upsertMessageMeta(
      chatId: $chatId
      messageId: $messageId
      key: $key
      val: $val
    ) {
      id
      createdAt
      createdBy {
        name
        image
      }
      text
      meta {
        key
        val
      }
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription NewMessage($chatId: ID!) {
    newMessage(chatId: $chatId) {
      id
      createdAt
      createdBy {
        name
        image
      }
      text
      meta {
        key
        val
      }
    }
  }
`;

export const NEW_EVENT = gql`
  subscription NewEvent {
    newEvent {
      __typename
    }
  }
`;
