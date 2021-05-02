import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import cc from 'classcat';

export function HockForm() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = data => {
    console.log(data);
    axios.post('https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec',data).then(r=>{
      alert('投稿されました！');
      reset({
        url:'',
        summary:'サイト',
        description:'',
        tag:'',
      });
      console.log(r);
    })
  };

  //console.log(watch("example"));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="text-white">URL</label>
      <input className={cc(
        [
          "p-1 rounded-xl",
          {
            "bg-red-200 border border-red-500":errors.exampleRequired,
          } 
        ]
      )} defaultValue="" {...register("url", { required: true })} />
      <label className="text-white">分類</label>
      <input defaultValue="サイト" className={cc(
        [
          "p-1 rounded-xl",
          {
            "bg-red-200 border border-red-500":errors.exampleRequired,
          } 
        ]
      )} {...register("summary", { required: true })} />
      <label className="text-white">備考</label>
      <textarea className="p-1 rounded-xl h-40" {...register("description")} />
      <label className="text-white">タグ (複数入力は『,』区切り)</label>
      <input className="p-1 rounded-xl" {...register("tag")} />
      <input className="mt-4 p-2 rounded-lg" type="submit" />
      {errors.exampleRequired && <span className="text-red-400">入力されていない項目があります。</span>}
    </form>
  );
}