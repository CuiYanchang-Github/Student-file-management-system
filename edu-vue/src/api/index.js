import axios from 'axios';
import qs from 'qs';
import { apiUrl } from '@/config/env';
import { Message } from 'element-ui';
/* eslint-disable */

const parameterProcessor = (url = '', data = {}, method = 'get') => {//接口处理函数-参数
    return new Promise((resolve) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] === null || data[key] === undefined) {
                    data[key] = '';
                }
            }
        }
        method = method.toLowerCase();
        if (method === 'get') {
            url += '?';
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    url += key + '=' + data[key] + '&';
                }
            }
            url = url.substring(0, url.length - 1);
        }

        resolve({
            url,
            data,
            method,
        });
    });
};

const myInterface = (url = '', data = {}, method = 'get') => {//请求接口
    return new Promise(async(resolve) => {
        const interfaceParameter = await parameterProcessor(url, data, method);
        const instance = axios.create({//请求包
            baseURL: apiUrl,
            transformRequest(transformData) {
                return qs.stringify(transformData);
            },
            transformResponse(response) {
                const data = JSON.parse(response);
                if (data.successMsg) {
                    Message.success(data.successMsg);
                }
                if (data.errorMsg) {
                    Message.error(data.errorMsg);
                }
                return data;
            },
        });
        const res = await instance(interfaceParameter);//后台返回数据
        resolve(res.data);//抛出数据（返回值）
    });
};

function makeInterface(url) {//方法函数
    return {
        get(data) {
            return myInterface(url, data, 'get');
        },
        detail(id, data = {}) {
            return myInterface(`${url}/${id}`, data, 'get');
        },
        create(data) {
            return myInterface(url, data, 'post');
        },
        update(data, id) {
            return myInterface(`${url}/${id}`, data, 'put');
        },
        del(id) {
            return myInterface(`${url}/${id}`, {}, 'delete');
        },
    };
}

export const Class = makeInterface('/class');//接口对象
export const College = makeInterface('/college');
export const Grade = makeInterface('/grade');
export const Honor = makeInterface('/honor');
export const User = makeInterface('/user');
export const Relate = makeInterface('/relate');
export const Profession = makeInterface('/profession');
export const Student = makeInterface('/student');
export const Login = makeInterface('/login');
export const Announcement = makeInterface('/announcement');
export const qiniu = () => axios.get('http://47.107.146.72:7100');//七牛的图床地址