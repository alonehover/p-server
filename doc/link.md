# 导航链接管理

## 获取全部

Url: `/link/all`
Type: `GET`
Params: null
Return: 

## 创建

Url: `/link/create`
Type: `POST`
Params: {
    title: string 必填
    url: string 必填
    tag: num 必填
}
Return: 


## 修改

Url: `/link/edit/:id`
Type: `PUT`
Params: {
    title: string
    url: string
    tag: num
}
Return: 


## 删除

Url: `/link/del/:id`
Type: `DELETE`
Params: null
Return: 



## 获取全部标签分组数据

Url: `/link`
Type: `GET`
Params: null
Return: 

## 获取全部标签

Url: `/link/tag`
Type: `GET`
Params: null
Return: 

## 创建标签

Url: `/link/tag/create`
Type: `POST`
Params: {
    title: string 必填
    url: string 必填
    tag: num 必填
}
Return: 


## 修改标签

Url: `/link/tag/edit/:id`
Type: `PUT`
Params: {
    title: string
    url: string
    tag: num
}
Return: 


## 删除标签

Url: `/link/tag/del/:id`
Type: `DELETE`
Params: null
Return: 
