import { redirect } from 'next/navigation';

export default function ArticlesIndex() {
  // 这个文件是用来处理 /articles 这个路径的
  // 防止用户访问目录时出现 404，直接踢回首页
  redirect('/'); 
}