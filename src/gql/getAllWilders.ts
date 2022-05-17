import { gql } from "@apollo/client";

export const ALL_WILDERS = gql`
	query GetAllWilders {
		getAllWilders {
			name
			city
			skills {
				votes
				title
			}
		}
	}
`;
