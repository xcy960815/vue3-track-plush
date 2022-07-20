import {
    createRequest
} from './fetch'

import { TrackPlushConfig, Entry, TrackParams } from "./index"

// 页面浏览
export default class Browse {
    trackPlushConfig: TrackPlushConfig

    constructor(trackPlushConfig: TrackPlushConfig) {
        this.trackPlushConfig = trackPlushConfig
    }

    // 处理浏览事件
    handleBrowseEvent(entry: Entry) {
        // 自定义埋点上报
        if (entry.type === 'customize') {
            // 删掉type属性 type属性 是自用的
            const currentEntry = JSON.parse(JSON.stringify(entry))
            delete currentEntry.type

            this.handleSendTrack({
                userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
                pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
                projectName: this.trackPlushConfig.projectName,
                actionType: '浏览事件',
                ...currentEntry,
            })
        } else {
            // 指令埋点上报

            // 获取 节点上 track-params 属性的值 在html节点中 属性所对应的值 只能是字符串 不能传递复杂 数据
            const trackParams: string | Object = entry.VNode.props['track-params']
            if (typeof trackParams == "string") {
                this.handleSendTrack({
                    pageName: trackParams, // 如果参数类型是字符串 那就是 页面名称
                    userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
                    pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
                    projectName: this.trackPlushConfig.projectName,
                    actionType: '浏览事件',
                })
            } else {
                this.handleSendTrack({
                    userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
                    pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
                    projectName: this.trackPlushConfig.projectName,
                    actionType: '浏览事件',
                    ...trackParams,
                })
            }

        }
    }

    /**
     * 事件上报
     * @param {Object} data
     * @returns void
     */
    handleSendTrack(trackParams: TrackParams): void {
        createRequest({
            baseURL: this.trackPlushConfig.baseURL,
            url: this.trackPlushConfig.url,
            method: this.trackPlushConfig.method || 'POST',
            data: trackParams,
        })
    }
}