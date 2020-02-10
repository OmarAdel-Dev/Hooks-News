import React, { useState, useContext } from 'react';
import FirebaseContext from '../../context/Firebase/firebaseContext';

function CreateLink(props) {
  const { db, authUser } = useContext(FirebaseContext);

  const [link, setLink] = useState({
    description: '',
    url: ''
  });

  const { description, url } = link;

  const onChange = e => {
    setLink({ ...link, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!authUser) {
      props.history.push('/login');
    } else {
      const newLink = {
        url,
        description,
        postedBy: {
          id: authUser.uid,
          name: authUser.displayName
        },
        votes: [],
        comments: [],
        created: new Date().toLocaleString().split(',')[0]
      };

      db.collection('links').add(newLink);
      props.history.push('/');
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-column">
      <input
        type="text"
        minLength="10"
        placeholder="A desription for your link"
        autoComplete="off"
        name="description"
        value={description}
        onChange={onChange}
        required
      />
      <input
        type="url"
        placeholder="The Url for the link"
        autoComplete="off"
        name="url"
        value={url}
        onChange={onChange}
        required
      />
      <button className="button">Submit</button>
    </form>
  );
}

export default CreateLink;
