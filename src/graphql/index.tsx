/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Base64: { input: any; output: any; }
  Time: { input: any; output: any; }
};

export type Chat = {
  __typename?: 'Chat';
  /** Уникальный идентификатор чата. */
  id: Scalars['ID']['output'];
  /** Картинка чата. */
  image?: Maybe<Scalars['Base64']['output']>;
  /** Пользователи, которые состоят в чате. */
  members: Array<User>;
  /**
   * Данные по конкретному сообщению.
   * Если сообщение не найдено, то вернётся `null`.
   */
  message?: Maybe<Message>;
  /**
   * Сообщения в чате.
   * Работает пагинация в порядке убывания `createdAt`.
   */
  messages: Array<Message>;
  /** Произвольные мета-данные чата. */
  meta: Array<Meta>;
  /** Человекочитаемое название чата. */
  name: Scalars['String']['output'];
  /** Владелец / создатель чата. */
  owner: User;
  /** Тип чата. */
  type: ChatType;
};


export type ChatMembersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type ChatMessageArgs = {
  id: Scalars['ID']['input'];
};


export type ChatMessagesArgs = {
  base?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum ChatType {
  /** Канал: может писать владелец, подписчики – читают. */
  Channel = 'CHANNEL',
  /** Групповой чат с произвольным количеством людей. */
  Group = 'GROUP',
  /** Личный чат между двумя пользователями. */
  Private = 'PRIVATE'
}

export type Event = MessageEvent;

export type Message = {
  __typename?: 'Message';
  /** Время доставки сообщения в чат. */
  createdAt: Scalars['Time']['output'];
  /** Автор сообщения. */
  createdBy: User;
  /** Уникальный (в рамках чата) идентификатор сообщения. */
  id: Scalars['ID']['output'];
  /** Произвольные мета-данные сообщения. */
  meta: Array<Meta>;
  /** Текст сообщения. */
  text: Scalars['String']['output'];
};

/** Событие с новым сообщением. */
export type MessageEvent = {
  __typename?: 'MessageEvent';
  chat: Chat;
  message: Message;
};

/**
 * Мета-данные со значением по ключу.
 * Можно хранить какие-то клиентозависимые параметры.
 */
export type Meta = {
  __typename?: 'Meta';
  key: Scalars['String']['output'];
  val: Scalars['String']['output'];
};

/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type Mutation = {
  __typename?: 'Mutation';
  /** Создание нового чата. Владельцем станет текущий пользователь. */
  createChat: Chat;
  /**
   * Удаление чата.
   * Действие может быть выполнено только владельцем чата.
   * Возвращаемое значение `true` говорит об успешности операции.
   */
  deleteChat: Scalars['Boolean']['output'];
  /**
   * Удаление сообщения.
   * Действие может быть выполнено владельцем чата, либо автором сообщения.
   * Возвращаемое значение `true` говорит об успешности операции.
   */
  deleteMessage: Scalars['Boolean']['output'];
  /**
   * Редактирование сообщения.
   * Если чата с таким `chatId` нет, то ошибка.
   * Если в чате нет сообщения с таким `messageId`, то ошибка.
   * Действие может быть выполнено только автором сообщения.
   */
  editMessage?: Maybe<Message>;
  /**
   * Добавить пользователя в чат.
   * Если чата с таким `id` нет, то ошибка.
   * Если пользователя с таким `login` нет, то ошибка.
   * Если пользователь уже состоит в чате, то ошибка.
   */
  inviteUser: Scalars['Boolean']['output'];
  /**
   * Выгнать пользователя из чата.
   * Если чата с таким `id` нет, то ошибка.
   * Если пользователя с таким `login` нет, то ошибка.
   * Если пользователь не состоит в чате, то ошибка.
   */
  kickUser: Scalars['Boolean']['output'];
  /**
   * Регистрация нового пользователя.
   * Если пользователь с таким логином уже существует, то ошибка.
   * Если пользователь и пароль не соответствуют, то ошибка.
   */
  register?: Maybe<User>;
  /**
   * Отправить сообщение в чат.
   * Если чата с таким `chatId` нет, то ошибка.
   */
  sendMessage?: Maybe<Message>;
  /**
   * Обновление данных чата.
   * Если чата с таким `id` нет, то ошибка.
   */
  updateChat?: Maybe<Chat>;
  /** Обновление данных текущего пользователя. */
  updateUser?: Maybe<User>;
  /**
   * Обновление мета-данных чата.
   * Данные по одинаковому ключу будут перезаписаны.
   * Если чата с таким `id` нет, то ошибка.
   */
  upsertChatMeta?: Maybe<Chat>;
  /**
   * Обновление мета-данных сообщения.
   * Данные по одинаковому ключу будут перезаписаны.
   * Если чата с таким `chatId` нет, то ошибка.
   * Если в чате нет сообщения с таким `messageId`, то ошибка.
   */
  upsertMessageMeta?: Maybe<Message>;
  /**
   * Обновление мета-данных текущего пользователя.
   * Данные по одинаковому ключу будут перезаписаны.
   */
  upsertUserMeta?: Maybe<User>;
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationCreateChatArgs = {
  members: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: ChatType;
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationDeleteChatArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationDeleteMessageArgs = {
  chatId: Scalars['ID']['input'];
  messageId: Scalars['ID']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationEditMessageArgs = {
  chatId: Scalars['ID']['input'];
  messageId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationInviteUserArgs = {
  chatId: Scalars['ID']['input'];
  login: Scalars['String']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationKickUserArgs = {
  chatId: Scalars['ID']['input'];
  login: Scalars['String']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationRegisterArgs = {
  login: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationSendMessageArgs = {
  chatId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationUpdateChatArgs = {
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['Base64']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationUpdateUserArgs = {
  image?: InputMaybe<Scalars['Base64']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationUpsertChatMetaArgs = {
  id: Scalars['ID']['input'];
  key: Scalars['String']['input'];
  val: Scalars['String']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationUpsertMessageMetaArgs = {
  chatId: Scalars['ID']['input'];
  key: Scalars['String']['input'];
  messageId: Scalars['ID']['input'];
  val: Scalars['String']['input'];
};


/**
 * Модифицирующие запросы.
 * Все запросы (кроме `register`) должны выполняться с переданным
 * заголовком Authorization для того, чтобы успешно выполниться.
 */
export type MutationUpsertUserMetaArgs = {
  key: Scalars['String']['input'];
  val: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Данные по конкретному чату.
   * Если чат не найден, то вернётся `null`.
   */
  chat?: Maybe<Chat>;
  /**
   * Список доступных чатов.
   * Для анонимного пользователя возвращаются только флудильни.
   */
  chats: Array<Chat>;
  /** Информация о текущем пользователе. */
  me?: Maybe<User>;
  /**
   * Авторизация.
   * Если пользователь и пароль не соответствуют, то ошибка.
   * Возвращается ключ, который нужно указывать в заголовке Authorization для запросов от имени пользователя.
   */
  signIn?: Maybe<Scalars['String']['output']>;
  /**
   * Данные по конкретному пользователю.
   * Если пользователь не найден, то вернётся `null`.
   */
  user?: Maybe<User>;
  /** Список зарегистрированных пользователей. */
  users: Array<User>;
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChatsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySignInArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryUserArgs = {
  login: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Подписка на новые события для текущего пользователя. */
  newEvent: Event;
  /**
   * Подписка на новые сообщения в чате.
   * Если чата с таким `id` нет, то ошибка.
   */
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['ID']['input'];
};

/** Зарегистрированный пользователь мессенджера. */
export type User = {
  __typename?: 'User';
  /** Картинка-аватар пользователя. */
  image?: Maybe<Scalars['Base64']['output']>;
  /** Уникальный логин пользователя. */
  login: Scalars['String']['output'];
  /** Произвольные метаданные пользователя. */
  meta: Array<Meta>;
  /** Человекочитаемое имя. */
  name: Scalars['String']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', image?: any | null, login: string, name: string, meta: Array<{ __typename?: 'Meta', key: string, val: string }> } | null };

export type SignInQueryVariables = Exact<{
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInQuery = { __typename?: 'Query', signIn?: string | null };

export type GetChatsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: string, type: ChatType, image?: any | null, name: string, messages: Array<{ __typename?: 'Message', createdAt: any, text: string, createdBy: { __typename?: 'User', image?: any | null, name: string } }> }> };


export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SignInDocument = gql`
    query SignIn($login: String!, $password: String!) {
  signIn(login: $login, password: $password)
}
    `;

/**
 * __useSignInQuery__
 *
 * To run a query within a React component, call `useSignInQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignInQuery({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInQuery(baseOptions: Apollo.QueryHookOptions<SignInQuery, SignInQueryVariables> & ({ variables: SignInQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
      }
export function useSignInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignInQuery, SignInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
        }
export function useSignInSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SignInQuery, SignInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
        }
export type SignInQueryHookResult = ReturnType<typeof useSignInQuery>;
export type SignInLazyQueryHookResult = ReturnType<typeof useSignInLazyQuery>;
export type SignInSuspenseQueryHookResult = ReturnType<typeof useSignInSuspenseQuery>;
export type SignInQueryResult = Apollo.QueryResult<SignInQuery, SignInQueryVariables>;
export const GetChatsDocument = gql`
    query GetChats($offset: Int = 0, $first: Int = 10) {
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

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export function useGetChatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsSuspenseQueryHookResult = ReturnType<typeof useGetChatsSuspenseQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;