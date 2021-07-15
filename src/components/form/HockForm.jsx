import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import cc from 'classcat';

export function HockForm() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = data => {
    console.log(data);
    axios.get('https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec',{
      params: data}).then(r=>{
      reset({
        url:'',
        summary:'サイト',
        description:'',
        tag:'',
      });
      console.log(r);
      r.data[0] && alert('『'+r.data[0][1]+'』が投稿されました！');
    })
  };

  //console.log(watch("example"));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h1>QinTechBoardへ投稿</h1>
      <label className="dark:text-white text-black"><span className="text-red-500">*</span> URL</label>
      <input className={cc(
        [
          "p-1 rounded-xl",
          {
            "bg-red-200 border border-red-500":errors.exampleRequired,
          } 
        ]
      )} defaultValue="" {...register("url", { required: true })} />
      <label className="dark:text-white text-black">分類</label>
      <input defaultValue="サイト" className={cc(
        [
          "p-1 rounded-xl",
          {
            "bg-red-200 border border-red-500":errors.exampleRequired,
          } 
        ]
      )} {...register("summary", { required: true })} />
      <label className="dark:text-white text-black">備考</label>
      <textarea className="p-1 rounded-xl h-40" {...register("description")} />
      <label className="dark:text-white text-black">タグ (複数入力は『,』区切り)</label>
      <input className="p-1 rounded-xl" {...register("tag")} />
      <input className="mt-4 p-2 rounded-lg" type="submit" />
      <div className="text-red-500">* 必須項目</div>
      {errors.exampleRequired && <span className="text-red-400">入力されていない項目があります。</span>}
    </form>
  );
}