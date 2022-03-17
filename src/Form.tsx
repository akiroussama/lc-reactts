import axios from "axios";
import { useState } from "react";
import { ISkill } from "./interfaces";

interface IProps {
    onWilderCreated: () => void;
    onError?: () => void;
}

/**
                            const newValue = e.target.value;
                            skill.title = newValue;
                            setSkills([...skills]);
 */

export function Form(props: IProps): JSX.Element {
    const [name, setName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [skills, setSkills] = useState<ISkill[]>([]);

    const addSkill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        // nécessaire pour éviter l'envoie du formulaire
        e.preventDefault();
        const newSkills = skills.slice();
        newSkills.push({ title: "", votes: 0 });
        setSkills(newSkills);
    }

    const deleteSkill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void => {
        // nécessaire pour éviter l'envoie du formulaire
        e.preventDefault();
        const newSkills = skills.slice();
        newSkills.splice(index, 1);
        setSkills(newSkills);
    }

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const data = {
                name: name,
                city: city,
                skills: skills
            };

            console.log("Wilder to create: ", data);

            const result = await axios.post('http://localhost:4000/api/wilders', data);
            console.log(result.data);

            setName('');
            setCity('');
            setSkills([]);

            if (props.onWilderCreated) {
                props.onWilderCreated();
            }
        } catch {
            if (props.onError) {
                props.onError();
            }
        }
    }

    return (
        <form onSubmit={submitForm}>
            <label htmlFor='name'>Name</label>
            <input type="text" name="name" onChange={(event) => setName(event.target.value)} value={name} />
            <label htmlFor='city'>City</label>
            <input type="text" name="city" onChange={(event) => setCity(event.target.value)} value={city} />
            <br /><br />
            <button onClick={addSkill}>Ajouter un skill</button>
            {
                skills.map((skill, index) => <div key={index}>
                    <input
                        type="text"
                        value={skill.title}
                        placeholder="Skill title"
                        onChange={(e) => {
                            const newValue = e.target.value;
                            const newSkills = skills.slice();
                            newSkills.splice(index, 1, { ...skill, title: newValue });
                            setSkills(newSkills);
                        }}></input>
                    <input
                        type="number"
                        value={skill.votes}
                        placeholder="Number of votes"
                        onChange={(e) => {
                            const newValue = e.target.value;
                            const newSkills = skills.slice();
                            newSkills.splice(index, 1, { ...skill, votes: Number(newValue) });
                            setSkills(newSkills);
                        }}></input>
                    <button onClick={(e) => deleteSkill(e, index)}>Supprimer</button>
                </div>)
            }
            <br /><br />
            <button type="submit">Go!</button>
        </form>
    );
};