#!/bin/bash

count=0;
# 查找当前目录以及子目录下所有的.vue文件，并把每个匹配到的文件的上级目录名赋值给变量
for file in $(find ./packages -type f -name "*.vue"); do
  # 获取上级目录名
  dir=$(dirname $file)
  parent_dir=$(basename $dir)
  
  # 将上级目录名赋值给变量
  echo "Found Vue file $dir in directory $parent_dir"

  export LIB_DIR=$dir
  export LIB_NAME=$parent_dir
  if count -eq 0
    then
      export PKG_RESET='reset'
  fi
  vite build
  count=$(($count + 1));
done