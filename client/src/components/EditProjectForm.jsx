import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('new');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('please fill all the fileds...');
        }

        updateProject(name, description, status);

        setName('');
        setDescription('');
        setStatus('new');
    };

    return (
        <div className="mt-5">
            <h3>Update Project Deatils</h3>
            <form action="" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        // placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-select"
                    >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    submit
                </button>
            </form>
        </div>
    );
}
