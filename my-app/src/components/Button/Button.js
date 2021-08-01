import React from 'react';
import style from './button.module.css'

const Button = ({onClick}) => (
    <button type="button" className={style.Button} onClick={onClick}>
    Load more...
  </button>
);

export default Button;