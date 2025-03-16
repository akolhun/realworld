
import { useState, useEffect, useContext, PropsWithChildren } from 'react';
import Tag from '@/components/Tag';
import Article from '@/components/Article';
import { ResArticle, User, UserWrapper } from '@/store/types';
import { ThemedView } from '@/components/ThemedView';
import requests from '@/services/requests';
import styles from '@/assets/css/styles';
import LoginComponent from './LoginComponent';

export default function Post() {
  const [tagValues, setTagValues] = useState<string[]>([]);

  function tagChanged(tag: any) {
    requests.get('/articles?tag=' + tag, (err: Body, res: Body) => {
      if (err) {
        console.log(err);
      } else {
        let posts: ResArticle = JSON.parse(JSON.stringify(res.body));
        setArticles(posts)
      }
    })


  }
  const [articles, setArticles] = useState<ResArticle>();

  useEffect(() => {
    requests.get('/articles', (err: Body, res: Body) => {
      if (err) {
        console.log(err);
      } else {
        let posts: ResArticle = JSON.parse(JSON.stringify(res.body));
        setArticles(posts)
      }
    })

    return () => {
      // console.log('...')
    };
  }, []);

  return (
    <>
      <LoginComponent />
      <ThemedView style={styles.container}>
      <Tag tagValue={tagValues} setTagValue={setTagValues} onTagChanged={tagChanged} />
        <Article articles={articles} />
      </ThemedView>
    </>
  );

}
