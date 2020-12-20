import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";
const GET_ORGANISATIONS = gql`
  query {
    getOrganisations {
      id
      name
      levels {
        id
        name
        projects {
          id
          name
          myRole
          usersWall {
            id
            fullName
          }
        }
      }
    }
  }
`;
const GET_POST = gql`
  query getPosts($project: String, $tag: String) {
    getPosts(project: $project, tag: $tag) {
      id
      media
      body
      createdAt
      likes
      isMyPost
      createdBy {
        id
        lastName
        firstName
        fullName
        profile {
          id
        }
      }
      comments {
        id
        body
        isMyComment
        createdAt
        createdBy {
          id
          lastName
          firstName
          fullName
        }
      }
    }
  }
`;
const ADD_POST = gql`
  mutation addPost($input: InputPost) {
    addPost(input: $input) {
      id
      media
      body
      createdAt
      likes
      isMyPost
      createdBy {
        id
        lastName
        firstName
        fullName
        profile {
          id
        }
      }
      comments {
        id
        body
        createdAt
        isMyComment
        createdBy {
          id
          lastName
          firstName
          fullName
        }
      }
    }
  }
`;

const ADD_QUESTION = gql`
  mutation addQuestion($input: FivePointInput) {
    addQuestion(input: $input) {
      id
      question
    }
  }
`;
const REPLAY_QUESTION = gql`
  mutation replayQuestion($fiveId: ID, $rating: Float) {
    replayQuestion(fiveId: $fiveId, rating: $rating) {
      id
      question
    }
  }
`;
const GET_QUESTIONS = gql`
  query getFivePoints($project: String) {
    getFivePoints(project: $project) {
      id
      question
      reviews{
        userWall{
          firstName
          lastName
        }
        rating
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($input: InputComment) {
    addComment(input: $input) {
      id
      body
    }
  }
`;
const ADD_LIKE = gql`
  mutation addLike($post: String) {
    addLike(post: $post) {
      id
      body
    }
  }
`;
const DELETE_POST = gql`
  mutation deletePost($post: String) {
    deletePost(post: $post) {
      id
      body
    }
  }
`;
const UPDATE_POST = gql`
  mutation updatePost($id: String, $input: InputPost) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;

const UPDATE_COMMENT = gql`
  mutation updateComment($id: String, $input: CommentUpdate) {
    updateComment(id: $id, input: $input) {
      id
      body
    }
  }
`;
const DELETE_COMMENT = gql`
  mutation deleteComment($id: String) {
    deleteComment(id: $id) {
      id
      body
    }
  }
`;
const GET_NOTIFICATIONS = gql`
  query {
    getNotifications {
      id
      body
      readed
      createdAt
      project {
        name
      }
    }
  }
`;
const READ_NOTIFICATIONS = gql`
  mutation {
    updateNotifications
  }
`;

export const useMutationNotifications = () => {
  const [update] = useMutation(READ_NOTIFICATIONS);
  function readNotification() {
    return update();
  }
  return { readNotification };
};
export const useQueryNotifications = () => {
  const { data, ...rest } = useQuery(GET_NOTIFICATIONS, {
    pollInterval: 4000
  });
  return { data: data?.getNotifications };
};
export const useQueryOrganisation = () => {
  const { data, loading } = useQuery(GET_ORGANISATIONS);
  return {
    data: data?.getOrganisations,
    loading
  };
};
export const useQueryPosts = (project = null, tag = null) => {
  const { data, loading } = useQuery(GET_POST, {
    variables: {
      project,
      tag
    },
    pollInterval: 4000
  });
  console.log({ data });
  return { data: data?.getPosts };
};
export const useMutationPost = () => {
  const [addCom] = useMutation(ADD_COMMENT);
  const [add] = useMutation(ADD_POST);
  const [addLi] = useMutation(ADD_LIKE);
  const [del] = useMutation(DELETE_POST);
  const [up] = useMutation(UPDATE_POST);
  const [deleteCom] = useMutation(DELETE_COMMENT);
  const [updateComm] = useMutation(UPDATE_COMMENT);
 
  function updateComment({ id, input, project }) {
    return updateComm({
      variables: {
        id,
        input
      },
      refetchQueries: [{ query: GET_POST, variables: { project } }]
    });
  }
  function deleteComment(id, project) {
    return deleteCom({
      variables: {
        id
      },
      refetchQueries: [{ query: GET_POST, variables: { project } }]
    });
  }
  function addPost({ input, project = null }) {
    return add({
      variables: {
        input
      }
    });
  }
  function addComment({ input, project = null }) {
    return addCom({
      variables: {
        input
      },
      refetchQueries: [{ query: GET_POST, variables: { project } }]
    });
  }
  function addLike(post, project = null) {
    return addLi({
      variables: {
        post
      },
      refetchQueries: [{ query: GET_POST, variables: { project } }]
    });
  }
  function deletePost(post, project = null) {
    return del({
      variables: {
        post
      },
      refetchQueries: [{ query: GET_POST, variables: { project } }]
    });
  }
  function updatePost({ id, input, project = null }) {
    return up({
      variables: {
        id,
        input
      },
      refetchQueries: [{ query: GET_POST, variables: { project } }]
    });
  }
  
  return {
    addPost,
    addComment,
    addLike,
    deletePost,
    updatePost,
    updateComment,
    deleteComment,
    
  };
};

export const useMutationQuestion = () => {
  const [add] = useMutation(ADD_QUESTION);
  const [replay] = useMutation(REPLAY_QUESTION);
  function addQuestion({ input }) {
    return add({
      variables: {
        input
      }
    });
  }
  function replayQuestion({ fiveId, rating }) {
    return replay({
     variables:{
      fiveId,
      rating
     }
    });
  }
  return { addQuestion,replayQuestion };
};

export const useQueryQuestions = (project = null) => {
  const { data } = useQuery(GET_QUESTIONS, {
    variables: {
      project
    },
    pollInterval: 4000
  });
  return { data: data?.getFivePoints };
};
const ME = gql`
  query {
    getMyProfile {
      id
      lastName
      firstName
      userName
      fullName
      photoUrl
    }
  }
`;
export const useQueryProfile = () => {
  const { data } = useQuery(ME);
  return {
    data: data?.getMyProfile
  };
};
