import gql from "graphql-tag"

export const GET_USER = gql`

query getUser($id:String!){
    user(id:$id){

        username
        email
        posts{
            title
            id
        }
    }
}`
export const PROFILE = gql`

query getProfile($userid:ID!){
    profile(userid:$userid){
        username
        email
        posts{
            title
            id
        }
    }
}`
export const GET_POSTS=gql`query getPosts{
    posts{
        id
        title
        by{
            username
        }
    }
}
`
export const REGISTER_USER=gql
`mutation registerUser($username:String!,$password:String!,$email:String!){
    register(password:$password,email:$email,username:$username){
        id
        username
      }
}`

export const LOGIN_USER=gql`mutation LoginUser($password:String!,$email:String!){
    login(password:$password,email:$email){
        accessToken
        user{
            id
            email
        }
    }
}`
export const LOGOUT_USER=gql`mutation LogoutUser{
    logout
}`



export const CREATE_POST=gql`mutation CreatePost($id:ID!,$post:String!){
    Createpost(id:$id,post:$post)

}`

export const DELETE_POST=gql`mutation DeletePost($postid:ID!,$userid:ID!){
    Deletepost(postid:$postid,userid:$userid)
}`

export const EDIT_POST=gql`mutation EditPost($post:String!,$postid:ID!,$userid:ID!){
    Editpost(post:$post,postid:$postid,userid:$userid)

}

`;

