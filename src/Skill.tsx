import './Skill.css';
import Proptypes from "prop-types";
import styled from 'styled-components';

interface IBadgeProps {
    votes: number;
}

const Badge = styled.span<IBadgeProps>`
  /* Center the content */
  align-items: center;
  display: flex;
  justify-content: center;

  /* Colors */
  background-color: ${({ votes }) => votes > 20 ? 'green' : 'red'};
  color: #fff;

  /* Rounded border */
  border-radius: 9999px;
  height: 20px;
  width: 20px;
`;

interface IProps {
    title: string;
    votes: number;
}

const propTypes = {
    title: Proptypes.string.isRequired,
    votes: Proptypes.number.isRequired
};

export function Skill(props: IProps): JSX.Element {
    return (
        <li>
            {props.title}
            <Badge votes={props.votes}>{props.votes}</Badge>
        </li>
    );
};

Skill.propTypes = propTypes;