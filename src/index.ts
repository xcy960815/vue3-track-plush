// import Exposure from './exposure'
import Click from './click'
import Browse from './browse'
import { App, Plugin, DirectiveBinding, VNode } from "vue";

export type Entry = { type: 'customize' | 'instruction', el?: HTMLElement, VNode?: VNode, pageName?: string, buttonName?: string, } & { [key: string]: any }

export type Method = 'GET' | 'POST'

export interface TrackPlushConfig extends Record<string, string | undefined> {

    projectName: string,

    baseURL: string,

    url: string

    pageName?: string

    pageUrl?: string

    userAgent?: Navigator['userAgent']

    method?: Method

    buttonName?: string

}

// 忽略的字段
const ignoreField = ["baseURL", "url"]

export type EventParams = { [key: string]: any }

export type TrackParams = {
    buttonName?: string
    userAgent: string, //客户端设备
    pageUrl: string, //当前页面路径
    projectName: string, //项目名称
    actionType: '点击事件' | '浏览事件',
    pageName?: string,
}

export type RequestConfig = {
    baseURL: string,
    url: string,
    method: Method,
    data: TrackParams,
}

// 指令 触发
const install = (app: App, trackPlushConfig: TrackPlushConfig): void => {
    app.directive('track', {
        mounted(el: HTMLElement, binding: DirectiveBinding<string | Object>, VNode: VNode) {

            const { arg } = binding

            arg.split('|').forEach((item: 'click' | 'exposure' | 'browse') => {
                // 点击埋点
                if (item === 'click') {
                    new Click(trackPlushConfig).handleClickEvent({
                        el,
                        VNode,
                        type: 'instruction',
                    })
                }

                // 曝光埋点
                // else if (item === 'exposure') {
                //     new Exposure(trackPlushConfig).handleExposureEvent({
                //         el,
                //     })
                // }

                // 浏览埋点
                else if (item === 'browse') {
                    new Browse(trackPlushConfig).handleBrowseEvent({
                        type: 'instruction',
                        VNode,
                    })
                }
            })
        },
    })
}


// 点击事件
export const clickEvent = (trackPlushConfig: TrackPlushConfig) => {
    const clickEventParams: EventParams = {}
    Object.keys(trackPlushConfig).forEach((key) => {
        if (!ignoreField.includes(key)) clickEventParams[key] = trackPlushConfig[key]

    })
    new Click(trackPlushConfig).handleClickEvent({
        ...clickEventParams,
        type: 'customize',
    })
}

// 浏览事件
export const browseEvent = (trackPlushConfig: TrackPlushConfig) => {
    const browseEventParams: EventParams = {}
    Object.keys(trackPlushConfig).forEach((key) => {
        if (!ignoreField.includes(key)) browseEventParams[key] = trackPlushConfig[key]

    })
    new Browse(trackPlushConfig).handleBrowseEvent({
        ...browseEventParams,
        type: 'customize',
    })
}

export default {
    install,
}