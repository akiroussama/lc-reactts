import blank_profile from './avatar.png';
import { Skill } from './Skill';
import './Wilder.css';
import Proptypes from "prop-types";
import styledComponents from 'styled-components';
import { IWilder } from './interfaces';

const Card = styledComponents.article<{}>`
    padding: 20px;
    border: 1px solid #c9c9c9;
    border-radius: 7px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);

    h3, h4 {
        color: green;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: start;
    }
`;

interface IProps extends IWilder {
    
}

/**
export function Wilder(props: IProps) {
    const city = props.city;
    const name = props.name;
    const skills = props.skills;
    const _id = props._id;
 */
export function Wilder({ city, name, skills, _id }: IProps): JSX.Element {
    return (
        <Card>
            <h3>{name} from {city}</h3>
            <p>{_id}</p>
            <h4>Wild Skills</h4>
            <button>Supprimer</button>
            <ul className="skills">
                <Skill
                    title={12 as any}
                    votes={13} />
                {skills.map((skill, index) => <Skill
                    key={index}
                    title={12 as any}
                    votes={skill.votes} />)}
            </ul>
        </Card>
    );
};

Wilder.propTypes = {
    name: Proptypes.string.isRequired,
    city: Proptypes.string.isRequired,
    skills: Proptypes.arrayOf(Proptypes.shape({
        title: Proptypes.string.isRequired,
        votes: Proptypes.number.isRequired
    }))
};





