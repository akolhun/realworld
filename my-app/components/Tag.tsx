import { useState, useEffect, PropsWithChildren } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import requests from '@/services/requests';

type Props = PropsWithChildren<{
  tagValue: any
  setTagValue: any
  onTagChanged: any
}>;


export type Tags = {
  tags: string[]
};


export default function Tag({
  tagValue, setTagValue, onTagChanged
}: Props) {
  const [open, setOpen] = useState(false);
  const [tagItems, setTagItems] = useState([{}]);


  useEffect(() => {
    requests.get('/tags', (err: Body, res: Body) => {
      if (err) {
        console.log(err);
      } else {
        let tags: Tags = JSON.parse(JSON.stringify(res.body));
        let tagList = tags?.tags.map((tag, index) => { return { label: tag, value: tag } })
        setTagItems(tagList)
      }
    },
    null
  )

    return () => {
      // console.log('...')
    };
  }, []);

  return (
      <DropDownPicker 
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,
          marginBottom: 50
        }}
        open={open}
        items={tagItems}
        setItems={setTagItems}
        setOpen={setOpen}
        setValue={setTagValue}
        value={tagValue}
        onChangeValue={onTagChanged}
        placeholder={'Filter by tag...'}
        multiple={false}
      />
  );

}

