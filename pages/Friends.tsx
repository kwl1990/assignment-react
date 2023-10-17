import React, { useEffect, useState } from 'react'
import Table from "../components/Table";
import Modal from "../components/Modal";
import {useToast} from "../components/ToastService";


function Friends()
{
    const toast = useToast();
    const [fetchData, setFetchData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({
        id: 0,
        nickname: '',
        age: 0,
    })

    const failedToast = (message) => {
        toast.open(
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Failed
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{message}</p>
                </div>
            </div>
        )
    }

    const successToast = (message) => {
        toast.open(
            <div role="alert">
                <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                    Success
                </div>
                <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                    <p>{message}</p>
                </div>
            </div>
        )
    }

    const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
      }

    const getFriendsData = async() => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-Api-Key' : import.meta.env.VITE_API_KEY },
        };

        const response = await fetch(import.meta.env.VITE_API_URL + "/api/Friends/GetAll?search=" + search, requestOptions);
    
        if(!response.ok){
            setLoading(false);
            failedToast("Fetching Failed..");
            throw new Error("Fetching Failed..");
        }
        else{
            setLoading(false);
            return response.json();
        }
    }

    const searchList = async() => {
        setLoading(true);
        getFriendsData().then((response) => {
            setLoading(false);
            setFetchData(response.value);
        }).catch((e) => {
            setLoading(false);
            setErrorMsg(e.message);
        });
    }

    const AddFriends = async() => {
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Api-Key' : import.meta.env.VITE_API_KEY },
            body: JSON.stringify({ id:form.id, nickname: form.nickname, age: form.age })
        };
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/Friends/CreateEdit', requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                setLoading(false);
                failedToast(error);
                return Promise.reject(error);
            }

            if(data.status == 'Failed'){
                setLoading(false);
                failedToast(data.message);
                console.log(data.message);
            }
            else{
                successToast('Bingo..Success');
                console.log('Bingo..Success');
                setShowModal(false);
                getFriendsData().then((response) => {
                    setLoading(false);
                    setFetchData(response.value);
                }).catch((e) => {
                    setLoading(false);
                    setErrorMsg(e.message);
                });

                setForm({
                    id: 0,
                    nickname: '',
                    age: 0,
                });
            }
            setLoading(false);

        })
        .catch(error => {
            failedToast(error);
            console.error('Failed!', error);
            setLoading(false);
        });
    }
    
    useEffect(() => {
        setLoading(true);
        getFriendsData().then((response) => {
            setLoading(false);
            setFetchData(response.value);
        }).catch((e) => {
            setLoading(false);
            setErrorMsg(e.message);
        });
    }, []);

    const editRow = async(value: {value : number}) => {
        setShowModal(true);
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-Api-Key' : import.meta.env.VITE_API_KEY },
        };

        const response = await fetch(import.meta.env.VITE_API_URL + "/api/Friends/Get?id="+value, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                setLoading(false);
                failedToast(error);
                return Promise.reject(error);
            }

            if(data.status == 'Failed'){
                setLoading(false);
                failedToast(data.message);
                console.log(data.message);
            }
            else{
                setForm({
                    id: data.value.id,
                    nickname: data.value.nickname,
                    age: data.value.age,
                });
                setLoading(false);
            }

        })
        .catch(error => {
            setLoading(false);
            failedToast(error);
            console.error('There was an error!', error);
        });

    }

    const deleteRow = async(value: {value : number}) => {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'X-Api-Key' : import.meta.env.VITE_API_KEY  },
        };

        const response = await fetch(import.meta.env.VITE_API_URL + '/api/Friends/Delete?id='+value, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                failedToast(error);
                return Promise.reject(error);
            }

            if(data.status == 'Failed'){
                failedToast(data.message);
                console.log(data.message);
            }
            else{
                successToast('Bingo..Record Deleted');
                console.log('Bingo..Success');
                getFriendsData().then((response) => {
                    setLoading(false);
                    setFetchData(response.value);
                }).catch((e) => {
                    setLoading(false);
                    setErrorMsg(e.message);
                });
            }

        })
        .catch(error => {
            failedToast(error);
            console.error('There was an error!', error);
        });

    }

    const columns = React.useMemo(
        () => [
          {
            Header: "Nickname",
            accessor: "nickname",
          },
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Action",
            accessor: 'id',
            Cell: ({value}) => (
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={ e=> editRow(value)}>
                        Edit
                    </button>
                    <button type="button" className="px-4 py-2 text-sm font-medium text-rose-700 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-rose-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-rose-700 dark:hover:text-rose-700 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-rose-700" onClick={ e=> deleteRow(value)}>
                        Delete
                    </button>
                </div>
            )
          },
        ],
        []
      );
    
      //const data = React.useMemo(() => getFriendsData(), []);

    return (
        <>
            <div className="min-h-screen bg-gray-100 text-gray-900">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <div className="text-xl font-semibold pt-20 items-center justify-center flex-col text-center">
                        Friends List
                    </div>
                    <div className="flex flex-row items-center justify-center text-center">
                        <input
                        type="text"
                        value = {search || ""}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        placeholder={`Search records...`}
                        onChange={e => {
                            setSearch(e.target.value);
                          }}
                        />
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => searchList()}>
                            Search
                        </button>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setShowModal(true)}>
                            Add New
                        </button>
                        </div>
                    <div className="mt-4">
                        <Table columns={columns} data={fetchData} />
                    </div>
                </main>
            </div>
            <Modal isVisible={showModal} onClose={() => {setShowModal(false); setForm({id: 0,nickname: '',age: 0,})}} >
                <form className="mt-6">
                    <div className="mb-2 hidden">
                        <label>
                            <span className="text-gray-700">ID</span>
                            <input
                                id="id"
                                type="text"
                                name="id"
                                value = {form.id}
                                className="

                            w-full
                            block px-16 py-2 mt-2
                            border-gray-300
                            rounded-md
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                            "
                            required
                            onChange={changeHandler}
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label>
                            <span className="text-gray-700">Nickname</span>
                            <input
                                id="nickname"
                                type="text"
                                name="nickname"
                                value = {form.nickname}
                                className="

                            w-full
                            block px-16 py-2 mt-2
                            border-gray-300
                            rounded-md
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                            "
                            required
                            onChange={changeHandler}
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label>
                            <span className="text-gray-700">Age</span>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                value = {form.age}
                                className="
                            block
                            w-full
                            mt-2 px-16 py-2 mb-5
                            border-gray-300
                            rounded-md
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                            "
                            required 
                            onChange={changeHandler}
                            />
                        </label>
                    </div>
                    <div className="mb-6 items-center justify-center text-center">
                        <button type="button" onClick={() => AddFriends()} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                           Submit
                        </button>
                    </div>
                    <div></div>
                </form>
            </Modal>
            <Modal isVisible={loading} onClose={() => setLoading(false)}>
                    <div className="items-center justify-center text-center">Processing.. Please Wait..</div>
            </Modal>
        </>
    );

}

export default Friends;