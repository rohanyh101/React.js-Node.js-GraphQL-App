import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientsQueries';

export default function AddProjectModel() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    // get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, phone);

        if (name === '' || description === '' || status === '') {
            return alert('please fill all the fileds...');
        }

        addProject(name, description, clientId, status);

        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    };

    if (loading) return null;
    if (error) return <p>Something Went Wrong</p>;

    // console.log(data);

    return (
        <>
            {!loading && !error && (
                <>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addProjectModel"
                    >
                        <div className="d-flex align-items-center">
                            <FaList className="icon" />
                            <div>New Project</div>
                        </div>
                    </button>

                    <div
                        className="modal fade"
                        id="addProjectModel"
                        tabIndex={-1}
                        aria-labelledby="addProjectModelLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1
                                        className="modal-title fs-5"
                                        id="addProjectModelLabel"
                                    >
                                        New Project
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form action="" onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                // placeholder='Name'
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control"
                                            ></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                value={status}
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                                className="form-select"
                                            >
                                                <option value="new">
                                                    Not Started
                                                </option>
                                                <option value="progress">
                                                    In Progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Client
                                            </label>
                                            <select
                                                id="clientId"
                                                value={clientId}
                                                onChange={(e) =>
                                                    setClientId(e.target.value)
                                                }
                                                className="form-select"
                                            >
                                                <option value="">
                                                    Select Client
                                                </option>
                                                {data?.clients?.map(
                                                    (client) => {
                                                        return (
                                                            <option
                                                                key={client.id}
                                                                value={client.id}
                                                            >
                                                                {client.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            data-bs-dismiss="model"
                                            className="btn btn-primary"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
