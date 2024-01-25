import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { z, ZodError } from 'zod';
import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';


const formSchema = z.object({
    title: z.string().min(1).max(50),
    body: z.string().min(1).max(200),
  });


interface FormValues {
    title: string;
    body: string;
  }

interface MyFormProps {
    onSubmit?: (data: FormValues) => void;
  }  

const FormGenerator: React.FC<MyFormProps> = ({ onSubmit }) => {


    const [formData, setFormData] = useState({ 
        title: '',
        body: '',
    });

    const [errors, setErrors] = useState({
        body: '',
        title: '',
      });
  
    const handleChange = (field, value) => {
        
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };
    
    const onSubmitFunction = async (e) => {
        e.preventDefault();
        
        try {
            formSchema.parse(formData);
           
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (!response.ok) {
              throw new Error('Failed to submit the form');
            }
      
            console.log('Form submitted successfully');
            setFormData({title: '',  body: ''});
            setErrors({title: '', body: ''});
          } catch (error) {
           
            if (error instanceof ZodError) {
                
                const fieldErrors = {
                    body: '',
                    title: '',
                };

                error.errors.forEach((err) => {
                    const field = err.path.join('.');
                    fieldErrors[field] = err.message;
                    setErrors({ ...errors, [field]: err.message });
                });

                setErrors(fieldErrors);
              } else {
                console.error('Unexpected error:', error);
              }
          }
    }

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
            <div className={clsx('flex', 'flex-col', 'font-medium', 'm-5')} >Form Generator</div>
            <form onSubmit={onSubmitFunction}>
                <div
                    className={clsx(
                        'p-4'
                    )}
                >
                    <input type='text' 
                        placeholder='Title'
                        name='title'
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        required
                        className={clsx(
                            'p-4',
                            'text-black',
                            'border-solid',
                            'border',
                            'rounded-lg',
                        )}
                    />
                    {errors.title && 
                        <p className={clsx(
                            'p-4',
                            'text-red'
                        )}>
                            {errors.title}
                        </p>
                    }
                </div>

                <div
                    className={clsx(
                        'p-4'
                    )}      
                >
                    <textarea
                        value={formData.body}
                        onChange={(e) => handleChange('body', e.target.value)}
                        placeholder="Body"
                        rows={4} 
                        cols={50}
                        required
                        className={clsx(
                            'p-4',
                            'text-black',
                            'border-solid',
                            'border',
                            'rounded-lg',
                        )}
                    />
                    {errors.body && 
                        <p className={clsx(
                            'p-4',
                            'text-red'
                        )}>
                            {errors.body}
                        </p>
                    }
                </div>
                <button 
                    className={clsx(
                        'bg-black',
                        'p-4',
                        'rounded-lg',
                        'text-white',
                        'm-5'
                    )}
                type="submit"> Submit </button>
            </form>
        </div>
    </div>
  );
};

export default FormGenerator;
