import React, { useContext } from 'react';
import { getDomain } from '../../utils/';
import { Link } from 'react-router-dom';

import FirebaseContext from '../../context/Firebase/firebaseContext';

function LinkItem({ link, showCount, index, history }) {
  const firebaseContext = useContext(FirebaseContext);

  const { db, authUser } = firebaseContext;

  const handleVote = () => {
    if (!authUser) {
      history.push('/login');
    } else {
      const voteRef = db.collection('links').doc(link.id);
      voteRef.get().then(doc => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = {
            votedBy: { id: authUser.uid, name: authUser.displayName }
          };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes });
        }
      });
    }
  };

  const postedByAuthUser = authUser && authUser.uid === link.postedBy.id;

  const handleDeleteLink = async () => {
    const linkRef = db.collection('links').doc(link.id);
    try {
      await linkRef.delete();
      console.log(`Documnet with ID ${link.id} deleted`);
    } catch (error) {
      console.error('Error deleting document');
    }
  };

  return (
    <div className="flex" style={{ marginTop: '10px' }}>
      <div className="flex">
        {showCount && <span className="gray">{index}.</span>}
        <div
          className="vote-button"
          style={{ cursor: 'pointer' }}
          onClick={handleVote}
        >
          ▲
        </div>
      </div>
      <div>
        <div>
          {link.description} <span className="link">{getDomain(link.url)}</span>
        </div>
        <div className="f6 gray">
          {link.votes.length} votes {'|'} by {link.postedBy.name} {link.created}
          &nbsp; {'|'} &nbsp;
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0
              ? `${link.comments.length} comments`
              : 'discuss'}
          </Link>
          &nbsp; {'|'} &nbsp;
          {postedByAuthUser && (
            <>
              <span className="delete-button" onClick={handleDeleteLink}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LinkItem;
