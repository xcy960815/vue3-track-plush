// import Exposure from './exposure'
import Click from './click'
import Browse from './browse'
import { App, Plugin, DirectiveBinding } from "vue";

export type Entry = { type: 'customize' | 'instruction', buttonName?: string, el?: HTMLElement, pageName?: string }

export type Method = 'GET' | 'POST'

export type TrackPlushConfig = {

    projectName: string,

    baseURL: string,

    url: string

    pageName?: string

    pageUrl?: string

    userAgent?: Navigator['userAgent']

    method?: Method

    buttonName?: string

}


export type RequestConfig = {
    baseURL: string,
    url: string,
    method: Method,
    data: any,
}

// 指令 触发
const install = function (app: App, trackPlushConfig: TrackPlushConfig): void {
    app.directive('track', {
        mounted(el: HTMLElement, binding: DirectiveBinding) {
            const { arg } = binding
            arg.split('|').forEach((item: 'click' | 'exposure' | 'browse') => {
                // 点击埋点
                if (item === 'click') {
                    new Click(trackPlushConfig).handleClickEvent({
                        el,
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
                        el,
                    })
                }
            })
        },
    })
}


// 点击事件
export const clickEvent = (trackPlushConfig: TrackPlushConfig) => {
    new Click(trackPlushConfig).handleClickEvent({
        buttonName: trackPlushConfig.buttonName,
        type: 'customize',
    })
}

// 浏览事件
export const browseEvent = (trackPlushConfig: TrackPlushConfig) => {
    new Browse(trackPlushConfig).handleBrowseEvent({
        pageName: trackPlushConfig.pageName,
        type: 'customize',
    })
}

export default {
    install,
}