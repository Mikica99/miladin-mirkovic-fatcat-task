import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from './Layout';
import Hero from './Hero';
import ItemsShowcase from './ItemsShowcase';
import TrustBar from './TrustBar';

interface PageProps {
    dataProps?: object
  }

const PageGenerator: React.FC<PageProps> = (data) => {

    const [mainData, setMainData] = useState<any>(data['dataProps']);

    const returnAsArray = (myObject: object) =>{
        let test = Object.values(myObject);
        return test;
    }



    const testData = [
        {
            title: 'title test',
            description: 'description test'
        },
        {
            title: 'title testttttttttt',
            description: 'description tettttttttttttttttttttst'
        }
        
    ]

    const imagesArray = [
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',

    ];

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
            <div className={clsx('flex', 'flex-col', 'font-medium', 'm-5')} >Page Generator</div>

            {mainData.map((item, index) => (
                <div key={index}>
                    <Layout  {...item.props}>
                        {item.components.map((comp, ind) => (
                            <div key={ind}>
                                {comp.type == "componentHero" && 
                                    <Hero {...comp.props} ></Hero>
                                } 
                                {comp.type == "componentItemsShowcase" && 
                                    <>
                                        <ItemsShowcase items={returnAsArray(comp.props)}></ItemsShowcase> 
                                   </>
                                }
                                {comp.type == "componentTrustBar" && 
                                    <>
                                        <TrustBar images={returnAsArray(comp.props)}></TrustBar>
                                    </>
                                }
                            </div>
                         ))}
                    </Layout>
                </div>
            ))}
        </div>
    </div>
  );
};
export default PageGenerator;
