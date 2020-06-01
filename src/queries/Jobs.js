import { gql } from "apollo-boost";

const QUERY_JOBS = gql`
  query fetchJobs($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      id
      title
      city
      company_id
      company {
        id
        name
      }
    }
  }
`;

const FILTER_JOBS = gql`
  query MyQuery(
    $title: String
    $company: Int
    $city: String
    $limit: Int
    $offset: Int
  ) {
    jobs(
      where: {
        title: { _ilike: $title }
        _or: {
          city: { _eq: $city }
          _or: { company: { id: { _eq: $company } } }
        }
      }
      offset: $offset
      limit: $limit
    ) {
      title
      id
      company_id
      company {
        name
        id
      }
      city
    }
  }
`;

export { QUERY_JOBS, FILTER_JOBS };
