import { gql } from '@apollo/client';

export const ME_SUBSCRIPTION = gql`
  subscription newme($email:String){
    newme(email:$email) {
        id
        email
        name
        age
    }
  }
`;