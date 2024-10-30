## 概述

1. 调用智谱清言智能体API返回结果

## 调用智谱清言智能体API返回结果

::: tip

需要配置 API 密钥变量和 API 密钥，设置助手 ID ，设置输入文件路径与输出路径

api_key = ' ' 

api_secret = ' '

assistant_id = " " 

input_txt_file = ' ' 

output_csv_file = ' '

:::

```python
# 导入requests库，用于发起网络请求
import requests
# 导入json库，用于处理json数据格式
import json
import csv

# 定义函数get_access_token，用于获取访问令牌
def get_access_token(api_key, api_secret):
    # 请求的URL地址
    url = "https://chatglm.cn/chatglm/assistant-api/v1/get_token"
    # 请求的数据体，包含API密钥和密钥
    data = {
        "api_key": api_key,
        "api_secret": api_secret
    }

    # 向服务器发送POST请求，并将结果存储在response变量中
    response = requests.post(url, json=data)
    # 解析服务器返回的JSON数据
    token_info = response.json()
    # 从解析后的数据中提取access_token并返回
    return token_info['result']['access_token']

# 定义函数handle_response，用于处理服务器响应的数据
def handle_response(data_dict):
    # 从数据字典中获取消息内容
    message = data_dict.get("message")
    # 如果消息内容存在
    if len(message) > 0:
        content = message.get("content")
        # 如果内容存在
        if len(content) > 0:
            # 获取响应类型
            response_type = content.get("type")
            # 根据不同的响应类型处理并返回结果
            if response_type == "text":
                text = content.get("text", "No text provided")
                return f"{text}"

            elif response_type == "image":
                images = content.get("image", [])
                # 将图片URL合成一个字符串
                image_urls = ", ".join(image.get("image_url") for image in images)
                return f"{image_urls}"

            elif response_type == "code":
                return f"{content.get('code')}"

            elif response_type == "execution_output":
                return f"{content.get('content')}"

            elif response_type == "system_error":
                return f"{content.get('content')}"

            elif response_type == "tool_calls":
                return f"{data_dict['tool_calls']}"

            elif response_type == "browser_result":
                # 将内容转换为JSON对象
                content = json.loads(content.get("content", "{}"))
                # 返回浏览器结果的标题和URL
                return f"Browser Result - Title: {content.get('title')} URL: {content.get('url')}"

# 定义函数send_message，用于向服务器发送消息并获取响应
def send_message(assistant_id, access_token, prompt, conversation_id=None, file_list=None, meta_data=None):
    # 请求的URL地址
    url = "https://chatglm.cn/chatglm/assistant-api/v1/stream"
    # 设置请求头
    headers = {
        "Authorization": f"Bearer {access_token}",  # 设置授权令牌
        "Content-Type": "application/json"  # 设置内容类型为JSON
    }
    # 请求的数据体，包含助手ID和提示信息
    data = {
        "assistant_id": assistant_id,
        "prompt": prompt,
    }
    # 如果提供了会话ID、文件列表或元数据，添加到数据体中
    if conversation_id:
        data["conversation_id"] = conversation_id
    if file_list:
        data["file_list"] = file_list
    if meta_data:
        data["meta_data"] = meta_data

    # 使用上下文管理器发送POST请求，并处理响应
    with requests.post(url, json=data, headers=headers) as response:
        # 如果状态码为200，表示请求成功
        if response.status_code == 200:
            # 遍历响应的行
            for line in response.iter_lines():
                # 如果行包含数据
                if line:
                    # 解码行数据
                    decoded_line = line.decode('utf-8')
                    # 如果行数据以"data:"开头
                    if decoded_line.startswith('data:'):
                        # 解析JSON数据
                        data_dict = json.loads(decoded_line[5:])
                        # 处理并获取输出结果
                        output = handle_response(data_dict)
        # 如果请求失败，返回失败信息和状态码
        else:
            return "Request failed", response.status_code
        # 输出处理结果
        print(output)
        return output

def process_prompt_and_save_to_csv(input_txt_file, output_csv_file, assistant_id, access_token):
    # 创建一个CSV文件用来保存结果
    with open(output_csv_file, mode='w', newline='', encoding='gb18030') as csv_file:
        # 定义CSV列名
        fieldnames = ['prompt', 'response']
        # 创建CSV写入器
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        # 写入列名作为CSV文件的头部
        writer.writeheader()
        
        # 打开包含prompt的txt文件
        with open(input_txt_file, 'r', encoding='utf-8') as txt_file:
            # 逐行读取prompt
            for prompt in txt_file:
                # 移除行尾的换行符
                prompt = prompt.strip()
                # 如果行不为空，则处理
                if prompt:
                    # 调用之前定义的函数发送消息并获取响应
                    response = send_message(assistant_id, access_token, prompt)
                    # 写入原始prompt和获得的响应到CSV文件中
                    writer.writerow({'prompt': prompt, 'response': response})

# 设置API密钥变量和API密钥
api_key = ' ' 
api_secret = ' '

# 设置助手ID和访问令牌变量
assistant_id = " " 
# 调用函数获取访问令牌
token = get_access_token(api_key, api_secret)
access_token = token

input_txt_file = './1.txt'  # 存储prompt的txt文件
output_csv_file = './output_responses2.csv'  # 存储结果的csv文件
# 调用函数处理数据并保存到CSV
process_prompt_and_save_to_csv(input_txt_file, output_csv_file, assistant_id, token)



# 设置提示信息
#prompt = "Meanest monster ? Lots Of Laugh . It does not support 4G+ and the screen broke on literally first fall from just a metre above the ground . Streaming and performance is highly dissatisfactory . The only positives i found was the battery life and camera . This was never expected from such a brand"
# 调用函数发送消息并获取结果
#result = send_message(assistant_id, access_token, prompt)
# 输出结果变量
#result
```

