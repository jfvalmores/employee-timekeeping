import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      404 Page not found!
      Go back <Link to="/home">home</Link>.
    </div>
  )
}

export default NotFoundPage;