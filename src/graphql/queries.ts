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
