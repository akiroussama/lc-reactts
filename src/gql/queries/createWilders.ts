import { gql } from "@apollo/client";

export const CREATE_WILDER = gql`
	mutation createWilder($name: String, $city: String, $skills: [InputSkill]) {
		createWilder(name: $name, city: $city, skills: $skills) {
			name
			city
			skills {
				title
				votes
			}
		}
	}
`;
