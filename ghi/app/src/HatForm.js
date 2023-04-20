import React, { useState, useEffect } from 'react';

function HatForm() {
    const [locations, setLocations] = useState([]);

    const [formData, setFormData] = useState({
        fabric: '',
        style_name: '',
        color: '',
        picture: '',
        location: '',
    })

    const [isCreated, setIsCreated] = useState(false);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }
    useEffect(() => {fetchData();}, []);

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({...formData ,[inputName]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/hats/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                fabric: '',
                style_name: '',
                color: '',
                picture: '',
                location: '',
            });
            setIsCreated(true);
        }
    }

    let formClasses = "";
    let successClasses = "alert alert-success mb-0 d-none";
    if (isCreated) {
        formClasses = "d-none";
        successClasses = "alert alert-success mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={handleSubmit} className={formClasses}>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.fabric} placeholder="Fabric" required type="text" name="fabric" className="form-control" />
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.style_name} placeholder="Style name" required type="text" name="style_name" className="form-control" />
                <label htmlFor="style_name">Style name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.color} placeholder="Color" type="text" name="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.picture} placeholder="Picture" required type="url" name="picture" className="form-control" />
                <label htmlFor="picture">Picture</label>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} value={formData.location} required name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => (
                    <option key={location.href} value={location.href}>
                        Closet: {location.closet_name}  Section: {location.section_number}  Shelf: {location.shelf_number}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className={successClasses}>
                Congratulations! You've created a new hat!
            </div>
          </div>
        </div>
      </div>
    );
}

export default HatForm