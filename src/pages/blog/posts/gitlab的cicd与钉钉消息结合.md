---
title: GitLab的CICD与钉钉消息结合
publishDate: 2024/01/17
description: GitLab的CICD与钉钉消息结合
featuredImage: /assets/images/blog/xnip2024-02-26_16-11-43.jpg
tags:
  - gitlab
  - dingtalk
layout: ../../../layouts/Post.astro
---
# 背景

* 随着公司项目的增多, 团队人数的增加, 急需流水线构建成功还是失败的消息通知. 公司团队采用钉钉, 最方便的还是使用钉钉机器人发送群消息, 消息的内容需要涵盖项目名称, 构建时长(用来发现问题), 构建人, 构建状态等等...

# 结合GitLabCICD

* 公司内部的发布部署一直是采用GitLab-runner及docker实现的的发布Nginx镜像, 所以要想实现需求需要结合配置文件修改. 同时还要考虑未来及过往项目的兼容, 所以最简单的办法就是使用`.gitlab-ci.yml`中的`include`字段

# 实现

* 我们在现有的项目配置中添加以下配置

```yml
# 集成通知脚本
include:
  - project: xxx/gitlab-ci
    ref: main
    file: dingtalk.yml
```

* 同时我们去xxx分组下创建`gitlab-ci`项目, 创建`main`分支, 创建`dingtalk.yml`文件

```yml
# 钉钉消息发送模版任务
# 必须变量
# DINGTALK_ACCESS_TOKEN 群机器人token

variables:
  # 钉钉markdown换行符 必须\n且前后跟两个空格(shell 转义)
  V_BR: "\ \ \\n\ \ "

# 消息发送准备工作
# 检测钉钉消息发送access_token是否存在
.prepare: &prepare # token检验
  - |
    if [ -z $DINGTALK_ACCESS_TOKEN ]; then
      echo "使用钉钉消息发送必须配置DINGTALK_ACCESS_TOKEN变量"
      exit 1
    fi
  # url编码项目地址及任务地址
  - |
    project_url="$(curl -s -o /dev/null -w %{url_effective} --get --data-urlencode "${GITLAB_URL}/${CI_PROJECT_PATH}/-/tree/${CI_BUILD_REF_NAME}" "" || true)"
    job_url="$(curl -s -o /dev/null -w %{url_effective} --get --data-urlencode "${GITLAB_URL}/${CI_PROJECT_PATH}/-/jobs/${CI_JOB_ID}" "" || true)"

# 钉钉消息发送http Anchors
.send_request: &send_request # Markdown消息内容
  - |
    V_TEXT="**CI任务<font color=\\\"${V_COLOR}\\\">${V_STATUS}</font>通知**${V_BR}\
    任务ID: **${CI_JOB_ID}**${V_BR}\
    任务名: **${CI_JOB_NAME}**${V_BR}\
    项目: **${CI_PROJECT_PATH}**${V_BR}\
    分支: **${CI_BUILD_REF_NAME}**${V_BR}\
    执行人: **${GITLAB_USER_NAME}**${V_EXTRA}\
    "
  # 钉钉消息发送json报文
  - |
    V_JSON="{
      \"actionCard\": {\
            \"title\": \"${V_TITLE}\",\
            \"text\": \"${V_TEXT}\", \
            \"btnOrientation\": \"1\",\
            \"btns\": [{\
               \"title\": \"查看项目\",
               \"actionURL\": \"dingtalk://dingtalkclient/page/link?url=http://192.168.1.40:9980/${project_url##/?}&pc_slide=false\"
             }, {\
              \"title\": \"查看任务\",
              \"actionURL\": \"dingtalk://dingtalkclient/page/link?url=${CI_PIPELINE_URL##/?}&pc_slide=false\"
            }, {\
              \"title\": \"测试地址\",
              \"actionURL\": \"dingtalk://dingtalkclient/page/link?url=${PRO_URL##/?}&pc_slide=false\"
            }]\
        },\
        \"msgtype\": \"actionCard\"\
    }"
  - >
    curl -s -H 'Content-Type: application/json; charset=utf-8' -X POST
    https://oapi.dingtalk.com/robot/send?access_token=${DINGTALK_ACCESS_TOKEN} -d "${V_JSON}" -w "\n"

# 消息发送模板任务
.dingtalk:
  # 发送ci结束消息
  after_script:
    - *prepare
    # 不同任务状态设置不同消息标题、颜色
    - |
      case $RUNNER_STATUS in
        success)
          V_TITLE="CI任务执行成功通知"
          V_STATUS="执行成功"
          V_COLOR="#33CC00"
          ;;
        failed)
          V_TITLE="CI任务执行失败通知"
          V_STATUS="执行失败"
          V_COLOR="#FF3333"
          ;;
        *)
          echo "不支持job状态${CI_JOB_STATUS}"
          exit 1
          ;;
      esac
    # 执行耗时计算
    # start_time=`date -u -d ${CI_JOB_STARTED_AT} "+%Y-%m-%d %H:%M:%S"`
    - |
      if [ -z "${CI_START_TIME_INSTALL}" ]; then
          CI_START_TIME_INSTALL=$(date +%s)
      fi
      seconds=$(($(date +%s) - (${CI_START_TIME_INSTALL})))
      V_EXTRA="${V_BR}耗时: **$[seconds/60]分$[seconds%60]秒**"
    - *send_request
```

# 成果展示

![](/assets/images/blog/xnip2024-02-26_16-23-18.jpg)
