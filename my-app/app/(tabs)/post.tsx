import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import PostDetail from '@/components/PostDetail';
import styles from '@/assets/css/styles';


export default function ProfileScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
           <PostDetail/>
      </ThemedView>
    </ScrollView>
  );
}
