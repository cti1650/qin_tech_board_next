import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export const typeTableDB = async () => {
  return await supabase
    .from('type_table')
    .select('*')
    .then((db) => ({ data: db.data, error: db.error }))
    .catch((e) => ({ data: [], error: e.statusCode }));
};

export const insertDB = async (json) => {
  let data = {
    type: '',
    category: '',
    name: '',
    url: '',
    description: '',
    tag: '',
  };
  data = { ...data, ...json };
  return await supabase
    .from('links')
    .insert([data])
    .then((db) => ({ data: db.data, error: db.error }))
    .catch((e) => ({ data: [], error: e.statusCode }));
};
