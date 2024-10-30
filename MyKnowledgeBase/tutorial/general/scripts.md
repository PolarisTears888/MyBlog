## 概述

1. bat获取当前目录所有文件名

## bat获取当前目录所有文件名

::: tip

新建一个 xx.txt 文件，重命名为 xx.bat，放入需要获取文件名的目录下

生成的 filename.txt 中注意去除 xx.bat 与 filename.txt

:::

```bat
@echo off 

dir /b /on >filename.txt
```

