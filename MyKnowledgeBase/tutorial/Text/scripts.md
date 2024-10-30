## 概述

1. Excel 函数

## Excel 函数

1. XLOOKUP

实现跨表格的文本查找与后置的单元格匹配

```markdown
XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])

```

| 参数         | 定义                                                         |
| ------------ | ------------------------------------------------------------ |
| lookup_value | 查找值：需要查找的值                                         |
| lookup_array | 查找数组：要在其中查找查找值的范围或数组                     |
| return_array | 返回数组：当找到匹配项时，要返回的结果所在的范围或数组       |
| if_not_found | 未找到值：这是一个可选参数。如果在查找数组中找不到查找值，将返回此参数指定的值 |
| match_mode   | 匹配模式：这是一个可选参数，用于指定匹配类型。它可以是0（精确匹配，默认值）、-1、1或2，具体取决于你希望如何匹配查找值 |
| search_mode  | 搜索模式：这也是一个可选参数，用于指定搜索方式。它可以是1（从第一项到最后一项搜索，默认值）、-1、2或-2，具体取决于你希望如何搜索查找数组 |

```markdown
例：XLOOKUP(A2,Sheet1!C:C,Sheet1!D:V,"error",0,1)
```

::: tip

当返回数组的值为空时，会以“0”占位，可以使用if函数判断是否为空值，为空值返回空值即可

:::

```markdown
=IF(XLOOKUP(A2,Sheet3!A:A,Sheet3!A:I,"",0,1)="","",XLOOKUP(A2,Sheet3!A:A,Sheet3!A:I,"",0,1))
```

