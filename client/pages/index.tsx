import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { ItemType } from 'entities/item';
import ApiClient from '../lib/axios';

export default function Home(): React.ReactElement {
  const [itemList, setItemList] = useState<Array<ItemType>>([]);

  useEffect(() => {
    console.log(itemList);
  }, [itemList]);

  useEffect(() => {
    let tmp: any = '';

    const fetchItemList = async (): Promise<void> => {
      const { data } = await ApiClient.get('/item');
      tmp = data;

      setItemList(tmp);
    };

    fetchItemList();
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <div>
          {itemList.map((el: ItemType, index: number) => {
            if (itemList.length === 0) {
              return <div></div>;
            } else {
              return (
                <div key={index} className="result result__element">
                  <div className="result__row--number">{el.id}</div>
                  <div className="result__row--border"></div>
                  <div className="result__row--title">{el.title}</div>
                  <div className="result__row--title">{el.content}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
