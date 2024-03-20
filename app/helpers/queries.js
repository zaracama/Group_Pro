import { gql } from "@apollo/client";

export const getUser = gql`
  query GetUserbyName {
    searchUser {
      _id
      name
      username
      email
    }
  }
`;

export const GET_USER_ID = gql`
  query GetUserbyId($id: ID!) {
    getUserbyId(_id: $id) {
      _id
      name
      username
      email
      followerusers {
        email
        username
        name
        _id
      }
      followingusers {
        email
        username
        name
        _id
      }
    }
  }
`;

export const GET_USER_NAME = gql`
  query GetUserbyName($name: String!) {
    getUserbyName(name: $name) {
      _id
      name
      username
      email
      followingusers {
        _id
        name
        username
        email
      }
      followerusers {
        _id
        name
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($login: Login) {
    login(login: $login) {
      access_token
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($newPost: NewPost) {
    addPost(newPost: $newPost) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export const GET_POST_ID = gql`
  query GetPostById($id: ID!) {
    getPostById(_id: $id) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export const ADD_LIKE = gql`
  mutation AddLike($newLike: NewLike) {
    addLike(newLike: $newLike) {
      username
      createdAt
      updatedAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($newComment: NewComment) {
    addComment(newComment: $newComment) {
      content
      username
      createdAt
      updatedAt
    }
  }
`;

export const ADD_FOLLOW = gql`
  mutation AddFollow($newFollow: NewFollow) {
    addFollow(newFollow: $newFollow) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($newUser: NewUser) {
    addUser(newUser: $newUser) {
      _id
      name
      username
      email
    }
  }
`;
