import React, { useEffect, useState } from 'react';

function ShoeForm() {

    const [fullBins, setFullBins] = useState([]);
    const [manu, setManu] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [pic, setPic] = useState('');
    const [bin, setBin] = useState('');

    const handleManuChange = (event) => {
        const value = event.target.value;
        setManu(value);
    }
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handlePicChange = (event) => {
        const value = event.target.value;
        setPic(value);
    }
    const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value);
    }

    const binsData = async () => {
        const binsUrl = "http://localhost:8100/api/bins/";
        const response = await fetch(binsUrl);

        if (response.ok){
            const data = await response.json();
            setFullBins(data.bins);
        }
    }

    useEffect(() => {
        binsData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.manufacturer = manu;
        data.model_name = name;
        data.color = color;
        data.picture = pic;
        data.bin = bin

        const shoeUrl = `http://localhost:8080${bin}shoes/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();

            setManu('');
            setName('');
            setColor('');
            setPic('');
            setBin('');
        };
    };

    return (
        <div className="row">
            <div>
                <h1>Add a new shoe</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input value={manu} onChange={handleManuChange} placeholder="Manufacturer" required type="text" id="manufacturer" name="manufacturer" className="form-control" />
                    <label htmlFor="manfacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={name} onChange={handleNameChange} placeholder="Model Name" required type="text" id="model_name" name="model_name" className="form-control" />
                    <label htmlFor="model_name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" id="color" name="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={pic} onChange={handlePicChange} type="url" id="picture" name="picture" className="form-control"/>
                    <label htmlFor="picture">Picture:</label>
                </div>
                <div className="mb-3">
                    <select value={bin} onChange={handleBinChange} required id="bin" name="bin" className="form-select">
                        <option value="">Choose a Bin</option>
                        {fullBins.map(bin => {
                            return (
                                <option key={bin.href} value={bin.href}>
                                    {bin.closet_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    )
}

export default ShoeForm
