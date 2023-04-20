import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HatList() {
    const [hats, setHats] = useState([]);
    const [del, setDel] = useState(null);

    const loadHats = async () => {
        const response = await fetch('http://localhost:8090/api/hats/');
        if (response.ok) {
          const data = await response.json();
          setHats(data.hats);
        }
    };
    useEffect(() => {loadHats();}, []);

    const handleDelete = async (event, hatId) => {
        event.preventDefault();
        const url = `http://localhost:8090/api/hats/${hatId}`;

        const fetchConfig = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setHats(hats.filter(hat => hat.id !== hatId));
        }
    };

    const confirmDelete = (hatID) => { setDel(hatID) };

    return (
      <div className="container">
        <h2>Hats</h2>
        <div>
        <Link className="btn btn-outline-danger" aria-current="page" to="/hats/new">Create New Hat</Link>
        </div>
        <div className="row align-items-start">
          {hats.map(hat => (
            <div key={hat.id} className="card col-md-4 mb-3 gap-2 shadow">
              <img src={hat.picture} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{hat.color} {hat.fabric} {hat.style_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{hat.location.import_href}</h6>
                {(del === hat.id) ? (
                    <button onClick={(event) => handleDelete(event, hat.id)} className="btn btn-outline-danger btn-sm">Confirm Delete</button>
                ) : (
                    <button onClick={() => confirmDelete(hat.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default HatList