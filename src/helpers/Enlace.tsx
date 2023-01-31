import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const Enlace = (category='', page='', id: string | number = '') => {

    const cat = typeof category != 'undefined' ? `/${category}`:'';

    return  `${`${cat}/${page}/edit/`}${id}`;
}
