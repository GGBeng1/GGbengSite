---
layout: '../../../layouts/Post.astro'
title: 探索使用Midway3 -渐进式依赖注入Node框架！
description: Midway是一个支持场景广泛的Node框架
publishDate: 2022/06/05
featuredImage: '/assets/images/blog/midway.jpg'
tags: ['Node', 'Midway']
---
### 介绍
- Midway 是阿里巴巴 - 淘宝前端架构团队，基于渐进式理念研发的 Node.js 框架，通过自研的依赖注入容器，搭配各种上层模块，组合出适用于不同场景的解决方案。

- Midway 基于 TypeScript 开发，结合了面向对象（OOP + Class + IoC）与函数式（FP + Function + Hooks）两种编程范式，并在此之上支持了 Web / 全栈 / 微服务 / RPC / Socket / Serverless 等多种场景，致力于为用户提供简单、易用、可靠的 Node.js 服务端研发体验。

### 为什么不是egg, nest, koa, express
- OOP + Class + IoC 写起来太优雅了, 底层可以选择koa, 性能也有保证, 生态依赖齐全
- 支持阿里的serverless, 以及其他的云服务
- 支持前后端一体化开发

### 简单实现一个缓存接口到redis自动注册装饰器的实现
- 我们的需求是接口同时传参ttl(缓存时间), 在缓存期间接口直接返回缓存数据, 超过缓存时间, 重新请求接口并更新缓存
- 首先在src目录下创建 decorator 文件夹, 在里面创建一个 cache.decorator.ts 文件
```ts
import { createCustomMethodDecorator } from '@midwayjs/decorator';

// 装饰器内部的唯一 id
export const MEMORY_CACHE_KEY = 'decorator:cache_ttl';

/**
 * Description 缓存接口装饰器 使用方法参照 server/src/module/sys/service/login.ts GetCaptchaService
 * @date 06/05/2022 - 3:08:51 PM
 * @author GGbeng
 *
 * @export
 * @param {number} ttl 过期时间
 * @returns {MethodDecorator}
 */
export function Cache(ttl: number): MethodDecorator {
  return createCustomMethodDecorator(MEMORY_CACHE_KEY, {
    ttl,
  });
}
```
- 其次, 完成缓存装饰器的注册, 在src/service目录下创建一个 initDecorator.service.ts 文件
```ts
import { MEMORY_CACHE_KEY } from '../decorator/cache.decorator';
import { Inject, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Autoload, Init, MidwayDecoratorService } from '@midwayjs/core';
import { CacheManager } from '@midwayjs/cache';
import * as md5 from 'md5';

@Autoload()
@Scope(ScopeEnum.Singleton)
export class InitDecorator {
  @Inject()
  decoratorService: MidwayDecoratorService;
  @Inject()
  cacheManager: CacheManager;
  @Init()
  async cacheInit() {
    this.decoratorService.registerMethodHandler(MEMORY_CACHE_KEY, options => {
      return {
        around: async joinPoint => {
          // 获取过期时间
          const ttl = options.metadata?.ttl || 5;
          const { target, methodName, args } = joinPoint;
          const key = md5(
            String(target.constructor.name) +
              String(methodName) +
              JSON.stringify(args)
          );
          // 获取缓存请求值
          let data: string | undefined = await this.cacheManager.get(key);
          // 如果缓存中有值则直接返回
          if (data) {
            return JSON.parse(data);
          } else {
            // 如果缓存中没有值则执行方法并将结果缓存
            data = await joinPoint.proceed(...joinPoint.args);
            this.cacheManager.set(key, JSON.stringify(data), { ttl });
          }
          return data;
        },
      };
    });
  }
}

```
- 在config目录下的 config.default.ts 文件中(根据自己的情况修改自己的环境配置文件) 添加redis缓存配置
```ts
import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1667543005095_613',
  koa: {
    port: 7001,
    globalPrefix: '/v1',
  },
  jwt: {
    secret: 'shyt-ggbeng',
    expiresIn: '3d', // https://github.com/vercel/ms
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'ggbeng',
        // 自动建表
        synchronize: true,
        // 打印日志
        logging: true,
        // 字符集
        charset: 'utf8mb4',
        entities: '../module/sys/entity',
        timezone: '+08:00',
      },
    },
  },
  cache: {
    store: redisStore,// 支持local存储, 这里我们选择redis会更快一些
    options: {
      host: '127.0.0.1',
      port: 6379,
      password: '123456',
      db: 0,
      ttl: null,
    },
  },
  captcha: {
    default: {
      // 默认配置
      size: 4,
      noise: 1,
      width: 120,
      height: 40,
    },
    image: {
      // 最终会合并 default 配置
      type: 'mixed',
    },
    formula: {}, // 最终会合并 default 配置
    text: {}, // 最终会合并 default 配置
    expirationTime: 60,
    idPrefix: 'midway:vc',
  },
} as MidwayConfig;

```
- 同时在configuration.ts文件中注册缓存
```ts
import { Configuration, App, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as captcha from '@midwayjs/captcha';
import * as orm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import * as cache from '@midwayjs/cache';

import { MidwayDecoratorService } from '@midwayjs/core';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    captcha,
    orm,
    jwt,
    cache,// 注册缓存
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Inject()
  decoratorService: MidwayDecoratorService;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
```
#### 使用
- 在service 的方法中使用
- 这样这个接口就会被缓存到redis中, 3秒后过期(时间自定)

```ts
@Provide()
export class GetCaptchaService {
  @Inject()
  captchaService: CaptchaService;
  // 接口缓存 3 秒 , 防止用户多次点击获取验证码

  /**
   * Description 获取验证码
   * @date 06/05/2022 - 3:50:33 PM
   * @author GGbeng
   *
   * @async
   * @returns {Promise<{ id: string; imageBase64: string }>}
   */
  @Cache(3)
  async get(): Promise<{ id: string; imageBase64: string }> {
    const { id, imageBase64 } = await this.captchaService.image({
      width: 120,
      height: 40,
    });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }
}

```
### 结尾
- 本项目已经重新开源到了GitHub, 一个前后端分离的项目, 前后端依赖均已升级到最新(2022/11)
- [项目GitHub地址](https://github.com/GGBeng1/vue3-midway-fullstack)