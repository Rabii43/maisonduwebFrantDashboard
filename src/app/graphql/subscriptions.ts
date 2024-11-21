import gql from 'graphql-tag';

export const GET_REALTIME_CURRENCY_RATES = gql`
  subscription {
    currency_rates {
      id
      currency_pair
      rate
      timestamp
    }
  }
`;
