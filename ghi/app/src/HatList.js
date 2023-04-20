import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HatList() {
    const [hats, setHats] = useState([]);
    const [locations, setLocations] = useState([]);
    const [del, setDel] = useState(null);

    const loadHats = async () => {
        const response = await fetch('http://localhost:8090/api/hats/');
        if (response.ok) {
          const data = await response.json();
          setHats(data.hats);
        }
    };
    useEffect(() => {loadHats();}, []);

    const handleConfirmDelete = async (event, hatId) => {
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

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (hatID) => { setDel(hatID) };

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }
    useEffect(() => {fetchData();}, []);

    return (
      <div className="container">
        <h2 className="text-center">Hats</h2>
        <div className="text-center mb-3">
        <Link className="btn btn-outline-danger" aria-current="page" to="/hats/new">Create New Hat</Link>
        </div>
        <div className="row align-items-start">
          {hats.map(hat => (
            <div key={hat.id} className="col-md-4 mb-4">
              <div className="card shadow">
                <img src={hat.picture} className="card-img-top" alt="Image" />
                <div className="card-body">
                    <h5 className="card-title">{hat.color} {hat.fabric} {hat.style_name}</h5>
                    {locations.filter(location => location.href===hat.location.import_href).map(location =>(
                        <h6 className="card-subtitle mb-2 text-muted" key={location.href}>
                        Location: {location.closet_name} {location.section_number} {location.shelf_number}
                        </h6>
                    ))}
                    {(del === hat.id) ? (
                      <div className="d-grid gap-2">
                        <button onClick={(event) => handleConfirmDelete(event, hat.id)} className="btn btn-outline-danger btn-sm" type="button">Confirm Delete</button>
                        <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm" type="button">Cancel Delete</button>
                      </div>
                    ) : (
                        <button onClick={() => handleDelete(hat.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default HatList