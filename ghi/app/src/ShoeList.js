import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ShoeList() {
    const [shoes, setShoes] = useState([]);
    const [bins, setBins] = useState([]);

    const loadShoes = async() => {
        const url = "http://localhost:8080/api/shoes/"
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setShoes(data.shoes)
        }
    }
    useEffect(() => {
        loadShoes();
    }, [])

    const loadBins = async () => {
        const url = "http://localhost:8100/api/bins/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins)
        }
    }
    useEffect(() => {
        loadBins();
    }, [])

    const handleClick = async (event, id) => {
        event.preventDefault();

        const url = `http://localhost:8080/api/shoes/${id}`;
        const fetchConfig = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            setShoes(shoes.filter(shoe => shoe.id !== id))
        }
    }

    return(
        <div>
            <Link to="new" className="btn btn-outline-danger">
                Create a Shoe
            </Link>
            <div className="row align-items-start">
                {shoes.map(shoe => (
                    <div key={shoe.id} className="col-md-4 mb-4 card mb-3 shadow">
                        <img src={shoe.picture} className="card-img-top" alt="Image"/>
                        <div className="card-body">
                            <h5 className="card-title">{shoe.model_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {shoe.manufacturer}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {shoe.color}
                            </h6>
                            {bins.filter(bin => bin.href === shoe.bin.import_href).map(bin => {
                                    return (
                                        <h6 key={bin.href} >{bin.closet_name}</h6>
                                    )
                            })}
                        </div>
                        <div className="card-footer">
                            <button className="btn-outline-danger" onClick={(event) => handleClick(event, shoe.id)}>Delete</button>
                        </div>
                    </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ShoeList
