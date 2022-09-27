import { gql } from '@apollo/client';

export const ALL_QUERY = gql `
query Query($input: String!) {
  category(input:{title: $input}) {
    name
    products {
      name
      id
      inStock
      gallery
      description
      prices {
        
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        name
        type
        items {
          displayValue
        }
      }
      brand
    }
  }
}
`


