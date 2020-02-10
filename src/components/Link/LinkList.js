import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../../context/Firebase/firebaseContext';
import LinkItem from './LinkItem';

function LinkList(props) {
  const firebaseContext = useContext(FirebaseContext);
  const { db } = firebaseContext;

  const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = () => {
    db.collection('links').onSnapshot(handleSnapShot);
  };

  const handleSnapShot = snapshot => {
    const links = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    setLinks(links);
  };

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
