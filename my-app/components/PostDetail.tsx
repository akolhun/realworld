import { ThemedView } from '@/components/ThemedView';
import requests from '@/services/requests';
import { ArticleWrapper, Comment, CommentWrapper } from '@/store/types';
import { Text, ScrollView, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import styles from '@/assets/css/styles';
import LoginComponent from './LoginComponent';
import { AuthContext } from '@/hooks/useAuthContext';


export default function PostDetail() {

  const [article, setArticle] = useState<ArticleWrapper>();
  const [comments, setComments] = useState<Comment[]>();
  const params = useLocalSearchParams<{ id: string }>();
  const [addCommentText, setAddCommentText] = useState<string>();

  const authContext = useContext(AuthContext)


  useEffect(() => {
    console.log(params.id)
    requests.get('/articles/' + params.id, (err: Body, res: Body) => {
      if (err) {
        console.log(err);
      } else {
        let post: ArticleWrapper = JSON.parse(JSON.stringify(res.body));
        setArticle(post)
      }
    },
    null
  )

  requests.get('/articles/' + params.id + '/comments', (err: Body, res: Body) => {
    if (err) {
      console.log(err);
    } else {
      let comments: CommentWrapper = JSON.parse(JSON.stringify(res.body));
      setComments(comments.comments)
    }
  },
  null
)
    return () => {
    };
  }, [params.id]);


  const submitComment = (e: any) => {
    console.log(addCommentText)
    requests.post('/articles/' + params.id + '/comments', {'comment': {'body': addCommentText,}} ,  (err: Body, resp: Body) => {
          if (err) {
            console.log(err)
          } else {
            setComments([...comments, {'body': addCommentText, 'author': {username: authContext?.authUser?.username}}])
            setAddCommentText('')
          }
        },
      authContext?.authUser?.token?authContext?.authUser?.token:''
    )

  };


  let listComments = comments?.map(comment => <>
  <Text style={{ fontSize: 14 }}>{comment.body}</Text>
  <Text style={{ fontSize: 13 }}>{'by ' + comment.author.username +  '\n'}</Text>
  </>
  )

  return (

    <ThemedView style={styles.container}>
      <LoginComponent />
      <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{article?.article.title + '\n'}</Text>
      <Text style={{ fontSize: 12 }}>{article?.article.createdAt} by {article?.article.author.username + '\n'}</Text>
      <Text style={{ fontSize: 12 }}>Tags: {article?.article.tagList + '\n'}</Text>
      <Text style={{ fontSize: 16 }}>{article?.article.body + '\n'}</Text>
      <TextInput
          style={styles.input}
          onChangeText={setAddCommentText}
          value={addCommentText}
          onSubmitEditing={submitComment}
          placeholder='Add Comment'
        />
      <ThemedView style={styles.container}>
          <ScrollView>{listComments}</ScrollView>
    </ThemedView>
    </ThemedView>

  );

}


