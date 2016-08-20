
export default function searchSuccess(files) {
  return {
    type: 'SEARCH_SUCCESS',
    files,
  };
}

export function searchFailure() {
  return {
    type: 'SEARCH_FAILURE',
  };
}

export function globalSearch(searchType, searchInput) {
  const token = localStorage.getItem('jwtToken');
  return (dispatch) => {
    return fetch(`/api/${searchType}?q=${searchInput}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(files => dispatch(searchSuccess(files)))
    .catch(err => dispatch(searchFailure(err)));
  };
}

export function findUser(content, userInfo) {
  const token = localStorage.getItem('jwtToken');

  return fetch(`/api/users/search?q=${userInfo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  })
  .then(res => res.json())
  .then(([{ id }]) => {
    console.log('the id is', id)
    //shareContent(content, id);
  })
  .catch(err => console.log(err));
}

export function shareContent(content, userId) {
  const token = localStorage.getItem('jwtToken');

  return fetch(`/api/${content.type}/${content.id}/share`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      users: [userId],
    }),
  })
  .catch(err => console.log(err));
}
