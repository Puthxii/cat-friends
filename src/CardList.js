import React, { useState, useEffect } from 'react';
import Card from './Card';
import SearchBox from "./SearchBox";

const CardList = () => {
    const [cats, setCats] = useState([]);
    const [searchField, setSearchField] = useState('');

    const filteredCats= cats.filter(cat => {
        return cat.name.toLowerCase().includes(searchField.toLowerCase());
    });

    const onSearchChange = (event) => {
      setSearchField(event.target.value);
    };

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
          .then((results) => {
              return results.json();
          }).then(data => {
            setCats(data);
        });
    },[]);

    return (<div className='tc'>
        <h1 className='f1'>Cat Friends</h1>
        <SearchBox searchChange={onSearchChange}/>
        {
            filteredCats.map((user, i) => {
                return (
                  <Card
                    key={filteredCats[i].id}
                    id={filteredCats[i].id}
                    name= {filteredCats[i].name}
                    email={filteredCats[i].email}
                  />
                );
            })
        }
    </div>);
}

export default CardList;
