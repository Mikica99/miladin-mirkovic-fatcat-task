import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  text: string;
  link: string;
  openComponent?: boolean;
}

const Card: React.FC<CardProps> = ({ title, text, link, openComponent }) => {

  const navigate = useNavigate();

  function handleClick(mod: string){
    //navigate(mod);
    window.open(mod, '_blank');
  }


  return (
    <div
    className={clsx(
      'flex',
      'flex-col',
      'gap-4',
      'p-4',
      'bg-white',
      'py-6',
      'px-4',
      'rounded-2xl'
    )}
  >
    <h2 className={clsx(
        'text-black',
        'text-2xl',
        'leading-normal',
        'font-medium' )}
    >
      {title} 
    </h2>
    <p className={clsx('text-gray80', 'text-base', 'leading-relaxed')}>
      {text} 
    </p>
    { !openComponent ?
      <a href={link}
        className={clsx(
          'mt-auto',
          'flex',
          'items-center',
          'text-primary',
          'gap-2.5'
        )}>
          Read more
          <img src="/media/landing/arrow-purple.svg" alt="" />
      </a>
      :
      <span 
        className={clsx(
          'mt-auto',
          'flex',
          'items-center',
          'text-primary',
          'gap-2.5',
          'cursor-pointer'
        )}
          onClick={(e)=>{handleClick(link)}}
        >
          Open
          <img src="/media/landing/arrow-purple.svg" alt="" />
      </span>
    }

  </div>
  );
};

export default Card;
