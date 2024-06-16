import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientsQueries';

export default function AddClientModel() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone},
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            })
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, phone);

        if(name === '' || email === '' || phone === '') {
            return alert('please fill all the fileds...');
        }

        addClient(name, email, phone);
        
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addClientModel"
            >
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Add Client</div>
                </div>
            </button>

            <div
                className="modal fade"
                id="addClientModel"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Add Client
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
                                    <label className="form-label">Name</label>
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
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        // placeholder='Email'
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type='text'
                                        id="phone"
                                        value={phone}
                                        // placeholder='Phone'
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <button type='submit' data-bs-dismiss="model" className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
