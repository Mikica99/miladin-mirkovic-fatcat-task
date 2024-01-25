import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface DataProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface ListComponentProps {
    dataProp?: any;
}

const ListComponent: React.FC<ListComponentProps> = (dataProp) => {
 
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if ( Object.keys(dataProp).length == 0 ) {
                const fetchData = async () => {
                    try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/users');
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data: DataProps[] = await response.json();
                    
                    setData(data);
                    } catch (error) {
                    console.log('--error', error);
                    //setError(error.message);
                    } finally {
        
                    setLoading(false);
                    }
                };
      
          fetchData();
        } else {
            //should fix this
            setData(dataProp['dataProp']);
        }


       
      }, []);

  return (
    <div className={clsx(
        'min-h-screen',
        'p-8',
        'sm:p-16',
        'bg-cream',
        )}>
        <div className={clsx(
            'w-full',
            'bg-white',
            'p-4',
            'rounded-lg',
        )}>
        <div className={clsx('flex', 'flex-col', 'font-medium', 'm-5')} >User List</div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-2 gap-8 w-8/12">
                    {data.map(data => (
                        <div key={data.id} className="flex flex-col gap-2">
                            <div className="text-2xl font-bold">{data.id}</div>
                            <div className="text-2xl font-bold">{data.name}</div>
                            <div className="text-2xl font-bold">{data.username}</div>
                            <div className="text-2xl font-bold">{data.email}</div>
                            <div className="text-2xl font-bold">{data.phone}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ListComponent;
