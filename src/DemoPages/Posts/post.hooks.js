import gql from "graphql-tag";
import {useQuery,useMutation} from "react-apollo"
 const GET_POST =gql`
query {
  getPosts{
    id
    type
    body
    comments{
      id
      body
      type
    }
  }
}
 `
 export const useQueryPosts=()=>{
     const {data,loading} =useQuery(GET_POST);
     console.log({data});
     return {data}
 }