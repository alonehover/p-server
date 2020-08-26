import { Injectable } from '@nestjs/common';
const superagent = require("superagent");
const crypto = require('crypto');

const CONFIG = require('../../../config/translate.config.js')

function md5(text) {
    return crypto.createHash('md5').update(text, 'utf8').digest('hex');
}

function hasChinese(val){
　　var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
　　if(reg.test(val)){     
        return true;      
　　}
    return false;     
}

@Injectable()
export class TranslateService {
  constructor(
  ) { }

  async search(queryWords: string): Promise<any> {
    if(!queryWords) {
        return {
            status: 200,
            data: ""
        };
    }

    console.log(queryWords)

    const data = {
        y: await this.youdao(queryWords),            
        b: await this.baidu(queryWords),
        s: await this.sougou(queryWords),
        i: await this.iciba(queryWords)
    };

    return {
        query: queryWords,
        data
    };
  }

  async youdao(queryWords: string) {
    if(!queryWords) {
        return {
            status: 200,
            data: ""
        };
    }

    const API_URL = "http://fanyi.youdao.com/openapi.do";
    const params = {
        keyfrom: "yinwuxueshe",
        key: CONFIG.youdao.pid,
        type: "data",
        doctype: "json",
        version: "1.1",
        q: queryWords
    };
    
    try {
        const res = await superagent
                            .get(API_URL)
                            .query(params);
        let result = {};

        if(res.body.errorCode == 0) {
            result = {
                basic:  res.body.basic ? res.body.basic.explains : "",
                translation: res.body.translation[0]
            };
        }

        return {
            status: 200,
            data: result
        }
    } catch (error) {
        return {
            status: error.status || 500,
            data: error
        }
    }
  }

  async sougou(queryWords: string) {
    const API_URL = "http://fanyi.sogou.com/reventondc/api/sogouTranslate";

    if(!queryWords) {
        return {
            status: 200,
            data: ""
        };
    }
    console.log(queryWords)
    
    const params = {
        q: queryWords,
        from: "auto",
        to: hasChinese(queryWords) ? "en" : "zh-CHS",
        pid: CONFIG.sougou.pid,
        salt: new Date().getTime().toString(),
        sign: ""
    };
    const sign = params.pid + queryWords.trim() + params.salt + CONFIG.sougou.key;        
    params.sign = encodeURIComponent(md5(sign));
    
    try {
        const res = await superagent
                            .post(API_URL)
                            .set('Content-Type', 'application/x-www-form-urlencoded;')
                            .set('accept', 'application/json')
                            .query(params);
        return {
            status: 200,
            data: res.body.errorCode == 0 ? res.body.translation : ""
        }
    } catch (error) {
        return {
            status: error.status || 500,
            data: error
        }
    }
  }

  async baidu(queryWords) {
    const API_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";

    if(!queryWords) {
        return {
            status: 200,
            data: ""
        };
    }
    
    const params = {
        q: queryWords,
        from: "auto",
        to: hasChinese(queryWords) ? "en" : "zh",
        appid: CONFIG.baidu.pid,
        salt: new Date().getTime().toString(),
        sign: ""
    };        
    const sign = params.appid + queryWords.trim() + params.salt + CONFIG.baidu.key;
    params.sign = encodeURIComponent(md5(sign));
            
    try {
        const res = await superagent
                            .post(API_URL)
                            .set('Content-Type', 'application/x-www-form-urlencoded;')
                            .set('accept', 'application/json')
                            .query(params);
        return {
            status: 200,
            data: res.body.trans_result[0].dst
        }
    } catch (error) {
        return {
            status: error.status || 500,
            data: error
        }
    }
  }

  async iciba(queryWords) {
    const API_URL = "http://dict-co.iciba.com/api/dictionary.php";

    if(!queryWords) {
        return {
            status: 200,
            data: ""
        };
    }
    
    const params = {
        w: queryWords,
        key: CONFIG.iciba.key,
        type: 'json'
    };
    
    try {
        const res = await superagent
                            .get(API_URL)
                            .query(params);
        return {
            status: 200,
            data: JSON.parse(res.text).symbols[0] || ""
        }
    } catch (error) {
        return {
            status: error.status || 500,
            data: error
        }
    }
  }
}