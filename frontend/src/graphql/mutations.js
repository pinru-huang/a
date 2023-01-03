import { gql } from '@apollo/client';
export const  UPDATE_MY_INFO = gql`
    mutation updateMyInfo($name: String, $age:Int ,$opassword:String,$npassword:String) {
        updateMyInfo(input:{name: $name, age: $age,opassword:$opassword,npassword:$npassword}) {
            id
            email
            name
            age
        }
    }`
;
export const SINGUP=gql`
    mutation signUp($name:String,$email:String!,$password:String!){
        signUp(name:$name,email:$email,password:$password){
            id
            email
            name
            age 
        }
    }
`;
export const LOGIN=gql`
    mutation login($email:String!,$password:String!){
        login(email:$email,password:$password){
            token
        }
    }
`;

// updateMyInfo(input: UpdateMyInfoInput!): User
//       addFriend(userId: ID!): User
//       addPost(input: AddPostInput!): Post
//       likePost(postId: ID!): Post
//       deletePost(postId: ID!): Post
//       "註冊。 email 與 passwrod 必填"
//       signUp(name: String, email: String!, password: String!): User
//       "登入"
//       login (email: String!, password: String!): Token