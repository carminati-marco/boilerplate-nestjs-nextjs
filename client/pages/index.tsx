import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { ItemType } from 'entities/item';
import ApiClient from '../lib/axios';
import Div from '@mui/material/Divider';


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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <div className="wrapper">
        <div>
          {itemList.map((el: ItemType, index: number) => {
            if (itemList.length === 0) {
              return <div></div>;
            } else {
              return (
                <Div key={index} className="result result__element">
                  <div className="result__row--number">{el.id}</div>
                  <div className="result__row--border"></div>
                  <div className="result__row--title">{el.title}</div>
                  <div className="result__row--title">{el.content}</div>
                </Div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
