import { useState, useEffect } from 'react';
import { supabase } from '@util/supabase';
import LinkButtons2 from '../button/LinkButtons2';
import cc from "classcat";

const updateDB = async (table_id) => {
    return await supabase.from('links').select('*').eq('type',table_id);
  };  

export const SupabaseDatas = (props) => {
  const { table_id,keyword,small,size } = props;
  const [linksData, setLinksData] = useState([]);
  useEffect(async () => {
    let DB = await updateDB(table_id);
    setLinksData(DB.data);
    supabase
      .from('links')
      .on('*', async (data) => {
        let DB = await updateDB(table_id);
        setLinksData(DB.data);
      })
      .subscribe();
  }, []);
  return (
    <>
      <LinkButtons2
        title={table_id}
        items={linksData && (linksData || [])}
        keyword={keyword}
        size={size<20?'small':''}
      ></LinkButtons2>
    </>
  )
}
